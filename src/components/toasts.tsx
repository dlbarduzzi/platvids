import toast from "react-hot-toast"

import { OctagonX, X as IconX } from "lucide-react"

import { cn } from "@/lib/utils"

type ServerErrorToastProps = {
  id?: string
  message?: string
  duration?: number
}

export function serverErrorToast({
  id,
  message,
  duration = 5000,
}: ServerErrorToastProps) {
  let finalMessage =
    "Something went wrong while processing your request! Please try again."

  if (message && message.trim() !== "") {
    finalMessage = message
  }

  toast.custom(
    t => (
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-sm items-center rounded-md",
          "bg-red-500 py-2.5",
          t.visible ? "animate-enter" : "animate-leave"
        )}
      >
        <div className="flex-1 px-3 text-sm text-white">
          <div className="flex items-center">
            <OctagonX className="size-5" />
            <h3 className="pl-2 font-bold">Error</h3>
          </div>
          <p className="pt-3 font-medium">{finalMessage}</p>
        </div>
        <div className="self-start pr-2">
          <div role="button" className="text-white" onClick={() => toast.dismiss(t.id)}>
            <IconX className="size-4" />
          </div>
        </div>
      </div>
    ),
    {
      id,
      duration,
    }
  )
}
