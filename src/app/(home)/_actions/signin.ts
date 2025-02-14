"use server"

import type { SignInSchema } from "../_schemas/signin"

import { delay } from "@/lib/utils"
import { signInSchema } from "../_schemas/signin"

export async function signIn(data: SignInSchema) {
  try {
    await delay(2000)
    const parsed = signInSchema.safeParse(data)
    if (!parsed.success) {
      console.error(JSON.stringify(parsed.error.flatten().fieldErrors))
      return
    }
    console.log("SUCCESS -", data)
  } catch (error) {
    console.error("ERROR -", error)
    return
  }
}
