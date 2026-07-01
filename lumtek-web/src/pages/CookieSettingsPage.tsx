import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedReveal } from '../components/ui/AnimatedReveal'
import { CookieSettingsPanel } from '../components/cookies/CookieSettingsPanel'
import type { CookiePreferences } from '../types'
import {
  acceptAll,
  defaultPreferences,
  loadPreferences,
  rejectAll,
  resetPreferences,
  savePreferences,
  useCookiePreferencesListener,
} from '../utils/cookies'

const CookieSettingsPage = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>(
    () => loadPreferences() ?? defaultPreferences,
  )
  const [status, setStatus] = useState<string | null>(null)

  useCookiePreferencesListener(setPreferences)

  useEffect(() => {
    const saved = loadPreferences()
    if (saved) setPreferences(saved)
  }, [])

  const showStatus = (message: string) => {
    setStatus(message)
    window.setTimeout(() => setStatus(null), 3000)
  }

  const handleSave = () => {
    savePreferences(preferences)
    showStatus('Configuración guardada correctamente.')
  }

  const handleAcceptAll = () => {
    const prefs = acceptAll()
    setPreferences(prefs)
    showStatus('Todas las cookies han sido aceptadas.')
  }

  const handleRejectOptional = () => {
    const prefs = rejectAll()
    setPreferences(prefs)
    showStatus('Cookies opcionales rechazadas. Solo se mantienen las técnicas.')
  }

  const handleReset = () => {
    const prefs = resetPreferences()
    setPreferences(prefs)
    showStatus('Preferencias restablecidas. Vuelve a elegir y guarda si lo deseas.')
  }

  return (
    <div className="min-h-screen bg-white page-top pb-20 sm:pb-24">
      <article className="mx-auto max-w-3xl section-x">
        <AnimatedReveal>
          <header className="border-b border-lumtek-border/50 pb-10">
            <h1 className="text-2xl font-bold tracking-tight text-lumtek-text sm:text-3xl">
              Configuración de cookies
            </h1>
            <p className="mt-4 text-base leading-relaxed text-lumtek-text-secondary">
              Gestiona qué categorías de cookies deseas permitir. Las cookies técnicas son
              necesarias para el funcionamiento básico del sitio.
            </p>
          </header>
        </AnimatedReveal>

        <div className="mt-10">
          <CookieSettingsPanel
            preferences={preferences}
            onChange={setPreferences}
            onSave={handleSave}
            showClose={false}
            plain
          />
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="min-h-[44px] rounded-lg bg-lumtek-blue px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Aceptar todas
          </button>
          <button
            type="button"
            onClick={handleRejectOptional}
            className="min-h-[44px] rounded-lg px-5 py-2.5 text-sm text-lumtek-text-secondary transition-colors hover:bg-lumtek-surface hover:text-lumtek-text"
          >
            Rechazar opcionales
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[44px] rounded-lg px-5 py-2.5 text-sm text-lumtek-text-secondary transition-colors hover:bg-lumtek-surface hover:text-lumtek-text"
          >
            Restablecer
          </button>
        </div>

        {status && (
          <p className="mt-4 text-sm text-emerald-600" role="status" aria-live="polite">
            {status}
          </p>
        )}

        <Link
          to="/"
          className="mt-14 inline-flex text-sm font-medium text-lumtek-blue transition-colors hover:underline"
        >
          ← Volver al inicio
        </Link>
      </article>
    </div>
  )
}

export default CookieSettingsPage
