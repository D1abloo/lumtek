import { AnimatePresence, motion } from 'framer-motion'
import { acceptAll, rejectAll } from '../../utils/cookies'

type CookieBannerProps = {
  onOpenSettings: () => void
  onConsent: () => void
}

export const CookieBanner = ({ onOpenSettings, onConsent }: CookieBannerProps) => {
  const handleAccept = () => {
    acceptAll()
    onConsent()
  }

  const handleReject = () => {
    rejectAll()
    onConsent()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-lumtek-border bg-white/95 px-4 py-4 pb-safe shadow-card backdrop-blur-md sm:px-6 md:p-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        role="region"
        aria-label="Aviso de cookies"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-lumtek-text-secondary">
            Utilizamos cookies propias y de terceros para mejorar tu experiencia. Puedes aceptar
            todas, rechazar las opcionales o configurar tus preferencias.
          </p>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleAccept}
              className="touch-target rounded-lg bg-lumtek-blue px-4 py-2.5 text-sm font-semibold text-white"
              aria-label="Aceptar todas las cookies"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={handleReject}
              className="touch-target rounded-lg border border-lumtek-border px-4 py-2.5 text-sm text-lumtek-text-secondary"
              aria-label="Rechazar cookies opcionales"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={onOpenSettings}
              className="touch-target rounded-lg border border-lumtek-border px-4 py-2.5 text-sm text-lumtek-text-secondary"
              aria-label="Configurar cookies"
            >
              Configurar
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
