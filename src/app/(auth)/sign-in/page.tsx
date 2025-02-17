import { Logo } from "@/components/logo"
import { SignInForm } from "./_components/signin"

import { cn } from "@/lib/utils"
import { env } from "@/env/client"

export default function Page() {
  return (
    <div className="space-y-8">
      <section aria-labelledby="platvids-signin-header">
        <h1 id="platvids-signin-header" className="sr-only">
          PlatVids Sign In Page.
        </h1>
      </section>
      <div
        className={cn(
          "mx-auto max-w-md rounded-lg border-2 border-red-500 bg-white px-10 py-4"
        )}
      >
        <div className="text-sm font-semibold text-black">Something went wrong.</div>
        <div className="pt-2 text-sm text-black">
          Please try again and contact the support team at{" "}
          {env.NEXT_PUBLIC_APP_EMAIL_SUPPORT} if issue persists.
        </div>
      </div>
      <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-10">
        <div className="grid grid-cols-1 gap-y-8">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          <div className="text-center font-bold text-black">Sign in to PlatVids</div>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
