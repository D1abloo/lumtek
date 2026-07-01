import { LumtekLogo } from '../ui/LumtekLogo'
import { LUMTEK_BRAND_LOGO_SRC } from './HeaderLogo'

type HeaderBrandProps = {
  className?: string
  size?: 'header' | 'footer'
  staticWordmark?: boolean
}

const brandScale = {
  header: {
    slot: 'h-9 w-9 sm:h-10 sm:w-10',
    img: 'h-[2.85rem] w-[2.85rem] sm:h-[3.35rem] sm:w-[3.35rem]',
    text: 'text-lg sm:text-xl md:text-2xl',
    gap: 'gap-2 sm:gap-2.5',
  },
  footer: {
    slot: 'h-11 w-11 sm:h-12 sm:w-12',
    img: 'h-[3.5rem] w-[3.5rem] sm:h-[4.25rem] sm:w-[4.25rem]',
    text: 'text-xl sm:text-2xl md:text-3xl',
    gap: 'gap-2.5 sm:gap-3',
  },
} as const

export const HeaderBrand = ({
  className = '',
  size = 'header',
  staticWordmark = false,
}: HeaderBrandProps) => {
  const s = brandScale[size]

  return (
    <span className={`inline-flex shrink-0 items-center overflow-visible ${s.gap} ${className}`}>
      <span className={`relative flex shrink-0 items-center justify-center overflow-visible ${s.slot}`}>
        <img
          src={LUMTEK_BRAND_LOGO_SRC}
          alt=""
          width={120}
          height={120}
          className={`absolute max-w-none origin-center object-contain ${s.img}`}
          loading="eager"
          decoding="async"
          fetchPriority={size === 'header' ? 'high' : 'auto'}
          aria-hidden
        />
      </span>
      <LumtekLogo
        size={size === 'footer' ? 'lg' : 'md'}
        variant="wordmark"
        asLink={false}
        showMark={false}
        staticWordmark={staticWordmark}
        className={`shrink-0 gap-1.5 ${s.text}`}
      />
    </span>
  )
}
