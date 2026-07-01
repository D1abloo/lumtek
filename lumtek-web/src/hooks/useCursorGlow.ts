import { useCallback, useEffect, useRef, useState } from 'react'

type GlowPos = { x: number; y: number }

export const useCursorGlow = (enabled = true) => {
  const ref = useRef<HTMLElement>(null)
  const [pos, setPos] = useState<GlowPos>({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setPos({ x, y })
    },
    [enabled],
  )

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const onEnter = () => setActive(true)
    const onLeave = () => setActive(false)

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, handleMove])

  const glowStyle = active
    ? {
        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(0,168,255,0.15) 0%, transparent 55%)`,
      }
    : undefined

  return { ref, glowStyle, active }
}
