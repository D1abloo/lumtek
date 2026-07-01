import type { LegalSection } from '../types'

export const legalMeta = {
  titular: 'Lumtek',
  ubicacion: 'España',
  telefono: 'Pendiente de completar',
  cif: 'Pendiente de completar',
  web: 'https://lumtek.es',
}

const disclaimer =
  'Este contenido es orientativo y debe ser revisado por el titular de la web o un asesor legal antes de su publicación definitiva.'

export const legalNoticeSections: LegalSection[] = [
  {
    id: 'identificacion',
    title: '1. Identificación del titular',
    paragraphs: [
      `En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el titular de este sitio web es ${legalMeta.titular}.`,
      `Los datos identificativos completos, incluido CIF/NIF (${legalMeta.cif}), domicilio social y datos registrales, deben ser completados por el titular antes de la publicación oficial del sitio.`,
      disclaimer,
    ],
  },
  {
    id: 'contacto',
    title: '2. Datos de contacto',
    paragraphs: [
      `Puede contactar a través del formulario disponible en ${legalMeta.web}/contacto.`,
      `Teléfono de contacto: ${legalMeta.telefono}.`,
      `Ubicación de referencia para la actividad comercial: ${legalMeta.ubicacion}.`,
      'El usuario puede utilizar estos medios para consultas relacionadas con el sitio web, servicios de domótica, sistemas inteligentes o aspectos legales.',
    ],
  },
  {
    id: 'objeto',
    title: '3. Objeto del sitio web',
    paragraphs: [
      'El presente sitio web tiene por objeto informar sobre los servicios de Lumtek en materia de domótica, sistemas inteligentes, videovigilancia, control de accesos, sensores, automatización, seguridad tecnológica, IoT e integración de sistemas.',
      'A través de este sitio, el usuario puede conocer soluciones para viviendas, empresas, comunidades, oficinas, comercios y edificios, así como solicitar información o contacto comercial.',
      'El acceso al sitio implica la aceptación de las condiciones aquí descritas, sin perjuicio de las condiciones particulares que puedan aplicarse a determinados servicios contratados.',
    ],
  },
  {
    id: 'condiciones',
    title: '4. Condiciones de uso',
    paragraphs: [
      'El usuario se compromete a utilizar el sitio web de forma diligente, lícita y conforme a la buena fe, absteniéndose de realizar actividades que puedan dañar, inutilizar o sobrecargar el sitio.',
      'Queda prohibido el uso del sitio con fines fraudulentos, la introducción de virus o código malicioso, y cualquier intento de acceso no autorizado a sistemas o datos.',
      'Lumtek se reserva el derecho de denegar o retirar el acceso al sitio a usuarios que incumplan estas condiciones.',
    ],
  },
  {
    id: 'responsabilidad-usuario',
    title: '5. Responsabilidad del usuario',
    paragraphs: [
      'El usuario es responsable de la veracidad de los datos que facilite a través de formularios de contacto u otros medios habilitados en el sitio.',
      'Asimismo, será responsable del uso que realice de la información publicada y de las consecuencias derivadas de un uso indebido del sitio web.',
      'En caso de registro o comunicación de datos, el usuario garantiza que tiene capacidad legal suficiente para ello.',
    ],
  },
  {
    id: 'propiedad-intelectual',
    title: '6. Propiedad intelectual',
    paragraphs: [
      'Todos los contenidos del sitio web, incluyendo textos, imágenes, logotipos, iconos, diseño, código fuente y estructura, están protegidos por derechos de propiedad intelectual e industrial.',
      'Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa del titular, salvo en los casos legalmente permitidos.',
      'El uso no autorizado de los contenidos podrá dar lugar a las responsabilidades legalmente establecidas.',
    ],
  },
  {
    id: 'propiedad-industrial',
    title: '7. Propiedad industrial',
    paragraphs: [
      'Las marcas, nombres comerciales o signos distintivos que aparezcan en el sitio son titularidad de Lumtek o de terceros autorizados.',
      'Su uso sin consentimiento expreso está prohibido y puede constituir infracción de la normativa de propiedad industrial.',
      'El titular podrá actualizar la información relativa a signos distintivos conforme a su registro oficial.',
    ],
  },
  {
    id: 'enlaces',
    title: '8. Enlaces externos',
    paragraphs: [
      'El sitio web puede contener enlaces a páginas de terceros con el único fin de facilitar información o recursos complementarios.',
      'Lumtek no controla ni se responsabiliza del contenido, políticas o prácticas de sitios web externos.',
      'El establecimiento de un enlace no implica relación, aprobación o respaldo alguno por parte del titular.',
    ],
  },
  {
    id: 'exclusion-garantias',
    title: '9. Exclusión de garantías',
    paragraphs: [
      'Lumtek no garantiza la ausencia de interrupciones o errores en el acceso al sitio web, ni que el contenido esté libre de virus u otros elementos lesivos, aunque adoptará medidas razonables para evitarlos.',
      'El sitio se ofrece "tal cual", dentro de las posibilidades técnicas y de mantenimiento disponibles.',
      'Las especificaciones técnicas de productos o sistemas mostrados tienen carácter informativo y pueden variar según fabricante o instalación.',
    ],
  },
  {
    id: 'responsabilidad-contenidos',
    title: '10. Responsabilidad sobre contenidos',
    paragraphs: [
      'Lumtek procurará que la información publicada sea exacta y esté actualizada, pero no garantiza la ausencia total de errores u omisiones.',
      'El titular no será responsable de daños derivados del uso de la información del sitio cuando esta haya sido modificada por terceros o se haya producido por causas ajenas a su control.',
      'Los contenidos orientativos sobre domótica y sistemas no sustituyen un estudio técnico personalizado.',
    ],
  },
  {
    id: 'uso-correcto',
    title: '11. Uso correcto del sitio',
    paragraphs: [
      'El usuario deberá utilizar el sitio conforme a la legalidad vigente, al orden público y a las presentes condiciones.',
      'Está prohibido suplantar identidades, enviar comunicaciones masivas no solicitadas o utilizar formularios con fines distintos a los previstos.',
      'Lumtek podrá bloquear comunicaciones o solicitudes que considere abusivas o fraudulentas.',
    ],
  },
  {
    id: 'proteccion-datos',
    title: '12. Protección de datos',
    paragraphs: [
      'El tratamiento de datos personales se rige por la Política de Privacidad del sitio web, disponible en la sección correspondiente.',
      'El usuario puede consultar finalidades, legitimación, plazos de conservación y derechos aplicables en dicha política.',
      'Para ejercer derechos de acceso, rectificación, supresión u otros, puede contactar en la dirección indicada en el apartado de contacto.',
    ],
  },
  {
    id: 'cookies',
    title: '13. Cookies',
    paragraphs: [
      'Este sitio web utiliza cookies y tecnologías similares conforme a lo descrito en la Política de Cookies.',
      'El usuario puede aceptar, rechazar o configurar las cookies opcionales desde el banner inicial o la página de configuración.',
      'Las cookies técnicas necesarias para el funcionamiento básico del sitio pueden permanecer activas según la normativa aplicable.',
    ],
  },
  {
    id: 'legislacion',
    title: '14. Legislación aplicable',
    paragraphs: [
      'Las presentes condiciones se rigen por la legislación española.',
      'Para la resolución de controversias, las partes se someterán a los juzgados y tribunales que correspondan según la normativa de consumidores y usuarios o, en su caso, al fuero que resulte de aplicación.',
      'Si alguna cláusula fuera declarada nula, el resto mantendrá su vigencia.',
    ],
  },
  {
    id: 'modificaciones',
    title: '15. Modificaciones del aviso legal',
    paragraphs: [
      'Lumtek se reserva el derecho de modificar el presente aviso legal para adaptarlo a cambios legislativos, técnicos o de funcionamiento del sitio.',
      'Las modificaciones serán publicadas en esta misma página y entrarán en vigor desde su publicación.',
      'Se recomienda revisar periódicamente este documento. Última revisión orientativa: junio de 2026.',
    ],
  },
]

