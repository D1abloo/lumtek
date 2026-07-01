import { Link, useLocation } from 'react-router-dom'
import { MapPin, MessageSquare, Phone } from 'lucide-react'
import { siteContent } from '../../data/siteContent'
import { scrollToTop } from '../../utils/scroll'
import { HeaderBrand } from './HeaderBrand'

const footerNav = [
  { label: 'Inicio', to: '/' },
  { label: 'Domótica', to: '/#domotica' },
  { label: 'Cámaras', to: '/#camaras' },
  { label: 'Seguridad', to: '/#seguridad' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Contacto', to: '/contacto' },
]

const legalLinks = [
  { label: 'Aviso legal', to: '/aviso-legal' },
  { label: 'Política de privacidad', to: '/politica-privacidad' },
  { label: 'Política de cookies', to: '/politica-cookies' },
  { label: 'Configuración de cookies', to: '/configuracion-cookies' },
]

export const Footer = () => {
  const { pathname } = useLocation()

  const handleHomeClick = () => {
    if (pathname === '/') scrollToTop()
  }

  return (
    <footer className="border-t border-lumtek-border bg-lumtek-surface py-12 pb-safe sm:py-16">
      <div className="mx-auto max-w-7xl section-x">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              onClick={handleHomeClick}
              className="inline-flex transition-opacity hover:opacity-90"
              aria-label="Lumtek, ir al inicio"
            >
              <HeaderBrand size="footer" staticWordmark />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-lumtek-text-secondary">
              {siteContent.claim}
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-lumtek-text">
              Lumtek
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={link.to === '/' ? handleHomeClick : undefined}
                    className="text-sm text-lumtek-text-secondary transition-colors hover:text-lumtek-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-lumtek-text">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-lumtek-text-secondary transition-colors hover:text-lumtek-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-lumtek-text">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/contacto"
                  className="flex items-center gap-2 text-sm text-lumtek-text-secondary transition-colors hover:text-lumtek-blue"
                >
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  Formulario de contacto
                </Link>
              </li>
              <li className="flex items-center gap-2 text-sm text-lumtek-text-secondary">
                <Phone className="h-4 w-4 shrink-0" />
                {siteContent.contact.phone}
              </li>
              <li className="flex items-center gap-2 text-sm text-lumtek-text-secondary">
                <MapPin className="h-4 w-4 shrink-0" />
                {siteContent.contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-lumtek-border pt-8 text-center text-xs text-lumtek-text-secondary">
          © {new Date().getFullYear()} Lumtek. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
