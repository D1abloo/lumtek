import { LumtekLogo } from '../ui/LumtekLogo'
import { LUMTEK_BRAND_LOGO_SRC } from './HeaderLogo'

type HeaderBrandProps = {
  className?: string
}

export const HeaderBrand = ({ className = '' }: HeaderBrandProps) => (
  <span className={`inline-flex shrink-0 items-center gap-2 overflow-visible sm:gap-2.5 ${className}`}>
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-visible sm:h-10 sm:w-10">
      <img
        src={LUMTEK_BRAND_LOGO_SRC}
        alt=""
        width={120}
        height={120}
        className="absolute h-[2.85rem] w-[2.85rem] max-w-none origin-center object-contain sm:h-[3.35rem] sm:w-[3.35rem]"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        aria-hidden
      />
    </span>
    <LumtekLogo
      size="md"
      variant="wordmark"
      asLink={false}
      showMark={false}
      className="shrink-0 gap-1.5 text-lg sm:gap-2 sm:text-xl md:text-2xl"
    />
  </span>
)
