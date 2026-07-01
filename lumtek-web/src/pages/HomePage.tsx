import { Hero } from '../components/hero/Hero'
import { BenefitsStrip } from '../components/sections/BenefitsStrip'
import { ControlFeaturesSection } from '../components/sections/ControlFeaturesSection'
import { DomoticsSection } from '../components/sections/DomoticsSection'
import { SecuritySection } from '../components/sections/SecuritySection'
import { CoreSection } from '../components/sections/CoreSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { UseCasesSection } from '../components/sections/UseCasesSection'
import { ReviewsSection } from '../components/sections/ReviewsSection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { ContactSection } from '../components/contact/ContactSection'

const HomePage = () => (
  <>
    <Hero />
    <BenefitsStrip />
    <ControlFeaturesSection />
    <DomoticsSection />
    <SecuritySection />
    <CoreSection />
    <ServicesSection />
    <UseCasesSection />
    <ReviewsSection />
    <ProcessSection />
    <ContactSection />
  </>
)

export default HomePage
