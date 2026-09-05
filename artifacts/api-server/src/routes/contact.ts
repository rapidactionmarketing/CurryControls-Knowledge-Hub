import { Router, type IRouter, type Request } from "express";
import { SubmitContactMessageBody } from "@workspace/api-zod";
import { getContactStore, type ContactMessageInput } from "../lib/contact-store";
import { mailerStatus, sendContactNotification } from "../lib/mailer";
import { logger } from "../lib/logger";

const router: IRouter = Router();

/** Field caps, applied server side so a hostile client cannot bloat the store. */
const MAX = { name: 120, company: 160, email: 254, phone: 40, subject: 200, topic: 80, message: 5000, page: 200 };

/** Single-line fields: control characters (including line breaks) become spaces. */
const clamp = (value: unknown, limit: number): string | undefined => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
  return trimmed ? trimmed.slice(0, limit) : undefined;
};

/** The message keeps its line breaks and tabs; other control characters are dropped. */
const clampText = (value: unknown, limit: number): string | undefined => {
  if (typeof value !== "string") return undefined;
  const trimmed = value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]+/g, "")
    .trim();
  return trimmed ? trimmed.slice(0, limit) : undefined;
};

/**
 * In-memory rate limit keyed by a hash of the caller address, as in the
 * analytics route. The address is never stored; the hash lives only in memory
 * and is discarded when the window rolls over.
 */
const WINDOW_MS = 10 * 60_000;
const MAX_MESSAGES_PER_WINDOW = 5;
const buckets = new Map<string, { count: number; resetAt: number }>();

function rateLimited(req: Request): boolean {
  const address = req.ip ?? "unknown";
  let key = 0;
  for (let i = 0; i < address.length; i += 1) key = (key * 31 + address.charCodeAt(i)) | 0;
  const id = String(key);

  const now = Date.now();
  const bucket = buckets.get(id);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(id, { count: 1, resetAt: now + WINDOW_MS });
    if (buckets.size > 10_000) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
    }
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_MESSAGES_PER_WINDOW;
}

/**
 * Bounded wait for the notification. A slow mail server must not hold the
 * visitor's request open; after the wait the send continues in the
 * background and the stored record is updated when it settles.
 */
const NOTIFY_WAIT_MS = 12_000;

router.post("/contact", async (req, res) => {
  if (rateLimited(req)) {
    res.status(429).json({ ok: false, error: "Too many messages from this connection. Please wait a few minutes, or call." });
    return;
  }

  const parsed = SubmitContactMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Name, a valid email address, and a message are required." });
    return;
  }

  // Honeypot: real visitors never see this field. A bot that fills it gets a
  // success response and nothing is stored or sent.
  if (clamp(parsed.data.website, 200)) {
    res.status(200).json({ ok: true, delivery: "stored" });
    return;
  }

  const input: ContactMessageInput = {
    name: clamp(parsed.data.name, MAX.name) ?? "",
    company: clamp(parsed.data.company, MAX.company),
    email: clamp(parsed.data.email, MAX.email) ?? "",
    phone: clamp(parsed.data.phone, MAX.phone),
    subject: clamp(parsed.data.subject, MAX.subject),
    topic: clamp(parsed.data.topic, MAX.topic),
    message: clampText(parsed.data.message, MAX.message) ?? "",
    pagePath: clamp(parsed.data.page, MAX.page),
  };

  if (!input.name || !input.email || !input.message) {
    res.status(400).json({ ok: false, error: "Name, a valid email address, and a message are required." });
    return;
  }

  const store = getContactStore();
  let saved;
  try {
    saved = await store.save(input);
  } catch (err) {
    // Nothing was kept, so tell the client and let it fall back to email.
    logger.error({ err }, "Contact: failed to store a message");
    res.status(503).json({ ok: false, error: "The message service is unavailable right now." });
    return;
  }

  const mailer = mailerStatus();
  if (!mailer.enabled) {
    logger.warn({ id: saved.id, reason: mailer.reason }, "Contact: message stored; notification email is disabled");
    res.status(200).json({ ok: true, id: saved.id, delivery: "stored" });
    return;
  }

  const notify = sendContactNotification(saved).then(
    async () => {
      await store.markEmailed(saved.id).catch((err) => logger.error({ err, id: saved.id }, "Contact: failed to record the email status"));
      return "emailed" as const;
    },
    async (err: unknown) => {
      const message = err instanceof Error ? err.message : String(err);
      logger.error({ err, id: saved.id }, "Contact: notification email failed; the message is stored");
      await store.markEmailFailed(saved.id, message).catch((e) => logger.error({ err: e, id: saved.id }, "Contact: failed to record the email failure"));
      return "stored" as const;
    },
  );

  let timer: ReturnType<typeof setTimeout> | undefined;
  const wait = new Promise<"stored">((resolve) => {
    timer = setTimeout(() => resolve("stored"), NOTIFY_WAIT_MS);
  });
  const delivery = await Promise.race([notify, wait]);
  if (timer) clearTimeout(timer);

  res.status(200).json({ ok: true, id: saved.id, delivery });
});

export default router;
