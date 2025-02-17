import { Logo } from "@/components/logo"
import { SignInForm } from "./_components/signin"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="platvids-signin-header">
        <h1 id="platvids-signin-header" className="sr-only">
          PlatVids Sign In Page.
        </h1>
      </section>
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
