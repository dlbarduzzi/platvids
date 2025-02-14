import type { VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const loadingSpinnerVariants = cva("shrink-0 animate-soft-spin rounded-full border-4", {
  variants: {
    variant: {
      default: "border-gray-300 border-t-gray-500",
    },
    size: {
      default: "size-10",
      sm: "size-8",
      xs: "size-6 border-[3px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type LoadingSpinnerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof loadingSpinnerVariants>

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(loadingSpinnerVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

LoadingSpinner.displayName = "LoadingSpinner"

export { LoadingSpinner }
