"use server"

import type { UserSchema } from "@/db/schemas/users"

import { eq } from "drizzle-orm"

import { db } from "@/db/connect"
import { users } from "@/db/schemas/users"
import { runTransaction } from "@/db/utils"

export async function findUserByEmail(email: string) {
  return await runTransaction<UserSchema | undefined>(
    async tx => {
      return await tx.query.users.findFirst({ where: eq(users.email, email) })
    },
    { signal: AbortSignal.timeout(20000), database: db }
  )
}
