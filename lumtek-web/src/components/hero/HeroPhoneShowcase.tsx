import { HERO_SCREEN, usePhoneLock } from './LiveCameraPreview'
import { PhoneDemo } from './PhoneDemo'

export const HeroPhoneShowcase = () => {
  const lock = usePhoneLock(true)

  return (
    <div className="relative mx-auto flex w-full min-w-0 max-w-full justify-center md:justify-end">
      <PhoneDemo
        size="hero"
        imageSrc={HERO_SCREEN.src}
        imageAlt={HERO_SCREEN.alt}
        lock={lock}
        activeGlow
      />
    </div>
  )
}
