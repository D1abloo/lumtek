import { LegalLayout } from '../components/legal/LegalLayout'
import { cookiesPolicySections } from '../data/legalContent'

const CookiesPolicyPage = () => (
  <LegalLayout
    title="Política de cookies"
    subtitle="Información sobre el uso de cookies y tecnologías similares en el sitio web de Lumtek."
    sections={cookiesPolicySections}
  />
)

export default CookiesPolicyPage
