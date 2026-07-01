import { motion } from 'framer-motion'
import type { AppSection } from '../../data/appSections'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SectionAppLogo } from './SectionAppLogo'
import { SectionInteractiveImage } from './SectionInteractiveImage'
import { PhoneNavBar } from './PhoneNavBar'

const ease = [0.22, 1, 0.36, 1] as const

type LumtekSectionDetailProps = {
  section: AppSection
  onBack: () => void
}

export const LumtekSectionDetail = ({ section, onBack }: LumtekSectionDetailProps) => {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden bg-[#090d13]"
      initial={reduced ? false : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduced ? undefined : { opacity: 0, x: -16 }}
      transition={{ duration: 0.42, ease }}
    >
      <SectionInteractiveImage section={section} fill className="absolute inset-0 h-full w-full rounded-none ring-0" />
      <div className="phone-text-crisp pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-[#060a10]/94 via-[#060a10]/60 to-transparent px-3 pb-8 pt-10">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lumtek-blue/15 ring-1 ring-lumtek-cyan/25 shadow-[0_0_20px_rgba(0,168,255,0.35)]">
            <SectionAppLogo id={section.id} className="h-6 w-6" glow />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-app-body text-[11px] font-semibold uppercase tracking-[0.12em] text-lumtek-cyan/90">
              Lumtek Control
            </p>
            <h2 className="font-app mt-0.5 text-lg font-bold leading-snug tracking-normal text-white">
              {section.title}
            </h2>
            <p className="font-app-body mt-1 text-xs leading-snug text-slate-300">
              {section.detailDescription}
            </p>
          </div>
        </div>
      </div>
      <PhoneNavBar
        overlay
        theme="dark"
        canBack
        canForward={false}
        onBack={onBack}
        onForward={() => {}}
      />
    </motion.div>
  )
}
