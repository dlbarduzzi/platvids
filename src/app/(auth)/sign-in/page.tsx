import type { Metadata } from "next"

import { SignInForm } from "./_components/signin"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account.",
}

export default function Page() {
  return (
    <div className="bg-white">
      <section aria-labelledby="signin-header">
        <h1 id="signin-header" className="sr-only">
          Sign In Page.
        </h1>
      </section>
      <SignInForm />
    </div>
  )
}
