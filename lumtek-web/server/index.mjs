import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildClientEmail, buildStaffEmail } from './contactEmail.mjs'
import {
  applySecurityHeaders,
  createContactRateLimiter,
  sanitizeContactPayload,
  sanitizeEmailHeader,
  sanitizeMailDisplayName,
} from './contactSecurity.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const port = Number(process.env.PORT || 3001)

const smtpHost = process.env.SMTP_HOST || 'smtpout.secureserver.net'
const smtpPort = Number(process.env.SMTP_PORT || 465)
const smtpSecure = process.env.SMTP_SECURE !== 'false'
const smtpUser = process.env.SMTP_USER || 'juanf.delgado@lumtek.es'
const smtpPass = process.env.SMTP_PASS
const mailTo = process.env.MAIL_TO || smtpUser
const mailFromName = sanitizeMailDisplayName(process.env.MAIL_FROM_NAME || 'Lumtek Web')
const sendClientConfirm = process.env.MAIL_CLIENT_CONFIRM !== 'false'

const corsOrigin = process.env.CORS_ORIGIN
const allowedOrigins = corsOrigin
  ? corsOrigin.split(',').map((o) => o.trim()).filter(Boolean)
  : process.env.NODE_ENV === 'production'
    ? ['https://lumtek.es', 'https://www.lumtek.es']
    : null

const smtpOptions = {
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
}
if (!smtpSecure) {
  smtpOptions.requireTLS = process.env.SMTP_REQUIRE_TLS !== 'false'
}

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use((_req, res, next) => {
  applySecurityHeaders(res)
  next()
})

if (process.env.NODE_ENV === 'production' && !process.env.CORS_ORIGIN) {
  console.warn('CORS_ORIGIN no definido — usando lista por defecto lumtek.es')
}

app.use(
  cors({
    origin: allowedOrigins
      ? (origin, cb) => {
          if (!origin || allowedOrigins.includes(origin)) cb(null, true)
          else cb(null, false)
        }
      : true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
)
app.use(express.json({ limit: '32kb' }))

const contactRateLimit = createContactRateLimiter()
const transporter = smtpPass ? nodemailer.createTransport(smtpOptions) : null

app.get('/api/health', (_req, res) => {
  const body =
    process.env.NODE_ENV === 'production' ? { ok: true } : { ok: true, smtp: Boolean(transporter) }
  res.json(body)
})

app.post('/api/contact', contactRateLimit, async (req, res) => {
  if (!transporter) {
    return res.status(503).json({
      ok: false,
      message: 'Servicio de correo no disponible. Inténtalo más tarde.',
    })
  }

  const { blocked, errors, payload } = sanitizeContactPayload(req.body)
  if (blocked) {
    return res.json({ ok: true })
  }
  if (errors.length) {
    return res.status(400).json({ ok: false, message: 'Datos del formulario incompletos o no válidos.' })
  }

  const staff = buildStaffEmail(payload)
  const client = buildClientEmail(payload)
  const safeReplyTo = sanitizeEmailHeader(payload.email)

  try {
    await transporter.sendMail({
      from: `"${mailFromName}" <${smtpUser}>`,
      to: mailTo,
      replyTo: safeReplyTo,
      subject: staff.subject,
      text: staff.text,
      html: staff.html,
    })

    if (sendClientConfirm) {
      await transporter.sendMail({
        from: `"${mailFromName}" <${smtpUser}>`,
        to: safeReplyTo,
        subject: client.subject,
        text: client.text,
        html: client.html,
      })
    }

    return res.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown'
    console.error('SMTP error:', msg)
    return res.status(502).json({
      ok: false,
      message: 'No se pudo enviar el correo. Inténtalo más tarde.',
    })
  }
})

const dist = path.join(root, 'dist')
app.use(express.static(dist, { index: false, maxAge: '7d' }))
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
  res.sendFile(path.join(dist, 'index.html'), (err) => {
    if (err) next()
  })
})

app.listen(port, '127.0.0.1', () => {
  console.log(`Lumtek API en http://127.0.0.1:${port}`)
  if (!smtpPass) {
    console.warn('SMTP_PASS no definido — el formulario devolverá 503 hasta configurarlo.')
  }
})
