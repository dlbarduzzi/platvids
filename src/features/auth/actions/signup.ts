"use server"

import type { SignUpSchema } from "../schemas/signup"

import bcrypt from "bcryptjs"
import postgres from "postgres"

import { db } from "@/db/connect"
import { users } from "@/db/schemas/users"
import { passwords } from "@/db/schemas/passwords"

import { signUpSchema } from "../schemas/signup"

// TODO: NOT READY. THIS IS JUST A SAMPLE
export async function signUp(data: SignUpSchema) {
  try {
    const parsed = signUpSchema.safeParse(data)
    if (!parsed.success) {
      console.error("ERROR -", JSON.stringify(parsed.error.flatten().fieldErrors))
      return
    }

    // TODO: Check if email already exists...

    await db.transaction(async tx => {
      const [user] = await tx
        .insert(users)
        .values({ email: parsed.data.email })
        .returning({ id: users.id })

      if (user == null) {
        tx.rollback()
        return
      }

      const passwordHash = await bcrypt.hash(parsed.data.password, 12)

      const [password] = await tx
        .insert(passwords)
        .values({ userId: user.id, passwordHash })
        .returning({ userId: passwords.userId })

      if (password == null) {
        tx.rollback()
        return
      }

      console.log("User created successfully!")
    })
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      console.error("ERROR - database - signin")
      console.error(error.message)
    }
    console.error("ERROR - exception - signin")
    console.error(error)
  }
}
