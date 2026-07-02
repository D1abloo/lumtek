import { LumtekLogo } from '../ui/LumtekLogo'
import { LUMTEK_BRAND_LOGO_SRC } from './HeaderLogo'

type HeaderBrandProps = {
  className?: string
  staticWordmark?: boolean
}

const brandScale = {
  slot: 'relative h-9 w-[5.5rem] shrink-0 sm:w-[6rem]',
  img: 'absolute left-0 top-1/2 h-[5.75rem] w-[5.75rem] -translate-y-1/2 object-contain sm:h-[6.35rem] sm:w-[6.35rem]',
  text: 'text-xl sm:text-2xl lg:text-[1.85rem]',
  gap: 'gap-2 sm:gap-2.5',
} as const

export const HeaderBrand = ({
  className = '',
  staticWordmark = false,
}: HeaderBrandProps) => {
  return (
    <span className={`inline-flex max-w-full shrink-0 items-center ${brandScale.gap} ${className}`}>
      <span className={`flex shrink-0 items-center justify-start overflow-visible ${brandScale.slot}`}>
        <img
          src={LUMTEK_BRAND_LOGO_SRC}
          alt=""
          width={120}
          height={120}
          className={`max-w-none object-contain drop-shadow-[0_2px_10px_rgba(15,23,42,0.14)] ${brandScale.img}`}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          aria-hidden
        />
      </span>
      <LumtekLogo
        size="lg"
        variant="wordmark"
        asLink={false}
        showMark={false}
        staticWordmark={staticWordmark}
        className={`shrink-0 gap-0 text-lumtek-text tracking-normal ${brandScale.text}`}
      />
    </span>
  )
}
