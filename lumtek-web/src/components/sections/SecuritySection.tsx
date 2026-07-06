import { motion } from 'framer-motion'
import { Check, Shield } from 'lucide-react'
import { securityBlocks, securityChecklist } from '../../data/useCases'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getIcon } from '../../utils/icons'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { SectionTitle } from '../ui/SectionTitle'

export const SecuritySection = () => {
  const reduced = useReducedMotion()

  return (
    <section id="seguridad" className="section-y relative overflow-hidden bg-sky-50/80">
      <div className="mx-auto max-w-7xl section-x">
        <SectionTitle
          eyebrow="Seguridad"
          title="Una instalación inteligente debe ser también una instalación segura"
          description="Cada cámara, sensor, panel o dispositivo conectado debe instalarse con criterios de seguridad. La domótica y los sistemas inteligentes ofrecen grandes ventajas, pero necesitan configuración adecuada, accesos protegidos, redes bien definidas, permisos controlados y mantenimiento para funcionar de manera segura y fiable."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {securityBlocks.map((block, i) => {
              const Icon = getIcon(block.icon)
              return (
                <AnimatedReveal key={block.title} delay={i * 0.04}>
                  <article className="card-shine group h-full rounded-2xl border border-lumtek-border bg-white p-5 shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-lumtek-blue/25 hover:shadow-card">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-lumtek-blue/8 text-lumtek-blue transition-transform duration-200 group-hover:scale-105">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-sm font-semibold text-lumtek-text">
                      {block.title}
                    </h3>
                    <p className="mt-2 text-sm text-lumtek-text-secondary">{block.description}</p>
                  </article>
                </AnimatedReveal>
              )
            })}
          </div>

          <AnimatedReveal delay={0.15}>
            <div className="rounded-2xl border border-lumtek-blue/20 bg-white p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lumtek-blue/10">
                <Shield className="h-6 w-6 text-lumtek-blue" />
              </div>
              <p className="font-display text-lg font-semibold leading-snug text-lumtek-text">
                Instalamos y configuramos cada sistema para que sea útil, estable y seguro.
              </p>

              <ul className="mt-6 space-y-3" aria-label="Estado de seguridad">
                {securityChecklist.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 text-sm text-lumtek-text-secondary"
                    initial={reduced ? false : { opacity: 0, x: -8 }}
                    whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduced ? 0 : 0.15 + i * 0.07, duration: 0.35 }}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
