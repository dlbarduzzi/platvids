import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="platvids-homepage-header">
        <h1 id="platvids-homepage-header" className="sr-only">
          PlatVids Homepage.
        </h1>
      </section>
      <Container className="py-8">
        <div className="space-x-4">
          <Button asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}
