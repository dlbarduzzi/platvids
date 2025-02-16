import { SignUpForm } from "./_components/signup"

export default function Page() {
  return (
    <div className="bg-white">
      <section aria-labelledby="platvids-signup-header">
        <h1 id="platvids-signup-header" className="sr-only">
          PlatVids Sign Up Page.
        </h1>
      </section>
      <div className="px-11 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="pb-10 pr-11 lg:pb-0">
            <h3 className="font-medium">Sign up</h3>
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  )
}
