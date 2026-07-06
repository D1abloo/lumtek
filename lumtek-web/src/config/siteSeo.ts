import { siteContent } from '../data/siteContent'
import { useCases } from '../data/useCases'

/** URL pública del sitio (build: VITE_SITE_URL). */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://lumtek.es'
).replace(/\/$/, '')

export const SITE_NAME = 'Lumtek'

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/brand/lumtek-logo.webp`

export const defaultPageSeo = {
  title: 'Lumtek | Domótica y sistemas inteligentes',
  description:
    'Lumtek diseña e instala domótica, videovigilancia, control de accesos, sensores y automatización para viviendas, empresas y edificios en España.',
} as const

export type RouteSeoEntry = {
  title: string
  description: string
  noindex?: boolean
}

export const staticRouteSeo: Record<string, RouteSeoEntry> = {
  '/': defaultPageSeo,
  '/contacto': {
    title: 'Contacto | Lumtek domótica y seguridad',
    description:
      'Solicita información sobre domótica, cámaras, accesos y sistemas inteligentes. Contacta con Lumtek por formulario o email.',
  },
  '/aviso-legal': {
    title: 'Aviso legal | Lumtek',
    description: 'Aviso legal e información del titular del sitio web de Lumtek.',
  },
  '/politica-privacidad': {
    title: 'Política de privacidad | Lumtek',
    description: 'Política de privacidad y protección de datos personales de Lumtek.',
  },
  '/politica-cookies': {
    title: 'Política de cookies | Lumtek',
    description: 'Información sobre cookies y tecnologías similares en el sitio web de Lumtek.',
  },
  '/configuracion-cookies': {
    title: 'Configuración de cookies | Lumtek',
    description: 'Gestiona tus preferencias de cookies en el sitio web de Lumtek.',
    noindex: true,
  },
}

export const sitemapPaths = [
  '/',
  '/contacto',
  '/aviso-legal',
  '/politica-privacidad',
  '/politica-cookies',
  ...useCases.map((item) => `/aplicaciones/${item.id}`),
]

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/lumtek-logo.webp`,
  description: siteContent.claim,
  email: siteContent.contact.email,
  areaServed: siteContent.contact.location,
  sameAs: [siteContent.contact.social.linkedin, siteContent.contact.social.instagram],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: siteContent.contact.email,
    availableLanguage: ['Spanish'],
    url: `${SITE_URL}/contacto`,
  },
} as const

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: defaultPageSeo.description,
  inLanguage: 'es-ES',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: `${SITE_URL}/images/brand/lumtek-logo.webp`,
  },
} as const

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
})
