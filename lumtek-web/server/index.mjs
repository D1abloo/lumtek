import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildClientEmail, buildStaffEmail } from './contactEmail.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const port = Number(process.env.PORT || 3001)

const smtpHost = process.env.SMTP_HOST || 'smtpout.secureserver.net'
const smtpPort = Number(process.env.SMTP_PORT || 465)
const smtpSecure = process.env.SMTP_SECURE !== 'false'
const smtpUser = process.env.SMTP_USER || 'juanf.delgado@lumtek.es'
const smtpPass = process.env.SMTP_PASS
const mailTo = process.env.MAIL_TO || smtpUser
const mailFromName = process.env.MAIL_FROM_NAME || 'Lumtek Web'
const sendClientConfirm = process.env.MAIL_CLIENT_CONFIRM !== 'false'

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
app.use(cors({ origin: process.env.CORS_ORIGIN || true }))
app.use(express.json({ limit: '32kb' }))

const transporter = smtpPass ? nodemailer.createTransport(smtpOptions) : null

const validateBody = (body) => {
  const errors = []
  if (!body?.name?.trim()) errors.push('name')
  if (!body?.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.push('email')
  if (!body?.phone?.trim()) errors.push('phone')
  if (!body?.projectType) errors.push('projectType')
  if (!body?.message?.trim() || body.message.trim().length < 20) errors.push('message')
  if (!body?.privacyAccepted) errors.push('privacyAccepted')
  return errors
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, smtp: Boolean(transporter) })
})

app.post('/api/contact', async (req, res) => {
  if (!transporter) {
    return res.status(503).json({
      ok: false,
      message: 'SMTP no configurado. Define SMTP_PASS en el archivo .env del servidor.',
    })
  }

  const errors = validateBody(req.body)
  if (errors.length) {
    return res.status(400).json({ ok: false, message: 'Datos del formulario incompletos o no válidos.' })
  }

  const { name, email, phone, projectType, message, company, city, contactPreference } = req.body
  const payload = { name, email, phone, projectType, message, company, city, contactPreference }
  const staff = buildStaffEmail(payload)
  const client = buildClientEmail(payload)

  try {
    await transporter.sendMail({
      from: `"${mailFromName}" <${smtpUser}>`,
      to: mailTo,
      replyTo: email,
      subject: staff.subject,
      text: staff.text,
      html: staff.html,
    })

    if (sendClientConfirm) {
      await transporter.sendMail({
        from: `"${mailFromName}" <${smtpUser}>`,
        to: email,
        subject: client.subject,
        text: client.text,
        html: client.html,
      })
    }

    return res.json({ ok: true })
  } catch (err) {
    console.error('SMTP error:', err)
    return res.status(502).json({
      ok: false,
      message: 'No se pudo enviar el correo. Revisa la configuración SMTP.',
    })
  }
})

const dist = path.join(root, 'dist')
app.use(express.static(dist))
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
  res.sendFile(path.join(dist, 'index.html'), (err) => {
    if (err) next()
  })
})

app.listen(port, () => {
  console.log(`Lumtek API en http://localhost:${port}`)
  if (!smtpPass) {
    console.warn('SMTP_PASS no definido — el formulario devolverá 503 hasta configurarlo.')
  }
})
