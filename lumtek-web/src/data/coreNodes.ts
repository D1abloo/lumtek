import type { CoreNode } from '../types'

export const CORE_RING_RADIUS = 180
const STEP = 360 / 8

export const coreNodes: CoreNode[] = [
  {
    id: 'domotica',
    title: 'Domótica',
    icon: 'Home',
    description:
      'Centraliza iluminación, persianas, climatización y escenas para que cada estancia responda a tus rutinas y hábitos.',
    highlights: [
      'Iluminación por zonas y escenas',
      'Persianas y toldos programables',
      'Climatización adaptativa',
      'Modos hogar, ausencia y noche',
    ],
    angle: -90,
    radius: CORE_RING_RADIUS,
  },
  {
    id: 'camaras',
    title: 'Cámaras',
    icon: 'Camera',
    description:
      'Supervisa entradas, garajes e interiores con videovigilancia IP, grabación inteligente y alertas instantáneas al móvil.',
    highlights: [
      'Visualización en vivo HD',
      'Grabación por movimiento',
      'Alertas push al instante',
      'Visión nocturna y zoom digital',
    ],
    angle: -90 + STEP,
    radius: CORE_RING_RADIUS,
  },
  {
    id: 'accesos',
    title: 'Accesos',
    icon: 'DoorOpen',
    description:
      'Gestiona quién entra y cuándo con videoporteros, apertura remota y control de puertas desde una sola app.',
    highlights: [
      'Videoportero con apertura remota',
      'Registro de visitas y accesos',
      'Cerraduras y tags inteligentes',
      'Horarios y permisos por usuario',
    ],
    angle: -90 + STEP * 2,
    radius: CORE_RING_RADIUS,
  },
  {
    id: 'sensores',
    title: 'Sensores',
    icon: 'Radio',
    description:
      'Detecta movimiento, aperturas, temperatura o fugas para activar alarmas, automatizaciones y avisos en tiempo real.',
    highlights: [
      'Movimiento y presencia',
      'Apertura de puertas y ventanas',
      'Temperatura, humedad y fugas',
      'Integración con alarmas y luces',
    ],
    angle: -90 + STEP * 3,
    radius: CORE_RING_RADIUS,
  },
  {
    id: 'automatizacion',
    title: 'Automatización',
    icon: 'Zap',
    description:
      'Enlaza dispositivos con reglas inteligentes: si ocurre un evento, el sistema ejecuta la acción que definas.',
    highlights: [
      'Rutinas por horario o evento',
      'Acciones encadenadas entre módulos',
      'Modos día, noche y vacaciones',
      'Escenas con un solo toque',
    ],
    angle: -90 + STEP * 4,
    radius: CORE_RING_RADIUS,
  },
  {
    id: 'movil',
    title: 'Control móvil',
    icon: 'Smartphone',
    description:
      'Accede a cámaras, accesos, alarmas y domótica desde smartphone o tablet, estés donde estés.',
    highlights: [
      'App unificada Lumtek',
      'Notificaciones en tiempo real',
      'Control multiusuario',
      'Acceso seguro desde fuera',
    ],
    angle: -90 + STEP * 5,
    radius: CORE_RING_RADIUS,
  },
  {
    id: 'seguridad',
    title: 'Seguridad',
    icon: 'Shield',
    description:
      'Protege la instalación con accesos validados, comunicaciones cifradas y buenas prácticas de configuración.',
    highlights: [
      'Usuarios y permisos controlados',
      'Conexiones cifradas',
      'Separación de redes y dispositivos',
      'Auditoría de eventos críticos',
    ],
    angle: -90 + STEP * 6,
    radius: CORE_RING_RADIUS,
  },
  {
    id: 'integracion',
    title: 'Integración',
    icon: 'Network',
    description:
      'Unifica domótica, cámaras, accesos y sensores en un ecosistema coherente, escalable y fácil de ampliar.',
    highlights: [
      'Gateway y protocolos unificados',
      'Compatibilidad multi-marca',
      'Ampliación modular',
      'Supervisión centralizada',
    ],
    angle: -90 + STEP * 7,
    radius: CORE_RING_RADIUS,
  },
]
