"use server"

import type { SignUpSchema } from "@/features/auth/schemas/signup"

import bcrypt from "bcryptjs"
import postgres from "postgres"

import { z } from "zod"

import { db } from "@/db/connect"
import { users } from "@/db/schemas/users"
import { passwords } from "@/db/schemas/passwords"

import { signUpSchema } from "@/features/auth/schemas/signup"
import { findUserByEmail } from "@/features/auth/actions/users"

const ERR_DUPLICATE_RECORD = "error/duplicate-record"
const ERR_SCHEMA_VALIDATION = "error/schema-validation"
const ERR_INTERNAL_EXCEPTION = "error/internal-exception"

type FieldErrors = z.inferFlattenedErrors<typeof signUpSchema>

type SignUpResponse =
  | {
      ok: false
      error: typeof ERR_SCHEMA_VALIDATION
      fields: FieldErrors["fieldErrors"]
    }
  | {
      ok: false
      error: typeof ERR_DUPLICATE_RECORD
      message: string
    }
  | {
      ok: false
      error: typeof ERR_INTERNAL_EXCEPTION
      message: string
    }
  | {
      ok: true
      user: { id: string; email: string }
    }

export async function signUp(data: SignUpSchema): Promise<SignUpResponse> {
  // TODO:
  // DONE - 1. parse data and validate fields
  // DONE - 2. check if email already exists
  // DONE - 3. create user with hashed password
  // 4. send email verification
  // DO NOT create database session or cookie session.
  // This will be done only upon email verification.
  try {
    const dataParsed = signUpSchema.safeParse(data)
    if (!dataParsed.success) {
      return {
        ok: false,
        error: ERR_SCHEMA_VALIDATION,
        fields: dataParsed.error.flatten().fieldErrors,
      }
    }

    const user = await findUserByEmail(data.email)
    if (user != null) {
      return {
        ok: false,
        error: ERR_DUPLICATE_RECORD,
        message: "This email is already registered.",
      }
    }

    const userResult = await db.transaction(async tx => {
      const [newUser] = await tx
        .insert(users)
        .values({ email: data.email })
        .returning({ id: users.id, email: users.email })

      if (newUser == null) {
        tx.rollback()
        return
      }

      const passwordHash = await bcrypt.hash(data.password, 12)

      const [newPasswordHash] = await tx
        .insert(passwords)
        .values({ userId: newUser.id, passwordHash })
        .returning({ passwordHash: passwords.passwordHash })

      if (newPasswordHash == null) {
        tx.rollback()
        return
      }

      return newUser
    })

    if (userResult == null) {
      return {
        ok: false,
        error: ERR_INTERNAL_EXCEPTION,
        message: "An internal error occurred while processing your request.",
      }
    }

    return { ok: true, user: userResult }
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      // Only log error message to prevent leaking data.
      console.error(`ERROR: signUp - database - ${error.message}`)
    } else {
      console.error("ERROR: signUp - exception")
      console.error(error)
    }
    return {
      ok: false,
      error: ERR_INTERNAL_EXCEPTION,
      message: "An internal error occurred while processing your request.",
    }
  }
}
