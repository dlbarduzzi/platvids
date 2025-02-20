import { z } from "zod"

export const PASSWORD_MIN_CHARS = 8
export const PASSWORD_MAX_CHARS = 72

export function passwordHasNumber(value: string) {
  return /[0-9]/.test(value)
}

export function passwordHasSpecialChar(value: string) {
  return /[!?@#$&^*_\-=+]/.test(value)
}

export function passwordHasLowercaseLetter(value: string) {
  return /[a-z]/.test(value)
}

export function passwordHasUppercaseLetter(value: string) {
  return /[A-Z]/.test(value)
}

export const signUpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Not a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(PASSWORD_MIN_CHARS, {
        message: `Password must be at least ${PASSWORD_MIN_CHARS} characters long`,
      })
      .max(PASSWORD_MAX_CHARS, {
        message: `Password must be at most ${PASSWORD_MAX_CHARS} characters long`,
      }),
  })
  .superRefine((input, ctx) => {
    if (!passwordHasNumber(input.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain at least 1 number",
      })
    }
    if (!passwordHasLowercaseLetter(input.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain at least 1 lowercase character",
      })
    }
    if (!passwordHasUppercaseLetter(input.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain at least 1 uppercase character",
      })
    }
    if (!passwordHasSpecialChar(input.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain at least 1 special character",
      })
    }
  })

export type SignUpSchema = z.infer<typeof signUpSchema>
