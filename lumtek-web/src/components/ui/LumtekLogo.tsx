import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { scrollToTop } from '../../utils/scroll'
import {
  FallingLightning,
  LETTER_STAGGER_S,
  STRIKE_IMPACT_OFFSET_S,
} from './FallingLightning'

import { LUMTEK_MARK_SRC } from '../hero/AppBrandMark'

const LOGO_MARK_SRC = LUMTEK_MARK_SRC
const ASPECT = 1024 / 658
const FRAME_PATH = 'M 512 26 L 992 329 L 512 632 L 32 329 Z'

/** Wordmark: tinta fría + acento marca Lumtek en U y E */
const WORDMARK = {
  ink: '#1E293B',
  accent: '#00A8FF',
  accentDeep: '#0090DD',
  strike: '#D4F3FF',
} as const

const letterIsAccent = (index: number) => index === 1 || index === 4

const letterShadow = (index: number, struck = false) => {
  if (letterIsAccent(index)) {
    if (struck) {
      return '0 0 14px rgba(0,168,255,0.5), 0 2px 10px rgba(0,168,255,0.22), 0 1px 0 rgba(0,144,221,0.4)'
    }
    return '0 1px 0 rgba(0,144,221,0.45), 0 2px 8px rgba(0,168,255,0.12)'
  }
  if (struck) {
    return '0 0 14px rgba(0,168,255,0.42), 0 1px 0 #94a3b8, 0 2px 0 #64748b'
  }
  return '0 1px 0 #cbd5e1'
}

const ease = [0.22, 1, 0.36, 1] as const

const sizeMap = {
  sm: 36,
  md: 48,
  lg: 64,
} as const

const wordmarkClass = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
} as const

const logoHeightMap = {
  sm: 24,
  md: 30,
  lg: 40,
} as const

type AccentLetterProps = {
  letter: string
  reduced: boolean
  revealDelay: number
}

const AccentLetter = ({ letter, reduced, revealDelay }: AccentLetterProps) => (
  <motion.span
    className="relative z-10 inline-block bg-gradient-to-b from-[#5CD4FF] via-[#00A8FF] to-[#0090DD] bg-clip-text text-transparent"
    initial={
      reduced
        ? { opacity: 1, filter: 'drop-shadow(0 1px 0 rgba(0,144,221,0.35))' }
        : { opacity: 0, scale: 0.88, filter: 'drop-shadow(0 0 12px rgba(0,168,255,0.55))' }
    }
    animate={{
      opacity: 1,
      scale: 1,
      filter: reduced
        ? 'drop-shadow(0 1px 0 rgba(0,144,221,0.35))'
        : [
            'drop-shadow(0 0 16px rgba(0,168,255,0.65))',
            'drop-shadow(0 0 12px rgba(0,168,255,0.45))',
            'drop-shadow(0 1px 0 rgba(0,144,221,0.35))',
          ],
    }}
    transition={
      reduced
        ? { duration: 0 }
        : {
            opacity: { duration: 0.12, delay: revealDelay },
            scale: { duration: 0.28, delay: revealDelay, ease },
            filter: { duration: 0.55, delay: revealDelay, ease, times: [0, 0.35, 1] },
          }
    }
  >
    {letter}
  </motion.span>
)

type AnimatedLogoMarkProps = {
  size: keyof typeof sizeMap
  instant: boolean
}

const AnimatedLogoMark = ({ size, instant }: AnimatedLogoMarkProps) => {
  const reduced = useReducedMotion()
  const h = logoHeightMap[size]
  const w = Math.round(h * ASPECT)
  const delay = 0
  const revealDelay = instant ? 0 : delay + STRIKE_IMPACT_OFFSET_S

  return (
    <motion.span
      className="relative inline-block shrink-0 overflow-visible"
      style={{ width: w, height: h }}
    >
      <FallingLightning delay={delay} reduced={instant} />
      <motion.span
        className="relative z-10 block h-full w-full"
        initial={
          instant
            ? { opacity: 1, scale: 1, filter: 'none' }
            : { opacity: 0, scale: 0.82, filter: 'brightness(1.7) drop-shadow(0 0 14px rgba(0,168,255,0.65))' }
        }
        animate={{
          opacity: 1,
          scale: 1,
          filter: instant
            ? 'none'
            : [
                'brightness(1.5) drop-shadow(0 0 18px rgba(0,210,255,0.85))',
                'brightness(1.08) drop-shadow(0 0 10px rgba(0,168,255,0.45))',
                'none',
              ],
        }}
        transition={
          instant
            ? { duration: 0 }
            : {
                opacity: { duration: 0.12, delay: revealDelay },
                scale: { duration: 0.32, delay: revealDelay, ease },
                filter: { duration: 0.55, delay: revealDelay, ease, times: [0, 0.35, 1] },
              }
        }
      >
        <img
          src={LOGO_MARK_SRC}
          alt=""
          width={w}
          height={h}
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
          aria-hidden
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-lumtek-blue"
          viewBox="0 0 1024 658"
          fill="none"
          aria-hidden
        >
          <motion.path
            d={FRAME_PATH}
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={reduced || instant ? { pathLength: 1, opacity: 0.35 } : { pathLength: 0, opacity: 0.2 }}
            animate={
              reduced || instant
                ? { pathLength: 1, opacity: 0.35 }
                : { pathLength: 1, opacity: [0.25, 0.5, 0.3], strokeDashoffset: [0, -80] }
            }
            transition={
              reduced || instant
                ? { duration: 0 }
                : {
                    pathLength: { duration: 1.6, delay: revealDelay + 0.1, ease: 'easeInOut' },
                    opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: revealDelay + 0.5 },
                    strokeDashoffset: { duration: 6, repeat: Infinity, ease: 'linear', delay: revealDelay + 0.5 },
                  }
            }
            style={{ strokeDasharray: '14 12' }}
          />
        </svg>
      </motion.span>
    </motion.span>
  )
}

