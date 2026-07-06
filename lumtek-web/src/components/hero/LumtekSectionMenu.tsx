import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { appSections, type AppSectionId } from '../../data/appSections'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { AnimatedLetters } from './AnimatedLetters'
import { MountainBackdrop } from './MountainBackdrop'
import { PhoneNavBar } from './PhoneNavBar'
import { SectionAppLogo } from './SectionAppLogo'

const ease = [0.22, 1, 0.36, 1] as const
const spring = { type: 'spring' as const, stiffness: 320, damping: 30 }

type ElectricRevealProps = {
  index: number
  reduced: boolean
}

const ElectricReveal = ({ index, reduced }: ElectricRevealProps) => {
  if (reduced) return null

  const delay = 0.16 + index * 0.07

  return (
    <motion.span
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      aria-hidden
    >
      <motion.span
        className="absolute inset-y-[-20%] w-[38%] bg-gradient-to-r from-transparent via-lumtek-cyan/35 to-transparent"
        initial={{ x: '-130%', opacity: 0 }}
        animate={{ x: ['-130%', '220%'], opacity: [0, 0.85, 0] }}
        transition={{ duration: 0.65, delay, ease }}
      />
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-2xl"
        initial={{ boxShadow: '0 0 0 rgba(0,168,255,0)' }}
        animate={{
          boxShadow: [
            '0 0 0 rgba(0,168,255,0)',
            '0 0 14px rgba(0,168,255,0.35)',
            '0 0 0 rgba(0,168,255,0)',
          ],
        }}
        transition={{ duration: 0.5, delay, ease }}
      />
    </motion.span>
  )
}

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.18 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: spring },
}

type SectionMenuItemProps = {
  id: AppSectionId
  title: string
  sectionTitle: string
  description: string
  detailDescription: string
  index: number
  reduced: boolean
  onSelect: () => void
}

const SectionMenuItem = ({
  id,
  title,
  sectionTitle,
  description,
  detailDescription,
  index,
  reduced,
  onSelect,
}: SectionMenuItemProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.li variants={reduced ? undefined : itemVariants}>
      <motion.button
        type="button"
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`${title}. ${description}`}
        className={`group relative flex w-full items-center gap-2 rounded-2xl border px-2 py-2 text-left shadow-[0_4px_16px_rgba(0,168,255,0.06)] backdrop-blur-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumtek-blue ${
          hovered
            ? 'border-lumtek-blue/35 bg-white/95 shadow-[0_6px_20px_rgba(0,168,255,0.14)]'
            : 'border-white/60 bg-white/75'
        }`}
        whileHover={reduced ? undefined : { scale: 1.02 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.22, ease }}
      >
        <ElectricReveal index={index} reduced={reduced} />
        <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-lumtek-blue/12 to-lumtek-cyan/8 ring-1 ring-lumtek-blue/15 transition-all duration-300 group-hover:shadow-[0_0_14px_rgba(0,168,255,0.35)]">
          <SectionAppLogo id={id} className="h-5 w-5" glow />
        </span>
        <span className="phone-text-crisp relative z-10 min-w-0 flex-1 overflow-hidden leading-snug">
          <AnimatePresence mode="wait" initial={false}>
            {hovered ? (
              <motion.span
                key="hover-copy"
                className="block"
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: 4 }}
                transition={{ duration: 0.22, ease }}
                role="status"
              >
                <AnimatedLetters
                  text={sectionTitle}
                  className="font-app block line-clamp-1 text-[11px] font-semibold tracking-normal text-lumtek-blue"
                  stagger={0.02}
                />
                <span className="font-app-body mt-0.5 block line-clamp-2 text-[9px] font-medium leading-snug text-slate-600">
                  {detailDescription}
                </span>
              </motion.span>
            ) : (
              <motion.span
                key="default-copy"
                className="block"
                initial={reduced ? false : { opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -4 }}
                transition={{ duration: 0.2, ease }}
              >
                <span className="font-app block truncate text-[11px] font-semibold tracking-normal text-slate-900">
                  {title}
                </span>
                <span className="font-app-body mt-0.5 block line-clamp-2 text-[9px] font-medium leading-snug text-slate-600">
                  {description}
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </motion.li>
  )
}

type LumtekSectionMenuProps = {
  onSelect: (id: AppSectionId) => void
  canForward: boolean
  onForward: () => void
}

export const LumtekSectionMenu = ({ onSelect, canForward, onForward }: LumtekSectionMenuProps) => {
  const reduced = useReducedMotion()

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#f2f8fd] phone-text-crisp">
      <MountainBackdrop />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-2.5 pb-14 pt-2">
        <motion.div
          className="pointer-events-none mb-2 h-px w-12 bg-gradient-to-r from-transparent via-lumtek-blue/40 to-transparent"
          initial={reduced ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
          aria-hidden
        />
        <motion.ul
          className="flex w-full flex-col items-stretch gap-1.5"
          variants={reduced ? undefined : listVariants}
          initial={reduced ? false : 'hidden'}
          animate="show"
        >
          {appSections.map((section, index) => (
            <SectionMenuItem
              key={section.id}
              id={section.id}
              title={section.label}
              sectionTitle={section.title}
              description={section.menuDescription}
              detailDescription={section.detailDescription}
              index={index}
              reduced={reduced}
              onSelect={() => onSelect(section.id)}
            />
          ))}
        </motion.ul>
      </div>

      <PhoneNavBar
        overlay
        theme="light"
        canBack={false}
        canForward={canForward}
        onBack={() => {}}
        onForward={onForward}
      />
    </div>
  )
}
