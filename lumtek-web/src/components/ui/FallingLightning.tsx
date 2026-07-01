import { motion } from 'framer-motion'

export const STRIKE_EASE = [0.55, 0, 0.85, 0.45] as const
export const STRIKE_EASE_SOFT = [0.22, 1, 0.36, 1] as const
export const LETTER_STAGGER_S = 0.18
export const STRIKE_DURATION_S = 0.42
export const STRIKE_IMPACT_OFFSET_S = 0.2

type FallingLightningProps = {
  delay: number
  reduced: boolean
}

/** Rayo azul que cae desde arriba e ilumina el elemento al impactar */
export const FallingLightning = ({ delay, reduced }: FallingLightningProps) => {
  if (reduced) return null

  return (
    <>
      <motion.span
        className="pointer-events-none absolute left-1/2 top-[-34px] z-20 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-[#9ff8ff] to-[#00a8ff] shadow-[0_0_14px_#00d4ff]"
        aria-hidden
        initial={{ height: 0, opacity: 0, y: 0 }}
        animate={{
          height: [0, 28, 36],
          opacity: [0, 1, 0],
          y: [0, 14, 22],
        }}
        transition={{ duration: STRIKE_DURATION_S, delay, ease: STRIKE_EASE }}
      />

      <motion.svg
        className="pointer-events-none absolute left-1/2 top-[-38px] z-20 h-10 w-5 -translate-x-1/2 text-[#d4fbff]"
        viewBox="0 0 20 36"
        fill="none"
        aria-hidden
        initial={{ y: -32, opacity: 0, scale: 0.7 }}
        animate={{
          y: [-32, 0, 6],
          opacity: [0, 1, 0],
          scale: [0.7, 1.05, 0.85],
        }}
        transition={{ duration: STRIKE_DURATION_S, delay, ease: STRIKE_EASE }}
      >
        <path
          d="M11 0 6 14h4L7 36l13-20h-5l6-16z"
          fill="currentColor"
          stroke="#e8feff"
          strokeWidth="0.5"
          style={{ filter: 'drop-shadow(0 0 8px rgba(0,210,255,1))' }}
        />
      </motion.svg>

      <motion.span
        className="pointer-events-none absolute inset-[-3px] z-0 rounded-sm"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.35, 0] }}
        transition={{
          duration: 0.45,
          delay: delay + STRIKE_IMPACT_OFFSET_S,
          ease: STRIKE_EASE_SOFT,
        }}
        style={{
          boxShadow:
            '0 0 24px rgba(0,210,255,0.9), 0 0 40px rgba(125,243,255,0.45), inset 0 0 14px rgba(125,243,255,0.35)',
        }}
      />
    </>
  )
}
