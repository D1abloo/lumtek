import type { LucideIcon } from 'lucide-react'
import { Blinds, Camera, DoorOpen, Wifi } from 'lucide-react'

export type AppSectionId = 'puertas' | 'camaras' | 'ventanas' | 'sistema-it'

export type AppSection = {
  id: AppSectionId
  label: string
  title: string
  menuDescription: string
  detailDescription: string
  image: string
  imageAlt: string
  logoSrc: string
  icon: LucideIcon
  options: string[]
  stats: string[]
}

export const appSections: AppSection[] = [
  {
    id: 'puertas',
    label: 'Puertas',
    title: 'Puertas automáticas',
    menuDescription: 'Accesos, garaje y apertura remota.',
    detailDescription: 'Control de accesos, apertura remota y supervisión segura.',
    image: '/images/app/puertas.webp',
    imageAlt: 'Puertas automáticas y control de accesos inteligente Lumtek',
    logoSrc: '/images/app/icons/puertas.svg',
    icon: DoorOpen,
    options: ['Puerta principal', 'Garaje', 'Videoportero', 'Apertura remota', 'Estado cerrado'],
    stats: ['Acceso seguro', '2 puertas conectadas', 'Registro activo'],
  },
  {
    id: 'camaras',
    label: 'Cámaras',
    title: 'Cámaras conectadas',
    menuDescription: 'Visualización en vivo y grabaciones.',
    detailDescription: 'Visualización en directo y supervisión remota.',
    image: '/images/app/camaras.webp',
    imageAlt: 'Cámaras de seguridad y videovigilancia conectada Lumtek',
    logoSrc: '/images/app/icons/camaras.svg',
    icon: Camera,
    options: ['Entrada principal', 'Garaje', 'Salón', 'Acceso principal', 'Grabaciones'],
    stats: ['EN VIVO', '4 cámaras activas', 'HD seguro'],
  },
  {
    id: 'ventanas',
    label: 'Ventanas',
    title: 'Ventanas inteligentes',
    menuDescription: 'Persianas, sensores y ventilación.',
    detailDescription: 'Automatización, ventilación y control desde el móvil.',
    image: '/images/app/ventanas.webp',
    imageAlt: 'Ventanas inteligentes, persianas motorizadas y sensores Lumtek',
    logoSrc: '/images/app/icons/ventanas.svg',
    icon: Blinds,
    options: ['Ventana salón', 'Ventana dormitorio', 'Persianas', 'Apertura parcial', 'Sensor de apertura'],
    stats: ['3 ventanas conectadas', 'Modo ventilación', 'Escena mañana'],
  },
  {
    id: 'sistema-it',
    label: 'Sistemas',
    title: 'Sistemas IT',
    menuDescription: 'Red, WiFi y dispositivos.',
    detailDescription: 'Conectividad, estado de red y dispositivos enlazados.',
    image: '/images/app/sistema-it.webp',
    imageAlt: 'Sistema IT, red WiFi y dispositivos conectados Lumtek',
    logoSrc: '/images/app/icons/sistema-it.svg',
    icon: Wifi,
    options: ['Red local', 'WiFi', 'Dispositivos', 'Seguridad de red', 'Estado del sistema'],
    stats: ['Red estable', '12 dispositivos', 'Acceso protegido'],
  },
]

export const getAppSection = (id: AppSectionId) =>
  appSections.find((s) => s.id === id) ?? appSections[0]
