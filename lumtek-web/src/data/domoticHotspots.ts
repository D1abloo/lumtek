export type HotspotEffect = 'camera' | 'climate' | 'access' | 'lighting' | 'blinds' | 'mobile'

export type DomoticHotspot = {
  id: string
  title: string
  description: string
  x: string
  y: string
  ariaLabel: string
  effect: HotspotEffect
  /** Halo sobre el objeto real (distinto del punto del hotspot) */
  zone: {
    x: string
    y: string
    width: string
    height: string
  }
}

export const domoticHotspots: DomoticHotspot[] = [
  {
    id: 'camera',
    title: 'Videovigilancia conectada',
    description:
      'Supervisión de entradas e interiores desde el móvil, con control seguro y visualización remota.',
    x: '4%',
    y: '19%',
    ariaLabel: 'Ver información sobre videovigilancia conectada',
    effect: 'camera',
    zone: { x: '4%', y: '17%', width: '14%', height: '10%' },
  },
  {
    id: 'climate',
    title: 'Climatización inteligente',
    description:
      'Control de temperatura, horarios y eficiencia energética desde un sistema conectado.',
    x: '8%',
    y: '41%',
    ariaLabel: 'Ver información sobre climatización inteligente',
    effect: 'climate',
    zone: { x: '5%', y: '36%', width: '16%', height: '14%' },
  },
  {
    id: 'access',
    title: 'Acceso seguro',
    description: 'Control de entradas, apertura remota y gestión de accesos protegidos.',
    x: '24%',
    y: '77%',
    ariaLabel: 'Ver información sobre acceso seguro',
    effect: 'access',
    zone: { x: '18%', y: '72%', width: '18%', height: '14%' },
  },
  {
    id: 'lighting',
    title: 'Iluminación inteligente',
    description: 'Escenas de luz, automatización por presencia y control desde app.',
    x: '56%',
    y: '17%',
    ariaLabel: 'Ver información sobre iluminación inteligente',
    effect: 'lighting',
    zone: { x: '48%', y: '11%', width: '20%', height: '16%' },
  },
  {
    id: 'blinds',
    title: 'Persianas automatizadas',
    description:
      'Subida, bajada y programación de persianas según horarios, escenas o rutinas.',
    x: '90%',
    y: '43%',
    ariaLabel: 'Ver información sobre persianas automatizadas',
    effect: 'blinds',
    zone: { x: '78%', y: '28%', width: '18%', height: '32%' },
  },
  {
    id: 'mobile',
    title: 'Control desde móvil',
    description:
      'Centraliza cámaras, luces, accesos y escenas desde una única experiencia sencilla.',
    x: '62%',
    y: '77%',
    ariaLabel: 'Ver información sobre control desde móvil',
    effect: 'mobile',
    zone: { x: '54%', y: '72%', width: '18%', height: '14%' },
  },
]

export const DOMOTICA_IMAGE = {
  src: '/images/hero/domotica.webp',
  alt: 'Domótica y sistemas inteligentes Lumtek',
}
