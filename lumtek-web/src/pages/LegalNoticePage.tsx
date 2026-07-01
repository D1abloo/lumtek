import { LegalLayout } from '../components/legal/LegalLayout'
import { legalNoticeSections } from '../data/legalContent'

const LegalNoticePage = () => (
  <LegalLayout
    title="Aviso legal"
    subtitle="Información legal sobre el sitio web de Lumtek. Contenido orientativo que debe ser revisado por el titular o asesor legal antes de su publicación definitiva."
    sections={legalNoticeSections}
  />
)

export default LegalNoticePage
