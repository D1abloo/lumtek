import { useEffect, useCallback } from 'react'
import type { CookiePreferences } from '../types'

const COOKIE_KEY = 'lumtek-cookie-preferences'
const COOKIE_CONSENT_KEY = 'lumtek-cookie-consent'
export const COOKIE_PREFERENCES_EVENT = 'lumtek:cookie-preferences-changed'

export const defaultPreferences: CookiePreferences = {
  technical: true,
  analytics: false,
  preferences: false,
  marketing: false,
}

const allEnabled: CookiePreferences = {
  technical: true,
  analytics: true,
  preferences: true,
  marketing: true,
}

const notifyPreferencesChanged = (prefs: CookiePreferences) => {
  if (typeof window === 'undefined') return
  window.lumtekCookiePreferences = prefs
  window.dispatchEvent(
    new CustomEvent(COOKIE_PREFERENCES_EVENT, { detail: prefs }),
  )
}

/** Punto de enganche cuando se añadan scripts de analítica o marketing */
export const applyCookiePreferences = (prefs: CookiePreferences) => {
  notifyPreferencesChanged(prefs)
}

export const loadPreferences = (): CookiePreferences | null => {
  try {
    const raw = localStorage.getItem(COOKIE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CookiePreferences
    return { ...defaultPreferences, ...parsed, technical: true }
  } catch {
    return null
  }
}

export const savePreferences = (prefs: CookiePreferences) => {
  const normalized: CookiePreferences = {
    ...prefs,
    technical: true,
  }
  localStorage.setItem(COOKIE_KEY, JSON.stringify(normalized))
  localStorage.setItem(COOKIE_CONSENT_KEY, 'configured')
  applyCookiePreferences(normalized)
  return normalized
}

export const hasConsent = (): boolean => {
  return localStorage.getItem(COOKIE_CONSENT_KEY) !== null
}

export const acceptAll = (): CookiePreferences => savePreferences(allEnabled)

export const rejectAll = (): CookiePreferences => {
  const prefs = savePreferences(defaultPreferences)
  localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected')
  applyCookiePreferences(prefs)
  return prefs
}

export const resetPreferences = (): CookiePreferences => {
  localStorage.removeItem(COOKIE_KEY)
  localStorage.removeItem(COOKIE_CONSENT_KEY)
  const prefs = { ...defaultPreferences }
  applyCookiePreferences(prefs)
  return prefs
}

export const useCookiePreferencesListener = (
  onChange: (prefs: CookiePreferences) => void,
) => {
  const handler = useCallback(
    (event: Event) => {
      const detail = (event as CustomEvent<CookiePreferences>).detail
      if (detail) onChange(detail)
    },
    [onChange],
  )

  useEffect(() => {
    window.addEventListener(COOKIE_PREFERENCES_EVENT, handler)
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, handler)
  }, [handler])
}

export const useEscapeKey = (onEscape: () => void, active: boolean) => {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
    },
    [onEscape],
  )

  useEffect(() => {
    if (!active) return
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [active, handler])
}

declare global {
  interface Window {
    lumtekCookiePreferences?: CookiePreferences
  }
}
