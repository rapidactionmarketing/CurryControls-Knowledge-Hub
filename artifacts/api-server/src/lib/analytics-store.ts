import { appendFile, mkdir, readFile, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import { logger } from "./logger";

/**
 * Storage for first-party site analytics.
 *
 * Two backends, chosen at startup:
 *
 *   postgres — used when DATABASE_URL is set. Durable and shared across
 *              instances. Run `pnpm --filter @workspace/db run push` once to
 *              create the table.
 *   file     — the fallback. Append-only JSONL, one file per UTC day, under
 *              ANALYTICS_DATA_DIR. Works with no provisioning, but it lives on
 *              instance-local disk, so it is not shared between instances and
 *              does not survive one being replaced.
 *
 * Nothing here stores personal data: no user id, no IP address, no cookie.
 */

export type StoredEvent = {
  sessionId: string;
  type: string;
  path: string;
  title?: string | undefined;
  referrer?: string | undefined;
  label?: string | undefined;
  value?: number | undefined;
  query?: string | undefined;
  viewport?: string | undefined;
  isNewSession: boolean;
  occurredAt: Date;
};

export type StoreKind = "postgres" | "file";

interface AnalyticsStore {
  readonly kind: StoreKind;
  append(events: StoredEvent[]): Promise<void>;
  read(since: Date): Promise<StoredEvent[]>;
}

const RETENTION_DAYS = Number(process.env["ANALYTICS_RETENTION_DAYS"] ?? 400);
/** Guards the dashboard against loading an unbounded result set. */
const MAX_READ_EVENTS = 500_000;

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------ *
 * File store
 * ------------------------------------------------------------------ */

class FileAnalyticsStore implements AnalyticsStore {
  readonly kind = "file" as const;

  constructor(private readonly dir: string) {}

  private async ensureDir(): Promise<void> {
    await mkdir(this.dir, { recursive: true });
  }

  async append(events: StoredEvent[]): Promise<void> {
    if (events.length === 0) return;
    await this.ensureDir();

    // Group by UTC day so each file stays small and pruning is a file delete.
    const byDay = new Map<string, string[]>();
    for (const event of events) {
      const key = dayKey(event.occurredAt);
      const lines = byDay.get(key) ?? [];
      lines.push(JSON.stringify({ ...event, occurredAt: event.occurredAt.toISOString() }));
      byDay.set(key, lines);
    }

    await Promise.all(
      [...byDay.entries()].map(([day, lines]) =>
        appendFile(path.join(this.dir, `${day}.jsonl`), `${lines.join("\n")}\n`, "utf8"),
      ),
    );
  }

  async read(since: Date): Promise<StoredEvent[]> {
    await this.ensureDir();
    const sinceKey = dayKey(since);

    let files: string[];
    try {
      files = await readdir(this.dir);
    } catch {
      return [];
    }

    const wanted = files
      .filter((f) => f.endsWith(".jsonl") && f.slice(0, 10) >= sinceKey)
      .sort();

    const events: StoredEvent[] = [];
    for (const file of wanted) {
      let contents: string;
      try {
        contents = await readFile(path.join(this.dir, file), "utf8");
      } catch {
        continue;
      }
      for (const line of contents.split("\n")) {
        if (!line) continue;
        if (events.length >= MAX_READ_EVENTS) return events;
        try {
          const parsed = JSON.parse(line) as StoredEvent & { occurredAt: string };
          const occurredAt = new Date(parsed.occurredAt);
          if (occurredAt >= since) events.push({ ...parsed, occurredAt });
        } catch {
          // A truncated final line from an interrupted write is skipped.
        }
      }
    }
    return events;
  }

  /** Deletes day files older than the retention window. */
  async prune(): Promise<void> {
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 86_400_000);
    const cutoffKey = dayKey(cutoff);
    let files: string[];
    try {
      files = await readdir(this.dir);
    } catch {
      return;
    }
    await Promise.all(
      files
        .filter((f) => f.endsWith(".jsonl") && f.slice(0, 10) < cutoffKey)
        .map((f) => unlink(path.join(this.dir, f)).catch(() => undefined)),
    );
  }
}

/* ------------------------------------------------------------------ *
 * Postgres store
 * ------------------------------------------------------------------ */

class PostgresAnalyticsStore implements AnalyticsStore {
  readonly kind = "postgres" as const;

  async append(events: StoredEvent[]): Promise<void> {
    if (events.length === 0) return;
    const { db, analyticsEventsTable } = await import("@workspace/db");
    await db.insert(analyticsEventsTable).values(
      events.map((event) => ({
        sessionId: event.sessionId,
        type: event.type,
        path: event.path,
        title: event.title ?? null,
        referrer: event.referrer ?? null,
        label: event.label ?? null,
        value: event.value ?? null,
        query: event.query ?? null,
        viewport: event.viewport ?? null,
        isNewSession: event.isNewSession ? 1 : 0,
        occurredAt: event.occurredAt,
      })),
    );
  }

  async read(since: Date): Promise<StoredEvent[]> {
    const { db, analyticsEventsTable } = await import("@workspace/db");
    const { gte } = await import("drizzle-orm");

    const rows = await db
      .select()
      .from(analyticsEventsTable)
      .where(gte(analyticsEventsTable.occurredAt, since))
      .limit(MAX_READ_EVENTS);

    return rows.map((row) => ({
      sessionId: row.sessionId,
      type: row.type,
      path: row.path,
      title: row.title ?? undefined,
      referrer: row.referrer ?? undefined,
      label: row.label ?? undefined,
      value: row.value ?? undefined,
      query: row.query ?? undefined,
      viewport: row.viewport ?? undefined,
      isNewSession: row.isNewSession === 1,
      occurredAt: row.occurredAt,
    }));
  }
}

/* ------------------------------------------------------------------ *
 * Selection
 * ------------------------------------------------------------------ */

let store: AnalyticsStore | null = null;

export function getAnalyticsStore(): AnalyticsStore {
  if (store) return store;

  if (process.env["DATABASE_URL"]) {
    logger.info("Analytics: using the Postgres store");
    store = new PostgresAnalyticsStore();
  } else {
    const dir = path.resolve(process.env["ANALYTICS_DATA_DIR"] ?? ".data/analytics");
    logger.info(
      { dir },
      "Analytics: DATABASE_URL is not set, using the local file store. Provision Postgres for durable, shared storage.",
    );
    const fileStore = new FileAnalyticsStore(dir);
    void fileStore.prune().catch(() => undefined);
    store = fileStore;
  }

  return store;
}
