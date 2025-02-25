"use client"

import NextLink from "next/link"
import NextImage from "next/image"

import { useDrawParticles } from "@/hooks/particles"

import { cn } from "@/lib/utils"

export function SignUp() {
  const { canvasRef } = useDrawParticles()

  const isSubmitting = false

  return (
    <div className="flex h-full flex-row justify-center px-4">
      <canvas ref={canvasRef} className="absolute inset-0 size-full bg-white" />
      <div className="z-10 w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-center py-10">
          <NextLink
            href="/"
            className={cn(
              "rounded-full focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-black focus-visible:ring-offset-2",
              isSubmitting && "pointer-events-none"
            )}
          >
            <NextImage
              src="/images/logo.png"
              alt="PlatVids"
              width={500}
              height={500}
              className="h-10 w-auto"
            />
            <span className="sr-only">Link to home page.</span>
          </NextLink>
        </div>
        <div className="w-full max-w-md border border-gray-200 bg-white shadow-xl">
          <div className="px-9 py-10">
            <div>
              <h3 className="text-lg font-extrabold tracking-tight text-black">
                Sign up
              </h3>
              <p className="text-sm text-gray-800">
                Create your account and start exploring.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 px-9 py-6">
            <div
              className={cn(
                "space-x-1 text-center text-sm",
                isSubmitting ? "pointer-events-none text-gray-400" : "text-black"
              )}
            >
              <span>Already have an account?</span>
              <NextLink
                href="/sign-in"
                className={cn(
                  "font-semibold hover:underline hover:underline-offset-4",
                  isSubmitting && "pointer-events-none"
                )}
              >
                Sign in
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
