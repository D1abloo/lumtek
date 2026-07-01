import type { Review } from '../types'

/** Reseñas ficticias orientativas — no representan opiniones verificadas de clientes reales. */
export const reviewsDisclaimer =
  'Comentarios orientativos basados en tipos habituales de proyecto.'

export const reviews: Review[] = [
  {
    id: 'laura-m',
    name: 'Laura M.',
    type: 'Vivienda particular',
    service: 'Domótica y cámaras',
    rating: 5,
    comment:
      'Queríamos poder ver la entrada de casa desde el móvil y automatizar algunas luces. Lumtek nos explicó todo de forma clara y dejó el sistema funcionando de manera sencilla para toda la familia.',
  },
  {
    id: 'comunidad-alameda',
    name: 'Comunidad Alameda',
    type: 'Comunidad de vecinos',
    service: 'Videovigilancia y accesos',
    rating: 5,
    comment:
      'Necesitábamos mejorar el control del portal y del garaje. La instalación quedó ordenada, las cámaras se ven muy bien y ahora tenemos más tranquilidad en las zonas comunes.',
  },
  {
    id: 'carlos-r',
    name: 'Carlos R.',
    type: 'Negocio local',
    service: 'Cámaras y supervisión remota',
    rating: 5,
    comment:
      'Buscaba un sistema que no fuera complicado. Ahora puedo revisar el local desde el móvil, recibir avisos y comprobar que todo está correcto al cerrar.',
  },
  {
    id: 'oficina-norte',
    name: 'Oficina Norte',
    type: 'Oficina',
    service: 'Control de accesos',
    rating: 4,
    comment:
      'Nos ayudaron a organizar los accesos y a mejorar la seguridad de varias zonas. Lo mejor fue que adaptaron la solución a nuestro funcionamiento diario.',
  },
  {
    id: 'marta-andres',
    name: 'Marta y Andrés',
    type: 'Vivienda familiar',
    service: 'Automatización',
    rating: 5,
    comment:
      'Nos instalaron escenas de iluminación, control de persianas y sensores. La casa es más cómoda y no necesitamos estar pendientes de todo manualmente.',
  },
  {
    id: 'local-centro',
    name: 'Local Centro',
    type: 'Local comercial',
    service: 'Seguridad tecnológica',
    rating: 5,
    comment:
      'La instalación de cámaras y sensores nos permitió controlar mejor el local. Todo quedó explicado y configurado para usarlo desde el teléfono.',
  },
  {
    id: 'residencia-verde',
    name: 'Residencia Verde',
    type: 'Edificio residencial',
    service: 'Sistemas integrados',
    rating: 5,
    comment:
      'Buscábamos unificar accesos, cámaras y automatización en zonas comunes. El resultado es ordenado, estable y fácil de gestionar para la administración.',
  },
]
