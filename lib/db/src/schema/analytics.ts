import { index, integer, pgTable, real, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

/**
 * First-party site analytics.
 *
 * Deliberately holds no personal data. There is no user id, no IP address, and
 * no cookie. `sessionId` is a random value the browser keeps in sessionStorage
 * for one session only, which is enough to count sessions without being able
 * to recognise anyone across visits.
 */
export const analyticsEventsTable = pgTable(
  "analytics_events",
  {
    id: serial("id").primaryKey(),
    /** Random per-session value from the browser. Not stable across sessions. */
    sessionId: text("session_id").notNull(),
    /** pageview, phone_click, search, outbound_click, scroll_depth, web_vital, ... */
    type: text("type").notNull(),
    /** Site path the event happened on. */
    path: text("path").notNull(),
    title: text("title"),
    /** Referring origin only. The query string is stripped in the browser. */
    referrer: text("referrer"),
    /** Placement for a phone click, destination host for an outbound click,
     *  metric name for a web vital. */
    label: text("label"),
    /** Result count, scroll percentage, or vital value. */
    value: real("value"),
    /** Search text, for search events only. */
    query: text("query"),
    /** Coarse bucket: mobile, tablet, or desktop. */
    viewport: text("viewport"),
    /** First event of a session, used to count sessions cheaply. */
    isNewSession: integer("is_new_session").notNull().default(0),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("analytics_events_occurred_at_idx").on(table.occurredAt),
    index("analytics_events_type_idx").on(table.type),
    index("analytics_events_path_idx").on(table.path),
  ],
);

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEventsTable).omit({
  id: true,
});

export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEventRow = typeof analyticsEventsTable.$inferSelect;
