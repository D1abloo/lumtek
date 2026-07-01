import { LegalLayout } from '../components/legal/LegalLayout'
import { privacySections } from '../data/legalContent'

const PrivacyPolicyPage = () => (
  <LegalLayout
    title="Política de privacidad"
    subtitle="Información sobre el tratamiento de datos personales en el sitio web de Lumtek conforme al RGPD. Revisar con asesor legal antes de publicación."
    sections={privacySections}
  />
)

export default PrivacyPolicyPage
