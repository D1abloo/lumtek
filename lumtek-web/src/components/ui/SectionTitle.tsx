import { motion } from 'framer-motion'
import { AnimatedReveal } from './AnimatedReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type SectionTitleProps = {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
}

export const SectionTitle = ({
  eyebrow,
  title,
  description,
  center = false,
}: SectionTitleProps) => {
  const reduced = useReducedMotion()
  const align = center ? 'text-center mx-auto' : ''

  return (
    <AnimatedReveal className={`mb-8 max-w-3xl sm:mb-12 ${align}`}>
      {eyebrow && (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-lumtek-blue sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight text-lumtek-text sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-pretty mt-3 text-sm leading-relaxed text-lumtek-text-secondary sm:mt-4 sm:text-base md:text-lg">
          {description}
        </p>
      )}
      <motion.div
        className={`mt-6 h-px bg-gradient-to-r from-lumtek-blue to-transparent ${center ? 'mx-auto' : ''}`}
        initial={reduced ? { width: '6rem', opacity: 1 } : { width: 0, opacity: 0.6 }}
        whileInView={{ width: '6rem', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </AnimatedReveal>
  )
}
