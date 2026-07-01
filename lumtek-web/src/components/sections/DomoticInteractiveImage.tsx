import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Blinds, Camera, Lightbulb, Lock, Smartphone, Thermometer } from 'lucide-react'
import {
  domoticHotspots,
  type DomoticHotspot,
  type HotspotEffect,
} from '../../data/domoticHotspots'
import { getBestTooltipPosition, type TooltipPlacement } from '../../utils/getBestTooltipPosition'
import { usePhoneImageLoad } from '../../hooks/useImageLoadProgress'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { LightningLoadOverlay } from '../ui/LightningLoadOverlay'

const tooltipSlide: Record<TooltipPlacement, { x: number; y: number }> = {
  right: { x: -10, y: 0 },
  left: { x: 10, y: 0 },
  top: { x: 0, y: 8 },
  bottom: { x: 0, y: -8 },
}

type DomoticInteractiveImageProps = {
  src: string
  alt: string
  eager?: boolean
  onLoad?: () => void
  onError?: () => void
}

const effectIcon: Record<HotspotEffect, typeof Camera> = {
  camera: Camera,
  climate: Thermometer,
  access: Lock,
  lighting: Lightbulb,
  blinds: Blinds,
  mobile: Smartphone,
}

const InfoPanel = ({ spot }: { spot: DomoticHotspot }) => {
  const Icon = effectIcon[spot.effect]

  return (
    <motion.div
      key={spot.id}
      role="status"
      id={`tooltip-${spot.id}`}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="shrink-0 rounded-t-xl border border-b-0 border-sky-200 bg-white px-3 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.12)]"
      data-domotic-panel
    >
      <div className="flex items-start gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-500 ring-1 ring-sky-100">
          <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold leading-snug text-slate-900">{spot.title}</p>
          <p className="mt-1 text-[9px] leading-snug text-slate-600">{spot.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

const FloatingTooltip = ({
  spot,
  placement,
  compact,
}: {
  spot: DomoticHotspot
  placement: string
  compact?: boolean
}) => (
  <div
    className={`rounded-lg border border-sky-200 bg-white shadow-lg shadow-slate-900/10 ${
      compact ? 'max-w-[8.5rem] p-2' : 'w-[9rem] max-w-[calc(100%-0.5rem)] p-2.5'
    }`}
  >
    <p className={`font-bold leading-snug text-slate-900 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
      {spot.title}
    </p>
    <p className={`mt-1 leading-snug text-slate-600 ${compact ? 'text-[8px]' : 'text-[9px]'}`}>
      {spot.description}
    </p>
    <span className="sr-only">Posición: {placement}</span>
  </div>
)

const zoneStyle = (zone: DomoticHotspot['zone']) => ({
  left: zone.x,
  top: zone.y,
  width: zone.width,
  height: zone.height,
  transform: 'translate(-50%, -50%)',
})

const ZoneEffect = ({ spot, reduced }: { spot: DomoticHotspot; reduced: boolean }) => {
  const { zone, effect } = spot
  const z = zoneStyle(zone)

  if (effect === 'lighting') {
    return (
      <>
        <motion.div
          className="pointer-events-none absolute rounded-full bg-amber-100/70 blur-2xl"
          style={z}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            reduced
              ? { opacity: 0.9, scale: 1 }
              : { opacity: [0.5, 1, 0.55], scale: [0.92, 1.1, 0.95] }
          }
          transition={{ duration: 1.4, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute rounded-full bg-amber-300/50 blur-md"
          style={{ ...z, width: '12%', height: '8%' }}
          animate={reduced ? {} : { opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.9, repeat: reduced ? 0 : Infinity }}
        />
      </>
    )
  }

  if (effect === 'access') {
    return (
      <>
        <motion.div
          className="pointer-events-none absolute rounded-2xl bg-sky-400/40 blur-2xl ring-1 ring-sky-300/30"
          style={z}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-sky-200"
          style={{ left: spot.x, top: spot.y }}
          initial={{ opacity: 0, rotate: 0, y: 0 }}
          animate={
            reduced
              ? { opacity: 1, rotate: -12, y: -1 }
              : { opacity: 1, rotate: [0, -18, -8, -14], y: [0, -2, 0, -1] }
          }
          transition={{ duration: 0.65, repeat: reduced ? 0 : 2, ease: 'easeInOut' }}
        >
          <Lock className="h-4 w-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]" strokeWidth={2.5} />
        </motion.div>
      </>
    )
  }

  if (effect === 'mobile') {
    return (
      <motion.div
        className="pointer-events-none absolute rounded-2xl bg-sky-400/45 blur-2xl ring-1 ring-sky-300/35"
        style={z}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: [1, 1.08, 1] }}
        transition={{ duration: 1.1, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
      />
    )
  }

  if (effect === 'camera') {
    return (
      <>
        <motion.div
          className="pointer-events-none absolute rounded-full border-2 border-red-400/80 bg-red-500/10"
          style={{ left: spot.x, top: spot.y, width: '11%', height: '7%', transform: 'translate(-50%, -50%)' }}
          animate={
            reduced
              ? { opacity: 0.95, scale: 1 }
              : { opacity: [0.55, 1, 0.55], scale: [0.94, 1.06, 0.94] }
          }
          transition={{ duration: 1.2, repeat: reduced ? 0 : Infinity }}
        />
        <motion.div
          className="pointer-events-none absolute rounded-full bg-cyan-400/35 blur-2xl"
          style={z}
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 1.3, repeat: reduced ? 0 : Infinity }}
        />
      </>
    )
  }

  if (effect === 'blinds') {
    return (
      <motion.div
        className="pointer-events-none absolute rounded-lg bg-slate-300/20 blur-sm ring-1 ring-slate-200/25"
        style={{ ...z, transform: 'translateX(-50%)' }}
        initial={{ opacity: 0, y: 8 }}
        animate={reduced ? { opacity: 0.85, y: 0 } : { opacity: 0.9, y: [0, -6, 0] }}
        transition={{ duration: 1.6, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
      />
    )
  }

  return (
    <motion.div
      className="pointer-events-none absolute rounded-xl bg-cyan-300/45 blur-2xl ring-1 ring-cyan-200/40"
      style={z}
      initial={{ opacity: 0 }}
      animate={
        reduced
          ? { opacity: 0.88 }
          : { opacity: [0.4, 0.92, 0.45], scale: [0.97, 1.05, 0.98] }
      }
      transition={{ duration: 1.4, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
    />
  )
}

export const DomoticInteractiveImage = ({
  src,
  alt,
  eager = false,
  onLoad,
  onError,
}: DomoticInteractiveImageProps) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoverCapable, setHoverCapable] = useState(false)
  const [stageWidth, setStageWidth] = useState(0)
  const { loaded, visible, progress, handleLoad, handleError } = usePhoneImageLoad(src)
  const showImage = loaded && !visible
  const [tooltipPos, setTooltipPos] = useState<{
    x: number
    y: number
    placement: TooltipPlacement
    ready: boolean
  }>({ x: 0, y: 0, placement: 'top', ready: false })
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const hotspotRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const reduced = useReducedMotion()

  const activeSpot = domoticHotspots.find((s) => s.id === activeId)
  const useBottomPanel = !hoverCapable
  const compactTooltip = stageWidth > 0 && stageWidth < 300

  const updateTooltipPosition = useCallback(() => {
    if (!activeId || useBottomPanel) {
      setTooltipPos((p) => ({ ...p, ready: false }))
      return
    }

    const stage = stageRef.current
    const hotspot = hotspotRefs.current[activeId]
    const tooltip = tooltipRef.current
    if (!stage || !hotspot || !tooltip) return

    const sr = stage.getBoundingClientRect()
    const hr = hotspot.getBoundingClientRect()
    const isCompact = sr.width < 300
    const tw = tooltip.offsetWidth || (isCompact ? 136 : 144)
    const th = tooltip.offsetHeight || (isCompact ? 76 : 88)

    const hx = hr.left - sr.left + hr.width / 2
    const hy = hr.top - sr.top + hr.height / 2
    const hradius = Math.max(hr.width, hr.height) / 2 + 2

    const pos = getBestTooltipPosition(sr.width, sr.height, hx, hy, hradius, tw, th)
    setTooltipPos({ x: pos.x, y: pos.y, placement: pos.placement, ready: true })
  }, [activeId, useBottomPanel])

  useEffect(() => {
    const hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setHoverCapable(hoverMq.matches)
    update()
    hoverMq.addEventListener('change', update)
    return () => hoverMq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const ro = new ResizeObserver((entries) => {
      setStageWidth(entries[0]?.contentRect.width ?? 0)
    })
    ro.observe(stage)
    return () => ro.disconnect()
  }, [loaded])

  useLayoutEffect(() => {
    if (!activeId || useBottomPanel) return
    updateTooltipPosition()
    const id = requestAnimationFrame(updateTooltipPosition)
    return () => cancelAnimationFrame(id)
  }, [activeId, useBottomPanel, updateTooltipPosition, loaded, stageWidth])

  useEffect(() => {
    if (!activeId || useBottomPanel) return
    const onResize = () => updateTooltipPosition()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeId, useBottomPanel, updateTooltipPosition])

  useEffect(() => {
    if (!activeId) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Element
      if (!rootRef.current?.contains(target)) return
      if (!target.closest('[data-domotic-hotspot]') && !target.closest('[data-domotic-panel]')) {
        setActiveId(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [activeId])

  const handleEnter = useCallback(
    (id: string) => {
      if (hoverCapable) setActiveId(id)
    },
    [hoverCapable],
  )

  const handleLeave = useCallback(() => {
    if (hoverCapable) setActiveId(null)
  }, [hoverCapable])

  const handleClick = useCallback(
    (id: string) => {
      if (useBottomPanel || !hoverCapable) {
        setActiveId((prev) => (prev === id ? null : id))
      }
    },
    [hoverCapable, useBottomPanel],
  )

  const hotspotClass = (spot: DomoticHotspot, active: boolean) => {
    const base =
      'absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sky-300 h-3.5 w-3.5 sm:h-4 sm:w-4'

    const tones: Record<HotspotEffect, string> = {
      camera: active
        ? 'scale-125 bg-red-400 shadow-[0_0_20px_rgba(248,113,113,0.75)] ring-4 ring-red-300/45'
        : 'bg-sky-400/90 ring-4 ring-sky-400/20 hover:scale-110',
      climate: active
        ? 'scale-125 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.7)] ring-4 ring-cyan-300/45'
        : 'bg-sky-400/90 ring-4 ring-sky-400/20 hover:scale-110',
      access: active
        ? 'scale-125 bg-sky-400 shadow-[0_0_22px_rgba(0,168,255,0.7)] ring-4 ring-sky-300/50'
        : 'bg-sky-400/90 ring-4 ring-sky-400/20 hover:scale-110',
      lighting: active
        ? 'scale-125 bg-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.8)] ring-4 ring-amber-200/55'
        : 'bg-sky-400/90 ring-4 ring-sky-400/20 hover:scale-110',
      blinds: active
        ? 'scale-125 bg-slate-200 shadow-[0_0_18px_rgba(148,163,184,0.65)] ring-4 ring-slate-100/50'
        : 'bg-sky-400/90 ring-4 ring-sky-400/20 hover:scale-110',
      mobile: active
        ? 'scale-125 bg-sky-400 shadow-[0_0_22px_rgba(0,168,255,0.75)] ring-4 ring-sky-300/50'
        : 'bg-sky-400/90 ring-4 ring-sky-400/20 hover:scale-110',
    }

    return `${base} ${tones[spot.effect]}`
  }

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full flex-col overflow-hidden bg-[#090d13]"
      onMouseLeave={handleLeave}
    >
      <div ref={stageRef} className="relative min-h-0 flex-1 overflow-hidden">
        {!visible && <div className="absolute inset-0 bg-[#111827]" aria-hidden />}
        <LightningLoadOverlay progress={progress} visible={visible} />

        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover object-center transition-opacity duration-500 ${showImage ? 'opacity-100' : 'opacity-0'}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          onLoad={() => {
            handleLoad()
            onLoad?.()
          }}
          onError={() => {
            handleError()
            onError?.()
          }}
        />

        {showImage && (
          <div className="absolute inset-0">
            <AnimatePresence>
              {activeSpot && <ZoneEffect key={activeSpot.id} spot={activeSpot} reduced={reduced} />}
            </AnimatePresence>

            {domoticHotspots.map((spot) => {
              const active = activeId === spot.id
              return (
                <button
                  key={spot.id}
                  ref={(el) => {
                    hotspotRefs.current[spot.id] = el
                  }}
                  type="button"
                  data-domotic-hotspot={spot.id}
                  aria-label={spot.ariaLabel}
                  aria-expanded={active}
                  aria-describedby={active ? `tooltip-${spot.id}` : undefined}
                  className={hotspotClass(spot, active)}
                  style={{ left: spot.x, top: spot.y }}
                  onMouseEnter={() => handleEnter(spot.id)}
                  onFocus={() => handleEnter(spot.id)}
                  onBlur={() => {
                    if (!useBottomPanel) handleLeave()
                  }}
                  onClick={() => handleClick(spot.id)}
                >
                  {!reduced && !active && (
                    <span
                      className="absolute inset-0 animate-ping rounded-full bg-sky-300/30"
                      style={{ animationDuration: '3s' }}
                      aria-hidden
                    />
                  )}
                  <span className="relative block h-full w-full rounded-full bg-inherit" aria-hidden />
                </button>
              )
            })}

            {!useBottomPanel && activeSpot && (
              <div
                ref={tooltipRef}
                role="tooltip"
                id={`tooltip-${activeSpot.id}`}
                className="pointer-events-none absolute z-30"
                style={{
                  left: tooltipPos.ready ? tooltipPos.x : 0,
                  top: tooltipPos.ready ? tooltipPos.y : 0,
                  visibility: tooltipPos.ready ? 'visible' : 'hidden',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSpot.id}
                    initial={
                      reduced
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.9,
                            x: tooltipSlide[tooltipPos.placement].x,
                            y: tooltipSlide[tooltipPos.placement].y,
                          }
                    }
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={
                      reduced
                        ? undefined
                        : { opacity: 0, scale: 0.94, x: tooltipSlide[tooltipPos.placement].x * 0.4, y: 2 }
                    }
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onAnimationComplete={updateTooltipPosition}
                  >
                    <FloatingTooltip
                      spot={activeSpot}
                      placement={tooltipPos.placement}
                      compact={compactTooltip}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {useBottomPanel && (
        <AnimatePresence>
          {activeSpot ? (
            <InfoPanel spot={activeSpot} />
          ) : (
            <div className="h-0 shrink-0" aria-hidden />
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
