import type { LucideIcon } from 'lucide-react'
import {
  Blinds,
  Camera,
  Car,
  DoorOpen,
  HardDrive,
  Lock,
  Monitor,
  Radio,
  Router,
  Shield,
  Smartphone,
  Thermometer,
  Video,
  Wifi,
  Wind,
} from 'lucide-react'
import type { AppSectionId } from './appSections'

export type SectionHotspot = {
  id: string
  label: string
  /** Texto corto bajo el título en el panel y tooltip */
  description: string
  /** Etiqueta superior en mayúsculas (ej. SECURITY) */
  tag?: string
  x: number
  y: number
  icon: LucideIcon
}

export type SectionHotspotMap = {
  sectionId: AppSectionId
  links: [string, string][]
  hotspots: SectionHotspot[]
}

export const sectionHotspotMaps: SectionHotspotMap[] = [
  {
    sectionId: 'puertas',
    links: [
      ['hub', 'puerta-principal'],
      ['hub', 'garaje'],
      ['hub', 'videoportero'],
      ['hub', 'apertura'],
      ['hub', 'estado'],
      ['puerta-principal', 'videoportero'],
    ],
    hotspots: [
      { id: 'hub', label: 'Control accesos', description: 'Panel central de puertas', tag: 'ACCESO', x: 52, y: 72, icon: Smartphone },
      { id: 'puerta-principal', label: 'Puerta principal', description: 'Apertura y cierre remoto', tag: 'PUERTA', x: 22, y: 58, icon: DoorOpen },
      { id: 'garaje', label: 'Garaje', description: 'Acceso vehicular automatizado', tag: 'GARAJE', x: 78, y: 62, icon: Car },
      { id: 'videoportero', label: 'Videoportero', description: 'Videollamada y apertura', tag: 'VIDEO', x: 18, y: 32, icon: Video },
      { id: 'apertura', label: 'Apertura remota', description: 'Desde app o mando', tag: 'REMOTO', x: 48, y: 42, icon: Lock },
      { id: 'estado', label: 'Estado cerrado', description: 'Cerradura verificada', tag: 'ESTADO', x: 68, y: 38, icon: Shield },
    ],
  },
  {
    sectionId: 'camaras',
    links: [
      ['hub', 'entrada'],
      ['hub', 'garaje'],
      ['hub', 'salon'],
      ['hub', 'acceso'],
      ['hub', 'grabaciones'],
      ['entrada', 'acceso'],
      ['salon', 'grabaciones'],
    ],
    hotspots: [
      { id: 'hub', label: 'Centro de cámaras', description: 'Vista unificada en vivo', tag: 'CENTRO', x: 50, y: 70, icon: Smartphone },
      { id: 'entrada', label: 'Entrada principal', description: 'Detección de movimiento', tag: 'CÁMARA', x: 20, y: 28, icon: Camera },
      { id: 'garaje', label: 'Garaje', description: 'Grabación continua HD', tag: 'CÁMARA', x: 82, y: 55, icon: Camera },
      { id: 'salon', label: 'Salón', description: 'Vigilancia interior', tag: 'CÁMARA', x: 55, y: 38, icon: Camera },
      { id: 'acceso', label: 'Acceso principal', description: 'Portero y cámara', tag: 'ACCESO', x: 28, y: 52, icon: Video },
      { id: 'grabaciones', label: 'Grabaciones', description: 'Historial de 30 días', tag: 'NUBE', x: 72, y: 28, icon: HardDrive },
    ],
  },
  {
    sectionId: 'ventanas',
    links: [
      ['hub', 'salon'],
      ['hub', 'dormitorio'],
      ['hub', 'persianas'],
      ['hub', 'parcial'],
      ['hub', 'sensor'],
      ['salon', 'persianas'],
      ['dormitorio', 'sensor'],
    ],
    hotspots: [
      { id: 'hub', label: 'Control ventanas', description: 'Escenas y automatización', tag: 'CONTROL', x: 48, y: 74, icon: Smartphone },
      { id: 'salon', label: 'Ventana salón', description: 'Luz natural regulada', tag: 'VENTANA', x: 72, y: 42, icon: Blinds },
      { id: 'dormitorio', label: 'Ventana dormitorio', description: 'Modo descanso activo', tag: 'VENTANA', x: 58, y: 30, icon: Wind },
      { id: 'persianas', label: 'Persianas', description: 'Subida y bajada automática', tag: 'MOTOR', x: 85, y: 48, icon: Blinds },
      { id: 'parcial', label: 'Apertura parcial', description: 'Ventilación programada', tag: 'MODO', x: 35, y: 45, icon: Radio },
      { id: 'sensor', label: 'Sensor de apertura', description: 'Alerta si queda abierta', tag: 'SENSOR', x: 22, y: 62, icon: Thermometer },
    ],
  },
  {
    sectionId: 'sistema-it',
    links: [
      ['hub', 'red'],
      ['hub', 'wifi'],
      ['hub', 'dispositivos'],
      ['hub', 'seguridad'],
      ['hub', 'estado'],
      ['red', 'wifi'],
      ['wifi', 'dispositivos'],
    ],
    hotspots: [
      { id: 'hub', label: 'Panel del sistema', description: 'Monitorización central', tag: 'SISTEMA', x: 50, y: 68, icon: Monitor },
      { id: 'red', label: 'Red local', description: 'LAN estable y optimizada', tag: 'RED', x: 30, y: 40, icon: Router },
      { id: 'wifi', label: 'WiFi', description: 'Cobertura total activa', tag: 'WIFI', x: 62, y: 32, icon: Wifi },
      { id: 'dispositivos', label: 'Dispositivos', description: '12 equipos en línea', tag: 'IOT', x: 78, y: 55, icon: Smartphone },
      { id: 'seguridad', label: 'Seguridad de red', description: 'Red doméstica protegida', tag: 'SECURITY', x: 22, y: 55, icon: Shield },
      { id: 'estado', label: 'Estado del sistema', description: 'Todos los nodos operativos', tag: 'ESTADO', x: 48, y: 48, icon: HardDrive },
    ],
  },
]

export const getSectionHotspotMap = (sectionId: AppSectionId) =>
  sectionHotspotMaps.find((m) => m.sectionId === sectionId)

const labelPlacement = (x: number, y: number, narrow = false) => {
  const vertical = narrow
    ? y < 50
      ? 'bottom'
      : 'top'
    : y < 42
      ? 'bottom'
      : 'top'
  const horizontal = narrow
    ? 'center'
    : x < 28
      ? 'right'
      : x > 72
        ? 'left'
        : 'center'
  return { vertical, horizontal }
}

export const getHotspotLabelClasses = (x: number, y: number, narrow = false) => {
  const { vertical, horizontal } = labelPlacement(x, y, narrow)
  const verticalClass =
    vertical === 'bottom'
      ? 'top-full mt-2 origin-top'
      : 'bottom-full mb-2 origin-bottom'
  const horizontalClass =
    horizontal === 'right'
      ? 'left-0 translate-x-0'
      : horizontal === 'left'
        ? 'right-0 translate-x-0'
        : 'left-1/2 -translate-x-1/2'
  const clampClass = narrow ? 'max-w-[4.75rem]' : ''
  return `${verticalClass} ${horizontalClass} ${clampClass}`.trim()
}