export const privacySections: LegalSection[] = [
  {
    id: 'responsable',
    title: '1. Responsable del tratamiento',
    paragraphs: [
      `El responsable del tratamiento de los datos personales es ${legalMeta.titular}. Para contactar, utilice el formulario disponible en ${legalMeta.web}/contacto.`,
      `Datos identificativos adicionales (CIF/NIF: ${legalMeta.cif}, domicilio social) deben completarse por el titular antes de publicación.`,
      disclaimer,
    ],
  },
  {
    id: 'finalidades',
    title: '2. Finalidades del tratamiento',
    paragraphs: [
      'Gestionar solicitudes de información, presupuestos o contacto relacionadas con servicios de domótica y sistemas inteligentes.',
      'Atender consultas comerciales y técnicas sobre videovigilancia, accesos, sensores, automatización e integración.',
      'Enviar comunicaciones solicitadas por el usuario y, si existe consentimiento, información comercial sobre servicios de Lumtek.',
      'Gestionar preferencias de cookies y mejorar la experiencia de navegación en el sitio web.',
    ],
  },
  {
    id: 'datos-recogidos',
    title: '3. Datos que se pueden recoger',
    paragraphs: [
      'Datos identificativos: nombre, apellidos, empresa, teléfono y correo electrónico.',
      'Datos de localización o proyecto: localidad, tipo de instalación o espacio a automatizar.',
      'Datos de navegación: dirección IP, dispositivo, cookies y estadísticas de uso cuando el usuario las acepte.',
      'Cualquier otro dato que el usuario facilite voluntariamente en formularios o comunicaciones.',
    ],
  },
  {
    id: 'formulario',
    title: '4. Formulario de contacto',
    paragraphs: [
      'Los datos enviados a través del formulario de contacto se utilizarán exclusivamente para responder a la solicitud del usuario.',
      'Los campos marcados como obligatorios son necesarios para gestionar la consulta de forma adecuada.',
      'El usuario debe aceptar la política de privacidad antes de enviar el formulario.',
    ],
  },
  {
    id: 'legitimacion',
    title: '5. Legitimación',
    paragraphs: [
      'Ejecución de medidas precontractuales o consentimiento del interesado para atender solicitudes de información.',
      'Interés legítimo en mejorar servicios y seguridad del sitio web, siempre respetando los derechos del usuario.',
      'Consentimiento expreso para cookies no técnicas, comunicaciones comerciales o tratamientos opcionales.',
    ],
  },
  {
    id: 'conservacion',
    title: '6. Conservación de datos',
    paragraphs: [
      'Los datos de contacto se conservarán mientras sea necesario para atender la solicitud y durante los plazos legales aplicables.',
      'Los datos derivados de cookies se conservarán según lo indicado en la Política de Cookies.',
      'Transcurridos los plazos, los datos serán bloqueados o eliminados de forma segura.',
    ],
  },
  {
    id: 'destinatarios',
    title: '7. Destinatarios',
    paragraphs: [
      'Los datos podrán comunicarse a proveedores que presten servicios necesarios (hosting, correo, analítica, formularios), con contrato de encargo de tratamiento cuando proceda.',
      'No se cederán datos a terceros con fines comerciales sin consentimiento expreso.',
      'Podrán comunicarse a autoridades públicas cuando exista obligación legal.',
    ],
  },
  {
    id: 'derechos',
    title: '8. Derechos del usuario',
    paragraphs: [
      'El usuario puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad.',
      'Cuando el tratamiento se base en consentimiento, podrá retirarlo en cualquier momento sin afectar a la licitud del tratamiento previo.',
      'También puede presentar reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
    ],
  },
  {
    id: 'ejercicio',
    title: '9. Cómo ejercer derechos',
    paragraphs: [
      `Para ejercer sus derechos, el usuario puede utilizar el formulario de contacto en ${legalMeta.web}/contacto, indicando el derecho que desea ejercer y acreditando su identidad.`,
      'Lumtek responderá en el plazo máximo establecido por la normativa vigente.',
      'Se podrá solicitar documentación adicional únicamente para verificar la identidad del solicitante.',
    ],
  },
  {
    id: 'seguridad',
    title: '10. Seguridad de los datos',
    paragraphs: [
      'Se aplican medidas técnicas y organizativas razonables para proteger los datos personales frente a accesos no autorizados, pérdida o alteración.',
      'Los sistemas de comunicación pueden utilizar cifrado y buenas prácticas de seguridad, especialmente en entornos de domótica y videovigilancia.',
      'Ningún sistema es completamente infalible; el usuario también debe proteger sus credenciales y dispositivos.',
    ],
  },
  {
    id: 'menores',
    title: '11. Menores de edad',
    paragraphs: [
      'Los servicios del sitio web no están dirigidos a menores de 14 años.',
      'Si se detecta el tratamiento de datos de menores sin consentimiento válido de padres o tutores, se procederá a su eliminación.',
      'Los padres o tutores pueden contactar para solicitar la supresión de datos de menores.',
    ],
  },
  {
    id: 'comunicaciones',
    title: '12. Comunicaciones comerciales',
    paragraphs: [
      'Solo se enviarán comunicaciones comerciales si el usuario ha dado su consentimiento o existe una relación contractual previa conforme a la ley.',
      'En cada comunicación se facilitará la posibilidad de darse de baja de forma sencilla.',
      'Las comunicaciones tratarán sobre servicios relacionados con domótica, sistemas inteligentes y seguridad tecnológica.',
    ],
  },
  {
    id: 'transferencias',
    title: '13. Transferencias internacionales',
    paragraphs: [
      'En principio, los datos se tratan dentro del Espacio Económico Europeo.',
      'Si algún proveedor implicara transferencias internacionales, se adoptarán garantías adecuadas conforme al RGPD.',
      'El titular actualizará esta información si incorpora servicios con tratamiento fuera del EEE.',
    ],
  },
  {
    id: 'cambios',
    title: '14. Cambios en la política',
    paragraphs: [
      'Esta política puede actualizarse para reflejar cambios legislativos o de los tratamientos realizados.',
      'Se recomienda revisarla periódicamente. La versión vigente estará siempre publicada en el sitio web.',
      'En caso de cambios sustanciales, se informará al usuario cuando sea legalmente requerido.',
    ],
  },
  {
    id: 'contacto-privacidad',
    title: '15. Contacto de privacidad',
    paragraphs: [
      `Para cualquier cuestión relacionada con privacidad y protección de datos, utilice el formulario de contacto en ${legalMeta.web}/contacto.`,
      `Ubicación de referencia: ${legalMeta.ubicacion}. Teléfono: ${legalMeta.telefono}.`,
      'Lumtek atenderá las consultas relacionadas con el tratamiento de datos personales con la mayor diligencia posible.',
    ],
  },
]

