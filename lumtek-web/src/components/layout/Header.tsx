import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../data/siteContent'
import { useScrollHeader } from '../../hooks/useScrollHeader'
import { scrollToTop } from '../../utils/scroll'
import { CursorFill } from '../ui/CursorFill'
import { GlowButton } from '../ui/GlowButton'
import { LumtekLogo } from '../ui/LumtekLogo'
import { LUMTEK_BRAND_LOGO_SRC } from './HeaderLogo'

export const Header = () => {
  const scrolled = useScrollHeader()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavClick = () => setMobileOpen(false)

  const handleHomeNav = () => {
    handleNavClick()
    if (pathname === '/') scrollToTop()
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full pt-[env(safe-area-inset-top)] transition-all duration-500 ${
        scrolled
          ? 'glass-light border-b border-lumtek-border shadow-soft'
          : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 overflow-visible px-4 py-2.5 max-md:grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] sm:px-6 lg:gap-6 lg:px-8 lg:py-3">
        <Link
          to="/"
          onClick={handleHomeNav}
          className="inline-flex min-w-0 shrink-0 items-center gap-2 justify-self-start overflow-visible transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lumtek-blue sm:gap-2.5"
          aria-label="Lumtek, ir al inicio"
        >
          <img
            src={LUMTEK_BRAND_LOGO_SRC}
            alt=""
            width={120}
            height={80}
            className="h-8 w-auto max-w-[3.25rem] shrink-0 object-contain object-left sm:h-9 sm:max-w-[3.75rem] md:h-10 md:max-w-[4.25rem]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            aria-hidden
          />
          <LumtekLogo
            size="md"
            variant="wordmark"
            asLink={false}
            className="min-w-0 overflow-visible max-md:[&_span]:text-lg md:[&_span]:text-2xl"
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-0.5 md:flex lg:gap-1"
          aria-label="Navegación principal"
        >
          {navItems.map((item) => (
            <CursorFill
              key={item.href + item.label}
              to={item.href}
              variant="nav"
              onClick={item.href === '/' ? handleHomeNav : handleNavClick}
              className="rounded-lg px-3 py-2"
              contentClassName="text-[13px] font-medium text-lumtek-text-secondary transition-colors duration-300 group-hover:text-lumtek-blue group-active:text-lumtek-blue lg:text-sm"
            >
              {item.label}
            </CursorFill>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 justify-self-end">
          <div className="hidden md:block">
            <GlowButton
              href="/contacto"
              variant="primary"
              cursorFill={false}
              className="!shadow-none hover:!shadow-none"
              ariaLabel="Contactar con Lumtek"
            >
              Contactar
            </GlowButton>
          </div>

          <CursorFill
            variant="icon"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="touch-target h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-lumtek-border text-lumtek-text md:hidden"
            contentClassName="flex items-center justify-center"
            ariaLabel={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            ariaExpanded={mobileOpen}
            ariaControls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </CursorFill>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            className="glass-light max-h-[calc(100dvh-4.5rem-env(safe-area-inset-top))] overflow-y-auto border-t border-lumtek-border md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Menú móvil"
          >
            <div className="flex flex-col gap-1 px-4 py-4 pb-safe">
              {navItems.map((item) => (
                <CursorFill
                  key={item.href + item.label}
                  to={item.href}
                  variant="nav"
                  onClick={item.href === '/' ? handleHomeNav : handleNavClick}
                  className="w-full rounded-xl px-3 py-3"
                  contentClassName="text-sm font-medium text-lumtek-text-secondary transition-colors duration-300 group-hover:text-lumtek-blue"
                >
                  {item.label}
                </CursorFill>
              ))}
              <GlowButton
                href="/contacto"
                variant="primary"
                cursorFill={false}
                className="mt-3 w-full !shadow-none hover:!shadow-none"
                onClick={handleNavClick}
              >
                Contactar
              </GlowButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
