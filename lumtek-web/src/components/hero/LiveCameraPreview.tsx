import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DOMOTICA_IMAGE } from '../../data/domoticHotspots'
import type { MobileView } from '../../data/mobileViews'
import { DomoticInteractiveImage } from '../sections/DomoticInteractiveImage'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { LightningLoadOverlay } from '../ui/LightningLoadOverlay'
import { LumtekControlApp } from './LumtekControlApp'
import { PhoneLockedScreen } from './PhoneLockedScreen'
import { PhoneScreenHeader } from './PhoneScreenHeader'

export const HERO_SCREEN = DOMOTICA_IMAGE

const UNLOCK_ANIM_MS = 2_500
const RELOCK_ANIM_MS = 450
const LOCK_ANIM_MS = 900
const RELOCK_DELAY_MS = 15_000

const ease = [0.22, 1, 0.36, 1] as const

const isHoverDevice = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

type AppViewFallbackProps = {
  title: string
  items?: string[]
}

const AppViewFallback = ({ title, items = [] }: AppViewFallbackProps) => (
  <div className="relative flex h-full w-full flex-col bg-[#090d13] px-3 pb-3 pt-12 text-white">
    <PhoneScreenHeader variant="dark" />
    <header>
      <p className="text-[9px] font-bold">Lumtek Control</p>
      <p className="mt-0.5 flex items-center gap-1 text-[6px] text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
        Online
      </p>
    </header>
    <p className="mt-3 text-[8px] font-semibold text-slate-200">{title}</p>
    {items.length > 0 && (
      <div className="mt-2 flex-1 space-y-1.5">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-slate-700/80 bg-[#111827] px-2 py-2 text-[6px] text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    )}
  </div>
)

type ScreenLayerProps = {
  src: string
  alt: string
  eager?: boolean
  fallbackTitle?: string
  fallbackItems?: string[]
}

const ScreenLayer = ({ src, alt, eager = false, fallbackTitle, fallbackItems }: ScreenLayerProps) => {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) {
    return <AppViewFallback title={fallbackTitle ?? alt} items={fallbackItems} />
  }

  if (src === DOMOTICA_IMAGE.src) {
    return (
      <DomoticInteractiveImage
        src={src}
        alt={alt}
        eager={eager}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <>
      {!loaded && <div className="absolute inset-0 bg-[#111827]" aria-hidden />}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover object-center transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  )
}

type LockablePhoneScreenProps = {
  isUnlocked: boolean
  unlocking: boolean
  locking: boolean
  unlockSession: number
  onLockActivate: () => void
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}

type UnlockingLoaderProps = {
  unlocking: boolean
}

const UnlockingLoader = ({ unlocking }: UnlockingLoaderProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!unlocking) {
      setProgress(0)
      return
    }

    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / UNLOCK_ANIM_MS)
      const eased = 1 - (1 - t) ** 1.8
      setProgress(Math.min(100, Math.round(eased * 100)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [unlocking])

  return <LightningLoadOverlay progress={progress} visible={unlocking} />
}

const LockablePhoneScreen = ({
  isUnlocked,
  unlocking,
  locking,
  unlockSession,
  onLockActivate,
  onPointerEnter,
  onPointerLeave,
}: LockablePhoneScreenProps) => (
  <div
    className="relative h-full w-full overflow-hidden bg-black"
    onPointerEnter={onPointerEnter}
    onPointerLeave={onPointerLeave}
  >
    <motion.div
      className="absolute inset-0 origin-center"
      initial={false}
      animate={{
        opacity: locking ? 0 : isUnlocked || unlocking ? 1 : 0,
        scale: locking ? 0.96 : isUnlocked || unlocking ? 1 : 0.92,
        filter: locking
          ? 'blur(10px) brightness(0.75)'
          : isUnlocked || unlocking
            ? 'blur(0px) brightness(1)'
            : 'blur(8px) brightness(0.82)',
      }}
      transition={{
        duration: locking ? 0.85 : unlocking ? UNLOCK_ANIM_MS / 1000 : 0.4,
        ease,
      }}
      style={{ pointerEvents: isUnlocked && !locking ? 'auto' : 'none' }}
      aria-hidden={!isUnlocked && !unlocking}
    >
      <LumtekControlApp
        active={(isUnlocked || unlocking) && !locking}
        unlockSession={unlockSession}
      />
    </motion.div>

    <AnimatePresence mode="wait">
      {(!isUnlocked || locking) && (
        <PhoneLockedScreen
          key="locked"
          unlocking={unlocking}
          locking={locking}
          onActivate={onLockActivate}
          onHoverUnlock={onPointerEnter}
        />
      )}
    </AnimatePresence>

    <div className="pointer-events-none absolute inset-0 z-[25]">
      <UnlockingLoader unlocking={unlocking} />
    </div>
  </div>
)

type LiveCameraPreviewProps = {
  view?: MobileView
  isFirstView?: boolean
  imageSrc?: string
  imageAlt?: string
  lockable?: boolean
  isUnlocked?: boolean
  unlocking?: boolean
  locking?: boolean
  unlockSession?: number
  onLockActivate?: () => void
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}

export const LiveCameraPreview = ({
  view,
  isFirstView = false,
  imageSrc,
  imageAlt,
  lockable = false,
  isUnlocked = false,
  unlocking = false,
  locking = false,
  unlockSession = 0,
  onLockActivate,
  onPointerEnter,
  onPointerLeave,
}: LiveCameraPreviewProps) => {
  const reduced = useReducedMotion()

  if (lockable && onLockActivate) {
    return (
      <LockablePhoneScreen
        isUnlocked={isUnlocked}
        unlocking={unlocking}
        locking={locking}
        unlockSession={unlockSession}
        onLockActivate={onLockActivate}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      />
    )
  }

  const src = imageSrc ?? view?.image
  const alt = imageAlt ?? view?.alt ?? ''
  const key = imageSrc ?? view?.id ?? 'screen'

  const motionProps = reduced
    ? { initial: false, animate: { opacity: 1, y: 0, scale: 1 } }
    : {
        initial: { opacity: 0, y: 8, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -6, scale: 0.99 },
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
      }

  if (!src) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#090d13]">
        <AppViewFallback title="Lumtek Control" />
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#090d13]">
      <AnimatePresence mode="wait">
        <motion.div key={key} className="absolute inset-0" {...motionProps}>
          <ScreenLayer
            src={src}
            alt={alt}
            eager={isFirstView || Boolean(imageSrc)}
            fallbackTitle={view?.fallbackTitle}
            fallbackItems={view?.items}
          />
        </motion.div>
      </AnimatePresence>
      <PhoneScreenHeader variant="dark" />
    </div>
  )
}

export const usePhoneLock = (enabled: boolean) => {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const [locking, setLocking] = useState(false)
  const [unlockSession, setUnlockSession] = useState(0)
  const relockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pointerInside = useRef(false)
  const hasUnlockedOnce = useRef(false)
  const enabledRef = useRef(enabled)
  const isUnlockedRef = useRef(false)
  const unlockingRef = useRef(false)
  const lockingRef = useRef(false)

  useEffect(() => {
    enabledRef.current = enabled
  }, [enabled])

  useEffect(() => {
    isUnlockedRef.current = isUnlocked
  }, [isUnlocked])

  useEffect(() => {
    unlockingRef.current = unlocking
  }, [unlocking])

  useEffect(() => {
    lockingRef.current = locking
  }, [locking])

  const clearTimers = useCallback(() => {
    if (relockTimer.current) {
      clearTimeout(relockTimer.current)
      relockTimer.current = null
    }
    if (unlockTimer.current) {
      clearTimeout(unlockTimer.current)
      unlockTimer.current = null
    }
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const finishLock = useCallback(() => {
    lockingRef.current = false
    isUnlockedRef.current = false
    unlockingRef.current = false
    setLocking(false)
    setIsUnlocked(false)
    setUnlocking(false)
  }, [])

  const runLockAnimation = useCallback(() => {
    if (!enabledRef.current || !isUnlockedRef.current || lockingRef.current) return
    if (pointerInside.current && isHoverDevice()) return

    lockingRef.current = true
    setLocking(true)

    unlockTimer.current = setTimeout(() => {
      unlockTimer.current = null
      finishLock()
    }, LOCK_ANIM_MS)
  }, [finishLock])

  const scheduleAutoRelock = useCallback(() => {
    if (!enabledRef.current || pointerInside.current) return
    if (relockTimer.current) clearTimeout(relockTimer.current)
    relockTimer.current = setTimeout(() => {
      relockTimer.current = null
      runLockAnimation()
    }, RELOCK_DELAY_MS)
  }, [runLockAnimation])

  const finishUnlock = useCallback(() => {
    unlockingRef.current = false
    isUnlockedRef.current = true
    hasUnlockedOnce.current = true
    setUnlocking(false)
    setIsUnlocked(true)
    setUnlockSession((n) => n + 1)
    if (!pointerInside.current) {
      scheduleAutoRelock()
    }
  }, [scheduleAutoRelock])

  const runUnlock = useCallback(() => {
    if (!enabledRef.current || isUnlockedRef.current || lockingRef.current) return

    clearTimers()
    unlockingRef.current = true
    setUnlocking(true)

    const duration = hasUnlockedOnce.current ? RELOCK_ANIM_MS : UNLOCK_ANIM_MS
    unlockTimer.current = setTimeout(() => {
      unlockTimer.current = null
      finishUnlock()
    }, duration)
  }, [clearTimers, finishUnlock])

  const lockNow = useCallback(() => {
    if (!enabledRef.current || !isUnlockedRef.current) return
    clearTimers()
    runLockAnimation()
  }, [clearTimers, runLockAnimation])

  const handleLockActivate = useCallback(() => {
    if (!enabledRef.current) return
    if (isUnlockedRef.current) {
      lockNow()
      return
    }
    runUnlock()
  }, [lockNow, runUnlock])

  const handlePointerEnter = useCallback(() => {
    if (!enabledRef.current) return
    pointerInside.current = true
    if (isUnlockedRef.current) {
      clearTimers()
      return
    }
    if (!isHoverDevice() || lockingRef.current) return
    runUnlock()
  }, [clearTimers, runUnlock])

  const handlePointerLeave = useCallback(() => {
    if (!enabledRef.current) return
    pointerInside.current = false
    if (isUnlockedRef.current && !lockingRef.current) {
      scheduleAutoRelock()
    }
  }, [scheduleAutoRelock])

  return {
    isUnlocked,
    unlocking,
    locking,
    unlockSession,
    handleLockActivate,
    handlePointerEnter,
    handlePointerLeave,
  }
}
