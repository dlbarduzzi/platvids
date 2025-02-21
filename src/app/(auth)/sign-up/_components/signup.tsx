"use client"

import type { SignUpSchema } from "@/features/auth/schemas/signup"

import Link from "next/link"
import Image from "next/image"

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { delay } from "@/lib/utils"
import { signUp } from "@/features/auth/actions/signup"

import {
  signUpSchema,
  passwordHasNumber,
  passwordHasSpecialChar,
  passwordHasLowercaseLetter,
  passwordHasUppercaseLetter,
  PASSWORD_MIN_CHARS,
  PASSWORD_MAX_CHARS,
} from "@/features/auth/schemas/signup"

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordHelper, setShowPasswordHelper] = useState(false)

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
    setShowPassword(() => false)
    setShowPasswordHelper(() => false)
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
                alt="PlatVids logo"
                width={500}
                height={500}
                className="size-11"
              />
              <span className="sr-only">Link to home page.</span>
            </Link>
          </div>
          <div className="text-center">
            <h3 className="font-bold tracking-tight text-black">Welcome to PlatVids</h3>
            <p className="text-sm text-gray-500">Create your account to get started.</p>
          </div>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-y-8 pt-2"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="mt-1">
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
                    <div className="relative">
                      <FormLabel>Password</FormLabel>
                      <div className="absolute inset-y-0 right-1 flex items-center">
                        <Popover
                          open={showPasswordHelper}
                          onOpenChange={setShowPasswordHelper}
                        >
                          <PopoverTrigger
                            disabled={isSubmitting}
                            className={cn(
                              "rounded-full focus:outline-none",
                              "focus:ring-1 focus:ring-black",
                              isSubmitting
                                ? "pointer-events-none text-gray-400"
                                : "text-gray-500"
                            )}
                          >
                            <CircleHelp className="size-4" />
                          </PopoverTrigger>
                          <PopoverContent
                            side="top"
                            align="end"
                            className="w-80"
                            onFocusOutside={e => e.preventDefault()}
                            onPointerDownOutside={e => e.preventDefault()}
                          >
                            <PasswordHelper
                              isFormError={!!errors.password}
                              passwordValue={passwordValue}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="relative mt-1">
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

type PasswordHelperProps = {
  isFormError: boolean
  passwordValue: string
}

function PasswordHelper({ isFormError, passwordValue }: PasswordHelperProps) {
  return (
    <div>
      <div className="text-sm font-semibold text-black">Password Requirements</div>
      <div className="pt-1 text-xs text-gray-600">
        Your password must meet the following criteria:
      </div>
      <div className="pt-5">
        <ul className="space-y-1">
          <PasswordCheck
            isValid={passwordHasNumber(passwordValue)}
            isFormError={isFormError}
            description="Contain a number"
          />
          <PasswordCheck
            isValid={passwordHasLowercaseLetter(passwordValue)}
            isFormError={isFormError}
            description="Contain lowercase letter"
          />
          <PasswordCheck
            isValid={passwordHasUppercaseLetter(passwordValue)}
            isFormError={isFormError}
            description="Contain uppercase letter"
          />
          <PasswordCheck
            isValid={passwordHasSpecialChar(passwordValue)}
            isFormError={isFormError}
            description="Contain a special character"
          />
          <PasswordCheck
            isValid={
              passwordValue.length >= PASSWORD_MIN_CHARS &&
              passwordValue.length <= PASSWORD_MAX_CHARS
            }
            isFormError={isFormError}
            description={`Between ${PASSWORD_MIN_CHARS} and
                              ${PASSWORD_MAX_CHARS} characters long`}
          />
        </ul>
      </div>
    </div>
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
        !isValid && isFormError ? "text-red-500" : "text-black",
        isValid && "text-green-600"
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
