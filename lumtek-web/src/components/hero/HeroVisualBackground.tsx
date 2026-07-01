import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const HeroVisualBackground = () => {
  const reduced = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbff] via-white to-white" />
      <div className="absolute left-1/2 top-0 h-64 w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-lumtek-blue/[0.05] blur-3xl" />
      <div className="absolute -right-24 top-16 h-48 w-48 rounded-full bg-lumtek-cyan/[0.04] blur-3xl" />

      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 1200 500">
        <defs>
          <linearGradient id="hero-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A8FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00A8FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 180 Q400 140 800 170 T1200 150"
          fill="none"
          stroke="url(#hero-line)"
          strokeWidth="1"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 2, ease: 'easeInOut' }}
        />
        <circle cx="160" cy="120" r="2.5" fill="#00A8FF" fillOpacity="0.25" />
        <circle cx="1040" cy="160" r="2" fill="#22D3EE" fillOpacity="0.3" />
      </svg>
    </div>
  )
}
