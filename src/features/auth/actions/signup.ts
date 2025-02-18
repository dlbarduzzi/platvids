"use server"

import type { SignUpSchema } from "../schemas/signup"

export async function signUp(data: SignUpSchema) {
  // TODO:
  // 1. parse data and validate fields
  // 2. check if email already exists
  // 3. create user with hashed password
  // 4. send email verification
  // DO NOT create database session or cookie session.
  // This will be done only upon email verification.
  console.log(data)
}
