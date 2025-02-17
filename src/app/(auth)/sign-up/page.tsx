import { Logo } from "@/components/logo"
import { SignUpForm } from "./_components/signup"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="platvids-signup-header">
        <h1 id="platvids-signup-header" className="sr-only">
          PlatVids Sign Up Page.
        </h1>
      </section>
      <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-10">
        <div className="grid grid-cols-1 gap-y-8">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          <div className="text-center font-bold text-black">
            Create your PlatVids account
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
