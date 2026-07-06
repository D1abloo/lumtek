import { motion } from 'framer-motion'
import { controlFeatures } from '../../data/controlFeatures'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getIcon } from '../../utils/icons'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { SectionTitle } from '../ui/SectionTitle'

export const ControlFeaturesSection = () => {
  const reduced = useReducedMotion()

  return (
    <section id="camaras" className="section-y bg-lumtek-surface">
      <div className="mx-auto max-w-7xl section-x">
        <SectionTitle
          eyebrow="Control integrado"
          title="Qué puedes controlar con Lumtek"
          description="Integramos dispositivos y sistemas para que puedas supervisar, automatizar y proteger tus espacios desde una experiencia sencilla y conectada."
          center
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {controlFeatures.map((feature, i) => {
            const Icon = getIcon(feature.icon)
            return (
              <AnimatedReveal key={feature.title} delay={i * 0.05}>
                <motion.article
                  className="card-shine group h-full rounded-2xl border border-lumtek-border bg-white p-6 shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-lumtek-blue/30 hover:shadow-glow"
                  whileHover={reduced ? {} : { y: -3 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <motion.div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-lumtek-blue/10 to-lumtek-cyan/10 text-lumtek-blue"
                    whileHover={reduced ? {} : { rotate: -3, scale: 1.05 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </motion.div>
                  <h3 className="font-display text-base font-semibold text-lumtek-text">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-lumtek-text-secondary">
                    {feature.description}
                  </p>
                </motion.article>
              </AnimatedReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
