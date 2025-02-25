import type { Metadata } from "next"

import { SignIn } from "@/components/signin"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account.",
}

export default function Page() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <section aria-labelledby="signin-header">
        <h1 id="signin-header" className="sr-only">
          Sign In Page.
        </h1>
      </section>
      <SignIn />
    </div>
  )
}
