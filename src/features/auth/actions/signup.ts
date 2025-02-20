"use server"

import type { SignUpSchema } from "@/features/auth/schemas/signup"

import postgres from "postgres"

import { z } from "zod"

import { createToken } from "@/features/auth/actions/tokens"
import { signUpSchema } from "@/features/auth/schemas/signup"
import { createUser, findUserByEmail } from "@/features/auth/actions/users"

const ERR_DUPLICATE_RECORD = "error/duplicate-record"
const ERR_UNDEFINED_RECORD = "error/undefined-record"
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
      error:
        | typeof ERR_DUPLICATE_RECORD
        | typeof ERR_UNDEFINED_RECORD
        | typeof ERR_INTERNAL_EXCEPTION
      message: string
    }
  | {
      ok: true
      email: string
      token: string
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

    const newUser = await createUser(data.email, data.password)
    if (newUser == null) {
      return {
        ok: false,
        error: ERR_UNDEFINED_RECORD,
        message: "Request failed to create new user.",
      }
    }

    const newToken = await createToken(data.email)
    if (newToken == null) {
      return {
        ok: false,
        error: ERR_UNDEFINED_RECORD,
        message: "Request failed to create new token.",
      }
    }

    return { ok: true, email: newUser.email, token: newToken.token }
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
