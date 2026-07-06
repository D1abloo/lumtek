import { motion } from 'framer-motion'
import { benefits } from '../../data/useCases'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getIcon } from '../../utils/icons'
import { AnimatedReveal } from '../ui/AnimatedReveal'

export const BenefitsStrip = () => {
  const reduced = useReducedMotion()

  return (
    <section className="border-y border-lumtek-border bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl section-x">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, i) => {
            const Icon = getIcon(item.icon)
            return (
              <AnimatedReveal key={item.title} delay={i * 0.06}>
                <motion.article
                  className="card-shine group flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-lumtek-surface"
                  whileHover={reduced ? {} : { y: -3 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lumtek-blue/8 text-lumtek-blue ring-1 ring-lumtek-blue/15 transition-all group-hover:bg-lumtek-blue/12 group-hover:shadow-glow">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-lumtek-text">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-lumtek-text-secondary">{item.description}</p>
                  </div>
                </motion.article>
              </AnimatedReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
