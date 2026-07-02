const esc = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const SITE_URL = (
  process.env.SITE_URL ||
  process.env.PUBLIC_SITE_URL ||
  'https://lumtek.es'
).replace(/\/$/, '')

const line = (label, value) => (value ? `${label}: ${value}` : null)

/** Correo interno a Lumtek con los datos del formulario */
export const buildStaffEmail = (data) => {
  const { name, email, phone, projectType, message, company, city, contactPreference } = data

  const text = [
    'Nueva solicitud de contacto desde lumtek-web',
    '==========================================',
    line('Nombre', name),
    line('Email', email),
    line('Teléfono', phone),
    line('Tipo de proyecto', projectType),
    line('Empresa', company),
    line('Localidad', city),
    line('Preferencia de contacto', contactPreference),
    '',
    'Mensaje del cliente:',
    '--------------------',
    message,
    '',
    '— Enviado automáticamente desde el formulario web de Lumtek',
  ]
    .filter(Boolean)
    .join('\n')

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>Nueva solicitud Lumtek</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #dce3ea;border-radius:12px;overflow:hidden;">
        <tr><td style="background:linear-gradient(135deg,#00a8ff,#0090dd);padding:20px 24px;">
          <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#e0f4ff;">Lumtek · Formulario web</p>
          <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;">Nueva solicitud de contacto</h1>
        </td></tr>
        <tr><td style="padding:24px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5;">
            <tr><td style="padding:8px 0;border-bottom:1px solid #eef2f6;"><strong>Nombre</strong></td><td style="padding:8px 0;border-bottom:1px solid #eef2f6;">${esc(name)}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eef2f6;"><strong>Email</strong></td><td style="padding:8px 0;border-bottom:1px solid #eef2f6;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eef2f6;"><strong>Teléfono</strong></td><td style="padding:8px 0;border-bottom:1px solid #eef2f6;">${esc(phone)}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eef2f6;"><strong>Proyecto</strong></td><td style="padding:8px 0;border-bottom:1px solid #eef2f6;">${esc(projectType)}</td></tr>
            ${company ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eef2f6;"><strong>Empresa</strong></td><td style="padding:8px 0;border-bottom:1px solid #eef2f6;">${esc(company)}</td></tr>` : ''}
            ${city ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eef2f6;"><strong>Localidad</strong></td><td style="padding:8px 0;border-bottom:1px solid #eef2f6;">${esc(city)}</td></tr>` : ''}
            ${contactPreference ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eef2f6;"><strong>Contacto</strong></td><td style="padding:8px 0;border-bottom:1px solid #eef2f6;">${esc(contactPreference)}</td></tr>` : ''}
          </table>
          <p style="margin:20px 0 8px;font-size:13px;font-weight:bold;color:#334155;">Mensaje</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(message)}</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return {
    subject: `[Lumtek] ${projectType} — ${name}`,
    text,
    html,
  }
}

/** Confirmación automática al cliente que envió el formulario */
export const buildClientEmail = (data) => {
  const { name, email, phone, projectType, message, company, city, contactPreference } = data
  const firstName = name.trim().split(/\s+/)[0] || name

  const text = [
    `Hola ${firstName},`,
    '',
    'Gracias por contactar con Lumtek. Hemos recibido tu solicitud correctamente.',
    '',
    'Resumen de tu mensaje:',
    `· Proyecto: ${projectType}`,
    company ? `· Empresa: ${company}` : null,
    city ? `· Localidad: ${city}` : null,
    `· Teléfono: ${phone}`,
    `· Email: ${email}`,
    contactPreference ? `· Preferencia de contacto: ${contactPreference}` : null,
    '',
    'Tu mensaje:',
    message,
    '',
    'Nuestro equipo revisará tu consulta y se pondrá en contacto contigo lo antes posible.',
    '',
    'Un saludo,',
    'Equipo Lumtek',
    'Domótica y sistemas inteligentes',
    SITE_URL,
    '',
    '— Este es un correo automático. Por favor, no respondas a este mensaje.',
    '  Si necesitas ampliar información, escríbenos a juanf.delgado@lumtek.es',
  ]
    .filter(Boolean)
    .join('\n')

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>Solicitud recibida — Lumtek</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #dce3ea;border-radius:12px;overflow:hidden;">
        <tr><td style="background:linear-gradient(135deg,#00a8ff,#0090dd);padding:24px;">
          <p style="margin:0;font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#e0f4ff;">LUMTEK</p>
          <h1 style="margin:10px 0 0;font-size:24px;color:#ffffff;">Hemos recibido tu solicitud</h1>
        </td></tr>
        <tr><td style="padding:28px 24px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Hola <strong>${esc(firstName)}</strong>,</p>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#334155;">
            Gracias por contactar con <strong>Lumtek</strong>. Tu mensaje ha sido enviado correctamente
            y nuestro equipo lo revisará para responderte lo antes posible.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;font-size:14px;">
            <tr><td style="padding:16px 18px;">
              <p style="margin:0 0 10px;font-size:12px;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;color:#00a8ff;">Resumen</p>
              <p style="margin:0 0 6px;"><strong>Proyecto:</strong> ${esc(projectType)}</p>
              ${company ? `<p style="margin:0 0 6px;"><strong>Empresa:</strong> ${esc(company)}</p>` : ''}
              ${city ? `<p style="margin:0 0 6px;"><strong>Localidad:</strong> ${esc(city)}</p>` : ''}
              <p style="margin:0 0 6px;"><strong>Teléfono:</strong> ${esc(phone)}</p>
              <p style="margin:0 0 6px;"><strong>Email:</strong> ${esc(email)}</p>
              ${contactPreference ? `<p style="margin:0;"><strong>Preferencia:</strong> ${esc(contactPreference)}</p>` : ''}
            </td></tr>
          </table>
          <p style="margin:20px 0 8px;font-size:13px;font-weight:bold;color:#334155;">Tu mensaje</p>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;font-size:14px;line-height:1.6;color:#475569;white-space:pre-wrap;">${esc(message)}</div>
          <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:#64748b;">
            Si necesitas ampliar información, puedes escribirnos a
            <a href="mailto:juanf.delgado@lumtek.es" style="color:#00a8ff;">juanf.delgado@lumtek.es</a>.
          </p>
        </td></tr>
        <tr><td style="padding:16px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;line-height:1.6;">
          Lumtek · Domótica y sistemas inteligentes<br>
          <a href="${SITE_URL}" style="color:#00a8ff;">lumtek.es</a><br>
          Correo automático de confirmación. No respondas a este mensaje.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return {
    subject: 'Hemos recibido tu solicitud — Lumtek',
    text,
    html,
  }
}

// ponytail: self-check — node server/contactEmail.mjs
const sample = {
  name: 'Ana García',
  email: 'ana@ejemplo.com',
  phone: '+34 600 000 000',
  projectType: 'Domótica',
  message: 'Quiero automatizar persianas y luces en mi vivienda.',
  company: 'Demo SL',
  city: 'Madrid',
  contactPreference: 'Email',
}
if (process.argv[1]?.endsWith('contactEmail.mjs')) {
  const staff = buildStaffEmail(sample)
  const client = buildClientEmail(sample)
  console.assert(staff.text.includes('Ana García'), 'staff text')
  console.assert(client.html.includes('Hemos recibido tu solicitud'), 'client html')
  console.log('contactEmail self-check OK')
}
