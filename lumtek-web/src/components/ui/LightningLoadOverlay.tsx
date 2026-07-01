import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  FallingLightning,
  LETTER_STAGGER_S,
  STRIKE_IMPACT_OFFSET_S,
} from './FallingLightning'
import { LUMTEK_MARK_SRC } from '../hero/AppBrandMark'

const ease = [0.22, 1, 0.36, 1] as const
const STRIKE_INTERVAL_MS = 520
const LOGO_ASPECT = 1024 / 658
const LOGO_H = 30
const LOGO_W = Math.round(LOGO_H * LOGO_ASPECT)

const letterIsAccent = (index: number) => index === 1 || index === 4

type LumtekLoadingBrandProps = {
  reduced: boolean
}

const LumtekLoadingBrand = ({ reduced }: LumtekLoadingBrandProps) => {
  const letters = siteContent.brand.split('')
  const [logoStrike, setLogoStrike] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setLogoStrike((k) => k + 1), STRIKE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div className="flex flex-col items-center">
      <span
        className="relative mb-3 inline-block overflow-visible"
        style={{ width: LOGO_W, height: LOGO_H }}
      >
        {!reduced && (
          <span key={logoStrike} className="absolute inset-x-0 -top-1 flex justify-center">
            <FallingLightning delay={0} reduced={false} />
          </span>
        )}
        <motion.img
          src={LUMTEK_MARK_SRC}
          alt=""
          width={LOGO_W}
          height={LOGO_H}
          className="relative z-10 h-full w-full object-contain brightness-0 invert"
          initial={reduced ? false : { opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease }}
          aria-hidden
        />
      </span>

      <span className="inline-flex overflow-visible text-sm font-bold leading-none tracking-[0.18em] text-white">
        {letters.map((letter, index) => {
          const delay = (index + 1) * LETTER_STAGGER_S
          const revealDelay = reduced ? 0 : delay + STRIKE_IMPACT_OFFSET_S
          const isAccent = letterIsAccent(index)

          return (
            <motion.span
              key={`${letter}-${index}`}
              className="relative inline-block overflow-visible px-[1px]"
            >
              {!reduced && <FallingLightning delay={delay} reduced={false} />}
              <motion.span
                className={`relative z-10 inline-block ${
                  isAccent
                    ? 'bg-gradient-to-b from-[#5CD4FF] via-[#00A8FF] to-[#0090DD] bg-clip-text text-transparent'
                    : ''
                }`}
                initial={
                  reduced
                    ? { opacity: 1 }
                    : { opacity: 0, scale: 0.88, color: '#d4f3ff' }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        opacity: { duration: 0.12, delay: revealDelay },
                        scale: { duration: 0.28, delay: revealDelay, ease },
                      }
                }
              >
                {letter}
              </motion.span>
            </motion.span>
          )
        })}
      </span>
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
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(0,168,255,0.14),transparent_62%)]"
            aria-hidden
          />

          <LumtekLoadingBrand reduced={reduced} />

          <motion.p
            className="relative z-10 mt-6 text-3xl font-bold tabular-nums tracking-tight text-white"
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
