"use server"

import bcrypt from "bcryptjs"

import { eq } from "drizzle-orm"

import { db } from "@/db/connect"
import { users } from "@/db/schemas/users"
import { passwords } from "@/db/schemas/passwords"

export async function findUserByEmail(email: string) {
  return await db.query.users.findFirst({ where: eq(users.email, email.toLowerCase()) })
}

export async function createUser(email: string, password: string) {
  return await db.transaction(async tx => {
    const [newUser] = await tx
      .insert(users)
      .values({ email })
      .returning({ id: users.id, email: users.email })

    if (newUser == null) {
      tx.rollback()
      return
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const [newPasswordHash] = await tx
      .insert(passwords)
      .values({ userId: newUser.id, passwordHash })
      .returning({ id: passwords.id })

    if (newPasswordHash == null) {
      tx.rollback()
      return
    }

    return newUser
  })
}
