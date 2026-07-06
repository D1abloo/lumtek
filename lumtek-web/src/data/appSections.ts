import type { LucideIcon } from 'lucide-react'
import {
  Blinds,
  Camera,
  DoorOpen,
  Lightbulb,
  Radio,
  ShieldAlert,
  Thermometer,
  Video,
  Wifi,
} from 'lucide-react'

export type AppSectionId =
  | 'puertas'
  | 'camaras'
  | 'ventanas'
  | 'iluminacion'
  | 'climatizacion'
  | 'alarmas'
  | 'sensores'
  | 'videoporteros'
  | 'sistema-it'

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
    label: 'Persianas',
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
    id: 'iluminacion',
    label: 'Iluminación',
    title: 'Iluminación inteligente',
    menuDescription: 'Luces, escenas y horarios.',
    detailDescription: 'Escenas, horarios y encendido automático por presencia.',
    image: '/images/app/iluminacion.webp',
    imageAlt: 'Control de iluminación inteligente y escenas Lumtek',
    logoSrc: '/images/app/icons/iluminacion.svg',
    icon: Lightbulb,
    options: ['Luces salón', 'Luces pasillo', 'Intensidad', 'Escena noche', 'Horarios'],
    stats: ['Escena activa', '6 circuitos', 'Modo automático'],
  },
  {
    id: 'climatizacion',
    label: 'Climatización',
    title: 'Climatización',
    menuDescription: 'Temperatura, modos y eficiencia.',
    detailDescription: 'Temperatura adaptada a horarios, presencia y eficiencia.',
    image: '/images/app/climatizacion.webp',
    imageAlt: 'Climatización inteligente y ahorro energético Lumtek',
    logoSrc: '/images/app/icons/climatizacion.svg',
    icon: Thermometer,
    options: ['22º', 'Modo auto', 'Horario', 'Ahorro', 'Zonas'],
    stats: ['Modo automático', 'Eficiencia activa', 'Confort estable'],
  },
  {
    id: 'alarmas',
    label: 'Alarmas',
    title: 'Alarmas conectadas',
    menuDescription: 'Avisos, estados y supervisión.',
    detailDescription: 'Avisos, estados y supervisión conectada en tiempo real.',
    image: '/images/app/alarmas.webp',
    imageAlt: 'Panel de alarmas y zonas de seguridad Lumtek',
    logoSrc: '/images/app/icons/alarmas.svg',
    icon: ShieldAlert,
    options: ['Perimetral', 'Interior', 'Sensores', 'Sirena', 'Avisos push'],
    stats: ['Sistema armado', 'Zonas activas', 'Alertas en vivo'],
  },
  {
    id: 'sensores',
    label: 'Sensores',
    title: 'Sensores conectados',
    menuDescription: 'Movimiento, apertura y alertas.',
    detailDescription: 'Movimiento, apertura, temperatura, fugas y presencia.',
    image: '/images/app/sensores.webp',
    imageAlt: 'Sensores de movimiento, apertura y alertas Lumtek',
    logoSrc: '/images/app/icons/sensores.svg',
    icon: Radio,
    options: ['Movimiento', 'Apertura', 'Temperatura', 'Presencia', 'Fugas'],
    stats: ['Alertas activas', '8 sensores', 'Tiempo real'],
  },
  {
    id: 'videoporteros',
    label: 'Videoporteros',
    title: 'Videoporteros IP',
    menuDescription: 'Comunicación y apertura remota.',
    detailDescription: 'Comunicación, apertura y registro de visitas.',
    image: '/images/app/videoporteros.webp',
    imageAlt: 'Videoportero con apertura remota Lumtek',
    logoSrc: '/images/app/icons/videoporteros.svg',
    icon: Video,
    options: ['Entrada principal', 'Abrir puerta', 'Historial', 'Videollamada', 'Visitas'],
    stats: ['En línea', 'Apertura remota', 'Registro activo'],
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
