import { LUMTEK_BRAND_LOGO_SRC } from '../layout/HeaderLogo'

const sizeClass = {
  sm: 'h-7',
  md: 'h-10',
  lg: 'h-14',
  xl: 'h-20',
  '2xl': 'h-28',
  '3xl': 'h-32',
} as const

type PhoneBrandLogoProps = {
  size?: keyof typeof sizeClass
  className?: string
  glow?: boolean
  /** Más brillo para fondos oscuros (p. ej. pantalla de bloqueo / carga) */
  bright?: boolean
  /** Máximo brillo para la pantalla de carga */
  loading?: boolean
}

export const PhoneBrandLogo = ({
  size = 'md',
  className = '',
  glow = false,
  bright = false,
  loading = false,
}: PhoneBrandLogoProps) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center overflow-hidden leading-none ${className}`}
  >
    <img
      src={LUMTEK_BRAND_LOGO_SRC}
      alt=""
      className={`${sizeClass[size]} w-auto max-w-none object-contain ${
        loading
          ? 'scale-[1.28] brightness-[1.82] contrast-[1.3] saturate-[1.24] drop-shadow-[0_0_40px_rgba(0,200,255,1)] drop-shadow-[0_0_64px_rgba(34,211,238,0.65)]'
          : bright
            ? 'scale-[1.2] brightness-[1.38] contrast-[1.16] saturate-[1.12] drop-shadow-[0_0_26px_rgba(0,168,255,0.9)]'
            : `scale-[1.2] brightness-[1.06] contrast-[1.08] ${
                glow
                  ? 'drop-shadow-[0_0_22px_rgba(0,168,255,0.65)]'
                  : 'drop-shadow-[0_4px_14px_rgba(0,168,255,0.4)]'
              }`
      }`}
      loading="lazy"
      decoding="async"
      aria-hidden
    />
  </span>
)
