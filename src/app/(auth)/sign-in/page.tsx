import { SignInForm } from "./_components/signin"

export default function Page() {
  return (
    <div className="bg-white">
      <section aria-labelledby="platvids-signin-header">
        <h1 id="platvids-signin-header" className="sr-only">
          PlatVids Sign In Page.
        </h1>
      </section>
      <div className="px-11 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="pb-10 pr-11 lg:pb-0">
            <h3 className="font-medium">Sign in</h3>
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  )
}
