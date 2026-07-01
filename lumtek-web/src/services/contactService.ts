import type { ContactFormData } from '../types'

export type ContactResult = { ok: true } | { ok: false; message: string }

export const sendContactForm = async (data: ContactFormData): Promise<ContactResult> => {
  const endpoint =
    (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || '/api/contact'

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        message: data.message,
        company: data.company ?? '',
        city: data.city ?? '',
        contactPreference: data.contactPreference ?? '',
        privacyAccepted: data.privacyAccepted,
      }),
    })

    const payload = (await res.json().catch(() => null)) as { message?: string } | null

    if (!res.ok) {
      return {
        ok: false,
        message: payload?.message ?? 'No se pudo enviar el formulario. Inténtalo de nuevo.',
      }
    }

    return { ok: true }
  } catch {
    return { ok: false, message: 'Error de conexión. Comprueba tu red e inténtalo de nuevo.' }
  }
}
