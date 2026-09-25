import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const profile = pgTable("profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  headline: text("headline").notNull(),
  bio: text("bio"),
  location: varchar("location", { length: 255 }),
  profileImageUrl: text("profile_image_url"),
  resumeUrl: text("resume_url"),
  email: varchar("email", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Profile = InferSelectModel<typeof profile>;
export type NewProfile = InferInsertModel<typeof profile>;
