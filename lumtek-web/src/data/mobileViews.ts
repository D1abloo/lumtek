import type { LucideIcon } from 'lucide-react'
import {
  Blinds,
  Camera,
  KeyRound,
  Layers,
  Lightbulb,
  Radio,
  ShieldAlert,
  Thermometer,
  Video,
  Wifi,
} from 'lucide-react'

export type MobileViewId =
  | 'camaras'
  | 'iluminacion'
  | 'accesos'
  | 'sensores'
  | 'climatizacion'
  | 'escenas'
  | 'ventanas'
  | 'alarmas'
  | 'videoporteros'
  | 'sistemas'

export type MobileViewBadge = 'live' | 'secure' | 'scene' | 'alert' | 'auto' | 'routine'

export type MobileView = {
  id: MobileViewId
  title: string
  description: string
  image: string
  alt: string
  logoSrc: string
  fallbackTitle: string
  badge?: string
  badgeVariant?: MobileViewBadge
  items: string[]
  icon: LucideIcon
}

/** Vistas del móvil alineadas con Control integrado; se omiten duplicados ya presentes. */
export const mobileViews: MobileView[] = [
  {
    id: 'camaras',
    title: 'Cámaras',
    description: 'Visualización en vivo y grabación segura.',
    image: '/images/app/camaras.webp',
    alt: 'App Lumtek Control — cámaras en vivo con entrada principal y miniaturas',
    logoSrc: '/images/app/icons/camaras.svg',
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
    logoSrc: '/images/app/icons/iluminacion.svg',
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
    logoSrc: '/images/app/icons/puertas.svg',
    fallbackTitle: 'Control de accesos',
    badge: 'Acceso seguro',
    badgeVariant: 'secure',
    items: ['Puerta principal', 'Garaje', 'Videoportero', 'Apertura remota'],
    icon: KeyRound,
  },
  {
    id: 'ventanas',
    title: 'Persianas',
    description: 'Persianas, sensores y ventilación.',
    image: '/images/app/ventanas.webp',
    alt: 'App Lumtek Control — ventanas inteligentes y persianas motorizadas',
    logoSrc: '/images/app/icons/ventanas.svg',
    fallbackTitle: 'Ventanas inteligentes',
    badge: 'Modo ventilación',
    badgeVariant: 'auto',
    items: ['Ventana salón', 'Persianas', 'Apertura parcial', 'Sensor de apertura'],
    icon: Blinds,
  },
  {
    id: 'climatizacion',
    title: 'Climatización',
    description: 'Temperatura, modos y eficiencia energética.',
    image: '/images/app/climatizacion.webp',
    alt: 'App Lumtek Control — climatización y ahorro energético',
    logoSrc: '/images/app/icons/climatizacion.svg',
    fallbackTitle: 'Climatización',
    badge: 'Modo automático',
    badgeVariant: 'auto',
    items: ['22º', 'Modo auto', 'Horario', 'Ahorro'],
    icon: Thermometer,
  },
  {
    id: 'alarmas',
    title: 'Alarmas',
    description: 'Avisos, estados y supervisión conectada.',
    image: '/images/app/alarmas.webp',
    alt: 'App Lumtek Control — panel de alarmas y zonas de seguridad',
    logoSrc: '/images/app/icons/alarmas.svg',
    fallbackTitle: 'Alarmas conectadas',
    badge: 'Sistema armado',
    badgeVariant: 'alert',
    items: ['Perimetral', 'Interior', 'Sensores', 'Avisos push'],
    icon: ShieldAlert,
  },
  {
    id: 'sensores',
    title: 'Sensores',
    description: 'Movimiento, apertura, temperatura y alertas.',
    image: '/images/app/sensores.webp',
    alt: 'App Lumtek Control — sensores de movimiento, temperatura y alertas',
    logoSrc: '/images/app/icons/sensores.svg',
    fallbackTitle: 'Sensores conectados',
    badge: 'Alertas activas',
    badgeVariant: 'alert',
    items: ['Movimiento', 'Apertura', 'Temperatura', 'Presencia'],
    icon: Radio,
  },
  {
    id: 'videoporteros',
    title: 'Videoporteros',
    description: 'Comunicación, apertura y registro de visitas.',
    image: '/images/app/videoporteros.webp',
    alt: 'App Lumtek Control — videoportero con apertura remota',
    logoSrc: '/images/app/icons/videoporteros.svg',
    fallbackTitle: 'Videoportero IP',
    badge: 'En línea',
    badgeVariant: 'live',
    items: ['Entrada principal', 'Abrir puerta', 'Videollamada', 'Historial'],
    icon: Video,
  },
  {
    id: 'sistemas',
    title: 'Sistemas',
    description: 'Red, WiFi y dispositivos conectados.',
    image: '/images/app/sistema-it.webp',
    alt: 'App Lumtek Control — red WiFi y dispositivos del sistema',
    logoSrc: '/images/app/icons/sistema-it.svg',
    fallbackTitle: 'Sistemas IT',
    badge: 'Red estable',
    badgeVariant: 'secure',
    items: ['Red local', 'WiFi', 'Dispositivos', 'Estado del sistema'],
    icon: Wifi,
  },
  {
    id: 'escenas',
    title: 'Escenas',
    description: 'Automatizaciones para cada momento del día.',
    image: '/images/app/escenas.webp',
    alt: 'App Lumtek Control — escenas y automatizaciones',
    logoSrc: '/images/app/icons/iluminacion.svg',
    fallbackTitle: 'Escenas inteligentes',
    badge: 'Rutina preparada',
    badgeVariant: 'routine',
    items: ['Modo noche', 'Fuera de casa', 'Llegada', 'Cierre seguro'],
    icon: Layers,
  },
]

export const defaultMobileView = mobileViews[0]
