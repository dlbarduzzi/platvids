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
        <p>Welcome!</p>
      </Container>
    </div>
  )
}
