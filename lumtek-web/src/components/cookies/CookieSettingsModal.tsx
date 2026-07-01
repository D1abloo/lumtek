import { AnimatePresence, motion } from 'framer-motion'
import type { CookiePreferences } from '../../types'
import { CookieSettingsPanel } from './CookieSettingsPanel'

type CookieSettingsModalProps = {
  open: boolean
  onClose: () => void
  preferences: CookiePreferences
  onChange: (prefs: CookiePreferences) => void
  onSave: () => void
}

export const CookieSettingsModal = ({
  open,
  onClose,
  preferences,
  onChange,
  onSave,
}: CookieSettingsModalProps) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-hidden
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-lumtek-border bg-white p-6 shadow-card"
          initial={{ opacity: 0, scale: 0.95, y: '-45%' }}
          animate={{ opacity: 1, scale: 1, y: '-50%' }}
          exit={{ opacity: 0, scale: 0.95, y: '-45%' }}
        >
          <h2 id="cookie-modal-title" className="font-display text-xl font-bold text-lumtek-text">
            Configuración de cookies
          </h2>
          <p className="mt-2 text-sm text-lumtek-text-secondary">
            Gestiona qué categorías de cookies deseas permitir en este sitio.
          </p>
          <div className="mt-6">
            <CookieSettingsPanel
              preferences={preferences}
              onChange={onChange}
              onSave={onSave}
              onClose={onClose}
            />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)
