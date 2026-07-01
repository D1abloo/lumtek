import { AnimatedReveal } from './AnimatedReveal'

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
  const align = center ? 'text-center mx-auto' : ''

  return (
    <AnimatedReveal className={`mb-8 max-w-3xl sm:mb-12 ${align}`}>
      {eyebrow && (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-lumtek-blue sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold leading-tight tracking-tight text-lumtek-text sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-lumtek-text-secondary sm:mt-4 sm:text-base md:text-lg">
          {description}
        </p>
      )}
      <div
        className={`mt-6 h-px w-24 bg-gradient-to-r from-lumtek-blue to-transparent ${center ? 'mx-auto' : ''}`}
        aria-hidden
      />
    </AnimatedReveal>
  )
}
