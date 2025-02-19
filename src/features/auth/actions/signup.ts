"use server"

import type { SignUpSchema } from "@/features/auth/schemas/signup"

import { z } from "zod"

import { signUpSchema } from "@/features/auth/schemas/signup"
import { findUserByEmail } from "@/features/auth/actions/users"

const ERR_DUPLICATE_RECORD = "error/duplicate-record"
const ERR_SCHEMA_VALIDATION = "error/schema-validation"

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
  | { ok: true }

export async function signUp(data: SignUpSchema): Promise<SignUpResponse> {
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

  // TODO:
  // DONE - 1. parse data and validate fields
  // DONE - 2. check if email already exists
  // 3. create user with hashed password
  // 4. send email verification
  // DO NOT create database session or cookie session.
  // This will be done only upon email verification.

  return { ok: true }
}
