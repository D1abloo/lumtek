import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { services, servicesIntro } from '../../data/services'
import { getIcon } from '../../utils/icons'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { GlowButton } from '../ui/GlowButton'
import { SectionTitle } from '../ui/SectionTitle'

export const ServicesSection = () => {
  return (
    <section id="servicios" className="section-y relative overflow-hidden bg-lumtek-surface">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,168,255,0.04),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl section-x">
        <SectionTitle
          eyebrow="Servicios"
          title="Servicios Lumtek"
          description="Instalación, configuración, integración y mantenimiento de sistemas domóticos y de seguridad para cada tipo de espacio."
        />

        <AnimatedReveal delay={0.05}>
          <p className="-mt-6 mb-12 max-w-3xl text-base leading-relaxed text-lumtek-text-secondary md:text-lg">
            {servicesIntro}
          </p>
        </AnimatedReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <AnimatedReveal key={service.id} delay={i * 0.04}>
                <motion.article
                  className="group flex h-full flex-col rounded-2xl border border-lumtek-border bg-white p-6 shadow-soft transition-colors duration-300 hover:border-lumtek-blue/35 hover:shadow-glow"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <motion.div
                      className="inline-flex rounded-xl bg-lumtek-blue/8 p-2.5 text-lumtek-blue"
                      whileHover={{ scale: 1.08, rotate: -3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </motion.div>
                    <span className="rounded-full border border-lumtek-border bg-lumtek-surface px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-lumtek-text-secondary">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-semibold text-lumtek-text">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-lumtek-text-secondary">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-lumtek-border pt-4">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-xs leading-relaxed text-lumtek-text-secondary"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lumtek-blue" strokeWidth={2.5} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </AnimatedReveal>
            )
          })}
        </div>

        <AnimatedReveal delay={0.2} className="mt-14">
          <div className="flex flex-col items-stretch justify-between gap-6 rounded-2xl border border-lumtek-border bg-white p-6 shadow-soft sm:p-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h3 className="font-display text-xl font-bold text-lumtek-text md:text-2xl">
                ¿No sabes qué sistema necesitas?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-lumtek-text-secondary md:text-base">
                Te ayudamos a elegir la solución más adecuada según el tipo de espacio, el nivel de
                seguridad, el uso diario y el control que quieras tener desde el móvil.
              </p>
            </div>
            <GlowButton href="/#contacto" variant="primary" className="w-full md:w-auto" ariaLabel="Solicitar asesoramiento">
              Solicitar asesoramiento
            </GlowButton>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
