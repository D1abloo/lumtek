import type { UseCasePageContent } from '../types'

export const useCasePageContent: Record<string, UseCasePageContent> = {
  viviendas: {
    metaTitle: 'Viviendas inteligentes | Domótica y seguridad Lumtek',
    metaDescription:
      'Soluciones de domótica, cámaras, accesos y control remoto para viviendas. Iluminación, persianas, videoportero y supervisión desde el móvil.',
    pageIntro:
      'Una vivienda inteligente combina comodidad, seguridad y control sencillo. Lumtek diseña e instala sistemas que permiten ver la entrada, automatizar luces y persianas, gestionar accesos y supervisar el hogar desde el móvil, adaptados al ritmo real de cada familia.',
    clientProfile:
      'Propietarios y familias que quieren un hogar más seguro, cómodo y fácil de gestionar desde el móvil.',
    highlightQuote:
      'Tu hogar conectado, con la tranquilidad de controlarlo estés donde estés.',
    challenge:
      'Muchos hogares quieren tecnología útil, pero sin complicar la vida diaria. Luces que no responden, cámaras mal ubicadas o automatizaciones difíciles de usar generan frustración en lugar de tranquilidad.',
    approach:
      'Analizamos cada estancia, los hábitos de la familia y los puntos críticos de seguridad. Instalamos solo lo necesario, lo configuramos con criterio y dejamos el sistema listo para que cualquier miembro de la casa lo use con confianza.',
    solutions: [
      {
        title: 'Videovigilancia interior y exterior',
        description:
          'Cámaras en entradas, jardín o zonas clave con visualización en vivo, grabación por eventos y avisos al móvil cuando algo requiere atención.',
      },
      {
        title: 'Iluminación y escenas domóticas',
        description:
          'Control de luces por zonas, escenas de bienvenida, noche o ausencia, y programación horaria para ganar confort y eficiencia.',
      },
      {
        title: 'Persianas y automatizaciones',
        description:
          'Apertura y cierre programado o por sensores, integrado con iluminación y rutinas que simplifican el día a día.',
      },
      {
        title: 'Videoportero y accesos',
        description:
          'Ver quién llama, abrir desde el móvil, registrar visitas y combinar acceso inteligente con cámaras de la entrada.',
      },
      {
        title: 'Control remoto unificado',
        description:
          'Supervisión y gestión desde smartphone o tablet: cámaras, luces, persianas y sensores en una experiencia ordenada.',
      },
    ],
    systems: ['Cámaras IP', 'Iluminación inteligente', 'Persianas motorizadas', 'Videoportero', 'Sensores', 'App móvil'],
    benefits: [
      'Mayor tranquilidad al ver y controlar el hogar a distancia',
      'Automatizaciones que ahorran tiempo cada día',
      'Sistema explicado y configurado para toda la familia',
      'Instalación ordenada y segura, pensada para crecer',
    ],
  },
  comunidades: {
    metaTitle: 'Comunidades | Accesos y videovigilancia Lumtek',
    metaDescription:
      'Videoporteros, control de accesos y cámaras para comunidades de vecinos. Portal, garaje y zonas comunes con supervisión centralizada.',
    pageIntro:
      'Las comunidades necesitan controlar accesos, proteger zonas comunes y dar tranquilidad a los vecinos. Lumtek instala videoporteros, cámaras en portal y garaje, y sistemas de apertura remota con una gestión clara para administradores y usuarios.',
    clientProfile:
      'Comunidades de vecinos y administradores que necesitan más control en portales, garajes y zonas comunes.',
    highlightQuote:
      'Más seguridad y orden en los espacios compartidos, con gestión clara para todos.',
    challenge:
      'Portales sin control adecuado, garajes poco supervisados o sistemas antiguos que no se integran generan inseguridad y quejas recurrentes en la comunidad.',
    approach:
      'Estudiamos accesos, flujos de personas y puntos vulnerables. Proponemos una solución escalable, con instalación limpia en zonas comunes y formación para quien gestione el sistema.',
    solutions: [
      {
        title: 'Videoportero y apertura remota',
        description:
          'Comunicación con la entrada, apertura desde el móvil y registro de accesos para vecinos y visitas autorizadas.',
      },
      {
        title: 'Cámaras en portal y garaje',
        description:
          'Vigilancia de entradas, rampas y zonas de aparcamiento con visualización en directo y consulta de eventos.',
      },
      {
        title: 'Control de accesos comunes',
        description:
          'Gestión de acceso a trasteros, zonas restringidas o puertas secundarias con permisos por usuario o horario.',
      },
      {
        title: 'Supervisión centralizada',
        description:
          'Panel o app para revisar cámaras y eventos, con avisos cuando algo requiere atención de la administración.',
      },
      {
        title: 'Mantenimiento y ampliación',
        description:
          'Soporte para ampliar cámaras, ajustar accesos o integrar nuevas zonas conforme evoluciona la comunidad.',
      },
    ],
    systems: ['Videoportero IP', 'Cámaras exteriores', 'Control de accesos', 'Grabación en red', 'Apertura remota'],
    benefits: [
      'Más control sobre entradas y zonas compartidas',
      'Instalación discreta y profesional en áreas comunes',
      'Tranquilidad para vecinos y administradores',
      'Sistema preparado para ampliarse con el tiempo',
    ],
  },
  oficinas: {
    metaTitle: 'Oficinas | Control de accesos y automatización Lumtek',
    metaDescription:
      'Soluciones para oficinas: accesos por zona, cámaras, salas conectadas y automatización de climatización e iluminación.',
    pageIntro:
      'Una oficina conectada mejora la seguridad, el confort y la eficiencia del equipo. Lumtek integra accesos por usuario, supervisión de espacios, salas inteligentes y automatización del entorno de trabajo.',
    clientProfile:
      'Empresas y equipos que buscan accesos organizados, espacios supervisados y mayor eficiencia diaria.',
    highlightQuote:
      'Una oficina más segura y cómoda, adaptada a cómo trabajáis cada día.',
    challenge:
      'Oficinas con accesos poco definidos, salas sin control o sistemas aislados dificultan la operativa diaria y la seguridad de personas y equipamiento.',
    approach:
      'Mapeamos zonas, horarios y perfiles de acceso. Diseñamos una solución que se adapta al funcionamiento real de la empresa, sin interrumpir la actividad más de lo necesario.',
    solutions: [
      {
        title: 'Accesos por usuario y zona',
        description:
          'Control de entradas, salas restringidas y horarios laborales con registro de eventos y permisos diferenciados.',
      },
      {
        title: 'Videovigilancia de espacios',
        description:
          'Cámaras en recepción, pasillos o zonas sensibles con supervisión remota y alertas configurables.',
      },
      {
        title: 'Salas de reunión conectadas',
        description:
          'Iluminación, climatización y escenas preparadas para reuniones, presentaciones o modo ausencia.',
      },
      {
        title: 'Automatización del entorno',
        description:
          'Encendido y apagado por horarios, presencia o rutinas que optimizan confort y consumo energético.',
      },
      {
        title: 'Integración y escalabilidad',
        description:
          'Unificación de accesos, cámaras y automatización en un ecosistema coherente y ampliable.',
      },
    ],
    systems: ['Control de accesos', 'Cámaras IP', 'Climatización', 'Iluminación', 'Sensores de presencia'],
    benefits: [
      'Seguridad alineada con el funcionamiento de la empresa',
      'Entorno más cómodo y eficiente para el equipo',
      'Supervisión remota de espacios clave',
      'Solución profesional y mantenible',
    ],
  },
  negocios: {
    metaTitle: 'Negocios | Cámaras, alarmas y supervisión Lumtek',
    metaDescription:
      'Protege tu negocio con cámaras en vivo, alarmas, sensores y control remoto. Supervisión y automatización para comercios y actividades.',
    pageIntro:
      'Un negocio necesita saber qué ocurre cuando no hay nadie, reaccionar ante incidentes y simplificar apertura y cierre. Lumtek instala cámaras, alarmas conectadas, sensores y automatizaciones pensadas para la operativa diaria de tu actividad.',
    clientProfile:
      'Autónomos y negocios que necesitan proteger su actividad y supervisar el local con confianza.',
    highlightQuote:
      'Tu negocio vigilado y bajo control, incluso cuando no estás presente.',
    challenge:
      'Horarios largos, personal rotativo y la necesidad de proteger stock o equipamiento exigen sistemas fiables, no complicados de usar.',
    approach:
      'Entendemos el tipo de negocio, los horarios y los puntos críticos. Configuramos alertas útiles, acceso remoto y una instalación que no estorbe la actividad comercial.',
    solutions: [
      {
        title: 'Cámaras en directo',
        description:
          'Visualización del local en tiempo real desde el móvil, con grabación y consulta de momentos relevantes.',
      },
      {
        title: 'Alarmas y notificaciones',
        description:
          'Detección de intrusión, apertura inesperada o eventos configurados con avisos inmediatos al responsable.',
      },
      {
        title: 'Supervisión remota',
        description:
          'Comprobar que todo está correcto al abrir, cerrar o durante el día sin desplazarte al local.',
      },
      {
        title: 'Automatización de apertura y cierre',
        description:
          'Rutinas que encienden luces, desactivan alarmas o preparan el espacio según el horario del negocio.',
      },
      {
        title: 'Sensores y climatización',
        description:
          'Control de temperatura, humedad o presencia para proteger productos y mejorar el confort del local.',
      },
    ],
    systems: ['Cámaras IP', 'Alarmas', 'Sensores', 'Iluminación', 'Control remoto'],
    benefits: [
      'Mayor control sobre el local fuera del horario comercial',
      'Alertas útiles, no falsas alarmas innecesarias',
      'Instalación adaptada al tipo de actividad',
      'Soporte para ajustes y ampliaciones',
    ],
  },
  locales: {
    metaTitle: 'Locales comerciales | Videovigilancia y control Lumtek',
    metaDescription:
      'Videovigilancia, alertas y apertura automatizada para locales comerciales. Control remoto y seguridad operativa con Lumtek.',
    pageIntro:
      'Un local comercial requiere vigilancia constante, control de accesos y respuesta rápida ante incidencias. Lumtek diseña instalaciones con cámaras, sensores, alertas y gestión remota adaptadas al tamaño y uso del establecimiento.',
    clientProfile:
      'Comercios y locales que quieren videovigilancia, alertas y gestión remota sin complicaciones.',
    highlightQuote:
      'Más tranquilidad al abrir y cerrar, con el local siempre a un toque de distancia.',
    challenge:
      'Escaparates, almacén y caja registran movimiento constante. Sin un sistema bien planteado, es difícil detectar problemas a tiempo o supervisar el local con confianza.',
    approach:
      'Analizamos el diseño del local, los horarios y los riesgos operativos. Instalamos equipos en puntos estratégicos y configuramos el acceso móvil para el responsable del negocio.',
    solutions: [
      {
        title: 'Videovigilancia del local',
        description:
          'Cámaras en entrada, sala de venta y almacén con imagen clara y consulta desde el teléfono.',
      },
      {
        title: 'Control de accesos',
        description:
          'Apertura remota, horarios y registro de entradas para empleados, proveedores o personal autorizado.',
      },
      {
        title: 'Alertas y eventos',
        description:
          'Notificaciones por movimiento, apertura fuera de horario o situaciones configuradas según el negocio.',
      },
      {
        title: 'Gestión de apertura',
        description:
          'Automatización de luces, persiana o alarma al abrir y cerrar, reduciendo pasos manuales cada día.',
      },
      {
        title: 'Seguridad operativa',
        description:
          'Configuración segura, revisión de permisos y buenas prácticas para proteger datos y dispositivos.',
      },
    ],
    systems: ['Cámaras', 'Sensores de apertura', 'Alarmas', 'Accesos', 'App móvil'],
    benefits: [
      'Visibilidad del local en cualquier momento',
      'Menos preocupación al cerrar por la noche',
      'Sistema sencillo para el día a día',
      'Instalación profesional y ordenada',
    ],
  },
  edificios: {
    metaTitle: 'Edificios | Sistemas centralizados y domótica Lumtek',
    metaDescription:
      'Automatización, monitorización y sistemas integrados para edificios. Control por zonas, accesos y vigilancia centralizada.',
    pageIntro:
      'Los edificios con múltiples zonas, accesos y sistemas requieren una visión global. Lumtek integra domótica, cámaras, sensores y control de accesos en una plataforma centralizada, escalable y mantenible.',
    clientProfile:
      'Edificios y grandes instalaciones que requieren integración, supervisión central y sistemas escalables.',
    highlightQuote:
      'Toda la instalación coordinada, con una visión clara de cada zona.',
    challenge:
      'Instalaciones fragmentadas, protocolos incompatibles o falta de supervisión unificada complican la gestión y aumentan costes de mantenimiento.',
    approach:
      'Diseñamos por zonas, priorizamos la integración y dejamos un panel de control claro para administradores o equipos de mantenimiento.',
    solutions: [
      {
        title: 'Integración de sistemas',
        description:
          'Unificación de cámaras, accesos, sensores y automatización bajo un mismo criterio de gestión.',
      },
      {
        title: 'Monitorización centralizada',
        description:
          'Supervisión de eventos, alarmas y estado de dispositivos desde un punto de control único.',
      },
      {
        title: 'Automatización por zonas',
        description:
          'Iluminación, climatización y rutinas diferenciadas según plantas, áreas comunes o espacios técnicos.',
      },
      {
        title: 'Accesos y vigilancia',
        description:
          'Control de entradas, garajes, zonas restringidas y videovigilancia en puntos estratégicos del edificio.',
      },
      {
        title: 'Gestión inteligente de instalaciones',
        description:
          'Mantenimiento preventivo, ampliaciones modulares y soporte para evolucionar el sistema con el edificio.',
      },
    ],
    systems: ['Gateway central', 'Cámaras IP', 'Accesos', 'Sensores', 'Domótica por zonas', 'Monitorización'],
    benefits: [
      'Visión global de todo el edificio',
      'Menos sistemas aislados y más coherencia',
      'Escalabilidad para nuevas zonas o plantas',
      'Acompañamiento técnico a largo plazo',
    ],
  },
}
