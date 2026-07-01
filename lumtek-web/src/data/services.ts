import type { Service } from '../types'

export const servicesIntro =
  'Desde la primera visita hasta la puesta en marcha, Lumtek acompaña cada proyecto para que cámaras, accesos, sensores, automatizaciones y sistemas conectados funcionen de forma sencilla, segura y adaptada al uso real del espacio.'

export const services: Service[] = [
  {
    id: 'domotica',
    title: 'Instalación de domótica',
    description:
      'Diseñamos e instalamos sistemas domóticos adaptados a viviendas, negocios, oficinas y comunidades, integrando dispositivos que facilitan el control diario del espacio.',
    details: [
      'Control de iluminación y escenas',
      'Persianas y automatizaciones',
      'Control desde móvil o tablet',
      'Integración con sensores y cámaras',
      'Configuración personalizada según cada estancia',
    ],
    icon: 'Home',
    tag: 'Domótica',
  },
  {
    id: 'videovigilancia',
    title: 'Videovigilancia',
    description:
      'Instalamos cámaras de seguridad y sistemas de visualización en vivo para supervisar accesos, interiores, garajes, negocios y zonas comunes desde cualquier lugar.',
    details: [
      'Cámaras IP interiores y exteriores',
      'Visualización en directo desde móvil',
      'Grabación y consulta de eventos',
      'Detección de movimiento',
      'Configuración segura de accesos',
    ],
    icon: 'Camera',
    tag: 'Seguridad',
  },
  {
    id: 'accesos',
    title: 'Control de accesos',
    description:
      'Creamos soluciones para controlar entradas, accesos principales, comunidades, oficinas y zonas privadas mediante sistemas inteligentes y cómodos de gestionar.',
    details: [
      'Videoporteros',
      'Apertura remota',
      'Acceso por usuario o zona',
      'Registro de eventos',
      'Integración con cámaras y sensores',
    ],
    icon: 'DoorOpen',
    tag: 'Accesos',
  },
  {
    id: 'sensores',
    title: 'Sensores y detección',
    description:
      'Integramos sensores que permiten detectar movimiento, apertura, temperatura, presencia, humo, fugas o cualquier evento relevante dentro del sistema.',
    details: [
      'Sensores de movimiento',
      'Sensores de apertura',
      'Temperatura y climatización',
      'Detección de presencia',
      'Alertas automáticas',
    ],
    icon: 'Activity',
    tag: 'Detección',
  },
  {
    id: 'clima-luz',
    title: 'Climatización e iluminación inteligente',
    description:
      'Configuramos sistemas que ayudan a mejorar la comodidad y la eficiencia energética mediante horarios, escenas, rutinas y control remoto.',
    details: [
      'Encendido y apagado automático',
      'Control por horarios',
      'Escenas personalizadas',
      'Gestión por presencia',
      'Optimización energética',
    ],
    icon: 'Lightbulb',
    tag: 'Confort',
  },
  {
    id: 'integrados',
    title: 'Sistemas integrados',
    description:
      'Unificamos diferentes dispositivos y tecnologías para que trabajen juntos dentro de un mismo entorno de control sencillo y funcional.',
    details: [
      'Integración de cámaras, sensores y accesos',
      'Automatizaciones entre dispositivos',
      'Control centralizado',
      'Escenas combinadas',
      'Soluciones escalables',
    ],
    icon: 'Layers',
    tag: 'Integración',
  },
  {
    id: 'seguridad-tech',
    title: 'Seguridad tecnológica',
    description:
      'Configuramos los sistemas conectados con criterios de seguridad para proteger accesos, comunicaciones, dispositivos y usuarios.',
    details: [
      'Configuración segura',
      'Accesos protegidos',
      'Separación de dispositivos',
      'Revisión de permisos',
      'Mantenimiento preventivo',
    ],
    icon: 'ShieldCheck',
    tag: 'Protección',
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento y soporte',
    description:
      'Realizamos revisiones, ajustes y soporte para que la instalación se mantenga estable, actualizada y preparada para el uso diario.',
    details: [
      'Revisión periódica',
      'Ajustes de configuración',
      'Ampliaciones',
      'Diagnóstico de fallos',
      'Asistencia técnica',
    ],
    icon: 'Wrench',
    tag: 'Soporte',
  },
]
