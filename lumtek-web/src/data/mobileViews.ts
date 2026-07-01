import type { LucideIcon } from 'lucide-react'
import {
  Camera,
  KeyRound,
  Layers,
  Lightbulb,
  Radio,
  Thermometer,
} from 'lucide-react'

export type MobileViewId =
  | 'camaras'
  | 'iluminacion'
  | 'accesos'
  | 'sensores'
  | 'climatizacion'
  | 'escenas'

export type MobileViewBadge = 'live' | 'secure' | 'scene' | 'alert' | 'auto' | 'routine'

export type MobileView = {
  id: MobileViewId
  title: string
  description: string
  image: string
  alt: string
  fallbackTitle: string
  badge?: string
  badgeVariant?: MobileViewBadge
  items: string[]
  icon: LucideIcon
}

export const mobileViews: MobileView[] = [
  {
    id: 'camaras',
    title: 'Cámaras',
    description: 'Visualización en vivo y grabación segura.',
    image: '/images/app/camaras.webp',
    alt: 'App Lumtek Control — cámaras en vivo con entrada principal y miniaturas',
    fallbackTitle: 'Cámaras en vivo',
    badge: 'EN VIVO',
    badgeVariant: 'live',
    items: ['Entrada principal', 'Garaje', 'Salón', 'Acceso principal'],
    icon: Camera,
  },
  {
    id: 'iluminacion',
    title: 'Iluminación',
    description: 'Control de luces, escenas y horarios.',
    image: '/images/app/iluminacion.webp',
    alt: 'App Lumtek Control — control de luces, intensidad y escenas',
    fallbackTitle: 'Iluminación inteligente',
    badge: 'Escena activa',
    badgeVariant: 'scene',
    items: ['Luces salón', 'Luces pasillo', 'Intensidad', 'Escena noche'],
    icon: Lightbulb,
  },
  {
    id: 'accesos',
    title: 'Accesos',
    description: 'Puertas, garaje y videoportero desde el móvil.',
    image: '/images/app/accesos.webp',
    alt: 'App Lumtek Control — puertas, garaje y videoportero',
    fallbackTitle: 'Control de accesos',
    badge: 'Acceso seguro',
    badgeVariant: 'secure',
    items: ['Puerta principal', 'Garaje', 'Videoportero', 'Apertura remota'],
    icon: KeyRound,
  },
  {
    id: 'sensores',
    title: 'Sensores',
    description: 'Movimiento, apertura, temperatura y alertas.',
    image: '/images/app/sensores.webp',
    alt: 'App Lumtek Control — sensores de movimiento, temperatura y alertas',
    fallbackTitle: 'Sensores conectados',
    badge: 'Alertas activas',
    badgeVariant: 'alert',
    items: ['Movimiento', 'Apertura', 'Temperatura', 'Presencia'],
    icon: Radio,
  },
  {
    id: 'climatizacion',
    title: 'Climatización',
    description: 'Temperatura, modos y eficiencia energética.',
    image: '/images/app/climatizacion.webp',
    alt: 'App Lumtek Control — climatización y ahorro energético',
    fallbackTitle: 'Climatización',
    badge: 'Modo automático',
    badgeVariant: 'auto',
    items: ['22º', 'Modo auto', 'Horario', 'Ahorro'],
    icon: Thermometer,
  },
  {
    id: 'escenas',
    title: 'Escenas',
    description: 'Automatizaciones para cada momento del día.',
    image: '/images/app/escenas.webp',
    alt: 'App Lumtek Control — escenas y automatizaciones',
    fallbackTitle: 'Escenas inteligentes',
    badge: 'Rutina preparada',
    badgeVariant: 'routine',
    items: ['Modo noche', 'Fuera de casa', 'Llegada', 'Cierre seguro'],
    icon: Layers,
  },
]

export const defaultMobileView = mobileViews[0]
