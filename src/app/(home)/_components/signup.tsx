"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Check, Circle, CircleHelp, X as IconX } from "lucide-react"

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

const PASSWORD_MIN_CHARS = 8
const PASSWORD_MAX_CHARS = 72

function passwordHasNumber(value: string) {
  return /[0-9]/.test(value)
}

function passwordHasSpecialChar(value: string) {
  return /[!?@#$&^*_\-=+]/.test(value)
}

function passwordHasLowercaseLetter(value: string) {
  return /[a-z]/.test(value)
}

function passwordHasUppercaseLetter(value: string) {
  return /[A-Z]/.test(value)
}

const signUpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Not a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(PASSWORD_MIN_CHARS, {
        message: `Password must be at least ${PASSWORD_MIN_CHARS} characters long`,
      })
      .max(PASSWORD_MAX_CHARS, {
        message: `Password must be at most ${PASSWORD_MAX_CHARS} characters long`,
      }),
  })
  .superRefine((input, ctx) => {
    const passwordCheck = { isValid: true, message: "" }
    if (passwordCheck.isValid && !passwordHasNumber(input.password)) {
      passwordCheck.isValid = false
      passwordCheck.message = "Password must contain at least 1 number"
    }
    if (passwordCheck.isValid && !passwordHasLowercaseLetter(input.password)) {
      passwordCheck.isValid = false
      passwordCheck.message = "Password must contain at least 1 lowercase character"
    }
    if (passwordCheck.isValid && !passwordHasUppercaseLetter(input.password)) {
      passwordCheck.isValid = false
      passwordCheck.message = "Password must contain at least 1 uppercase character"
    }
    if (passwordCheck.isValid && !passwordHasSpecialChar(input.password)) {
      passwordCheck.isValid = false
      passwordCheck.message = "Password must contain at least 1 special character"
    }
    if (!passwordCheck.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: passwordCheck.message,
      })
    }
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUpForm() {
  const [openPopover, setOpenPopover] = useState(false)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState
  const passwordValue = form.watch("password")

  function onSubmit(values: SignUpSchema) {
    console.log(values)
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
                <div className="flex items-center justify-between gap-x-2 pb-1.5 pr-1">
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
                              isValid={passwordValue.length >= PASSWORD_MIN_CHARS}
                              isFormError={!!errors.password}
                              description="At least 8 characters long"
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
                              isValid={passwordHasNumber(passwordValue)}
                              isFormError={!!errors.password}
                              description="Contain a number"
                            />
                            <PasswordCheck
                              isValid={passwordHasSpecialChar(passwordValue)}
                              isFormError={!!errors.password}
                              description="Contain a special character"
                            />
                          </ul>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="placeholder:text-xs placeholder:text-gray-300"
                    placeholder="● ● ● ● ● ● ● ●"
                    variant={!!errors.password ? "danger" : "default"}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-12 text-left">
            <span className="flex-1">Create an account</span>
            <ArrowRight className="size-5" />
          </Button>
          <div>
            <Button
              type="button"
              onClick={() => {
                setOpenPopover(() => false)
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
