import type { ReactNode, CSSProperties } from 'react'
import { useCursorGlow } from '../../hooks/useCursorGlow'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type CursorGlowProps = {
  children: ReactNode
  className?: string
}

export const CursorGlow = ({ children, className = '' }: CursorGlowProps) => {
  const reduced = useReducedMotion()
  const { ref, glowStyle } = useCursorGlow(!reduced)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${className}`}
      style={glowStyle as CSSProperties}
    >
      {children}
    </div>
  )
}
