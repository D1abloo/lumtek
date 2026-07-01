import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const ease = [0.22, 1, 0.36, 1] as const

type AnimatedLettersProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export const AnimatedLetters = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.028,
}: AnimatedLettersProps) => {
  const reduced = useReducedMotion()

  if (reduced) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${text}-${i}-${char}`}
          className="inline-block"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * stagger, duration: 0.32, ease }}
          aria-hidden
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}
