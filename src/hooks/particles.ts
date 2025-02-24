import { useEffect, useRef } from "react"

export function useDrawParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particleCount = 100

    function drawParticles() {
      if (!context) return
      context.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height

        const size = Math.random() * 2 + 0.1

        context.fillStyle = "rgba(255, 255, 255, 0.5)"
        context.beginPath()

        context.arc(x, y, size, 0, Math.PI * 2)
        context.fill()
      }
    }

    drawParticles()

    function handleResize() {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
      drawParticles()
    }

    const controller = new AbortController()
    window.addEventListener("resize", handleResize, { signal: controller.signal })

    return () => {
      controller.abort()
    }
  }, [])

  return { canvasRef }
}
