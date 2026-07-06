import type { UseCase } from '../types'
import { useCasePageContent } from './useCaseContent'
import type { UseCaseFull } from '../types'

export const getUseCaseBySlug = (slug: string): UseCaseFull | undefined => {
  const base = useCases.find((item) => item.id === slug)
  const content = useCasePageContent[slug]
  if (!base || !content) return undefined
  return { ...base, ...content }
}

/** Imágenes temáticas locales (sin dependencias externas). */
export const useCases: UseCase[] = [
  {
    id: 'viviendas',
    title: 'Viviendas inteligentes',
    description:
      'Cámaras, iluminación, accesos y control remoto para un hogar conectado, seguro y cómodo.',
    details: [
      'Control de cámaras desde móvil',
      'Automatización de iluminación y persianas',
      'Videoportero y accesos inteligentes',
      'Escenas personalizadas',
      'Seguridad y supervisión remota',
    ],
    icon: 'House',
    image: '/images/use-cases/vivienda.webp',
    alt: 'Vivienda unifamiliar moderna con domótica y sistemas conectados',
  },
  {
    id: 'comunidades',
    title: 'Comunidades',
    description:
      'Videoporteros, accesos y videovigilancia en zonas comunes con supervisión centralizada.',
    details: [
      'Control de accesos en zonas comunes',
      'Videovigilancia de entradas y garajes',
      'Apertura remota',
      'Gestión centralizada',
      'Seguridad comunitaria',
    ],
    icon: 'Building2',
    image: '/images/use-cases/comunidad.webp',
    alt: 'Comunidad de vecinos y edificio residencial con control de accesos',
  },
  {
    id: 'oficinas',
    title: 'Oficinas',
    description:
      'Control de accesos, cámaras, salas inteligentes y automatización corporativa.',
    details: [
      'Accesos por usuario o zona',
      'Supervisión de espacios',
      'Salas conectadas',
      'Automatización de climatización e iluminación',
      'Gestión eficiente del entorno',
    ],
    icon: 'Briefcase',
    image: '/images/use-cases/oficina.webp',
    alt: 'Oficina corporativa con salas conectadas y control de accesos',
  },
  {
    id: 'negocios',
    title: 'Negocios',
    description:
      'Alarmas, cámaras en vivo, climatización y supervisión para proteger tu actividad.',
    details: [
      'Cámaras en directo',
      'Alarmas y notificaciones',
      'Supervisión remota',
      'Automatización de apertura y cierre',
      'Protección del negocio',
    ],
    icon: 'Store',
    image: '/images/use-cases/negocio.webp',
    alt: 'Negocio con videovigilancia y sistemas de seguridad conectados',
  },
  {
    id: 'locales',
    title: 'Locales comerciales',
    description:
      'Videovigilancia, alertas, apertura automatizada y control remoto del local.',
    details: [
      'Control de accesos',
      'Visualización desde móvil',
      'Alertas y eventos',
      'Gestión de apertura',
      'Seguridad operativa',
    ],
    icon: 'ShoppingBag',
    image: '/images/use-cases/local.webp',
    alt: 'Local comercial con videovigilancia y control remoto',
  },
  {
    id: 'edificios',
    title: 'Edificios',
    description:
      'Automatización, monitorización y sistemas centralizados para grandes instalaciones.',
    details: [
      'Integración de sistemas',
      'Monitorización centralizada',
      'Automatización por zonas',
      'Accesos y vigilancia',
      'Gestión inteligente de instalaciones',
    ],
    icon: 'Building',
    image: '/images/use-cases/edificio.webp',
    alt: 'Edificio inteligente con sistemas centralizados de domótica y seguridad',
  },
]

export const processSteps = [
  { step: 1, title: 'Análisis', description: 'Estudiamos el espacio y la necesidad concreta del cliente.' },
  { step: 2, title: 'Diseño', description: 'Planteamos la solución técnica adecuada y el presupuesto.' },
  { step: 3, title: 'Instalación', description: 'Montamos y configuramos los dispositivos con criterio profesional.' },
  { step: 4, title: 'Integración', description: 'Conectamos cámaras, sensores, accesos y automatizaciones.' },
  { step: 5, title: 'Verificación', description: 'Comprobamos funcionamiento, seguridad y control remoto.' },
  { step: 6, title: 'Soporte', description: 'Mantenemos la instalación preparada para el día a día.' },
]

export const securityBlocks = [
  { title: 'Accesos protegidos', description: 'Usuarios autorizados, contraseñas seguras y validación adecuada en cada punto de entrada.', icon: 'Lock' },
  { title: 'Conexiones seguras', description: 'Cifrado y buenas prácticas para el acceso remoto y la comunicación entre dispositivos.', icon: 'Wifi' },
  { title: 'Separación de sistemas', description: 'Evitar que todos los dispositivos estén expuestos del mismo modo en la red.', icon: 'GitBranch' },
  { title: 'Actualización y mantenimiento', description: 'Revisión periódica para evitar fallos, vulnerabilidades y obsolescencia.', icon: 'RefreshCw' },
  { title: 'Privacidad', description: 'Uso responsable de cámaras, grabaciones y control de accesos conforme a normativa.', icon: 'EyeOff' },
  { title: 'Continuidad', description: 'Instalaciones preparadas para crecer y mantenerse estables a largo plazo.', icon: 'TrendingUp' },
]

export const securityChecklist = [
  'Acceso validado',
  'Conexión segura',
  'Cámara protegida',
  'Sistema operativo',
  'Supervisión activa',
]

export const benefits = [
  { title: 'Control desde cualquier lugar', description: 'Supervisa y gestiona tu instalación desde el móvil.', icon: 'Smartphone' },
  { title: 'Seguridad en tiempo real', description: 'Cámaras, alertas y accesos conectados al instante.', icon: 'Shield' },
  { title: 'Automatización inteligente', description: 'Rutinas que adaptan iluminación, clima y persianas.', icon: 'Zap' },
  { title: 'Instalación profesional', description: 'Diseño, montaje y configuración con criterio técnico.', icon: 'Wrench' },
]
