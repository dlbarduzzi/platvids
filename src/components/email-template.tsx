import * as React from "react"

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import { Logo } from "./logo"

type EmailTemplateProps = {
  confirmEmailLink: string
}

export function EmailTemplate({ confirmEmailLink }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>PlatVids email verification</Preview>
        <Container style={container}>
          <Logo />
          <Section>
            <Text style={text}>Welcome to PlatVids!</Text>
            <Text style={text}>
              Please verify your email address by clicking on the button below.
            </Text>
            <Button style={button} href={confirmEmailLink}>
              Confirm Email
            </Button>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email to
              anyone.
            </Text>
            <Text style={text}>Have a great day!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
}

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
}

const text = {
  fontSize: "16px",
  fontFamily:
    // eslint-disable-next-line max-len
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
}

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
}
