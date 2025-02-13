"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { ArrowRight } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"

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

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, { message: "Password is required" }),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignInForm() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  function onSubmit(values: SignInSchema) {
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
                <div className="pb-1.5">
                  <FormLabel>Password</FormLabel>
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
            <span className="flex-1">Continue</span>
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
