"use server"

import { eq } from "drizzle-orm"

import { db } from "@/db/connect"
import { users } from "@/db/schemas/users"

export async function findUserByEmail(email: string) {
  return await db.query.users.findFirst({ where: eq(users.email, email.toLowerCase()) })
}
