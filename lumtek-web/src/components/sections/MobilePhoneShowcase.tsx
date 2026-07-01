import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { defaultMobileView, mobileViews, type MobileView, type MobileViewId } from '../../data/mobileViews'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { PhoneDemo } from '../hero/PhoneDemo'

type ViewOptionProps = {
  view: MobileView
  active: boolean
  onSelect: () => void
  onHover: () => void
}

const ViewOption = ({ view, active, onSelect, onHover }: ViewOptionProps) => {
  const Icon = view.icon
  const reduced = useReducedMotion()

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      aria-pressed={active}
      className={`group relative w-full rounded-xl border px-3 py-2.5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumtek-blue sm:px-3.5 sm:py-3 ${
        active
          ? 'border-lumtek-blue/50 bg-white shadow-[0_4px_20px_rgba(0,168,255,0.12)]'
          : 'border-lumtek-border/60 bg-white/60 hover:border-lumtek-blue/30 hover:bg-white/90'
      }`}
    >
      {active && (
        <motion.span
          layoutId="mobile-view-active"
          className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-lumtek-blue"
          transition={reduced ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      )}
      <span className="flex items-start gap-2.5">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
            active ? 'bg-lumtek-blue text-white' : 'bg-lumtek-blue/10 text-lumtek-blue group-hover:bg-lumtek-blue/15'
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block text-sm font-semibold ${active ? 'text-lumtek-text' : 'text-lumtek-text/90'}`}>
            {view.title}
          </span>
          <span className="mt-0.5 block text-xs leading-snug text-lumtek-text-secondary">
            {view.description}
          </span>
        </span>
      </span>
    </button>
  )
}

export const MobilePhoneShowcase = () => {
  const [selectedId, setSelectedId] = useState<MobileViewId>(defaultMobileView.id)
  const selectedView = mobileViews.find((v) => v.id === selectedId) ?? defaultMobileView

  const handleSelect = useCallback((id: MobileViewId) => {
    setSelectedId(id)
  }, [])

  const handleHover = useCallback((id: MobileViewId) => {
    if (window.matchMedia('(hover: hover)').matches) {
      setSelectedId(id)
    }
  }, [])

  return (
    <div className="flex w-full max-w-md flex-col gap-5 lg:max-w-none lg:flex-row lg:items-center lg:gap-8 xl:gap-10">
      <div className="order-2 grid grid-cols-2 gap-2 sm:gap-2.5 lg:order-1 lg:flex lg:max-w-[15.5rem] lg:flex-col lg:gap-2">
        {mobileViews.map((view) => (
          <ViewOption
            key={view.id}
            view={view}
            active={selectedId === view.id}
            onSelect={() => handleSelect(view.id)}
            onHover={() => handleHover(view.id)}
          />
        ))}
      </div>

      <div className="relative order-1 flex flex-1 justify-center lg:order-2">
        <motion.div
          className="pointer-events-none absolute -left-4 top-1/2 hidden h-px w-8 origin-right bg-gradient-to-r from-transparent to-lumtek-blue/40 lg:block"
          animate={{ opacity: 0.9, scaleX: 1 }}
          transition={{ duration: 0.35 }}
          aria-hidden
        />
        <div className="overflow-visible px-2 py-2 sm:py-4">
          <PhoneDemo
            size="showcase"
            view={selectedView}
            activeGlow
            isFirstView={selectedView.id === 'camaras'}
          />
        </div>
      </div>
    </div>
  )
}
