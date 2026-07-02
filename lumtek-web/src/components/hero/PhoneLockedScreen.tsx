import { type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  FallingLightning,
  LETTER_STAGGER_S,
  STRIKE_IMPACT_OFFSET_S,
} from '../ui/FallingLightning'
import { PhoneBrandLogo } from './PhoneBrandLogo'

const UNLOCK_FADE_S = 2.5
const ease = [0.22, 1, 0.36, 1] as const
const LOCKED_TEXT = 'Bloqueado'

type PhoneLockedScreenProps = {
  unlocking: boolean
  locking?: boolean
  onActivate: () => void
  onHoverUnlock?: () => void
}

type AnimatedLetterProps = {
  letter: string
  index: number
  instant: boolean
}

const AnimatedLetter = ({ letter, index, instant }: AnimatedLetterProps) => {
  const delay = (index + 1) * LETTER_STAGGER_S
  const revealDelay = instant ? 0 : delay + STRIKE_IMPACT_OFFSET_S

  return (
    <motion.span className="relative inline-block overflow-visible px-[1px]">
      <FallingLightning delay={delay} reduced={instant} />
      <motion.span
        className="relative z-10 inline-block"
        initial={
          instant
            ? { opacity: 1, color: '#f1f5f9', textShadow: '0 1px 0 #94a3b8' }
            : {
                opacity: 0,
                color: '#d4f3ff',
                scale: 0.88,
                textShadow: '0 0 16px rgba(0,168,255,0.5)',
              }
        }
        animate={{
          opacity: 1,
          color: '#f1f5f9',
          scale: 1,
          textShadow: instant
            ? '0 1px 0 #94a3b8'
            : [
                '0 0 18px rgba(0,168,255,0.55)',
                '0 0 14px rgba(0,168,255,0.42), 0 1px 0 #94a3b8',
                '0 1px 0 #94a3b8',
              ],
        }}
        transition={
          instant
            ? { duration: 0 }
            : {
                opacity: { duration: 0.12, delay: revealDelay },
                color: { duration: 0.35, delay: revealDelay },
                scale: { duration: 0.28, delay: revealDelay, ease },
                textShadow: {
                  duration: 0.55,
                  delay: revealDelay,
                  ease,
                  times: [0, 0.35, 1],
                },
              }
        }
      >
        {letter}
      </motion.span>
    </motion.span>
  )
}

type AnimatedBrandLogoProps = {
  instant: boolean
}

const AnimatedBrandLogo = ({ instant }: AnimatedBrandLogoProps) => {
  const delay = 0
  const revealDelay = instant ? 0 : delay + STRIKE_IMPACT_OFFSET_S

  return (
    <motion.span className="relative inline-flex shrink-0 items-center justify-center overflow-visible leading-none">
      <span
        className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(0,168,255,0.28),rgba(34,211,238,0.12)_45%,transparent_72%)] blur-md"
        aria-hidden
      />
      <FallingLightning delay={delay} reduced={instant} />
      <motion.span
        className="relative z-10"
        initial={
          instant
            ? { opacity: 1, scale: 1, filter: 'brightness(1.38) contrast(1.16) saturate(1.12)' }
            : {
                opacity: 0,
                scale: 0.84,
                filter: 'brightness(1.45) contrast(1.18) saturate(1.15) drop-shadow(0 0 30px rgba(0,168,255,0.9))',
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
          filter: instant
            ? 'brightness(1.38) contrast(1.16) saturate(1.12)'
            : [
                'brightness(1.5) contrast(1.2) saturate(1.15) drop-shadow(0 0 34px rgba(0,210,255,0.95))',
                'brightness(1.42) contrast(1.17) saturate(1.13) drop-shadow(0 0 24px rgba(0,168,255,0.75))',
                'brightness(1.38) contrast(1.16) saturate(1.12) drop-shadow(0 0 18px rgba(0,168,255,0.55))',
              ],
        }}
        transition={
          instant
            ? { duration: 0 }
            : {
                opacity: { duration: 0.12, delay: revealDelay },
                scale: { duration: 0.34, delay: revealDelay, ease },
                filter: { duration: 0.6, delay: revealDelay, ease, times: [0, 0.35, 1] },
              }
        }
      >
        <PhoneBrandLogo size="xl" bright />
      </motion.span>
    </motion.span>
  )
}

type LockRevealProps = {
  revealKey: number
  unlocking: boolean
}

