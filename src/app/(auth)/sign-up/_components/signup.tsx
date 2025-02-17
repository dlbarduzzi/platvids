"use client"

import type { SignUpSchema } from "@/features/auth/schemas/signup"

import Link from "next/link"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  ArrowRight,
  Check,
  Circle,
  CircleHelp,
  Eye,
  EyeOff,
  X as IconX,
} from "lucide-react"

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import {
  signUpSchema,
  passwordHasNumber,
  passwordHasSpecialChar,
  passwordHasLowercaseLetter,
  passwordHasUppercaseLetter,
  PASSWORD_MIN_CHARS,
  PASSWORD_MAX_CHARS,
} from "@/features/auth/schemas/signup"

import { cn } from "@/lib/utils"
import { signUp } from "@/features/auth/actions/signup"

export function SignUpForm() {
  const [openPopover, setOpenPopover] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState
  const passwordValue = form.watch("password")

  async function onSubmit(values: SignUpSchema) {
    setOpenPopover(() => false)
    setShowPassword(() => false)
    // TODO: Get response and handle it (error, success, etc...)
    await signUp(values)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <div
                  className={cn(
                    "flex items-center justify-between gap-x-2 pb-2.5 pr-1 pt-1"
                  )}
                >
                  <FormLabel>Password</FormLabel>
                  <Popover open={openPopover} onOpenChange={setOpenPopover}>
                    <PopoverTrigger>
                      <CircleHelp className="size-4 text-gray-500" />
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      side="top"
                      className="w-80"
                      onFocusOutside={e => e.preventDefault()}
                      onPointerDownOutside={e => e.preventDefault()}
                    >
                      <div>
                        <div className="text-sm font-semibold text-black">
                          Password Requirements
                        </div>
                        <div className="pt-1 text-xs text-gray-600">
                          Your password must meet the following criteria:
                        </div>
                        <div className="pt-5">
                          <ul className="space-y-1">
                            <PasswordCheck
                              isValid={passwordHasNumber(passwordValue)}
                              isFormError={!!errors.password}
                              description="Contain a number"
                            />
                            <PasswordCheck
                              isValid={passwordHasLowercaseLetter(passwordValue)}
                              isFormError={!!errors.password}
                              description="Contain lowercase letter"
                            />
                            <PasswordCheck
                              isValid={passwordHasUppercaseLetter(passwordValue)}
                              isFormError={!!errors.password}
                              description="Contain uppercase letter"
                            />
                            <PasswordCheck
                              isValid={passwordHasSpecialChar(passwordValue)}
                              isFormError={!!errors.password}
                              description="Contain a special character"
                            />
                            <PasswordCheck
                              isValid={
                                passwordValue.length >= PASSWORD_MIN_CHARS &&
                                passwordValue.length <= PASSWORD_MAX_CHARS
                              }
                              isFormError={!!errors.password}
                              description={`Between ${PASSWORD_MIN_CHARS} and
                              ${PASSWORD_MAX_CHARS} characters long`}
                            />
                          </ul>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
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
            <span className="flex-1">Create account</span>
            {isSubmitting ? (
              <LoadingSpinner size="xs" />
            ) : (
              <ArrowRight className="size-5" />
            )}
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className={cn(
                "font-medium text-black hover:underline hover:underline-offset-4"
              )}
            >
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

type PasswordCheckProps = {
  isValid: boolean
  isFormError: boolean
  description: string
}

function PasswordCheck({ isValid, isFormError, description }: PasswordCheckProps) {
  return (
    <li
      className={cn(
        "inline-flex items-center gap-x-2 text-sm",
        !isValid && isFormError ? "text-red-500" : "text-black"
      )}
    >
      <span className="flex size-5 items-center justify-center">
        {isValid ? (
          <Check className="size-5 text-green-500" />
        ) : isFormError ? (
          <IconX className="size-5 h-full text-red-500" />
        ) : (
          <Circle className="size-3 h-full fill-gray-300 stroke-none" />
        )}
      </span>
      {description}
    </li>
  )
}
