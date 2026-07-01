import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const ease = [0.22, 1, 0.36, 1] as const

type PhoneNavBarProps = {
  canBack: boolean
  canForward: boolean
  theme?: 'light' | 'dark'
  overlay?: boolean
  onBack: () => void
  onForward: () => void
}

export const PhoneNavBar = ({
  canBack,
  canForward,
  theme = 'light',
  overlay = false,
  onBack,
  onForward,
}: PhoneNavBarProps) => {
  const reduced = useReducedMotion()
  const isDark = theme === 'dark'

  const btnClass = overlay
    ? `pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumtek-blue active:scale-95 ${
        isDark
          ? 'border border-white/15 bg-black/45 text-cyan-300 backdrop-blur-md hover:bg-black/60 disabled:border-white/5 disabled:bg-black/25 disabled:text-white/25'
          : 'border border-white/70 bg-white/80 text-lumtek-blue backdrop-blur-md hover:bg-white/95 disabled:border-white/40 disabled:bg-white/50 disabled:text-slate-300'
      }`
    : `flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumtek-blue ${
        isDark
          ? 'text-cyan-300 hover:bg-white/10 active:scale-95 disabled:text-white/20'
          : 'text-lumtek-blue hover:bg-lumtek-blue/10 active:scale-95 disabled:text-slate-300'
      }`

  const wrap = overlay
    ? 'pointer-events-none border-0 bg-transparent backdrop-blur-0'
    : isDark
      ? 'border-white/10 bg-[#0a0f18]/90'
      : 'border-black/5 bg-white/85'

  return (
    <motion.nav
      className={`absolute inset-x-0 bottom-0 z-30 flex items-center justify-between px-3 pb-3 pt-1 ${
        overlay ? wrap : `border-t backdrop-blur-md pb-2.5 pt-2 ${wrap}`
      }`}
      aria-label="Navegación del móvil"
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <button type="button" onClick={onBack} disabled={!canBack} aria-label="Ir atrás" className={btnClass}>
        <ChevronLeft className="h-5 w-5" strokeWidth={2.5} aria-hidden />
      </button>
      <button
        type="button"
        onClick={onForward}
        disabled={!canForward}
        aria-label="Volver a la misma pantalla"
        className={btnClass}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
      </button>
    </motion.nav>
  )
}
