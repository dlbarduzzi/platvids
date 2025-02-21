"use server"

import type { JSX } from "react"

import { Resend } from "resend"
import { EmailVerification } from "@/components/email-verification"

import { env as serverEnv } from "@/env/server"
import { env as clientEnv } from "@/env/client"

import * as errs from "@/features/constants"

const resend = new Resend(serverEnv.RESEND_API_KEY)

type SendEmailResponse =
  | {
      ok: false
      error: typeof errs.ERR_INTERNAL_EXCEPTION
      message: string
    }
  | { ok: true }

type SendEmailParams = {
  from: string
  email: string
  subject: string
  template: JSX.Element
}

export async function sendEmail({
  from,
  email,
  subject,
  template,
}: SendEmailParams): Promise<SendEmailResponse> {
  try {
    const { error } = await resend.emails.send({
      from,
      to: [email],
      subject,
      react: template,
    })

    if (error != null) {
      throw new Error(error.message)
    }

    return { ok: true }
  } catch (error) {
    console.error("ERROR: sendEmail - exception")
    console.error(error)
    return {
      ok: false,
      error: errs.ERR_INTERNAL_EXCEPTION,
      message: "An internal error occurred while sending email.",
    }
  }
}

export async function sendEmailVerification(email: string, token: string) {
  return await sendEmail({
    from: clientEnv.NEXT_PUBLIC_APP_EMAIL_ONBOARDING,
    email,
    subject: "Confirm your email address",
    template: EmailVerification({
      username: email.split("@")[0] ?? email,
      // eslint-disable-next-line max-len
      verificationLink: `${clientEnv.NEXT_PUBLIC_APP_URL}/email-verification?token=${token}`,
    }),
  })
}
