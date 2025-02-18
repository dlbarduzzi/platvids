"use client"

import Link from "next/link"

export function SignInForm() {
  return (
    <div className="p-5">
      <div className="max-w-sm border border-gray-200">
        <div className="bg-white px-8 py-9">
          <h3 className="font-bold tracking-tight text-black">Sign in</h3>
        </div>
        <div className="bg-gray-100 px-8 py-9">
          <div className="space-x-1 text-center text-sm text-black">
            <span>Need an account?</span>
            <Link
              href="/sign-up"
              className="font-semibold hover:underline hover:underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
