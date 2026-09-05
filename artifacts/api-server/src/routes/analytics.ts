import { Router, type IRouter, type Request } from "express";
import {
  CollectAnalyticsEventsBody,
  GetAnalyticsSummaryQueryParams,
} from "@workspace/api-zod";
import { getAnalyticsStore, type StoredEvent } from "../lib/analytics-store";
import { summarize } from "../lib/analytics-summary";
import { logger } from "../lib/logger";

const router: IRouter = Router();

/** Field caps, applied server side so a hostile client cannot bloat the store. */
const MAX = { path: 512, title: 200, referrer: 200, label: 120, query: 200, viewport: 16 };

const clamp = (value: unknown, limit: number): string | undefined => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, limit) : undefined;
};

/**
 * Simple in-memory rate limit, keyed by a hash of the caller address.
 *
 * The address is never stored; it exists only as a bucket key in memory and is
 * discarded when the window rolls over.
 */
const WINDOW_MS = 60_000;
const MAX_BATCHES_PER_WINDOW = 60;
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
  return bucket.count > MAX_BATCHES_PER_WINDOW;
}

/**
 * sendBeacon delivers a Blob, and some browsers rewrite the content type, so
 * the body may arrive already parsed or as a raw string.
 */
function parseBody(body: unknown): unknown {
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
  return body;
}

router.post("/analytics/events", async (req, res) => {
  if (rateLimited(req)) {
    res.status(429).json({ accepted: 0 });
    return;
  }

  const parsed = CollectAnalyticsEventsBody.safeParse(parseBody(req.body));
  if (!parsed.success) {
    res.status(400).json({ accepted: 0 });
    return;
  }

  const { sessionId, events } = parsed.data;
  const now = Date.now();

  const stored: StoredEvent[] = events.map((event) => ({
    sessionId: sessionId.slice(0, 64),
    type: event.type,
    path: clamp(event.path, MAX.path) ?? "/",
    title: clamp(event.title, MAX.title),
    referrer: clamp(event.referrer, MAX.referrer),
    label: clamp(event.label, MAX.label),
    value: typeof event.value === "number" && Number.isFinite(event.value) ? event.value : undefined,
    query: clamp(event.query, MAX.query),
    viewport: clamp(event.viewport, MAX.viewport),
    isNewSession: event.newSession === true,
    // Trust the client clock only within a sane window; otherwise use now.
    occurredAt:
      typeof event.ts === "number" && Math.abs(now - event.ts) < 86_400_000
        ? new Date(event.ts)
        : new Date(now),
  }));

  try {
    await getAnalyticsStore().append(stored);
  } catch (err) {
    // Never fail a visitor's page because analytics could not be written.
    logger.error({ err }, "Analytics: failed to append events");
    res.status(202).json({ accepted: 0 });
    return;
  }

  res.status(202).json({ accepted: stored.length });
});

router.get("/analytics/summary", async (req, res) => {
  const params = GetAnalyticsSummaryQueryParams.safeParse(req.query);
  const days = params.success ? (params.data.days ?? 30) : 30;

  const store = getAnalyticsStore();
  const since = new Date(Date.now() - days * 86_400_000);

  try {
    const events = await store.read(since);
    res.json(summarize(events, days, store.kind));
  } catch (err) {
    logger.error({ err }, "Analytics: failed to build the summary");
    res.status(503).json({ error: "Analytics storage is unavailable" });
  }
});

export default router;
