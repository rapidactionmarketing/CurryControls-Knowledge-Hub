import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

/**
 * Messages sent through the contact page.
 *
 * Unlike the analytics table this holds personal data, because a message is
 * personal data by nature: the sender typed their own name and email address
 * so that they could be replied to. Nothing is added to what they typed. No
 * IP address and no user agent are recorded.
 *
 * `status` tracks the notification email: `new` when stored, `emailed` once
 * the owner has been notified, `email_failed` when the notification could
 * not be sent (the message is still here, which is the point of storing it).
 */
export const contactMessagesTable = pgTable(
  "contact_messages",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    company: text("company"),
    email: text("email").notNull(),
    phone: text("phone"),
    subject: text("subject"),
    topic: text("topic"),
    message: text("message").notNull(),
    /** Site path the form was submitted from, e.g. /contact. */
    pagePath: text("page_path"),
    status: text("status").notNull().default("new"),
    emailError: text("email_error"),
    emailedAt: timestamp("emailed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("contact_messages_created_at_idx").on(table.createdAt),
    index("contact_messages_status_idx").on(table.status),
  ],
);

export const insertContactMessageSchema = createInsertSchema(contactMessagesTable).omit({
  id: true,
  status: true,
  emailError: true,
  emailedAt: true,
  createdAt: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessageRow = typeof contactMessagesTable.$inferSelect;
