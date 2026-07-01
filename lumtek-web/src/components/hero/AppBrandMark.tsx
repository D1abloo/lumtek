import { siteContent } from '../../data/siteContent'

export const LUMTEK_MARK_SRC = '/images/brand/lumtek-mark.svg'
/** @deprecated usa LUMTEK_MARK_SRC */
export const LUMTEK_LOGO_SRC = LUMTEK_MARK_SRC

type AppBrandMarkProps = {
  size?: 'sm' | 'md' | 'lg'
  centered?: boolean
  showTagline?: boolean
  showOnline?: boolean
  theme?: 'dark' | 'light'
  /** Texto compacto para pantallas dentro del mockup del teléfono */
  compact?: boolean
}

const heights = { sm: 20, md: 26, lg: 32 } as const

const brandTextClass = (size: AppBrandMarkProps['size'], compact: boolean, isDark: boolean) => {
  const tone = isDark ? 'text-white' : 'text-lumtek-text'
  if (compact) {
    return `font-bold leading-none tracking-[0.14em] text-xs ${tone}`
  }
  if (size === 'lg') return `font-bold leading-none tracking-tight text-sm xs:text-base sm:text-lg ${tone}`
  if (size === 'md') return `font-bold leading-none tracking-tight text-sm sm:text-lg ${tone}`
  return `font-bold leading-none tracking-tight text-xs sm:text-base ${tone}`
}

const taglineTextClass = (size: AppBrandMarkProps['size'], compact: boolean, isDark: boolean) => {
  const tone = isDark ? 'text-slate-400' : 'text-lumtek-text-secondary'
  if (compact) {
    return `mt-1 font-medium uppercase tracking-[0.1em] text-[8px] leading-snug ${tone}`
  }
  if (size === 'lg') {
    return `mt-1 font-medium uppercase tracking-[0.12em] text-[9px] xs:text-[10px] sm:text-[11px] leading-snug ${tone}`
  }
  return `mt-1 font-medium uppercase tracking-[0.12em] text-[9px] sm:text-[10px] leading-snug ${tone}`
}

export const AppBrandMark = ({
  size = 'md',
  centered = false,
  showTagline = true,
  showOnline = false,
  theme = 'dark',
  compact = false,
}: AppBrandMarkProps) => {
  const h = compact ? heights.sm : heights[size]
  const w = Math.round(h * (1024 / 658))
  const isDark = theme === 'dark'

  return (
    <div className={`flex items-center gap-2 ${centered ? 'flex-col text-center' : ''} ${compact ? 'gap-1.5' : 'gap-2.5'}`}>
      <img
        src={LUMTEK_MARK_SRC}
        alt=""
        width={w}
        height={h}
        className={`shrink-0 object-contain ${centered ? 'mx-auto' : ''}`}
        loading="eager"
        decoding="async"
        aria-hidden
      />
      <div className={centered ? 'flex flex-col items-center' : 'min-w-0'}>
        <p className={brandTextClass(size, compact, isDark)}>{siteContent.brand}</p>
        {showTagline && (
          <p className={taglineTextClass(size, compact, isDark)}>{siteContent.tagline}</p>
        )}
        {showOnline && (
          <p className="mt-1 flex items-center justify-center gap-1.5 text-[10px] text-lumtek-green sm:text-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-lumtek-green shadow-[0_0_6px_rgba(34,197,94,0.5)]"
              aria-hidden
            />
            Online
          </p>
        )}
      </div>
    </div>
  )
}
