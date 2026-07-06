import type { LucideIcon } from 'lucide-react'
import {
  Blinds,
  Camera,
  Car,
  DoorOpen,
  HardDrive,
  Lightbulb,
  Lock,
  Monitor,
  Radio,
  Router,
  Shield,
  ShieldAlert,
  Smartphone,
  Thermometer,
  Video,
  Wifi,
  Wind,
  Zap,
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
  {
    sectionId: 'iluminacion',
    links: [
      ['hub', 'salon'],
      ['hub', 'pasillo'],
      ['hub', 'intensidad'],
      ['hub', 'escena'],
      ['hub', 'horario'],
      ['salon', 'escena'],
    ],
    hotspots: [
      { id: 'hub', label: 'Control luces', description: 'Panel de iluminación', tag: 'LUZ', x: 50, y: 72, icon: Smartphone },
      { id: 'salon', label: 'Luces salón', description: 'Intensidad y tono', tag: 'SALÓN', x: 68, y: 38, icon: Lightbulb },
      { id: 'pasillo', label: 'Luces pasillo', description: 'Encendido automático', tag: 'ZONA', x: 28, y: 48, icon: Zap },
      { id: 'intensidad', label: 'Intensidad', description: 'Regulación dimmer', tag: 'DIMMER', x: 52, y: 52, icon: Lightbulb },
      { id: 'escena', label: 'Escena noche', description: 'Ambiente programado', tag: 'ESCENA', x: 78, y: 58, icon: Lightbulb },
      { id: 'horario', label: 'Horarios', description: 'Rutinas diarias', tag: 'AUTO', x: 22, y: 30, icon: Radio },
    ],
  },
  {
    sectionId: 'climatizacion',
    links: [
      ['hub', 'termostato'],
      ['hub', 'modo'],
      ['hub', 'horario'],
      ['hub', 'ahorro'],
      ['hub', 'zonas'],
      ['termostato', 'modo'],
    ],
    hotspots: [
      { id: 'hub', label: 'Control clima', description: 'Temperatura central', tag: 'CLIMA', x: 48, y: 70, icon: Smartphone },
      { id: 'termostato', label: 'Termostato', description: '22º confort activo', tag: 'TEMP', x: 55, y: 42, icon: Thermometer },
      { id: 'modo', label: 'Modo auto', description: 'Ajuste inteligente', tag: 'AUTO', x: 30, y: 55, icon: Wind },
      { id: 'horario', label: 'Horario', description: 'Programación semanal', tag: 'HORARIO', x: 72, y: 35, icon: Radio },
      { id: 'ahorro', label: 'Ahorro', description: 'Eficiencia energética', tag: 'ECO', x: 78, y: 62, icon: Zap },
      { id: 'zonas', label: 'Zonas', description: 'Control por estancias', tag: 'ZONAS', x: 20, y: 38, icon: Thermometer },
    ],
  },
  {
    sectionId: 'alarmas',
    links: [
      ['hub', 'perimetral'],
      ['hub', 'interior'],
      ['hub', 'sirena'],
      ['hub', 'sensores'],
      ['hub', 'avisos'],
      ['perimetral', 'sensores'],
    ],
    hotspots: [
      { id: 'hub', label: 'Panel alarmas', description: 'Estado del sistema', tag: 'ALARMA', x: 50, y: 68, icon: Smartphone },
      { id: 'perimetral', label: 'Perimetral', description: 'Zona exterior armada', tag: 'ZONA', x: 24, y: 42, icon: ShieldAlert },
      { id: 'interior', label: 'Interior', description: 'Protección en casa', tag: 'INTERIOR', x: 62, y: 36, icon: Shield },
      { id: 'sirena', label: 'Sirena', description: 'Aviso sonoro activo', tag: 'SIRENA', x: 78, y: 55, icon: Zap },
      { id: 'sensores', label: 'Sensores', description: 'Detectores enlazados', tag: 'SENSOR', x: 38, y: 58, icon: Radio },
      { id: 'avisos', label: 'Avisos push', description: 'Alertas al móvil', tag: 'PUSH', x: 72, y: 28, icon: Lock },
    ],
  },
  {
    sectionId: 'sensores',
    links: [
      ['hub', 'movimiento'],
      ['hub', 'apertura'],
      ['hub', 'temperatura'],
      ['hub', 'presencia'],
      ['hub', 'fugas'],
      ['movimiento', 'presencia'],
    ],
    hotspots: [
      { id: 'hub', label: 'Centro sensores', description: 'Monitorización IoT', tag: 'IOT', x: 50, y: 70, icon: Smartphone },
      { id: 'movimiento', label: 'Movimiento', description: 'Detección en pasillo', tag: 'PIR', x: 52, y: 28, icon: Radio },
      { id: 'apertura', label: 'Apertura', description: 'Puerta y ventanas', tag: 'CONTACTO', x: 22, y: 52, icon: DoorOpen },
      { id: 'temperatura', label: 'Temperatura', description: 'Clima y humedad', tag: 'CLIMA', x: 75, y: 45, icon: Thermometer },
      { id: 'presencia', label: 'Presencia', description: 'Ocupación de zona', tag: 'PRESENCIA', x: 68, y: 62, icon: Wind },
      { id: 'fugas', label: 'Fugas', description: 'Agua y humo', tag: 'ALERTA', x: 32, y: 35, icon: ShieldAlert },
    ],
  },
  {
    sectionId: 'videoporteros',
    links: [
      ['hub', 'entrada'],
      ['hub', 'videollamada'],
      ['hub', 'abrir'],
      ['hub', 'historial'],
      ['hub', 'visitas'],
      ['entrada', 'videollamada'],
    ],
    hotspots: [
      { id: 'hub', label: 'Videoportero', description: 'Panel de entrada', tag: 'VIDEO', x: 48, y: 72, icon: Smartphone },
      { id: 'entrada', label: 'Entrada principal', description: 'Cámara y audio HD', tag: 'ACCESO', x: 35, y: 45, icon: Video },
      { id: 'videollamada', label: 'Videollamada', description: 'Comunicación en vivo', tag: 'EN VIVO', x: 58, y: 38, icon: Camera },
      { id: 'abrir', label: 'Abrir puerta', description: 'Apertura remota', tag: 'ABRIR', x: 72, y: 55, icon: Lock },
      { id: 'historial', label: 'Historial', description: 'Registro de visitas', tag: 'LOG', x: 20, y: 58, icon: HardDrive },
      { id: 'visitas', label: 'Visitas', description: 'Identificación activa', tag: 'VISITA', x: 78, y: 32, icon: DoorOpen },
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
