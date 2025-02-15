import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
  boolean,
} from "drizzle-orm/pg-core"

import { lower } from "@/db/utils"

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    avatarUrl: text("avatar_url").notNull().default("placeholder"),
    isEmailVerified: boolean("is_email_verified").notNull().default(false),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { mode: "date", withTimezone: true }),
  },
  table => [uniqueIndex("email_index").on(lower(table.email))]
)
