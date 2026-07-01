import { motion } from 'framer-motion'
import type { MobileView } from '../../data/mobileViews'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { HERO_SCREEN, LiveCameraPreview, usePhoneLock } from './LiveCameraPreview'

type PhoneLockState = ReturnType<typeof usePhoneLock>

type PhoneDemoProps = {
  size?: 'compact' | 'default' | 'showcase' | 'hero'
  className?: string
  view?: MobileView
  activeGlow?: boolean
  isFirstView?: boolean
  imageSrc?: string
  imageAlt?: string
  lock?: PhoneLockState
}

const sizeMap = {
  compact: 'w-[188px] xs:w-[200px] sm:w-[216px]',
  default: 'w-[208px] xs:w-[220px] sm:w-[240px]',
  showcase: 'w-[220px] xs:w-[232px] sm:w-[252px] md:w-[260px] lg:w-[268px]',
  hero: 'w-[220px] xs:w-[236px] sm:w-[252px] md:w-[268px] lg:w-[286px] xl:w-[300px]',
}

const PhoneSunSideGlow = ({ reduced, active }: { reduced: boolean; active: boolean }) => (
  <>
    <motion.span
      className="pointer-events-none absolute top-[10%] bottom-[10%] -left-[4mm] z-0 w-[4mm] rounded-l-[2rem]"
      style={{
        background:
          'linear-gradient(to right, rgba(255, 220, 120, 0), rgba(255, 196, 72, 0.65) 60%, rgba(255, 159, 28, 0.45))',
        filter: 'blur(4px)',
      }}
      aria-hidden
      animate={
        reduced
          ? { opacity: active ? 0.55 : 0.38 }
          : { opacity: active ? [0.42, 0.58, 0.42] : [0.28, 0.45, 0.28] }
      }
      transition={{ duration: 3.8, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
    />
    <motion.span
      className="pointer-events-none absolute top-[10%] bottom-[10%] -right-[4mm] z-0 w-[4mm] rounded-r-[2rem]"
      style={{
        background:
          'linear-gradient(to left, rgba(255, 220, 120, 0), rgba(255, 196, 72, 0.65) 60%, rgba(255, 159, 28, 0.45))',
        filter: 'blur(4px)',
      }}
      aria-hidden
      animate={
        reduced
          ? { opacity: active ? 0.55 : 0.38 }
          : { opacity: active ? [0.42, 0.58, 0.42] : [0.28, 0.45, 0.28] }
      }
      transition={{ duration: 3.8, repeat: reduced ? 0 : Infinity, ease: 'easeInOut', delay: 0.4 }}
    />
    <span
      className="pointer-events-none absolute top-[12%] bottom-[12%] left-0 z-0 w-[2px] rounded-full bg-gradient-to-b from-amber-200/0 via-amber-300/70 to-amber-200/0 shadow-[0_0_8px_2px_rgba(255,196,72,0.35)]"
      aria-hidden
    />
    <span
      className="pointer-events-none absolute top-[12%] bottom-[12%] right-0 z-0 w-[2px] rounded-full bg-gradient-to-b from-amber-200/0 via-amber-300/70 to-amber-200/0 shadow-[0_0_8px_2px_rgba(255,196,72,0.35)]"
      aria-hidden
    />
  </>
)

export const PhoneDemo = ({
  size = 'default',
  className = '',
  view,
  activeGlow = false,
  isFirstView = false,
  imageSrc,
  imageAlt,
  lock: externalLock,
}: PhoneDemoProps) => {
  const reduced = useReducedMotion()
  const lockable = Boolean(imageSrc && imageSrc === HERO_SCREEN.src)
  const internalLock = usePhoneLock(lockable && !externalLock)
  const { isUnlocked, unlocking, locking, unlockSession, handleLockActivate, handlePointerEnter, handlePointerLeave } =
    externalLock ?? internalLock

  const glowActive = activeGlow || (lockable && isUnlocked && !locking)

  return (
    <motion.div
      className={`relative mx-auto shrink-0 overflow-visible ${sizeMap[size]} ${className}`}
      initial={
        reduced || !lockable
          ? false
          : { opacity: 0, scale: 0.9, y: 28, filter: 'blur(8px) brightness(0.85)' }
      }
      animate={
        reduced
          ? {}
          : lockable
            ? {
                opacity: 1,
                scale: 1,
                y: [0, -4, 0],
                filter: 'blur(0px) brightness(1)',
              }
            : { y: [0, -4, 0] }
      }
      transition={
        lockable && !reduced
          ? {
              opacity: { duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
              scale: { duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
              y: { duration: 7, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 1.5 },
              filter: { duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
            }
          : { duration: 7, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }
      }
    >
      {/* Halo exterior — más intenso en móvil */}
      <div
        className={`pointer-events-none absolute -inset-10 rounded-[4rem] bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,168,255,0.42),rgba(34,211,238,0.18)_42%,transparent_72%)] sm:-inset-8 ${
          reduced ? '' : 'animate-phone-aura'
        } ${glowActive ? 'opacity-100' : 'opacity-70 sm:opacity-55'}`}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -inset-7 rounded-[3.5rem] bg-gradient-to-br from-lumtek-cyan/25 via-lumtek-blue/15 to-transparent blur-2xl sm:-inset-6"
        aria-hidden
        animate={{
          opacity: glowActive ? 0.55 : 0.28,
          scale: glowActive ? 1.08 : 1,
        }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        className={`pointer-events-none absolute -inset-4 rounded-[3.25rem] border border-lumtek-cyan/25 shadow-[0_0_48px_rgba(0,168,255,0.35),0_0_96px_rgba(34,211,238,0.2)] sm:-inset-3 sm:shadow-[0_0_32px_rgba(0,168,255,0.22)] ${
          reduced ? '' : 'animate-phone-rim'
        }`}
        aria-hidden
      />

      {!reduced && (
        <motion.div
          className="pointer-events-none absolute -inset-5 overflow-hidden rounded-[3.5rem] sm:-inset-4"
          aria-hidden
        >
          <motion.span
            className="absolute -inset-[40%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(125,243,255,0.55)_40deg,transparent_80deg)] opacity-60 sm:opacity-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}

      <motion.div
        className="absolute -inset-6 rounded-[3rem] blur-2xl"
        aria-hidden
        animate={{
          opacity: glowActive ? 0.32 : 0.1,
          backgroundColor: glowActive ? 'rgba(0,168,255,0.45)' : 'rgba(0,168,255,0.12)',
          scale: glowActive ? 1.05 : 1,
        }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="relative overflow-visible rounded-[2.75rem] border-[3px] bg-gradient-to-b from-slate-700 to-slate-900 p-2 shadow-[0_20px_48px_rgba(15,23,42,0.16)]"
        animate={{
          borderColor: glowActive ? 'rgba(251, 191, 36, 0.32)' : 'rgb(30 41 59)',
          boxShadow: glowActive
            ? '0 20px 52px rgba(0,168,255,0.16), -4mm 0 6mm -2mm rgba(255, 196, 72, 0.32), 4mm 0 6mm -2mm rgba(255, 196, 72, 0.32)'
            : '0 20px 48px rgba(15,23,42,0.16), -4mm 0 5mm -2.5mm rgba(255, 196, 72, 0.22), 4mm 0 5mm -2.5mm rgba(255, 196, 72, 0.22)',
          scale: unlocking ? 1.015 : locking ? 0.99 : 1,
          opacity: locking ? 0.88 : unlocking ? [0.92, 0.97, 1] : 1,
        }}
        transition={{
          duration: unlocking ? 2.5 : locking ? 0.85 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <PhoneSunSideGlow reduced={reduced} active={glowActive} />
        <div className="absolute left-1/2 top-3 z-10 h-5 w-[4.5rem] -translate-x-1/2 rounded-full bg-black" />
        <div
          className="relative aspect-[9/18.8] overflow-hidden rounded-[2.25rem] bg-[#090d13]"
          onPointerEnter={lockable ? handlePointerEnter : undefined}
          onPointerLeave={lockable ? handlePointerLeave : undefined}
          onClick={() => {
            if (!lockable || isUnlocked) return
            if (!window.matchMedia('(hover: hover)').matches) handleLockActivate()
          }}
        >
          {view || imageSrc ? (
            <LiveCameraPreview
              view={view}
              isFirstView={isFirstView}
              imageSrc={imageSrc}
              imageAlt={imageAlt ?? HERO_SCREEN.alt}
              lockable={lockable}
              isUnlocked={isUnlocked}
              unlocking={unlocking}
              locking={locking}
              unlockSession={unlockSession}
              onLockActivate={handleLockActivate}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
          ) : (
            <div className="h-full w-full bg-[#090d13]" />
          )}
        </div>
        <div className="absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-white/30" />
      </motion.div>
    </motion.div>
  )
}
