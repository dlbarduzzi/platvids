"use client"

import type { SignUpSchema } from "@/features/auth/schemas/signup"

import Link from "next/link"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ArrowRight } from "lucide-react"

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

import { cn } from "@/lib/utils"
import { delay } from "@/lib/utils"
import { signUp } from "@/features/auth/actions/signup"
import { signUpSchema } from "@/features/auth/schemas/signup"

export function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  async function onSubmit(values: SignUpSchema) {
    if (1 > 2) {
      const resp = await signUp(values)
      console.log(resp)
    } else {
      await delay(2000)
      console.log("Submitted!")
    }
  }

  return (
    <div className="p-5">
      <div className="max-w-sm border border-gray-200">
        <div className="space-y-9 bg-white px-8 py-9">
          <h3 className="font-bold tracking-tight text-black">Sign up</h3>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-y-8"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="pt-1">
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          variant={!!errors.email ? "danger" : "default"}
                          disabled={isSubmitting}
                          placeholder="jane.smith@email.com"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="pt-1">
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          variant={!!errors.password ? "danger" : "default"}
                          disabled={isSubmitting}
                          placeholder="Enter your password..."
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
                  <span className="flex-1 text-left">Create Account</span>
                  <ArrowRight className="size-5" />
                </Button>
              </div>
              <div
                className={cn(
                  "text-center text-xs",
                  isSubmitting ? "text-gray-400" : "text-gray-700"
                )}
              >
                <span className="block">By signing up, you agree to our</span>
                <span className="block pt-1">
                  <Link
                    href="/general/terms-of-service"
                    className={cn(
                      "font-semibold hover:underline hover:underline-offset-4",
                      isSubmitting ? "pointer-events-none text-gray-400" : "text-black"
                    )}
                  >
                    Terms of Service
                  </Link>
                  {" and "}
                  <Link
                    href="/general/privacy-policy"
                    className={cn(
                      "font-semibold hover:underline hover:underline-offset-4",
                      isSubmitting ? "pointer-events-none text-gray-400" : "text-black"
                    )}
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="bg-gray-100 px-8 py-9">
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
      </div>
    </div>
  )
}
