"use server"

import { eq } from "drizzle-orm"

import { db } from "@/db/connect"
import { tokens } from "@/db/schemas/tokens"

import { generateRandomString } from "@/features/auth/lib/utils"

export async function findTokenByEmail(email: string) {
  return await db.query.tokens.findFirst({
    where: eq(tokens.email, email.toLowerCase()),
  })
}

export async function createToken(email: string) {
  const token = await findTokenByEmail(email)
  if (token != null) {
    await db.delete(tokens).where(eq(tokens.id, token.id))
  }

  const expiresAt = new Date(Date.now() + 1000 * 60 * 10)
  const randomString = generateRandomString()

  const [newToken] = await db
    .insert(tokens)
    .values({ email, token: randomString, expiresAt })
    .returning()

  return newToken
}
