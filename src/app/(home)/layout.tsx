import type { ReactNode } from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grid flex-1">{children}</main>
      <Footer />
    </div>
  )
}
