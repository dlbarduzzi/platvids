"use client"

import Link from "next/link"
import Image from "next/image"

import { useReducer } from "react"

import { Button } from "@/components/ui/button"
import { useDrawParticles } from "@/hooks/particles"

import { cn } from "@/lib/utils"

type State = {
  pageStep: "signup" | "verify-email"
  userEmail: string
  userToken: string
  resendingEmail: boolean
}

const initialState: State = {
  pageStep: "signup",
  userEmail: "",
  userToken: "",
  resendingEmail: false,
}

type ResetState = {
  type: "RESET"
}

type UpdateState = {
  type: "UPDATE"
  payload: Partial<State>
}

type Action = ResetState | UpdateState

function stateReducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload }
    case "RESET":
      return initialState
    default:
      return state
  }
}

export function SignUpForm() {
  const [state, updateState] = useReducer(stateReducer, initialState)

  const { canvasRef } = useDrawParticles()

  const isSubmitting = false

  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-start p-5 sm:justify-center"
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full bg-black" />
      <div
        className={cn("z-10 w-full max-w-sm overflow-hidden rounded-xl", "bg-white")}
      >
        {state.pageStep === "verify-email" ? (
          <div className="bg-white px-5 pb-6 pt-5 sm:px-8 sm:pt-6">
            <div className="flex items-center justify-start sm:justify-center">
              <Link
                href="/"
                className={cn(
                  "rounded-full focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-black focus-visible:ring-offset-2",
                  isSubmitting && "pointer-events-none"
                )}
              >
                <Image
                  src="/images/logo.png"
                  alt="PlatVids"
                  width={500}
                  height={500}
                  className="h-10 w-auto"
                />
                <span className="sr-only">Link to home page.</span>
              </Link>
            </div>
            <div className="pt-6 sm:text-center">
              <h3 className="font-bold tracking-tight text-black">Verify Your Email</h3>
              <p className="pt-2 text-sm text-black">
                We&apos;ve sent you an email to your inbox. Please click the link in the
                email to confirm your account.
              </p>
            </div>
            <div className="pt-6 sm:pt-8">
              <Button
                type="button"
                className="h-11 w-full"
                onClick={() =>
                  updateState({ type: "UPDATE", payload: { pageStep: "signup" } })
                }
              >
                Switch to Sign up
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white px-5 pb-8 pt-5 sm:px-8 sm:pt-6">
            <div className="flex items-center justify-start sm:justify-center">
              <Link
                href="/"
                className={cn(
                  "rounded-full focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-black focus-visible:ring-offset-2",
                  isSubmitting && "pointer-events-none"
                )}
              >
                <Image
                  src="/images/logo.png"
                  alt="PlatVids"
                  width={500}
                  height={500}
                  className="h-10 w-auto"
                />
                <span className="sr-only">Link to home page.</span>
              </Link>
            </div>
            <div className="pt-6 sm:text-center">
              <h3 className="font-bold tracking-tight text-black">
                Welcome to PlatVids
              </h3>
              <p className="text-sm text-gray-500">
                Create your account to get started.
              </p>
            </div>
            <div className="pt-6 sm:pt-8">
              <Button
                type="button"
                className="h-11 w-full"
                onClick={() =>
                  updateState({ type: "UPDATE", payload: { pageStep: "verify-email" } })
                }
              >
                Switch to Email
              </Button>
            </div>
          </div>
        )}
        {state.pageStep === "signup" ? (
          <div className="bg-gray-50 p-5 sm:p-6">
            <div
              className={cn(
                "space-x-1 text-center text-sm",
                isSubmitting ? "pointer-events-none text-gray-400" : "text-black"
              )}
            >
              <span>Already have an account?</span>
              <Link
                href="/sign-in"
                className={cn(
                  "font-semibold hover:underline hover:underline-offset-4",
                  isSubmitting && "pointer-events-none"
                )}
              >
                Sign in
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
