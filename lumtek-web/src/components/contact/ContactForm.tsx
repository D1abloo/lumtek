import { useState, useEffect, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2, Send, AlertCircle } from 'lucide-react'
import type { ContactFormData, ContactFormErrors } from '../../types'
import { projectTypes, contactPreferences } from '../../data/contactOptions'
import { siteContent } from '../../data/siteContent'
import { sendContactForm } from '../../services/contactService'
import { MagneticButton } from '../ui/MagneticButton'

const initialData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
  company: '',
  city: '',
  contactPreference: '',
  privacyAccepted: false,
}

const validate = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {}
  if (!data.name.trim()) errors.name = 'El nombre es obligatorio'
  if (!data.email.trim()) errors.email = 'El email es obligatorio'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Introduce un email válido'
  if (!data.phone.trim()) errors.phone = 'El teléfono es obligatorio'
  if (!data.projectType) errors.projectType = 'Selecciona un tipo de proyecto'
  if (data.message.trim().length < 20)
    errors.message = 'El mensaje debe tener al menos 20 caracteres'
  if (!data.privacyAccepted)
    errors.privacyAccepted = 'Debes aceptar la política de privacidad'
  return errors
}

const inputClass =
  'w-full min-w-0 rounded-xl border border-lumtek-border bg-white px-4 py-3 text-base text-lumtek-text placeholder:text-slate-400 transition-all focus:border-lumtek-blue focus:outline-none focus:ring-2 focus:ring-lumtek-blue/20 sm:text-sm'

type ContactFormProps = {
  compact?: boolean
}

export const ContactForm = ({ compact = false }: ContactFormProps) => {
  const [data, setData] = useState<ContactFormData>(initialData)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (status !== 'loading') return
    setProgress(6)
    const timer = window.setInterval(() => {
      setProgress((p) => (p >= 92 ? p : p + 7))
    }, 110)
    return () => window.clearInterval(timer)
  }, [status])

  const handleChange = (
    field: keyof ContactFormData,
    value: string | boolean,
  ) => {
    setData((d) => ({ ...d, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validation = validate(data)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setStatus('loading')
    setProgress(0)
    const result = await sendContactForm(data)

    if (result.ok) {
      setProgress(100)
      await new Promise((resolve) => window.setTimeout(resolve, 480))
      setStatus('success')
      setData(initialData)
    } else {
      setProgress(0)
      setStatus('error')
      setErrorMsg(result.message)
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 font-display text-xl font-bold text-lumtek-text">Mensaje enviado</h3>
        <p className="mt-2 text-sm text-lumtek-text-secondary">
          Tu mensaje ha sido enviado correctamente. Hemos recibido tu solicitud y te
          contactaremos pronto para hablar de tu proyecto de domótica o sistemas inteligentes.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setProgress(0)
          }}
          className="mt-6 text-sm text-lumtek-blue hover:underline"
        >
          Enviar otro mensaje
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <p className="rounded-xl border border-lumtek-border bg-lumtek-surface px-4 py-3 text-sm text-lumtek-text-secondary">
        También puedes escribirnos directamente a{' '}
        <a
          href={`mailto:${siteContent.contact.email}`}
          className="font-medium text-lumtek-blue hover:underline break-anywhere"
        >
          {siteContent.contact.email}
        </a>
        . Al enviar el formulario recibirás una confirmación por correo.
      </p>

      <div className={compact ? 'space-y-4' : 'grid gap-4 sm:grid-cols-2 md:gap-5'}>
        <Field label="Nombre *" error={errors.name}>
          <input
            className={inputClass}
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Tu nombre"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email *" error={errors.email}>
          <input
            type="email"
            className={inputClass}
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="tu@email.com"
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field label="Teléfono *" error={errors.phone}>
          <input
            type="tel"
            className={inputClass}
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+34 600 000 000"
            aria-invalid={!!errors.phone}
          />
        </Field>
        <Field label="Tipo de proyecto *" error={errors.projectType}>
          <select
            className={inputClass}
            value={data.projectType}
            onChange={(e) => handleChange('projectType', e.target.value)}
            aria-invalid={!!errors.projectType}
          >
            <option value="">Selecciona...</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        {!compact && (
          <>
            <Field label="Empresa" error={undefined}>
              <input
                className={inputClass}
                value={data.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Opcional"
              />
            </Field>
            <Field label="Localidad" error={undefined}>
              <input
                className={inputClass}
                value={data.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Opcional"
              />
            </Field>
            <Field label="Preferencia de contacto" error={undefined}>
              <select
                className={inputClass}
                value={data.contactPreference}
                onChange={(e) => handleChange('contactPreference', e.target.value)}
              >
                <option value="">Sin preferencia</option>
                {contactPreferences.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>
          </>
        )}
      </div>

      <Field label="Mensaje *" error={errors.message}>
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          value={data.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Cuéntanos qué necesitas automatizar, proteger o controlar..."
          aria-invalid={!!errors.message}
        />
      </Field>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={data.privacyAccepted}
          onChange={(e) => handleChange('privacyAccepted', e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-lumtek-border text-lumtek-blue focus:ring-lumtek-blue"
        />
        <span className="text-xs text-lumtek-text-secondary">
          He leído y acepto la{' '}
          <Link to="/politica-privacidad" className="text-lumtek-blue hover:underline">
            política de privacidad
          </Link>
          . *
        </span>
      </label>
      {errors.privacyAccepted && (
        <p className="text-xs text-red-400" role="alert">{errors.privacyAccepted}</p>
      )}

      <AnimatePresence>
        {status === 'loading' && (
          <motion.div
            className="space-y-2 rounded-xl border border-lumtek-border bg-slate-50 p-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="flex items-center justify-between text-xs font-medium text-lumtek-text-secondary">
              <span>Enviando tu mensaje...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-lumtek-blue to-lumtek-cyan"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-lumtek-text-secondary">
              Estamos procesando tu solicitud de contacto.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <MagneticButton
        type="submit"
        disabled={status === 'loading'}
        ariaLabel="Enviar formulario"
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all sm:w-auto ${
          status === 'loading'
            ? 'bg-lumtek-blue/70 text-white'
            : 'bg-gradient-to-r from-lumtek-blue to-[#0090dd] text-white shadow-glow hover:brightness-105'
        }`}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-soft-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Enviar solicitud
          </>
        )}
      </MagneticButton>
    </form>
  )
}

const Field = ({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) => (
  <div>
    <label className="mb-1.5 block text-xs font-medium text-lumtek-text-secondary">{label}</label>
    {children}
    {error && (
      <p className="mt-1 text-xs text-red-600" role="alert">{error}</p>
    )}
  </div>
)
