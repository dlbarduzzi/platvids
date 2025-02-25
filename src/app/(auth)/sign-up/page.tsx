import type { Metadata } from "next"

import { SignUp } from "@/components/signup"

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up for a new account.",
}

export default function Page() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <section aria-labelledby="signup-header">
        <h1 id="signup-header" className="sr-only">
          Sign Up Page.
        </h1>
      </section>
      <SignUp />
    </div>
  )
}
