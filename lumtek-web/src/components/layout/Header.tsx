import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../data/siteContent'
import { useScrollHeader } from '../../hooks/useScrollHeader'
import { scrollToTop } from '../../utils/scroll'
import { CursorFill } from '../ui/CursorFill'
import { GlowButton } from '../ui/GlowButton'
import { HeaderBrand } from './HeaderBrand'

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
      className={`fixed top-0 z-50 w-full overflow-visible pt-[env(safe-area-inset-top)] transition-all duration-500 ${
        scrolled
          ? 'glass-light border-b border-lumtek-border shadow-soft'
          : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-2.5 xs:gap-3 xs:px-4 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-4 xl:gap-6 lg:px-8 lg:py-3">
        <Link
          to="/"
          onClick={handleHomeNav}
          className="relative z-10 inline-flex h-9 shrink-0 items-center justify-self-start transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lumtek-blue lg:mr-2 xl:mr-4"
          aria-label="Lumtek, ir al inicio"
        >
          <HeaderBrand />
        </Link>

        <nav
          className="relative z-10 hidden min-w-0 items-center justify-center gap-0.5 lg:flex xl:gap-1"
          aria-label="Navegación principal"
        >
          {navItems.map((item) => (
            <CursorFill
              key={item.href + item.label}
              to={item.href}
              variant="nav"
              onClick={item.href === '/' ? handleHomeNav : handleNavClick}
              className="rounded-lg px-1.5 py-2 xl:px-2.5"
              contentClassName="whitespace-nowrap text-[11px] font-medium text-lumtek-text-secondary transition-colors duration-300 group-hover:text-lumtek-blue group-active:text-lumtek-blue xl:text-xs 2xl:text-sm"
            >
              {item.label}
            </CursorFill>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 justify-self-end">
          <div className="hidden lg:block">
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
            className="touch-target h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-lumtek-border text-lumtek-text lg:hidden"
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
            className="glass-light max-h-[calc(100dvh-4.5rem-env(safe-area-inset-top))] overflow-y-auto border-t border-lumtek-border lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Menú móvil"
          >
            <div className="flex flex-col gap-1 px-4 py-4 pb-safe">
              <Link
                to="/"
                onClick={handleHomeNav}
                className="mb-3 inline-flex transition-opacity hover:opacity-90"
                aria-label="Lumtek, ir al inicio"
              >
                <HeaderBrand />
              </Link>
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
