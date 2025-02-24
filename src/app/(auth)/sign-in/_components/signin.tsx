"use client"

import Link from "next/link"
import Image from "next/image"

import { useDrawParticles } from "@/hooks/particles"

import { cn } from "@/lib/utils"

export function SignInForm() {
  const { canvasRef } = useDrawParticles()
  const isSubmitting = false

  return (
    <div className="flex h-full flex-col items-center justify-center p-5">
      <canvas ref={canvasRef} className="absolute inset-0 size-full bg-black" />
      <div
        className={cn("z-10 w-full max-w-sm overflow-hidden rounded-xl", "bg-white")}
      >
        <div className="bg-white px-8 pb-8 pt-6">
          <div className="flex items-center justify-center">
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
          <div className="pt-6 text-center">
            <h3 className="font-bold tracking-tight text-black">Welcome back!</h3>
            <p className="text-sm text-gray-500">Sign in and start exploring.</p>
          </div>
        </div>
        <div className="bg-gray-50 p-6">
          <div
            className={cn(
              "space-x-1 text-center text-sm",
              isSubmitting ? "pointer-events-none text-gray-400" : "text-black"
            )}
          >
            <span>Don&apos;t have an account?</span>
            <Link
              href="/sign-up"
              className={cn(
                "font-semibold hover:underline hover:underline-offset-4",
                isSubmitting && "pointer-events-none"
              )}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
