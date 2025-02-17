import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-100">
      <main className="grid flex-1 items-center">{children}</main>
    </div>
  )
}
