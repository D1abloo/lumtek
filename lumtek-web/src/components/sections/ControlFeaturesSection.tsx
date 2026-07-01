import { motion } from 'framer-motion'
import { controlFeatures } from '../../data/controlFeatures'
import { getIcon } from '../../utils/icons'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { SectionTitle } from '../ui/SectionTitle'

export const ControlFeaturesSection = () => {
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
                  className="card-shine group h-full rounded-2xl border border-lumtek-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-lumtek-blue/30 hover:shadow-glow"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-lumtek-blue/10 to-lumtek-cyan/10 text-lumtek-blue">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
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
