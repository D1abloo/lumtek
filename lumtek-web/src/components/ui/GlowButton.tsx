import { type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCursorFill } from '../../hooks/useCursorFill'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type GlowButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  className?: string
  ariaLabel?: string
  cursorFill?: boolean
}

const MotionLink = motion.create(Link)

export const GlowButton = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  ariaLabel,
  cursorFill = true,
}: GlowButtonProps) => {
  const reduced = useReducedMotion()
  const { ref, state, handlers, fillSize } = useCursorFill()

  const base =
    'relative inline-flex min-h-[44px] items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumtek-blue sm:px-6 sm:py-3.5'

  const variants = {
    primary:
      'bg-gradient-to-r from-lumtek-blue to-[#0090dd] text-white shadow-glow hover:shadow-[0_8px_32px_rgba(0,168,255,0.35)]',
    secondary:
      'border border-lumtek-border bg-white text-lumtek-text shadow-soft hover:border-lumtek-blue/40 hover:text-lumtek-blue',
  }

  const classes = `group ${base} ${variants[variant]} ${className}`

  const fillColor =
    variant === 'primary' ? 'bg-white/50' : 'bg-lumtek-blue/18'

  const motionHover = reduced ? {} : { scale: 1.02, y: -1 }
  const motionTap = reduced ? {} : { scale: 0.98 }

  const body = (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className="relative flex h-full w-full items-center justify-center gap-2 overflow-hidden bg-transparent"
      {...(cursorFill ? handlers : {})}
    >
      {cursorFill && (
        <motion.span
          className={`pointer-events-none absolute z-0 rounded-full ${fillColor}`}
          style={{ left: state.x, top: state.y, x: '-50%', y: '-50%' }}
          initial={false}
          animate={{
            width: state.active ? fillSize : 0,
            height: state.active ? fillSize : 0,
            opacity: state.active ? 1 : 0,
          }}
          transition={{
            duration: reduced ? 0.12 : 0.48,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2 bg-transparent">{children}</span>
    </span>
  )

  if (href?.startsWith('/')) {
    return (
      <MotionLink
        to={href}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        whileHover={motionHover}
        whileTap={motionTap}
      >
        {body}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        whileHover={motionHover}
        whileTap={motionTap}
      >
        {body}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      whileHover={motionHover}
      whileTap={motionTap}
    >
      {body}
    </motion.button>
  )
}
