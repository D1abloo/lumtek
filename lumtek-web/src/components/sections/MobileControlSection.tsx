import { Bell, Camera, KeyRound, Lightbulb } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { MobilePhoneShowcase } from './MobilePhoneShowcase'

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Camera,
    title: 'Cámaras en directo',
    text: 'Visualiza entradas, garajes o interiores desde el móvil.',
  },
  {
    icon: KeyRound,
    title: 'Accesos protegidos',
    text: 'Comprueba el estado de puertas, videoporteros y accesos.',
  },
  {
    icon: Lightbulb,
    title: 'Automatizaciones sencillas',
    text: 'Activa escenas, luces o rutinas sin complicaciones.',
  },
  {
    icon: Bell,
    title: 'Alertas útiles',
    text: 'Recibe avisos de movimiento, apertura o actividad relevante.',
  },
]

const BenefitList = () => (
  <ul className="space-y-4">
    {benefits.map((item, i) => {
      const Icon = item.icon
      return (
        <AnimatedReveal key={item.title} delay={0.06 + i * 0.05}>
          <li className="flex gap-3 rounded-xl border border-lumtek-border/70 bg-white/70 p-4 shadow-soft backdrop-blur-sm">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lumtek-blue/10 text-lumtek-blue">
              <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-lumtek-text">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-lumtek-text-secondary">
                {item.text}
              </p>
            </div>
          </li>
        </AnimatedReveal>
      )
    })}
  </ul>
)

export const MobileControlSection = () => {
  return (
    <section
      id="camaras"
      className="section-y relative overflow-hidden bg-gradient-to-b from-white to-[#f0f9ff]/80"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,168,255,0.06),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl section-x">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-16">
          <AnimatedReveal className="order-1 lg:col-start-1 lg:row-start-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lumtek-blue">
              Control móvil
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-lumtek-text sm:text-3xl lg:text-4xl">
              Supervisa cámaras, accesos y automatizaciones desde una sola app
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-lumtek-text-secondary sm:text-base">
              Lumtek permite centralizar cámaras, accesos, sensores y escenas domóticas en una
              experiencia sencilla. Desde el móvil puedes comprobar el estado de tu espacio,
              visualizar cámaras en directo y recibir información útil sin complicaciones.
            </p>
          </AnimatedReveal>

          <AnimatedReveal
            delay={0.1}
            className="order-2 flex justify-center overflow-hidden lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-end"
          >
            <MobilePhoneShowcase />
          </AnimatedReveal>

          <div className="order-3 lg:col-start-1 lg:row-start-2">
            <BenefitList />
          </div>
        </div>
      </div>
    </section>
  )
}
