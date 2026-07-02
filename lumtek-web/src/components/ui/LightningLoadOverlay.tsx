import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { PhoneBrandLogo } from '../hero/PhoneBrandLogo'
import { FallingLightning } from './FallingLightning'

const ease = [0.22, 1, 0.36, 1] as const
const STRIKE_INTERVAL_MS = 520

type LumtekLoadingBrandProps = {
  reduced: boolean
}

const LumtekLoadingBrand = ({ reduced }: LumtekLoadingBrandProps) => {
  const [logoStrike, setLogoStrike] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setLogoStrike((k) => k + 1), STRIKE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div className="relative flex flex-col items-center">
      <span
        className="pointer-events-none absolute -inset-20 rounded-full bg-[radial-gradient(circle,rgba(0,168,255,0.45),rgba(34,211,238,0.2)_38%,transparent_68%)] blur-xl"
        aria-hidden
      />
      {!reduced && (
        <span key={logoStrike} className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
          <FallingLightning delay={0} reduced={false} />
        </span>
      )}
      <motion.div
        className="relative z-10"
        initial={reduced ? false : { opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease }}
      >
        <PhoneBrandLogo size="3xl" loading />
      </motion.div>
    </div>
  )
}

type LightningLoadOverlayProps = {
  progress: number
  visible: boolean
}

export const LightningLoadOverlay = ({ progress, visible }: LightningLoadOverlayProps) => {
  const reduced = useReducedMotion()

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center overflow-hidden bg-[#060a10] px-5"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.4, ease }}
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label={`Lumtek cargando: ${progress} por ciento`}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_34%,rgba(0,168,255,0.36),transparent_58%)]"
            aria-hidden
          />

          <LumtekLoadingBrand reduced={reduced} />

          <motion.p
            className="relative z-10 mt-4 text-3xl font-bold tabular-nums tracking-tight text-white"
            key={progress}
            initial={reduced ? false : { opacity: 0.75, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease }}
          >
            <span className="bg-gradient-to-b from-white via-[#d4f8ff] to-lumtek-blue bg-clip-text text-transparent [text-shadow:0_0_24px_rgba(0,168,255,0.35)]">
              {progress}
            </span>
            <span className="ml-0.5 text-xl font-semibold text-lumtek-cyan">%</span>
          </motion.p>

          <div className="relative z-10 mt-4 h-1 w-[min(100%,9rem)] overflow-hidden rounded-full bg-slate-800/90 ring-1 ring-white/5">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-lumtek-blue via-lumtek-cyan to-[#9ff8ff] shadow-[0_0_12px_rgba(0,168,255,0.65)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.28, ease }}
              aria-hidden
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
