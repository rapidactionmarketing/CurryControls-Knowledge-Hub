import { appendFile, mkdir } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";
import { logger } from "./logger";

/**
 * Storage for messages sent through the contact page.
 *
 * Two backends, chosen at startup the same way as the analytics store:
 *
 *   postgres — used when DATABASE_URL is set. The `contact_messages` table is
 *              created by `pnpm --filter @workspace/db run push`, which the
 *              post-merge script runs on the deployment.
 *   file     — the fallback. Append-only JSONL under CONTACT_DATA_DIR. It
 *              keeps nothing from being lost when no database is provisioned,
 *              but it lives on instance-local disk and is not shared.
 *
 * A message is stored before the notification email is attempted, so a mail
 * outage never loses what someone wrote. Only what the sender typed is kept:
 * no IP address, no user agent.
 */

export type ContactMessageInput = {
  name: string;
  company?: string | undefined;
  email: string;
  phone?: string | undefined;
  subject?: string | undefined;
  topic?: string | undefined;
  message: string;
  pagePath?: string | undefined;
};

export type SavedContactMessage = ContactMessageInput & {
  id: string;
  createdAt: Date;
};

export type ContactStoreKind = "postgres" | "file";

interface ContactStore {
  readonly kind: ContactStoreKind;
  save(input: ContactMessageInput): Promise<SavedContactMessage>;
  markEmailed(id: string): Promise<void>;
  markEmailFailed(id: string, error: string): Promise<void>;
}

const MAX_ERROR_LENGTH = 500;

/* ------------------------------------------------------------------ *
 * File store
 * ------------------------------------------------------------------ */

class FileContactStore implements ContactStore {
  readonly kind = "file" as const;

  constructor(private readonly dir: string) {}

  private get file(): string {
    return path.join(this.dir, "contact-messages.jsonl");
  }

  private async append(record: Record<string, unknown>): Promise<void> {
    await mkdir(this.dir, { recursive: true });
    await appendFile(this.file, `${JSON.stringify(record)}\n`, "utf8");
  }

  async save(input: ContactMessageInput): Promise<SavedContactMessage> {
    const createdAt = new Date();
    const id = `${createdAt.toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}-${randomBytes(4).toString("hex")}`;
    await this.append({
      record: "message",
      id,
      createdAt: createdAt.toISOString(),
      status: "new",
      ...input,
    });
    return { ...input, id, createdAt };
  }

  async markEmailed(id: string): Promise<void> {
    await this.append({
      record: "status",
      id,
      status: "emailed",
      emailedAt: new Date().toISOString(),
    });
  }

  async markEmailFailed(id: string, error: string): Promise<void> {
    await this.append({
      record: "status",
      id,
      status: "email_failed",
      emailError: error.slice(0, MAX_ERROR_LENGTH),
    });
  }
}

/* ------------------------------------------------------------------ *
 * Postgres store
 * ------------------------------------------------------------------ */

class PostgresContactStore implements ContactStore {
  readonly kind = "postgres" as const;

  async save(input: ContactMessageInput): Promise<SavedContactMessage> {
    const { db, contactMessagesTable } = await import("@workspace/db");
    const [row] = await db
      .insert(contactMessagesTable)
      .values({
        name: input.name,
        company: input.company ?? null,
        email: input.email,
        phone: input.phone ?? null,
        subject: input.subject ?? null,
        topic: input.topic ?? null,
        message: input.message,
        pagePath: input.pagePath ?? null,
      })
      .returning({ id: contactMessagesTable.id, createdAt: contactMessagesTable.createdAt });
    if (!row) throw new Error("Insert returned no row");
    return { ...input, id: String(row.id), createdAt: row.createdAt };
  }

  async markEmailed(id: string): Promise<void> {
    const { db, contactMessagesTable } = await import("@workspace/db");
    const { eq } = await import("drizzle-orm");
    await db
      .update(contactMessagesTable)
      .set({ status: "emailed", emailedAt: new Date(), emailError: null })
      .where(eq(contactMessagesTable.id, Number(id)));
  }

  async markEmailFailed(id: string, error: string): Promise<void> {
    const { db, contactMessagesTable } = await import("@workspace/db");
    const { eq } = await import("drizzle-orm");
    await db
      .update(contactMessagesTable)
      .set({ status: "email_failed", emailError: error.slice(0, MAX_ERROR_LENGTH) })
      .where(eq(contactMessagesTable.id, Number(id)));
  }
}

/* ------------------------------------------------------------------ *
 * Selection
 * ------------------------------------------------------------------ */

let store: ContactStore | null = null;

export function getContactStore(): ContactStore {
  if (store) return store;

  if (process.env["DATABASE_URL"]) {
    logger.info("Contact: using the Postgres store");
    store = new PostgresContactStore();
  } else {
    const dir = path.resolve(process.env["CONTACT_DATA_DIR"] ?? ".data/contact");
    logger.info(
      { dir },
      "Contact: DATABASE_URL is not set, using the local file store. Provision Postgres for durable, shared storage.",
    );
    store = new FileContactStore(dir);
  }

  return store;
}
