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

import { signUpSchema } from "@/features/auth/schemas/signup"

export function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors } = form.formState

  function onSubmit(values: SignUpSchema) {
    console.log(values)
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
                          placeholder="Enter your password..."
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" className="h-11 w-full">
                  <span className="flex-1 text-left">Create Account</span>
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="bg-gray-100 px-8 py-9">
          <div className="space-x-1 text-center text-sm text-black">
            <span>Already have an account?</span>
            <Link
              href="/sign-in"
              className="font-semibold hover:underline hover:underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
