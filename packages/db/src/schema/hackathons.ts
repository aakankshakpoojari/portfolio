import { pgTable, uuid, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const hackathons = pgTable("hackathons", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  event: varchar("event", { length: 255 }),
  projectName: varchar("project_name", { length: 255 }),
  description: text("description"),
  result: varchar("result", { length: 255 }),
  date: varchar("date", { length: 50 }),
  url: text("url"),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Hackathon = InferSelectModel<typeof hackathons>;
export type NewHackathon = InferInsertModel<typeof hackathons>;
