"use client"

import type { RefObject } from "react"
import type { SignUpSchema } from "@/features/auth/schemas/signup"

import NextLink from "next/link"
import NextImage from "next/image"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useReducer, useState } from "react"
import { Check, Circle, Eye, EyeOff, Info, X as IconX } from "lucide-react"

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

import { signUp } from "@/features/auth/actions/signup"
import { useDrawParticles } from "@/hooks/particles"
import { sendEmailVerification } from "@/features/auth/actions/email"

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

type AccountState = {
  email: string
  token: string
  isReady: boolean
}

const initialAccountState: AccountState = {
  email: "",
  token: "",
  isReady: false,
}

type AccountAction =
  | {
      type: "RESET"
    }
  | {
      type: "SET"
      payload: Partial<AccountState>
    }

function accountReducer(state: AccountState, action: AccountAction): AccountState {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload }
    case "RESET":
      return initialAccountState
    default:
      return state
  }
}

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false)

  const [account, updateAccount] = useReducer(accountReducer, initialAccountState)

  const { canvasRef } = useDrawParticles()

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState
  const inputPassword = form.watch("password")

  async function onSubmit(data: SignUpSchema) {
    setShowPassword(() => false)
    setShowPasswordCriteria(() => false)

    const resp = await signUp(data)

    if (!resp.ok) {
      console.log(resp)
      return
    }

    await sendEmailVerification(resp.email, resp.token)

    updateAccount({
      type: "SET",
      payload: { isReady: true, email: resp.email, token: resp.token },
    })

    form.reset()
  }

  if (account.isReady) {
    return VerifyEmail({ email: account.email, token: account.token, canvasRef })
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
                            <Popover
                              open={showPasswordCriteria}
                              onOpenChange={setShowPasswordCriteria}
                            >
                              <PopoverTrigger
                                className={cn(
                                  "flex items-center gap-x-1 text-sm",
                                  isSubmitting
                                    ? "pointer-events-none text-gray-400"
                                    : "text-gray-600 hover:text-gray-800"
                                )}
                              >
                                Password Criteria
                                <Info className="size-4" />
                              </PopoverTrigger>
                              <PopoverContent
                                side="top"
                                align="end"
                                className="w-80"
                                onFocusOutside={e => e.preventDefault()}
                                onPointerDownOutside={e => e.preventDefault()}
                              >
                                <PasswordCriteria
                                  isError={!!errors.password}
                                  inputPassword={inputPassword}
                                />
                              </PopoverContent>
                            </Popover>
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

type PasswordCriteriaProps = {
  isError: boolean
  inputPassword: string
}

function PasswordCriteria({ isError, inputPassword }: PasswordCriteriaProps) {
  return (
    <div>
      <div className="text-sm font-semibold text-black">Password Requirements</div>
      <div className="pt-1 text-xs text-gray-600">
        Your password must meet the following criteria:
      </div>
      <div className="pt-5">
        <ul className="space-y-1">
          <PasswordCheck
            isValid={passwordHasNumber(inputPassword)}
            isError={isError}
            description="Contain a number"
          />
          <PasswordCheck
            isValid={passwordHasLowercaseLetter(inputPassword)}
            isError={isError}
            description="Contain lowercase letter"
          />
          <PasswordCheck
            isValid={passwordHasUppercaseLetter(inputPassword)}
            isError={isError}
            description="Contain uppercase letter"
          />
          <PasswordCheck
            isValid={passwordHasSpecialChar(inputPassword)}
            isError={isError}
            description="Contain a special character"
          />
          <PasswordCheck
            isValid={
              inputPassword.length >= PASSWORD_MIN_CHARS &&
              inputPassword.length <= PASSWORD_MAX_CHARS
            }
            isError={isError}
            // eslint-disable-next-line max-len
            description={`Between ${PASSWORD_MIN_CHARS} and ${PASSWORD_MAX_CHARS} characters long`}
          />
        </ul>
      </div>
    </div>
  )
}

type PasswordCheckProps = {
  isValid: boolean
  isError: boolean
  description: string
}

function PasswordCheck({ isValid, isError, description }: PasswordCheckProps) {
  return (
    <li
      className={cn(
        "inline-flex items-center gap-x-2 text-sm",
        isValid ? "text-green-600" : isError ? "text-red-500" : "text-black"
      )}
    >
      <span className="flex size-5 items-center justify-center">
        {isValid ? (
          <Check className="size-5 text-green-500" />
        ) : isError ? (
          <IconX className="size-5 h-full text-red-500" />
        ) : (
          <Circle className="size-3 h-full fill-gray-300 stroke-none" />
        )}
      </span>
      {description}
    </li>
  )
}

type VerifyEmailProps = {
  email: string
  token: string
  canvasRef: RefObject<HTMLCanvasElement | null>
}

function VerifyEmail({ email, token, canvasRef }: VerifyEmailProps) {
  return (
    <div className="flex h-full flex-row justify-center px-4">
      <canvas ref={canvasRef} className="absolute inset-0 size-full bg-white" />
      <div className="z-10 w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-center py-10">
          <NextLink
            href="/"
            className={cn(
              "rounded-full focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-black focus-visible:ring-offset-2"
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
                Verify Your Email
              </h3>
              <p className="pt-4 text-sm text-gray-800">
                We&apos;ve sent a verification email to your inbox. Please click the
                link in the email to confirm your account.
              </p>
            </div>
            <div className="pt-6">
              <Button
                type="button"
                size="md"
                className="w-full"
                onClick={() => {
                  console.log(
                    `Sending email to ${email} and token ${token.slice(0, 4)}...`
                  )
                }}
              >
                Resend
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
