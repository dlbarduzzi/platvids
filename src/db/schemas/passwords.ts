import { pgTable, uuid, text } from "drizzle-orm/pg-core"

import { users } from "./users"

export const passwords = pgTable("passwords", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  passwordHash: text("password_hash").notNull(),
})
