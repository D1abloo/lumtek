import type { NavItem } from '../types'

export const siteContent = {
  brand: 'LUMTEK',
  tagline: 'Domótica & Sistemas',
  claim: 'Domótica, sistemas inteligentes y seguridad tecnológica.',
  contact: {
    phone: 'Pendiente de completar',
    location: 'España',
    social: {
      linkedin: 'https://linkedin.com/company/lumtek',
      instagram: 'https://instagram.com/lumtek',
    },
  },
  hero: {
    title:
      'Domótica y sistemas inteligentes para espacios más seguros, conectados y eficientes',
    subtitle:
      'En Lumtek diseñamos, instalamos y configuramos soluciones de domótica, videovigilancia, accesos, automatización y control remoto para viviendas, empresas y edificios.',
    highlights: [
      'Control desde móvil',
      'Cámaras en vivo',
      'Domótica integrada',
      'Seguridad avanzada',
    ],
  },
}

export const navItems: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Cámaras', href: '/#camaras' },
  { label: 'Seguridad', href: '/#seguridad' },
  { label: 'Servicios', href: '/#servicios' },
]
