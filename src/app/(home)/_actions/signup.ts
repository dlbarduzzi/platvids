"use server"

import type { SignUpSchema } from "../_schemas/signup"

import { delay } from "@/lib/utils"
import { signUpSchema } from "../_schemas/signup"

export async function signUp(data: SignUpSchema) {
  try {
    await delay(2000)
    const parsed = signUpSchema.safeParse(data)
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
