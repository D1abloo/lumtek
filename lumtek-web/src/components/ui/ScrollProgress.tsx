import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])

  if (reduced) return null

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-0.5 bg-lumtek-blue/80 shadow-[0_0_8px_rgba(0,168,255,0.6)] transition-[width] duration-150"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura"
    />
  )
}
