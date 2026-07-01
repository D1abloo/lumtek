import { MapPin, Phone } from 'lucide-react'
import { siteContent } from '../../data/siteContent'
import { contactBenefits } from '../../data/contactOptions'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { ContactForm } from './ContactForm'

type ContactSectionProps = {
  id?: string
  showFullForm?: boolean
  standalone?: boolean
}

export const ContactSection = ({
  id = 'contacto',
  showFullForm = false,
  standalone = false,
}: ContactSectionProps) => {
  return (
    <section
      id={id}
      className={`section-y relative overflow-hidden bg-white ${standalone ? 'page-top' : ''}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,168,255,0.05),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl section-x">
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-10 lg:gap-12">
          <AnimatedReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lumtek-blue sm:text-xs sm:tracking-[0.2em]">
              Contacto
            </p>
            <h2 className="mt-3 text-2xl font-bold text-lumtek-text sm:text-3xl md:text-4xl">
              Hablemos de tu instalación
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-lumtek-text-secondary sm:text-base">
              Cuéntanos qué necesitas automatizar, proteger o controlar. Te ayudamos a definir una
              solución de domótica y sistemas adaptada a tu espacio.
            </p>

            <ul className="mt-6 space-y-3 sm:mt-8">
              {contactBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-lumtek-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lumtek-blue" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3 sm:mt-8">
              <p className="flex items-center gap-2 text-sm text-lumtek-text-secondary">
                <Phone className="h-4 w-4 shrink-0" />
                {siteContent.contact.phone}
              </p>
              <p className="flex items-center gap-2 text-sm text-lumtek-text-secondary">
                <MapPin className="h-4 w-4 shrink-0" />
                {siteContent.contact.location}
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15}>
            <div className="rounded-2xl border border-lumtek-border bg-white p-5 shadow-card sm:p-6 md:p-8">
              <ContactForm compact={!showFullForm} />
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
