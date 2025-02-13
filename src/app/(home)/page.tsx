import { Container } from "@/components/container"

import { SignInForm } from "./_components/signin"
import { SignUpForm } from "./_components/signup"

import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="platvids-homepage-header">
        <h1 id="platvids-homepage-header" className="sr-only">
          PlatVids Homepage.
        </h1>
      </section>
      <Container className="py-8">
        <div className="py-10">
          <AuthForms />
        </div>
      </Container>
    </div>
  )
}

function AuthForms() {
  return (
    <section className="rounded-none border border-gray-200 bg-white">
      <div className="px-11 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="pb-10 pr-11 lg:pb-0">
            <h3 className="font-medium">Sign in</h3>
            <SignInForm />
          </div>
          <div
            className={cn(
              "border-t border-t-gray-200 pl-11 pt-10 lg:border-l lg:border-t-0",
              "lg:border-l-gray-200 lg:pt-0"
            )}
          >
            <h3 className="font-medium">Sign up</h3>
            <SignUpForm />
          </div>
        </div>
      </div>
    </section>
  )
}
