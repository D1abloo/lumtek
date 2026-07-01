import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { AppSection } from '../../data/appSections'
import { getHotspotLabelClasses, getSectionHotspotMap } from '../../data/sectionHotspots'
import { usePhoneImageLoad } from '../../hooks/useImageLoadProgress'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getBestTooltipPosition } from '../../utils/getBestTooltipPosition'
import { LightningLoadOverlay } from '../ui/LightningLoadOverlay'

const ease = [0.22, 1, 0.36, 1] as const
const FILL_TOOLTIP_W = 136
const FILL_TOOLTIP_H = 56
const FILL_TOP_SAFE = 58
const FILL_BOTTOM_SAFE = 46
const FILL_PAD = 8

type SectionInteractiveImageProps = {
  section: AppSection
  compact?: boolean
  fill?: boolean
  className?: string
}

export const SectionInteractiveImage = ({
  section,
  compact = false,
  fill = false,
  className = '',
}: SectionInteractiveImageProps) => {
  const reduced = useReducedMotion()
  const map = getSectionHotspotMap(section.id)
  const glowId = `hotspot-glow-${section.id}`
  const [src, setSrc] = useState(section.image)
  const imageKey = `${section.id}-${src}`
  const { loaded, visible, progress, handleLoad, handleError } = usePhoneImageLoad(imageKey)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoverCapable, setHoverCapable] = useState(false)
  const showImage = loaded && !visible
  const imgRef = useRef<HTMLImageElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [fillTooltip, setFillTooltip] = useState<{ x: number; y: number; w: number } | null>(null)

  useEffect(() => {
    setSrc(section.image)
    setActiveId(null)
  }, [section.image, section.id])

  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) handleLoad()
  }, [imageKey, handleLoad])

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setHoverCapable(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const active = map?.hotspots.find((h) => h.id === activeId)
  const ActiveIcon = active?.icon

  useLayoutEffect(() => {
    if (!fill || !active || !stageRef.current) {
      setFillTooltip(null)
      return
    }
    const rect = stageRef.current.getBoundingClientRect()
    const tooltipW = Math.min(FILL_TOOLTIP_W, Math.floor(rect.width - FILL_PAD * 2))
    const hx = (active.x / 100) * rect.width
    const hy = (active.y / 100) * rect.height
    const pos = getBestTooltipPosition(
      rect.width,
      rect.height,
      hx,
      hy,
      14,
      tooltipW,
      FILL_TOOLTIP_H,
    )
    const x = Math.max(FILL_PAD, Math.min(pos.x, rect.width - tooltipW - FILL_PAD))
    const y = Math.max(
      FILL_TOP_SAFE,
      Math.min(pos.y, rect.height - FILL_BOTTOM_SAFE - FILL_TOOLTIP_H),
    )
    setFillTooltip({ x, y, w: tooltipW })
  }, [fill, active])

  const handleActivate = useCallback(
    (id: string) => {
      if (hoverCapable) setActiveId(id)
      else setActiveId((prev) => (prev === id ? null : id))
    },
    [hoverCapable],
  )

  if (!map) return null

  const nodeSize = fill ? 'h-8 w-8' : compact ? 'h-7 w-7' : 'h-9 w-9 sm:h-10 sm:w-10'
  const iconSize = fill ? 'h-3.5 w-3.5' : compact ? 'h-3 w-3' : 'h-4 w-4'

  return (
    <div
      className={`relative overflow-hidden bg-[#060a10] ${fill ? 'h-full min-h-0' : 'rounded-xl ring-1 ring-lumtek-blue/35'} ${className}`}
    >
      <div
        ref={stageRef}
        className={`relative w-full overflow-hidden ${
          fill
            ? 'h-full min-h-0'
            : compact
              ? 'aspect-[16/10] min-h-[7.5rem]'
              : 'aspect-[16/10] min-h-[12rem] sm:min-h-[14rem]'
        }`}
      >
        {!loaded && <div className="absolute inset-0 bg-[#111827]" aria-hidden />}
        {fill && <LightningLoadOverlay progress={progress} visible={visible} />}
        <img
          ref={imgRef}
          src={src}
          alt={section.imageAlt}
          className={`h-full w-full object-cover object-center transition-opacity duration-500 ${showImage ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={() => {
            setSrc('/images/hero/domotica.webp')
            handleError()
          }}
        />

        {showImage && (
          <>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_35%,rgba(6,10,16,0.55)_100%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060a10]/40 via-transparent to-[#060a10]/80" aria-hidden />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {map.links.map(([a, b]) => {
            const ha = map.hotspots.find((h) => h.id === a)
            const hb = map.hotspots.find((h) => h.id === b)
            if (!ha || !hb) return null
            const lit = activeId === a || activeId === b
            return (
              <line
                key={`${a}-${b}`}
                x1={ha.x}
                y1={ha.y}
                x2={hb.x}
                y2={hb.y}
                stroke={lit ? 'rgba(0,210,255,0.9)' : 'rgba(0,168,255,0.38)'}
                strokeWidth={lit ? 0.65 : 0.32}
                strokeDasharray={lit ? '0' : '2.5 2'}
                filter={lit ? `url(#${glowId})` : undefined}
              />
            )
          })}
        </svg>

        {map.hotspots.map((spot, i) => {
          const Icon = spot.icon
          const isActive = activeId === spot.id
          const labelClass = getHotspotLabelClasses(spot.x, spot.y, fill)

          return (
            <motion.button
              key={spot.id}
              type="button"
              aria-label={`${spot.label}. ${spot.description}`}
              aria-pressed={isActive}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumtek-cyan"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              initial={reduced ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.06 + i * 0.045, duration: 0.4, ease }}
              onMouseEnter={() => hoverCapable && setActiveId(spot.id)}
              onMouseLeave={() => hoverCapable && setActiveId(null)}
              onClick={() => handleActivate(spot.id)}
            >
              {isActive && !reduced && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-lumtek-cyan/25"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                  aria-hidden
                />
              )}

              <motion.span
                className={`relative flex items-center justify-center rounded-full border-2 border-white/95 bg-gradient-to-b from-lumtek-blue to-[#0077cc] shadow-[0_0_20px_rgba(0,168,255,0.6)] ${nodeSize}`}
                animate={
                  isActive
                    ? { scale: 1.12, boxShadow: '0 0 28px rgba(0,210,255,0.85), 0 0 0 3px rgba(0,210,255,0.25)' }
                    : { scale: 1, boxShadow: '0 0 16px rgba(0,168,255,0.5)' }
                }
                transition={{ duration: 0.28, ease }}
              >
                {!reduced && !isActive && (
                  <span
                    className="absolute -inset-1 rounded-full border border-lumtek-cyan/30"
                    style={{ animation: 'pulse 2.8s ease-in-out infinite' }}
                    aria-hidden
                  />
                )}
                <Icon className={`${iconSize} text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]`} strokeWidth={2.25} aria-hidden />
              </motion.span>

              <AnimatePresence>
                {isActive && !fill && (
                  <motion.span
                    key={`label-${spot.id}`}
                    role="status"
                    initial={{ opacity: 0, y: spot.y < 42 ? -6 : 6, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: spot.y < 42 ? -4 : 4, scale: 0.96 }}
                    transition={{ duration: 0.28, ease }}
                    className={`phone-text-crisp pointer-events-none absolute z-30 w-[8.25rem] rounded-lg border border-lumtek-cyan/35 bg-[#0a1018]/94 px-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.45),0_0_16px_rgba(0,168,255,0.2)] backdrop-blur-md ${labelClass}`}
                  >
                    {spot.tag && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05, duration: 0.25, ease }}
                        className="block truncate text-[8px] font-semibold uppercase tracking-[0.1em] text-lumtek-cyan/80"
                      >
                        {spot.tag}
                      </motion.span>
                    )}
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.28, ease }}
                      className="block truncate text-[10px] font-semibold leading-snug text-white"
                    >
                      {spot.label}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, duration: 0.28, ease }}
                      className="mt-0.5 block line-clamp-2 text-[9px] leading-snug text-slate-400"
                    >
                      {spot.description}
                    </motion.span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}

        <AnimatePresence>
          {fill && active && fillTooltip && (
            <motion.div
              key={`fill-tip-${active.id}`}
              role="status"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.24, ease }}
              className="phone-text-crisp pointer-events-none absolute z-40 rounded-lg border border-lumtek-cyan/40 bg-[#0a1018]/96 px-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_16px_rgba(0,168,255,0.22)] backdrop-blur-md"
              style={{
                left: fillTooltip.x,
                top: fillTooltip.y,
                width: fillTooltip.w,
              }}
            >
              {active.tag && (
                <p className="truncate text-[8px] font-semibold uppercase tracking-[0.1em] text-lumtek-cyan/85">
                  {active.tag}
                </p>
              )}
              <p className="truncate text-[11px] font-semibold leading-tight text-white">
                {active.label}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-slate-300">
                {active.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {active && ActiveIcon && !fill && (
            <motion.div
              key={`panel-${active.id}`}
              role="status"
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.32, ease }}
              className={`absolute z-20 flex items-center gap-2 border border-white/12 bg-[#0a1018]/90 shadow-[0_10px_28px_rgba(0,0,0,0.5),0_0_20px_rgba(0,168,255,0.1)] backdrop-blur-lg ${
                fill
                  ? 'bottom-12 left-2 right-2 rounded-xl px-2.5 py-2'
                  : compact
                    ? 'bottom-2 left-2 right-2 rounded-lg px-2.5 py-2'
                    : 'bottom-3 left-3 right-3 rounded-xl px-3 py-2.5'
              }`}
            >
              <div className="min-w-0 flex-1 overflow-hidden">
                {active.tag && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.22, ease }}
                    className="truncate text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {active.tag}
                  </motion.p>
                )}
                <motion.p
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05, duration: 0.26, ease }}
                  className={`truncate font-bold text-white ${fill ? 'text-xs leading-tight' : compact ? 'text-xs' : 'text-sm'}`}
                >
                  {active.label}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.09, duration: 0.26, ease }}
                  className={`mt-0.5 line-clamp-2 text-slate-400 ${fill ? 'text-[10px] leading-snug' : compact ? 'text-[10px]' : 'text-xs'}`}
                >
                  {active.description}
                </motion.p>
              </div>
              <motion.span
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.06, duration: 0.3, ease }}
                className={`flex shrink-0 items-center justify-center rounded-lg bg-lumtek-blue/15 shadow-[0_0_16px_rgba(0,168,255,0.3)] ring-1 ring-lumtek-cyan/35 ${
                  fill ? 'h-9 w-9' : 'h-11 w-11'
                }`}
              >
                <ActiveIcon className={`text-lumtek-cyan ${fill ? 'h-4 w-4' : 'h-5 w-5'}`} strokeWidth={2} aria-hidden />
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}
