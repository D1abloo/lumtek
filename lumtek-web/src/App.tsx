import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { AmbientBackground } from './components/ui/AmbientBackground'
import { AnimatedOutlet } from './components/ui/AnimatedOutlet'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { CookieBanner } from './components/cookies/CookieBanner'
import { CookieSettingsModal } from './components/cookies/CookieSettingsModal'
import type { CookiePreferences } from './types'
import {
  defaultPreferences,
  hasConsent,
  loadPreferences,
  savePreferences,
  useCookiePreferencesListener,
  useEscapeKey,
} from './utils/cookies'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import LegalNoticePage from './pages/LegalNoticePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import CookiesPolicyPage from './pages/CookiesPolicyPage'
import CookieSettingsPage from './pages/CookieSettingsPage'
import UseCasePage from './pages/UseCasePage'

const ScrollOnNavigate = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

const App = () => {
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
  const [consentGiven, setConsentGiven] = useState(hasConsent)

  useEffect(() => {
    const saved = loadPreferences()
    if (saved) {
      setPreferences(saved)
      setConsentGiven(hasConsent())
    }
  }, [])

  useCookiePreferencesListener((prefs) => {
    setPreferences(prefs)
    setConsentGiven(hasConsent())
  })

  useEscapeKey(() => setCookieSettingsOpen(false), cookieSettingsOpen)

  const handleSaveCookies = () => {
    savePreferences(preferences)
    setCookieSettingsOpen(false)
    setConsentGiven(true)
  }

  const handleConsent = () => {
    const saved = loadPreferences()
    if (saved) setPreferences(saved)
    setConsentGiven(true)
  }

  return (
    <AmbientBackground>
      <ScrollProgress />
      <ScrollOnNavigate />
      <Header />
      <main>
        <Routes>
          <Route element={<AnimatedOutlet />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/aplicaciones/:slug" element={<UseCasePage />} />
            <Route path="/aviso-legal" element={<LegalNoticePage />} />
            <Route path="/politica-privacidad" element={<PrivacyPolicyPage />} />
            <Route path="/politica-cookies" element={<CookiesPolicyPage />} />
            <Route path="/configuracion-cookies" element={<CookieSettingsPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      {!consentGiven && (
        <CookieBanner
          onOpenSettings={() => setCookieSettingsOpen(true)}
          onConsent={handleConsent}
        />
      )}
      <CookieSettingsModal
        open={cookieSettingsOpen}
        onClose={() => setCookieSettingsOpen(false)}
        preferences={preferences}
        onChange={setPreferences}
        onSave={handleSaveCookies}
      />
    </AmbientBackground>
  )
}

export default App
