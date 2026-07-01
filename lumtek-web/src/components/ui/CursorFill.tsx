import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCursorFill } from '../../hooks/useCursorFill'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type FillVariant = 'nav' | 'primary' | 'icon'

type CursorFillProps = {
  children: ReactNode
  className?: string
  contentClassName?: string
  variant?: FillVariant
  to?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  ariaLabel?: string
  ariaExpanded?: boolean
  ariaControls?: string
}

const fillClass: Record<FillVariant, string> = {
  nav: 'bg-lumtek-blue/30',
  primary: 'bg-white/45',
  icon: 'bg-lumtek-blue/25',
}

export const CursorFill = ({
  children,
  className = '',
  contentClassName = '',
  variant = 'nav',
  to,
  onClick,
  type = 'button',
  ariaLabel,
  ariaExpanded,
  ariaControls,
}: CursorFillProps) => {
  const reduced = useReducedMotion()
  const { ref, state, handlers, fillSize } = useCursorFill()

  const shell = `group relative inline-flex overflow-hidden ${className}`

  const fill = (
    <motion.span
      className={`pointer-events-none absolute z-0 rounded-full ${fillClass[variant]}`}
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
  )

  const content = (
    <span className={`relative z-10 ${contentClassName}`}>{children}</span>
  )

  if (to) {
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        to={to}
        onClick={onClick}
        className={shell}
        {...handlers}
      >
        {fill}
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={shell}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      {...handlers}
    >
      {fill}
      {content}
    </button>
  )
}
