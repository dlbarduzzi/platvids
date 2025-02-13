import type { VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const inputVariants = cva(
  `flex h-11 w-full items-center rounded-md border-0 bg-white px-3 py-2 text-sm
  text-black ring-1 ring-inset placeholder:text-gray-400 focus:outline-none
  focus:ring-2 focus:ring-inset disabled:cursor-not-allowed disabled:bg-gray-50
  disabled:text-gray-400 disabled:ring-gray-200`,
  {
    variants: {
      variant: {
        default: "ring-gray-300 focus:ring-blue-500",
        danger: "ring-red-500 focus:ring-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type InputProps = React.ComponentProps<"input"> & VariantProps<typeof inputVariants>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
