import { useReducedMotion } from '../../hooks/useReducedMotion'

const nodes = [
  { x: '12%', y: '18%', delay: '0s' },
  { x: '78%', y: '22%', delay: '1.2s' },
  { x: '88%', y: '65%', delay: '0.6s' },
  { x: '25%', y: '78%', delay: '1.8s' },
  { x: '55%', y: '12%', delay: '0.9s' },
  { x: '42%', y: '55%', delay: '2.1s' },
]

export const HeroParticles = () => {
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-20">
        <line x1="12%" y1="18%" x2="55%" y2="12%" stroke="#00A8FF" strokeWidth="0.5" opacity="0.4" />
        <line x1="55%" y1="12%" x2="78%" y2="22%" stroke="#22D3EE" strokeWidth="0.5" opacity="0.3" />
        <line x1="78%" y1="22%" x2="88%" y2="65%" stroke="#00A8FF" strokeWidth="0.5" opacity="0.35" />
        <line x1="42%" y1="55%" x2="25%" y2="78%" stroke="#7C3AED" strokeWidth="0.5" opacity="0.25" />
        <line x1="12%" y1="18%" x2="42%" y2="55%" stroke="#22D3EE" strokeWidth="0.5" opacity="0.3" />
      </svg>
      {nodes.map((node, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-lumtek-cyan/60 animate-pulse-glow"
          style={{ left: node.x, top: node.y, animationDelay: node.delay }}
        />
      ))}
      <div className="absolute left-1/2 top-1/3 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-lumtek-blue/40 to-transparent" />
    </div>
  )
}
