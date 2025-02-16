"use client"

import type { SignInSchema } from "@/features/auth/schemas/signin"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Eye, EyeOff } from "lucide-react"

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
import { LoadingSpinner } from "@/components/loading-spinner"

import { cn } from "@/lib/utils"

import { signIn } from "@/features/auth/actions/signin"
import { signInSchema } from "@/features/auth/schemas/signin"

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  async function onSubmit(values: SignInSchema) {
    setShowPassword(() => false)
    // TODO: Get response and handle it (error, success, etc...)
    await signIn(values)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
        <div className="grid grid-cols-1 gap-y-8">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="pb-1.5">
                  <FormLabel>Email</FormLabel>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="jane.smith@email.com"
                    variant={!!errors.email ? "danger" : "default"}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="pb-1.5">
                  <FormLabel>Password</FormLabel>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      // eslint-disable-next-line max-len
                      className="pr-12 placeholder:text-[11px] placeholder:text-gray-300"
                      placeholder="● ● ● ● ● ● ● ●"
                      variant={!!errors.password ? "danger" : "default"}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <div
                      role="button"
                      onClick={() => setShowPassword(() => !showPassword)}
                      className={cn(isSubmitting && "pointer-events-none")}
                    >
                      {showPassword ? (
                        <Eye className="size-6 text-gray-400" />
                      ) : (
                        <EyeOff className="size-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="h-12 text-left">
            <span className="flex-1">Continue</span>
            {isSubmitting ? (
              <LoadingSpinner size="xs" />
            ) : (
              <ArrowRight className="size-5" />
            )}
          </Button>
          <div>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setShowPassword(() => false)
                form.reset()
              }}
            >
              Reset form
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
