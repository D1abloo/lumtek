import { Link } from 'react-router-dom'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { ScrollProgress } from '../ui/ScrollProgress'
import type { LegalSection as LegalSectionType } from '../../types'

type LegalLayoutProps = {
  title: string
  subtitle: string
  sections: LegalSectionType[]
}

export const LegalLayout = ({ title, subtitle, sections }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-white page-top pb-20 sm:pb-24">
      <ScrollProgress />
      <article className="mx-auto max-w-3xl section-x">
        <AnimatedReveal>
          <header className="border-b border-lumtek-border/50 pb-10">
            <h1 className="text-2xl font-bold tracking-tight text-lumtek-text sm:text-3xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-lumtek-text-secondary">{subtitle}</p>
            <p className="mt-6 text-sm leading-relaxed text-amber-900/85">
              Contenido orientativo pendiente de revisión por el titular o asesor legal antes de su
              publicación definitiva.
            </p>
          </header>
        </AnimatedReveal>

        <div className="mt-12 space-y-12 sm:space-y-14">
          {sections.map((section, i) => (
            <LegalSectionBlock key={section.id} section={section} index={i} />
          ))}
        </div>

        <LegalBackLink />
      </article>
    </div>
  )
}

const LegalSectionBlock = ({ section, index }: { section: LegalSectionType; index: number }) => (
  <AnimatedReveal delay={index * 0.03}>
    <section id={section.id} className="scroll-mt-28">
      <h2 className="text-lg font-semibold tracking-tight text-lumtek-text sm:text-xl">
        {section.title}
      </h2>
      <div className="mt-4 space-y-4">
        {section.paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-[1.75] text-lumtek-text-secondary sm:text-[15px]">
            {p}
          </p>
        ))}
      </div>
    </section>
  </AnimatedReveal>
)

export const LegalBackLink = () => (
  <Link
    to="/"
    className="mt-14 inline-flex text-sm font-medium text-lumtek-blue transition-colors hover:underline"
  >
    ← Volver al inicio
  </Link>
)
