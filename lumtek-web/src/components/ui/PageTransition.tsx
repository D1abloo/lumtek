import { useEffect, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(children)

  useEffect(() => {
    if (reduced) {
      setDisplay(children)
      return
    }

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> }
    }

    if (doc.startViewTransition) {
      doc.startViewTransition(() => setDisplay(children))
    } else {
      setDisplay(children)
    }
  }, [location.pathname, children, reduced])

  if (reduced) return <>{display}</>

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {display}
      </motion.div>
    </AnimatePresence>
  )
}
