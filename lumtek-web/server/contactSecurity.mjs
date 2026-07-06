/** Validación, saneado y rate-limit del formulario de contacto. */

import { CONTACT_PREFERENCES, PROJECT_TYPES } from './allowedContactFields.mjs'

const LIMIT = 8
const WINDOW_MS = 15 * 60 * 1000
const hits = new Map()

const FIELD_LIMITS = {
  name: 120,
  email: 160,
  phone: 40,
  projectType: 80,
  message: 4000,
  company: 120,
  city: 80,
  contactPreference: 40,
}

export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-site',
}

export const applySecurityHeaders = (res) => {
  for (const [key, value] of Object.entries(securityHeaders)) {
    res.setHeader(key, value)
  }
}

const clean = (value, max) =>
  String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\r\n]/g, '')
    .trim()
    .slice(0, max)

/** Evita inyección en cabeceras SMTP (CR/LF). */
export const sanitizeEmailHeader = (value) => clean(value, 160).replace(/[\r\n]/g, '')

/** Asunto de correo sin saltos de línea ni comillas problemáticas. */
export const sanitizeSubjectPart = (value) =>
  clean(value, 80).replace(/[\r\n"\\]/g, '')

/** Nombre visible en From: sin comillas ni backslash. */
export const sanitizeMailDisplayName = (value) =>
  clean(value, 80).replace(/["\\]/g, '')

export const sanitizeContactPayload = (body) => {
  if (body?._hp?.trim()) return { blocked: true, errors: ['spam'] }

  const payload = {
    name: clean(body?.name, FIELD_LIMITS.name),
    email: sanitizeEmailHeader(body?.email).toLowerCase(),
    phone: clean(body?.phone, FIELD_LIMITS.phone),
    projectType: clean(body?.projectType, FIELD_LIMITS.projectType),
    message: clean(body?.message, FIELD_LIMITS.message),
    company: clean(body?.company, FIELD_LIMITS.company),
    city: clean(body?.city, FIELD_LIMITS.city),
    contactPreference: clean(body?.contactPreference, FIELD_LIMITS.contactPreference),
    privacyAccepted: Boolean(body?.privacyAccepted),
  }

  const errors = []
  if (!payload.name) errors.push('name')
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.push('email')
  if (!payload.phone || !/^[\d\s+().-]{6,40}$/.test(payload.phone)) errors.push('phone')
  if (!payload.projectType || !PROJECT_TYPES.has(payload.projectType)) errors.push('projectType')
  if (
    payload.contactPreference &&
    !CONTACT_PREFERENCES.has(payload.contactPreference)
  ) {
    errors.push('contactPreference')
  }
  if (!payload.message || payload.message.length < 20) errors.push('message')
  if (!payload.privacyAccepted) errors.push('privacyAccepted')

  return { blocked: false, errors, payload }
}

const pruneRateLimitMap = (now) => {
  if (hits.size < 500) return
  for (const [ip, entry] of hits) {
    if (now - entry.start > WINDOW_MS) hits.delete(ip)
  }
}

export const createContactRateLimiter = () => (req, res, next) => {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown'
  const now = Date.now()
  pruneRateLimitMap(now)
  const entry = hits.get(ip)

  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 })
    return next()
  }

  if (entry.count >= LIMIT) {
    res.setHeader('Retry-After', String(Math.ceil((WINDOW_MS - (now - entry.start)) / 1000)))
    return res.status(429).json({
      ok: false,
      message: 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.',
    })
  }

  entry.count += 1
  return next()
}

// ponytail: self-check mínimo
if (process.argv[1]?.endsWith('contactSecurity.mjs')) {
  const bad = sanitizeContactPayload({
    name: 'Test\r\nBcc: evil@x.com',
    email: 'a@b.com',
    phone: '+34 600 000 000',
    projectType: 'Domótica vivienda',
    message: 'x'.repeat(25),
    privacyAccepted: true,
  })
  const invalidType = sanitizeContactPayload({
    name: 'Ana',
    email: 'a@b.com',
    phone: '+34 600 000 000',
    projectType: '<script>alert(1)</script>',
    message: 'x'.repeat(25),
    privacyAccepted: true,
  })
  const bot = sanitizeContactPayload({ _hp: 'filled', privacyAccepted: true })
  console.assert(!bad.payload.name.includes('\n'), 'header injection stripped')
  console.assert(invalidType.errors.includes('projectType'), 'projectType whitelist')
  console.assert(bot.blocked, 'honeypot blocks bots')
  console.log('contactSecurity ok')
}
