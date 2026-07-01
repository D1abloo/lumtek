import { motion } from 'framer-motion'
import { technologies } from '../../data/technologies'
import { getIcon } from '../../utils/icons'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { SectionTitle } from '../ui/SectionTitle'

export const DomoticsSection = () => {
  return (
    <section id="domotica" className="section-y relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl section-x">
        <SectionTitle
          eyebrow="Domótica & Sistemas"
          title="Tecnología que automatiza, protege y conecta"
          description="La domótica y los sistemas inteligentes permiten controlar cámaras, accesos, iluminación, climatización, sensores y automatizaciones desde un único entorno. Una instalación bien diseñada mejora la seguridad, optimiza consumos, facilita la supervisión y aporta comodidad real tanto en viviendas como en negocios."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech, i) => {
            const Icon = getIcon(tech.icon)
            return (
              <AnimatedReveal key={tech.title} delay={i * 0.05}>
                <motion.article
                  className="card-shine group h-full rounded-2xl border border-lumtek-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-lumtek-blue/25 hover:shadow-card"
                  whileHover={{ y: -4 }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-lumtek-blue/8 text-lumtek-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-lumtek-text">
                    {tech.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-lumtek-text-secondary">
                    {tech.description}
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