type LumtekLogoProps = {
  size?: keyof typeof sizeMap
  variant?: 'image' | 'wordmark'
  asLink?: boolean
  showTagline?: boolean
  showMark?: boolean
  staticWordmark?: boolean
  className?: string
  onHomeClick?: () => void
}

const ColoredWordmark = ({
  size,
  className = '',
  staticWordmark = false,
  showMark = true,
}: {
  size: keyof typeof sizeMap
  className?: string
  staticWordmark?: boolean
  showMark?: boolean
}) => {
  const reduced = useReducedMotion()
  const instant = reduced || staticWordmark
  const letters = siteContent.brand.split('')

  return (
    <span
      className={`inline-flex items-center gap-2 overflow-visible font-bold leading-none tracking-[0.04em] ${wordmarkClass[size]} ${className}`}
      aria-hidden
    >
      {showMark && <AnimatedLogoMark size={size} instant={instant} />}
      {letters.map((letter, index) => {
        const delay = (index + 1) * LETTER_STAGGER_S
        const revealDelay = instant ? 0 : delay + STRIKE_IMPACT_OFFSET_S
        const restShadow = letterShadow(index)
        const struckShadow = letterShadow(index, true)
        const isAccent = letterIsAccent(index)

        return (
          <motion.span
            key={`${letter}-${index}`}
            className="relative inline-block overflow-visible px-[2px]"
          >
            <FallingLightning delay={delay} reduced={instant} />
            {isAccent ? (
              <AccentLetter letter={letter} reduced={instant} revealDelay={revealDelay} />
            ) : (
              <motion.span
                className="relative z-10 inline-block"
                initial={
                  instant
                    ? { opacity: 1, color: WORDMARK.ink, textShadow: restShadow }
                    : {
                        opacity: 0,
                        color: WORDMARK.strike,
                        scale: 0.88,
                        textShadow: '0 0 16px rgba(0,168,255,0.5)',
                      }
                }
                animate={{
                  opacity: 1,
                  color: WORDMARK.ink,
                  scale: 1,
                  textShadow: instant
                    ? restShadow
                    : [
                        '0 0 18px rgba(0,168,255,0.55)',
                        struckShadow,
                        restShadow,
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
            )}
          </motion.span>
        )
      })}
    </span>
  )
}

const LogoMark = ({
  size,
  variant,
  showTagline,
  showMark = true,
  staticWordmark,
  className = '',
}: {
  size: keyof typeof sizeMap
  variant: 'image' | 'wordmark'
  showTagline?: boolean
  showMark?: boolean
  staticWordmark?: boolean
  className?: string
}) => {
  const reduceMotion = useReducedMotion()

  if (variant === 'wordmark') {
    return (
      <div className="flex items-center overflow-visible">
        <ColoredWordmark
          size={size}
          staticWordmark={staticWordmark}
          showMark={showMark}
          className={className}
        />
      </div>
    )
  }

  const height = sizeMap[size]
  const width = Math.round(height * ASPECT)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative shrink-0" style={{ width, height }}>
        <img
          src={LOGO_MARK_SRC}
          alt=""
          width={width}
          height={height}
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
          aria-hidden
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-lumtek-blue"
          viewBox="0 0 1024 658"
          fill="none"
          aria-hidden
        >
          <motion.path
            d={FRAME_PATH}
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={reduceMotion ? { pathLength: 1, opacity: 0.35 } : { pathLength: 0, opacity: 0.25 }}
            animate={
              reduceMotion
                ? { pathLength: 1, opacity: 0.35 }
                : { pathLength: 1, opacity: [0.3, 0.55, 0.3], strokeDashoffset: [0, -80] }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    pathLength: { duration: 2, ease: 'easeInOut' },
                    opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    strokeDashoffset: { duration: 6, repeat: Infinity, ease: 'linear' },
                  }
            }
            style={{ strokeDasharray: '14 12' }}
          />
        </svg>
      </div>
      {showTagline && (
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-lg font-bold leading-none tracking-tight text-lumtek-text lg:text-2xl">
            {siteContent.brand}
          </p>
          <p className="mt-1 truncate text-[9px] font-medium uppercase tracking-[0.14em] text-lumtek-text-secondary sm:text-[10px] sm:tracking-[0.18em]">
            {siteContent.tagline}
          </p>
        </div>
      )}
    </div>
  )
}

export const LumtekLogo = ({
  size = 'sm',
  variant = 'image',
  asLink = false,
  showTagline = false,
  showMark = true,
  staticWordmark = false,
  className = '',
  onHomeClick,
}: LumtekLogoProps) => {
  const location = useLocation()
  const content = (
    <LogoMark
      size={size}
      variant={variant}
      showTagline={showTagline}
      showMark={showMark}
      staticWordmark={staticWordmark}
      className={className}
    />
  )

  const handleLogoClick = () => {
    onHomeClick?.()
    if (location.pathname === '/') scrollToTop()
  }

  if (asLink) {
    return (
      <Link
        to="/"
        onClick={handleLogoClick}
        className="inline-flex shrink-0 overflow-visible transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lumtek-blue"
        aria-label="Lumtek, ir al inicio"
        title="Lumtek inicio"
      >
        {content}
      </Link>
    )
  }

  return content
}