export const cookiesPolicySections: LegalSection[] = [
  {
    id: 'que-son',
    title: '1. Qué son las cookies',
    paragraphs: [
      'Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un sitio web.',
      'Permiten recordar preferencias, mejorar la navegación y, en algunos casos, analizar el uso del sitio.',
      'También pueden utilizarse tecnologías similares como localStorage para guardar preferencias de cookies.',
    ],
  },
  {
    id: 'tipos',
    title: '2. Qué tipos de cookies existen',
    paragraphs: [
      'Según su duración: cookies de sesión (se eliminan al cerrar el navegador) y cookies persistentes (permanecen durante un tiempo determinado).',
      'Según su origen: cookies propias (enviadas por Lumtek) y cookies de terceros (enviadas por proveedores externos).',
      'Según su finalidad: técnicas, de preferencias, analíticas y de marketing.',
    ],
  },
  {
    id: 'tecnicas',
    title: '3. Cookies técnicas',
    paragraphs: [
      'Son necesarias para el funcionamiento básico del sitio web y no requieren consentimiento en muchos casos.',
      'Permiten la navegación, la gestión de preferencias de cookies guardadas y la seguridad básica.',
      'Sin ellas, algunas funciones del sitio podrían no estar disponibles correctamente.',
    ],
  },
  {
    id: 'analiticas',
    title: '4. Cookies analíticas',
    paragraphs: [
      'Permiten conocer cómo los usuarios interactúan con el sitio de forma agregada o estadística.',
      'Ayudan a mejorar contenidos, rendimiento y experiencia de navegación.',
      'Solo se activarán si el usuario las acepta desde el banner o la configuración de cookies.',
    ],
  },
  {
    id: 'preferencias',
    title: '5. Cookies de preferencias',
    paragraphs: [
      'Recuerdan elecciones del usuario, como idioma, configuración visual o preferencias de interfaz.',
      'Mejoran la experiencia personalizada sin ser estrictamente necesarias para el funcionamiento básico.',
      'Requieren consentimiento previo salvo que estén exentas por normativa aplicable.',
    ],
  },
  {
    id: 'marketing',
    title: '6. Cookies de marketing',
    paragraphs: [
      'Se utilizan para mostrar publicidad o contenido relevante en otros canales según el comportamiento de navegación.',
      'Lumtek solo las activará si el usuario las acepta expresamente.',
      'En la versión actual del sitio, estas cookies pueden no estar implementadas; la categoría existe para futura configuración.',
    ],
  },
  {
    id: 'propias',
    title: '7. Cookies propias',
    paragraphs: [
      'Lumtek puede utilizar cookies propias para gestionar preferencias de consentimiento y mejorar la experiencia del usuario.',
      'La clave "lumtek-cookie-preferences" en localStorage guarda la configuración elegida por el usuario.',
      'Esta información se utiliza únicamente para respetar las preferencias de cookies del visitante.',
    ],
  },
  {
    id: 'terceros',
    title: '8. Cookies de terceros',
    paragraphs: [
      'Si se integran servicios de terceros (analítica, mapas, reproductores, etc.), estos podrían instalar sus propias cookies.',
      'Lumtek informará de ello y solicitará consentimiento cuando corresponda.',
      'El usuario debe consultar las políticas de privacidad de dichos terceros para más información.',
    ],
  },
  {
    id: 'aceptar',
    title: '9. Cómo aceptar cookies',
    paragraphs: [
      'Al pulsar "Aceptar" en el banner de cookies, el usuario consiente el uso de cookies opcionales según la configuración aplicada.',
      'También puede aceptar categorías concretas desde la página de configuración de cookies.',
      'La aceptación puede modificarse en cualquier momento.',
    ],
  },
  {
    id: 'rechazar',
    title: '10. Cómo rechazar cookies',
    paragraphs: [
      'El usuario puede pulsar "Rechazar" en el banner para desactivar cookies opcionales.',
      'Las cookies técnicas necesarias podrán seguir activas para el correcto funcionamiento del sitio.',
      'El rechazo no impide navegar por la mayor parte del contenido informativo.',
    ],
  },
  {
    id: 'configurar',
    title: '11. Cómo configurar cookies',
    paragraphs: [
      'Desde el banner, el botón "Configurar" permite elegir categorías concretas.',
      'También está disponible la página /configuracion-cookies y el enlace del pie de página.',
      'La configuración se guarda en el navegador del usuario.',
    ],
  },
  {
    id: 'retirar',
    title: '12. Cómo retirar consentimiento',
    paragraphs: [
      'El usuario puede retirar su consentimiento en cualquier momento modificando la configuración de cookies.',
      'También puede eliminar cookies desde la configuración de su navegador.',
      'La retirada no afecta a la licitud del tratamiento basado en el consentimiento previo.',
    ],
  },
  {
    id: 'conservacion-pref',
    title: '13. Conservación de preferencias',
    paragraphs: [
      'Las preferencias de cookies se almacenan localmente hasta que el usuario las modifique o elimine los datos del navegador.',
      'No se asocian necesariamente a la identidad del usuario salvo que se vinculen a otros tratamientos con consentimiento.',
      'Se recomienda revisar la configuración periódicamente.',
    ],
  },
  {
    id: 'cambios-cookies',
    title: '14. Cambios en política de cookies',
    paragraphs: [
      'Esta política puede actualizarse si se incorporan nuevas cookies o servicios de terceros.',
      'Los cambios relevantes se reflejarán en esta página con la fecha de revisión.',
      disclaimer,
    ],
  },
  {
    id: 'contacto-cookies',
    title: '15. Contacto',
    paragraphs: [
      `Para consultas sobre cookies, utilice el formulario de contacto en ${legalMeta.web}/contacto.`,
      'El usuario puede solicitar información adicional sobre las tecnologías utilizadas en el sitio web.',
      `Ubicación: ${legalMeta.ubicacion}. Teléfono: ${legalMeta.telefono}.`,
    ],
  },
]
