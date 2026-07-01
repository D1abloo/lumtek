import type { AppSectionId } from '../../data/appSections'

type SectionAppLogoProps = {
  id: AppSectionId
  className?: string
  glow?: boolean
}

const logoSrc = (id: AppSectionId) => `/images/app/icons/${id}.svg`

export const SectionAppLogo = ({ id, className = '', glow = false }: SectionAppLogoProps) => (
  <span
    className={`relative inline-flex shrink-0 items-center justify-center ${
      glow ? 'shadow-[0_0_14px_rgba(0,168,255,0.45)]' : ''
    } ${className}`}
  >
    <img
      src={logoSrc(id)}
      alt=""
      width={28}
      height={28}
      className="h-full w-full object-contain"
      loading="lazy"
      decoding="async"
      aria-hidden
    />
  </span>
)
