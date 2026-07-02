import { PhoneBrandLogo } from './PhoneBrandLogo'

type PhoneScreenHeaderProps = {
  variant?: 'dark' | 'light'
}

export const PhoneScreenHeader = ({ variant = 'dark' }: PhoneScreenHeaderProps) => {
  const isDark = variant === 'dark'

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-2 pb-2 pt-4 ${
        isDark
          ? 'bg-gradient-to-b from-black/80 via-black/45 to-transparent'
          : 'bg-gradient-to-b from-white/90 via-white/55 to-transparent'
      }`}
    >
      <PhoneBrandLogo size="sm" glow={isDark} />
    </div>
  )
}
