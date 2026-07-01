export type NavItem = {
  label: string
  href: string
  isRoute?: boolean
}

export type ContentItem = {
  title: string
  description: string
  icon?: string
}

export type Service = {
  id: string
  title: string
  description: string
  details: string[]
  icon: string
  tag: string
}

export type Review = {
  id: string
  name: string
  type: string
  service: string
  rating: number
  comment: string
}

export type StorySection = {
  id: string
  title: string
  paragraphs: string[]
}

export type CoreNode = {
  id: string
  title: string
  description: string
  icon: string
  highlights: string[]
  angle?: number
  radius?: number
}

export type CookiePreferences = {
  technical: boolean
  analytics: boolean
  preferences: boolean
  marketing: boolean
}

export type UseCaseSolution = {
  title: string
  description: string
}

export type UseCase = {
  id: string
  title: string
  description: string
  details: string[]
  image: string
  imageRemote?: string
  alt: string
  icon?: string
}

export type UseCasePageContent = {
  pageIntro: string
  clientProfile: string
  highlightQuote: string
  challenge: string
  approach: string
  solutions: UseCaseSolution[]
  systems: string[]
  benefits: string[]
  metaTitle: string
  metaDescription: string
}

export type UseCaseFull = UseCase & UseCasePageContent

export type FictionalCamera = {
  id: string
  name: string
  location: string
  status: string
  quality: string
  lastEvent: string
  secure: boolean
  signal: string
  description: string
  image: string
  imageRemote?: string
  alt: string
  gradient: string
}

export type ContactFormData = {
  name: string
  email: string
  phone: string
  projectType: string
  message: string
  company?: string
  city?: string
  contactPreference?: string
  privacyAccepted: boolean
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

export type LegalSection = {
  id: string
  title: string
  paragraphs: string[]
}
