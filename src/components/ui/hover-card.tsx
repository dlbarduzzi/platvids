"use client"

import * as React from "react"
import * as RadixHoverCard from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = RadixHoverCard.Root
const HoverCardTrigger = RadixHoverCard.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof RadixHoverCard.Content>,
  React.ComponentPropsWithoutRef<typeof RadixHoverCard.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <RadixHoverCard.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border border-gray-200 bg-white p-4",
      "text-black shadow-md outline-none",
      "data-[state=open]:animate-in",
      "data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0",
      "data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95",
      "data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))

HoverCardContent.displayName = RadixHoverCard.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
