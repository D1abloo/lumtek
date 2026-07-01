import { processSteps } from '../../data/useCases'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { SectionTitle } from '../ui/SectionTitle'

export const ProcessSection = () => {
  return (
    <section className="section-y relative overflow-hidden bg-lumtek-surface">
      <div className="relative mx-auto max-w-7xl section-x">
        <SectionTitle eyebrow="Metodología" title="Cómo trabajamos" center />

        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-lumtek-blue/35 to-transparent" />
            <div className="grid grid-cols-6 gap-4">
              {processSteps.map((step, i) => (
                <AnimatedReveal key={step.step} delay={i * 0.08}>
                  <div className="relative pt-12 text-center">
                    <div className="absolute left-1/2 top-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-lumtek-blue bg-white font-display text-sm font-bold text-lumtek-blue shadow-soft">
                      {step.step}
                    </div>
                    <h3 className="font-display text-sm font-semibold text-lumtek-text">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-lumtek-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:grid lg:hidden md:grid-cols-2 md:gap-6">
          {processSteps.map((step, i) => (
            <AnimatedReveal key={step.step} delay={i * 0.06}>
              <div className="rounded-2xl border border-lumtek-border bg-white p-5 shadow-soft">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-lumtek-blue bg-white text-sm font-bold text-lumtek-blue">
                  {step.step}
                </div>
                <h3 className="mt-3 text-base font-semibold text-lumtek-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lumtek-text-secondary">
                  {step.description}
                </p>
              </div>
            </AnimatedReveal>
          ))}
        </div>

        <div className="md:hidden">
          <div className="relative space-y-8 border-l border-lumtek-blue/25 pl-8">
            {processSteps.map((step, i) => (
              <AnimatedReveal key={step.step} delay={i * 0.06}>
                <div className="relative">
                  <div className="absolute -left-[2.55rem] flex h-7 w-7 items-center justify-center rounded-full border border-lumtek-blue bg-white font-display text-xs font-bold text-lumtek-blue">
                    {step.step}
                  </div>
                  <h3 className="font-display text-base font-semibold text-lumtek-text">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-lumtek-text-secondary">{step.description}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
