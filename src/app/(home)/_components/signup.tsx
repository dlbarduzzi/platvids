"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, CircleHelp } from "lucide-react"

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
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

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
                  <CircleHelp className="size-4 text-gray-500" />
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
            <Button type="button" onClick={() => form.reset()}>
              Reset form
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
