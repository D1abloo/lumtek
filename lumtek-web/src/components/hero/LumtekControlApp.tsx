import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getAppSection, type AppSectionId } from '../../data/appSections'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { LumtekIntroScreen } from './LumtekIntroScreen'
import { LumtekSectionDetail } from './LumtekSectionDetail'
import { LumtekSectionMenu } from './LumtekSectionMenu'

type AppPhase = 'intro' | 'menu' | 'detail'

type LumtekControlAppProps = {
  active?: boolean
  unlockSession?: number
}

const spring = { type: 'spring' as const, stiffness: 280, damping: 30 }

export const LumtekControlApp = ({ active = true, unlockSession = 0 }: LumtekControlAppProps) => {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<AppPhase>('intro')
  const [selectedId, setSelectedId] = useState<AppSectionId | null>(null)
  const [forwardId, setForwardId] = useState<AppSectionId | null>(null)
  const hasPassedIntro = useRef(false)

  useEffect(() => {
    if (!active) {
      setSelectedId(null)
      setForwardId(null)
      if (phase === 'detail') setPhase('menu')
      return
    }
    if (hasPassedIntro.current && phase === 'intro') {
      setPhase('menu')
    }
  }, [active, phase])

  const handleIntroComplete = useCallback(() => {
    hasPassedIntro.current = true
    setPhase('menu')
  }, [])

  const handleSelectSection = useCallback((id: AppSectionId) => {
    setForwardId(null)
    setSelectedId(id)
    setPhase('detail')
  }, [])

  const handleBack = useCallback(() => {
    if (phase !== 'detail' || !selectedId) return
    setForwardId(selectedId)
    setSelectedId(null)
    setPhase('menu')
  }, [phase, selectedId])

  const handleForward = useCallback(() => {
    if (!forwardId) return
    setSelectedId(forwardId)
    setForwardId(null)
    setPhase('detail')
  }, [forwardId])

  const section = selectedId ? getAppSection(selectedId) : null

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f2f8fd] text-lumtek-text">
      <AnimatePresence mode="wait">
        {phase === 'menu' && (
          <motion.div
            key="menu"
            className="absolute inset-0"
            initial={reduced ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: -8, scale: 0.99 }}
            transition={spring}
          >
            <LumtekSectionMenu
              key={unlockSession}
              onSelect={handleSelectSection}
              canForward={forwardId !== null}
              onForward={handleForward}
            />
          </motion.div>
        )}

        {phase === 'detail' && section && (
          <LumtekSectionDetail key={`detail-${section.id}`} section={section} onBack={handleBack} />
        )}
      </AnimatePresence>

      <AnimatePresence>{phase === 'intro' && <LumtekIntroScreen key="intro" onComplete={handleIntroComplete} />}</AnimatePresence>
    </div>
  )
}
