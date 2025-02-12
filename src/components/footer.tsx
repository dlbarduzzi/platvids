import { Container } from "@/components/container"

import { siteConfig } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-t-gray-200 bg-white">
      <Container className="py-5">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
