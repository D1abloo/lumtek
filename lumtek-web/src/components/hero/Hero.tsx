import { Camera, ChevronRight, Radio, Shield, Smartphone } from 'lucide-react'
import { siteContent } from '../../data/siteContent'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { GlowButton } from '../ui/GlowButton'
import { HeroVisualBackground } from './HeroVisualBackground'
import { HeroPhoneShowcase } from './HeroPhoneShowcase'

const highlightIcons = [Smartphone, Camera, Radio, Shield]

export const Hero = () => {
  const { hero } = siteContent

  return (
    <section
      id="inicio"
      className="relative overflow-hidden pb-10 pt-[calc(5rem+env(safe-area-inset-top))] sm:pb-12 sm:pt-[calc(6rem+env(safe-area-inset-top))] md:pb-14 lg:pb-16 lg:pt-[calc(6.5rem+env(safe-area-inset-top))]"
    >
      <HeroVisualBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl section-x">
        <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <AnimatedReveal>
              <h1 className="mx-auto max-w-3xl text-[1.75rem] font-bold leading-[1.14] tracking-tight text-lumtek-text sm:max-w-2xl sm:text-4xl md:text-[2.5rem] md:leading-[1.1] lg:mx-0 lg:max-w-xl xl:max-w-2xl xl:text-[2.65rem]">
                {hero.title}
              </h1>
            </AnimatedReveal>

            <AnimatedReveal delay={0.06}>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-lumtek-text-secondary sm:mt-5 sm:max-w-2xl sm:text-lg lg:mx-0">
                {hero.subtitle}
              </p>
            </AnimatedReveal>

            <AnimatedReveal
              delay={0.12}
              className="mt-6 flex flex-col items-stretch gap-3 sm:mt-7 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
            >
              <GlowButton href="/#servicios" variant="primary" cursorFill={false} className="w-full sm:w-auto">
                Ver soluciones
                <ChevronRight className="h-4 w-4" />
              </GlowButton>
              <GlowButton href="/contacto" variant="secondary" className="w-full sm:w-auto">
                Contactar
              </GlowButton>
            </AnimatedReveal>

            <AnimatedReveal delay={0.18} className="mt-7 sm:mt-8">
              <ul className="grid grid-cols-1 gap-2.5 xs:grid-cols-2 xs:gap-x-4 xs:gap-y-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start">
                {hero.highlights.map((item, i) => {
                  const Icon = highlightIcons[i]
                  return (
                    <li
                      key={item}
                      className="flex items-center justify-center gap-2 text-xs text-lumtek-text-secondary sm:justify-start sm:text-sm"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-lumtek-blue sm:h-4 sm:w-4" strokeWidth={1.75} />
                      {item}
                    </li>
                  )
                })}
              </ul>
            </AnimatedReveal>
          </div>

          <AnimatedReveal delay={0.06} className="order-1 w-full min-w-0 lg:order-2 lg:flex lg:justify-end">
            <HeroPhoneShowcase />
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
