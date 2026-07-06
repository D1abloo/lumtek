import { Link, useLocation } from 'react-router-dom'
import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import { siteContent } from '../../data/siteContent'
import { scrollToTop } from '../../utils/scroll'
import { LUMTEK_BRAND_LOGO_SRC } from './HeaderLogo'

const footerNav = [
  { label: 'Inicio', to: '/' },
  { label: 'Domótica', to: '/#domotica' },
  { label: 'Seguridad', to: '/#seguridad' },
  { label: 'Integración', to: '/#core' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Aplicaciones', to: '/#aplicaciones' },
  { label: 'Contacto', to: '/contacto' },
]

const legalLinks = [
  { label: 'Aviso legal', to: '/aviso-legal' },
  { label: 'Política de privacidad', to: '/politica-privacidad' },
  { label: 'Política de cookies', to: '/politica-cookies' },
  { label: 'Configuración de cookies', to: '/configuracion-cookies' },
]

const footerHeading =
  'font-display text-[11px] font-semibold uppercase tracking-wider text-lumtek-text'
const footerLink =
  'text-xs text-lumtek-text-secondary transition-colors hover:text-lumtek-blue sm:text-[13px]'

export const Footer = () => {
  const { pathname } = useLocation()

  const handleHomeClick = () => {
    if (pathname === '/') scrollToTop()
  }

  return (
    <footer className="border-t border-lumtek-border bg-lumtek-surface pt-6 pb-3 pb-safe sm:pt-8 sm:pb-4">
      <div className="mx-auto max-w-7xl section-x">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
          <div className="min-w-0">
            <h3 className={footerHeading}>Navegación</h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-1 sm:gap-y-2">
              {footerNav.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={link.to === '/' ? handleHomeClick : undefined}
                    className={footerLink}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className={footerHeading}>Legal</h3>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <h3 className={footerHeading}>Contacto</h3>
            <ul className="mt-3 space-y-2 sm:max-w-sm lg:max-w-none">
              <li>
                <Link to="/contacto" className={`flex items-center gap-1.5 ${footerLink}`}>
                  <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                  Formulario
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteContent.contact.email}`}
                  className={`flex items-center gap-1.5 break-anywhere ${footerLink}`}
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {siteContent.contact.email}
                </a>
              </li>
              <li className={`flex items-center gap-1.5 ${footerLink}`}>
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {siteContent.contact.phone}
              </li>
              <li className={`flex items-center gap-1.5 ${footerLink}`}>
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {siteContent.contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="relative mt-4 flex items-center border-t border-lumtek-border py-1.5 sm:mt-5">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="relative z-10 inline-flex shrink-0 leading-none transition-opacity hover:opacity-90"
            aria-label="Lumtek, ir al inicio"
          >
            <span className="inline-flex h-12 items-center overflow-hidden sm:h-14">
              <img
                src={LUMTEK_BRAND_LOGO_SRC}
                alt=""
                className="h-[118%] w-auto max-w-none"
                loading="lazy"
                decoding="async"
              />
            </span>
          </Link>
          <p className="pointer-events-none absolute inset-x-0 z-0 px-4 text-center text-[11px] text-lumtek-text-secondary sm:text-xs">
            © {new Date().getFullYear()} Lumtek. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
