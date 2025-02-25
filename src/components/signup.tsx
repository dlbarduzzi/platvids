"use client"

import type { SignUpSchema } from "@/features/auth/schemas/signup"

import NextLink from "next/link"
import NextImage from "next/image"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Info } from "lucide-react"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useDrawParticles } from "@/hooks/particles"
import { signUpSchema } from "@/features/auth/schemas/signup"

import { cn } from "@/lib/utils"

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  const { canvasRef } = useDrawParticles()

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  async function onSubmit(data: SignUpSchema) {
    console.log(data)
  }

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
        <div className="w-full max-w-md border border-gray-200 bg-white shadow-lg">
          <div className="px-9 py-10">
            <div>
              <h3 className="text-lg font-extrabold tracking-tight text-black">
                Sign up
              </h3>
              <p className="text-sm text-gray-800">
                Create your account and start exploring.
              </p>
            </div>
            <div className="pt-6">
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 gap-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="mt-0.5">
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              variant={!!errors.email ? "danger" : "default"}
                              disabled={isSubmitting}
                              placeholder="brian.smith@email.com"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormLabel>Password</FormLabel>
                          <div className="absolute inset-y-0 right-1 flex items-center">
                            <span
                              role="button"
                              className={cn(
                                "flex items-center gap-x-1 text-sm text-gray-600",
                                "hover:text-gray-800",
                                isSubmitting && "pointer-events-none"
                              )}
                            >
                              Password Criteria
                              <Info className="size-4" />
                            </span>
                          </div>
                        </div>
                        <div className="relative mt-0.5">
                          <FormControl>
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              variant={!!errors.password ? "danger" : "default"}
                              disabled={isSubmitting}
                              placeholder="Enter your password..."
                              className="pr-12"
                            />
                          </FormControl>
                          <div
                            className={cn(
                              "absolute inset-y-0 right-0 flex items-center pr-3"
                            )}
                          >
                            <div
                              role="button"
                              onClick={() => setShowPassword(() => !showPassword)}
                              className={cn(
                                isSubmitting
                                  ? "pointer-events-none text-gray-300"
                                  : "text-gray-400"
                              )}
                            >
                              {showPassword ? (
                                <Eye className="size-6" />
                              ) : (
                                <EyeOff className="size-6" />
                              )}
                            </div>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Button
                      type="submit"
                      size="md"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </FormProvider>
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
        <div
          className={cn(
            "mt-9 bg-white text-center text-xs",
            isSubmitting ? "text-gray-400" : "text-gray-700"
          )}
        >
          <span className="block">By signing up, you agree to our</span>
          <span className="block pt-1">
            <NextLink
              href="/general/terms-of-service"
              className={cn(
                "font-semibold hover:underline hover:underline-offset-4",
                isSubmitting ? "pointer-events-none text-gray-400" : "text-black"
              )}
            >
              Terms of Service
            </NextLink>
            {" and "}
            <NextLink
              href="/general/privacy-policy"
              className={cn(
                "font-semibold hover:underline hover:underline-offset-4",
                isSubmitting ? "pointer-events-none text-gray-400" : "text-black"
              )}
            >
              Privacy Policy
            </NextLink>
            .
          </span>
        </div>
      </div>
    </div>
  )
}
