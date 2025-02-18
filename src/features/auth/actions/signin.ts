"use server"

import type { SignInSchema } from "@/features/auth/schemas/signin"

export async function signIn(data: SignInSchema) {
  // TODO:
  // 1. parse data and validate fields
  // 2. find user by email
  // 3. get user's password
  // 4. check user data password and db password
  // 5. check if user email is verified
  // 6. create database session
  // 7. create cookie session
  console.log(data)
}
