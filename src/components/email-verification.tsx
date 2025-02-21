import * as React from "react"

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

type EmailVerificationProps = {
  username: string
  verificationLink: string
}

import { cn } from "@/lib/utils"
import { env } from "@/env/client"

export function EmailVerification({
  username,
  verificationLink,
}: EmailVerificationProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="m-auto bg-white px-2 font-sans">
          <Preview>Account Verification</Preview>
          <Container
            className={cn(
              "mx-auto my-[40px] max-w-[465px] rounded border border-solid",
              "border-gray-200 p-[20px]"
            )}
          >
            <Section className="mt-[32px]">
              <Img
                src={`${env.NEXT_PUBLIC_APP_URL}/images/logo.png`}
                width="40"
                height="37"
                alt="PlatVids"
                className="mx-auto my-0"
              />
            </Section>
            <Heading
              className={cn(
                "mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black"
              )}
            >
              Welcome to <strong>PlatVids</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Thank you for joining PlatVids! To activate your account and start
              exploring, please click the verification link below:
            </Text>
            <Section className="my-[32px]">
              <Button
                className={cn(
                  "rounded bg-[#000000] px-5 py-3 text-center text-[14px]",
                  "font-semibold text-white no-underline"
                )}
                href={verificationLink}
              >
                Verify my account
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={verificationLink} className="text-blue-600 no-underline">
                {verificationLink}
              </Link>
            </Text>
            <Hr
              className={cn(
                "mx-0 my-[26px] w-full border border-solid border-[#eaeaea]"
              )}
            />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for{" "}
              <span className="text-black">{username}</span>. If you were not expecting
              this invitation, you can ignore this email. If you are concerned about
              your {"account's"} safety, please reply to this email to get in touch with
              us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
