"use client"

import { useDrawParticles } from "@/hooks/particles"

export function CanvasBackground() {
  const { canvasRef } = useDrawParticles()
  return <canvas ref={canvasRef} className="absolute inset-0 size-full bg-white" />
}
