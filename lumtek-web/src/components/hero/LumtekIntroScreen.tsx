import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { AppBrandMark } from './AppBrandMark'
import { siteContent } from '../../data/siteContent'

const ease = [0.22, 1, 0.36, 1] as const

type LumtekIntroScreenProps = {
  onComplete: () => void
}

export const LumtekIntroScreen = ({ onComplete }: LumtekIntroScreenProps) => {
  const reduced = useReducedMotion()
  const [exiting, setExiting] = useState(false)

  const dismiss = useCallback(() => {
    if (exiting) return
    setExiting(true)
    window.setTimeout(onComplete, reduced ? 0 : 700)
  }, [exiting, onComplete, reduced])

  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(onComplete, 400)
      return () => window.clearTimeout(t)
    }
    const hover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const auto = window.setTimeout(dismiss, hover ? 2000 : 1200)
    return () => window.clearTimeout(auto)
  }, [dismiss, onComplete, reduced])

  return (
    <motion.button
      type="button"
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#060a10] px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumtek-blue"
      onMouseEnter={dismiss}
      onClick={dismiss}
      aria-label="Continuar a Lumtek Control"
      initial={{ opacity: 0 }}
      animate={
        exiting
          ? { opacity: 0, filter: 'blur(6px)', y: -16 }
          : { opacity: 1, filter: 'blur(0px)', y: 0 }
      }
      transition={{ duration: exiting ? 0.7 : 0.5, ease }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,168,255,0.14),transparent_65%)]"
        aria-hidden
      />
      <motion.div
        className="relative z-10 flex max-w-[11.5rem] flex-col items-center text-center"
        initial={reduced ? false : { opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 0.96 : 1, y: exiting ? -10 : 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <AppBrandMark size="lg" centered compact showTagline />
        <p className="mt-3 text-[10px] leading-snug text-slate-400">
          {siteContent.claim}
        </p>
        <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.16em] text-lumtek-cyan/80">
          Toca para continuar
        </p>
      </motion.div>
    </motion.button>
  )
}