const LockReveal = ({ revealKey, unlocking }: LockRevealProps) => {
  const reduced = useReducedMotion()
  const instant = reduced
  const letters = LOCKED_TEXT.split('')

  return (
    <motion.div
      key={revealKey}
      className="relative z-20 flex flex-col items-center"
      animate={
        unlocking && !reduced
          ? {
              opacity: [1, 1, 0.45, 0],
              filter: [
                'brightness(1) blur(0px)',
                'brightness(1.85) blur(0px)',
                'brightness(1.25) blur(0.5px)',
                'brightness(1) blur(2px)',
              ],
            }
          : { opacity: 1, filter: 'brightness(1) blur(0px)' }
      }
      transition={{ duration: UNLOCK_FADE_S, ease: [0.35, 0, 0.2, 1] }}
    >
      {unlocking && !reduced && (
        <motion.span
          className="pointer-events-none absolute inset-y-[-8px] left-[-20%] z-30 w-[55%] bg-gradient-to-r from-transparent via-white/70 to-transparent"
          initial={{ x: '-120%' }}
          animate={{ x: '280%' }}
          transition={{ duration: 1.15, delay: 0.12, ease }}
          aria-hidden
        />
      )}

      <AnimatedBrandLogo instant={instant} />

      <span
        className="mt-5 inline-flex overflow-visible text-sm font-semibold leading-none tracking-wide"
        aria-hidden
      >
        {letters.map((letter, index) => (
          <AnimatedLetter key={`${letter}-${index}`} letter={letter} index={index} instant={instant} />
        ))}
      </span>
    </motion.div>
  )
}

export const PhoneLockedScreen = ({
  unlocking,
  locking = false,
  onActivate,
  onHoverUnlock,
}: PhoneLockedScreenProps) => {
  const reduced = useReducedMotion()
  const [revealKey, setRevealKey] = useState(1)
  const wasLocking = useRef(locking)

  useEffect(() => {
    if (wasLocking.current && !locking && !unlocking) {
      setRevealKey((k) => k + 1)
    }
    wasLocking.current = locking
  }, [locking, unlocking])

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onActivate()
    }
  }

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden bg-black px-3"
      initial={reduced || !locking ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={
        reduced
          ? undefined
          : {
              opacity: 0,
              scale: 1.03,
              filter: 'blur(12px)',
            }
      }
      transition={locking ? { duration: 0.85, ease } : { duration: 0.55, ease }}
      onPointerEnter={() => onHoverUnlock?.()}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(0,168,255,0.22),transparent_58%)]"
        aria-hidden
      />

      {locking && !reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0.92] }}
          transition={{ duration: 0.85, ease }}
          aria-hidden
        />
      )}

      {unlocking && !reduced && (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.3, 0] }}
            transition={{ duration: UNLOCK_FADE_S, ease: 'easeOut' }}
            aria-hidden
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,168,255,0.5),transparent_62%)]" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-0 z-40 w-[50%] bg-gradient-to-r from-transparent via-cyan-100/35 to-transparent blur-[1px]"
            initial={{ x: '-140%' }}
            animate={{ x: '320%' }}
            transition={{ duration: UNLOCK_FADE_S * 0.7, ease }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[55%] bg-gradient-to-t from-lumtek-blue/20 via-lumtek-cyan/8 to-transparent"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: [0, 0.85, 0], y: ['100%', '0%', '-15%'] }}
            transition={{ duration: UNLOCK_FADE_S, ease }}
            aria-hidden
          />
        </>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onActivate()
        }}
        onKeyDown={handleKeyDown}
        aria-label="Desbloquear Lumtek Control"
        aria-pressed={unlocking}
        className="group relative z-20 flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lumtek-blue"
      >
        <motion.span
          className={`absolute -inset-12 rounded-full blur-3xl ${unlocking ? 'bg-lumtek-blue/35' : 'bg-lumtek-blue/10'}`}
          animate={
            reduced
              ? {}
              : unlocking
                ? { opacity: 1, scale: 1.3 }
                : locking
                  ? { opacity: [0, 0.5, 0.85], scale: [1.2, 1.05, 1] }
                  : { opacity: [0.65, 0.95, 0.65], scale: [1, 1.06, 1] }
          }
          transition={
            unlocking
              ? { duration: UNLOCK_FADE_S, ease: 'easeOut' }
              : locking
                ? { duration: 0.85, ease }
                : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
          }
          aria-hidden
        />

        <LockReveal revealKey={revealKey} unlocking={unlocking} />
      </button>
    </motion.div>
  )
}
