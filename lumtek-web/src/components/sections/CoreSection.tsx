import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { coreNodes, coreHubNode, CORE_RING_RADIUS } from '../../data/coreNodes'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getIcon } from '../../utils/icons'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { SectionTitle } from '../ui/SectionTitle'
import type { CoreNode } from '../../types'

const CORE_HUB = 44
const VIEW_SIZE = 440
const CENTER = VIEW_SIZE / 2

const toPercent = (value: number) => `${(value / VIEW_SIZE) * 100}%`

const getNodePosition = (node: CoreNode) => {
  const radius = node.radius ?? CORE_RING_RADIUS
  const angle = node.angle ?? 0
  const rad = (angle * Math.PI) / 180
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  }
}

const getLinePath = (x: number, y: number) => {
  const dx = x - CENTER
  const dy = y - CENTER
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const x1 = CENTER + ux * CORE_HUB
  const y1 = CENTER + uy * CORE_HUB
  return `M ${x1} ${y1} L ${x} ${y}`
}

type CoreDetailPanelProps = {
  nodeId: string | null
  className?: string
}

const CoreDetailPanel = ({ nodeId, className = '' }: CoreDetailPanelProps) => {
  const node =
    nodeId === coreHubNode.id
      ? coreHubNode
      : coreNodes.find((n) => n.id === nodeId)
  const Icon = node ? getIcon(node.icon) : null

  return (
    <div className={`min-h-[280px] ${className}`}>
      <AnimatePresence mode="wait">
        {node && Icon ? (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-lumtek-border bg-white p-6 shadow-card"
          >
            <div className="flex items-start gap-4">
              <motion.span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lumtek-blue/15 to-lumtek-cyan/10 text-lumtek-blue"
                initial={{ rotate: -8, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </motion.span>
              <div>
                <h3 className="font-display text-xl font-bold text-lumtek-text">{node.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lumtek-text-secondary">
                  {node.description}
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5" aria-label={`Capacidades de ${node.title}`}>
              {node.highlights.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-lumtek-text-secondary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lumtek-blue/10">
                    <Check className="h-3 w-3 text-lumtek-blue" strokeWidth={2.5} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-lumtek-border bg-white/60 p-6 text-center"
          >
            <motion.div
              className="h-16 w-16 rounded-full border-2 border-lumtek-blue/20 bg-lumtek-blue/5"
              animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="mt-4 font-display text-sm font-semibold text-lumtek-text">
              Explora el ecosistema Core
            </p>
            <p className="mt-1 max-w-xs text-xs text-lumtek-text-secondary">
              Pasa el cursor sobre un módulo para ver domótica, cámaras, accesos y más.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const CoreSection = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const HubIcon = getIcon(coreHubNode.icon)

  const handleClear = () => setActiveNode(null)

  return (
    <section id="core" className="section-y relative overflow-hidden bg-lumtek-surface">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,168,255,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl section-x">
        <SectionTitle
          eyebrow="Núcleo integrado"
          title="El Core Lumtek"
          description="El ecosistema central que conecta domótica, cámaras, accesos, sensores y automatización en una experiencia unificada."
          center
        />

        <div
          className="hidden lg:grid lg:grid-cols-[1fr_minmax(280px,340px)] lg:items-center lg:gap-10"
          onMouseLeave={handleClear}
        >
          <AnimatedReveal className="relative mx-auto w-full max-w-[440px]">
            <div className="relative aspect-square w-full">
            <svg
              viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              <defs>
                <linearGradient id="core-line-active" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="#00A8FF" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
                <linearGradient id="core-line-idle" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DCE3EA" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#DCE3EA" />
                </linearGradient>
                <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx={CENTER}
                cy={CENTER}
                r={CORE_RING_RADIUS}
                fill="none"
                stroke="#22D3EE"
                strokeWidth={1}
                strokeDasharray="4 8"
                strokeOpacity={0.4}
              />

              {!reduced &&
                coreNodes.map((node) => {
                  const pos = getNodePosition(node)
                  const isActive = activeNode === node.id
                  return (
                    <motion.circle
                      key={`pulse-${node.id}`}
                      cx={pos.x}
                      cy={pos.y}
                      r={isActive ? 6 : 0}
                      fill="#00A8FF"
                      fillOpacity={0.35}
                      animate={isActive ? { r: [4, 14, 4], opacity: [0.5, 0, 0.5] } : { r: 0 }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )
                })}

              {coreNodes.map((node) => {
                const pos = getNodePosition(node)
                const isActive = activeNode === node.id
                const dimmed = activeNode && !isActive
                return (
                  <g key={`line-${node.id}`}>
                    <motion.path
                      d={getLinePath(pos.x, pos.y)}
                      fill="none"
                      stroke={isActive ? 'url(#core-line-active)' : 'url(#core-line-idle)'}
                      strokeWidth={isActive ? 2.5 : 1}
                      strokeLinecap="round"
                      filter={isActive ? 'url(#core-glow)' : undefined}
                      animate={
                        reduced
                          ? {}
                          : isActive
                            ? { strokeOpacity: [0.75, 1, 0.75] }
                            : { strokeOpacity: dimmed ? 0.3 : 0.62 }
                      }
                      transition={
                        isActive
                          ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                          : { duration: 0.3 }
                      }
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isActive ? 4.5 : 3.5}
                      fill={isActive ? '#00A8FF' : '#ffffff'}
                      stroke={isActive ? '#00A8FF' : '#22D3EE'}
                      strokeWidth={1.5}
                      opacity={dimmed ? 0.45 : 1}
                    />
                  </g>
                )
              })}

              {!reduced && (
                <motion.circle
                  cx={CENTER}
                  cy={CENTER}
                  r={CORE_HUB + 8}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth={1}
                  strokeOpacity={0.35}
                  animate={{ r: [CORE_HUB + 4, CORE_HUB + 14, CORE_HUB + 4], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </svg>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <motion.button
                type="button"
                className={`pointer-events-auto relative flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center gap-0.5 rounded-full border-2 bg-white font-display shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-lumtek-blue ${
                  activeNode === coreHubNode.id
                    ? 'border-lumtek-blue text-lumtek-blue'
                    : 'border-lumtek-blue/35 text-lumtek-blue'
                }`}
                onMouseEnter={() => setActiveNode(coreHubNode.id)}
                onFocus={() => setActiveNode(coreHubNode.id)}
                onClick={() =>
                  setActiveNode((id) => (id === coreHubNode.id ? null : coreHubNode.id))
                }
                aria-pressed={activeNode === coreHubNode.id}
                aria-label={coreHubNode.title}
                animate={
                  reduced
                    ? {}
                    : activeNode === coreHubNode.id
                      ? { scale: [1, 1.1, 1], boxShadow: ['0 8px 32px rgba(0,168,255,0.15)', '0 12px 40px rgba(0,168,255,0.35)', '0 8px 32px rgba(0,168,255,0.15)'] }
                      : activeNode
                        ? { scale: 1 }
                        : { scale: [1, 1.04, 1] }
                }
                transition={{
                  duration: activeNode === coreHubNode.id ? 0.8 : 3,
                  repeat: reduced || activeNode ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >
                {!reduced && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-lumtek-cyan/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    aria-hidden
                  />
                )}
                <span className="absolute inset-3 rounded-full border border-lumtek-blue/10" aria-hidden />
                <HubIcon className="relative z-10 h-5 w-5" strokeWidth={2} />
                <span className="relative z-10 text-[9px] font-bold uppercase leading-none tracking-wide">
                  Core
                </span>
                <span className="relative z-10 max-w-[4.5rem] text-center text-[7px] font-semibold leading-tight text-lumtek-text-secondary">
                  {coreHubNode.title}
                </span>
              </motion.button>
            </div>

            {coreNodes.map((node) => {
              const pos = getNodePosition(node)
              const isActive = activeNode === node.id
              const dimmed = activeNode && !isActive
              const NodeIcon = getIcon(node.icon)

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  className={`absolute flex max-w-[5.5rem] -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border px-2 py-1.5 text-[10px] font-semibold shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-lumtek-blue sm:max-w-none sm:gap-1.5 sm:px-3 sm:text-xs ${
                    isActive
                      ? 'border-lumtek-blue bg-white text-lumtek-blue shadow-glow'
                      : 'border-lumtek-border bg-white text-lumtek-text-secondary hover:border-lumtek-blue/40'
                  }`}
                  style={{ left: toPercent(pos.x), top: toPercent(pos.y) }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onFocus={() => setActiveNode(node.id)}
                  animate={{
                    scale: isActive ? 1.08 : 1,
                    opacity: dimmed ? 0.45 : 1,
                  }}
                  whileHover={reduced ? {} : { scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  aria-pressed={isActive}
                >
                  <NodeIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                  {node.title}
                </motion.button>
              )
            })}
            </div>
          </AnimatedReveal>

          <CoreDetailPanel nodeId={activeNode} />
        </div>

        {/* Tablet: diagrama + panel debajo */}
        <div className="hidden md:block lg:hidden" onMouseLeave={handleClear}>
          <AnimatedReveal className="relative mx-auto w-full max-w-[400px]">
            <CoreRadial
              activeNode={activeNode}
              onSelect={setActiveNode}
              reduced={reduced}
            />
          </AnimatedReveal>
          <div className="mt-8">
            <CoreDetailPanel nodeId={activeNode} />
          </div>
        </div>

        {/* Móvil: acordeón */}
        <div className="mt-4 space-y-2 md:hidden">
          <AnimatedReveal>
            <div
              className={`overflow-hidden rounded-xl border bg-white transition-colors ${
                activeNode === coreHubNode.id
                  ? 'border-lumtek-blue/40 shadow-glow'
                  : 'border-lumtek-border'
              }`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                onClick={() =>
                  setActiveNode(activeNode === coreHubNode.id ? null : coreHubNode.id)
                }
                aria-expanded={activeNode === coreHubNode.id}
              >
                <span className="flex items-center gap-2.5 font-display text-sm font-semibold text-lumtek-text">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lumtek-blue/10 text-lumtek-blue">
                    <HubIcon className="h-4 w-4" />
                  </span>
                  Núcleo · {coreHubNode.title}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-lumtek-text-secondary transition-transform ${activeNode === coreHubNode.id ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {activeNode === coreHubNode.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-lumtek-border"
                  >
                    <p className="px-4 pt-3 text-sm text-lumtek-text-secondary">
                      {coreHubNode.description}
                    </p>
                    <ul className="space-y-2 px-4 py-3">
                      {coreHubNode.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-xs text-lumtek-text-secondary"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lumtek-blue" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedReveal>
          {coreNodes.map((node, i) => {
            const isOpen = activeNode === node.id
            const NodeIcon = getIcon(node.icon)
            return (
              <AnimatedReveal key={node.id} delay={i * 0.04}>
                <div
                  className={`overflow-hidden rounded-xl border bg-white transition-colors ${
                    isOpen ? 'border-lumtek-blue/40 shadow-glow' : 'border-lumtek-border'
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    onClick={() => setActiveNode(isOpen ? null : node.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-2.5 font-display text-sm font-semibold text-lumtek-text">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lumtek-blue/10 text-lumtek-blue">
                        <NodeIcon className="h-4 w-4" />
                      </span>
                      {node.title}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-lumtek-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-lumtek-border"
                      >
                        <p className="px-4 pt-3 text-sm text-lumtek-text-secondary">
                          {node.description}
                        </p>
                        <ul className="space-y-2 px-4 py-3">
                          {node.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2 text-xs text-lumtek-text-secondary"
                            >
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lumtek-blue" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

type CoreRadialProps = {
  activeNode: string | null
  onSelect: (id: string) => void
  reduced: boolean
}

const CoreRadial = ({ activeNode, onSelect, reduced }: CoreRadialProps) => {
  const HubIcon = getIcon(coreHubNode.icon)

  return (
    <div className="relative aspect-square w-full">
      <svg
        viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="core-line-active-sm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={CORE_RING_RADIUS}
          fill="none"
          stroke="#22D3EE"
          strokeWidth={1}
          strokeDasharray="4 8"
          strokeOpacity={0.35}
        />
        {coreNodes.map((node) => {
          const pos = getNodePosition(node)
          const isActive = activeNode === node.id
          const dimmed = activeNode && !isActive
          return (
            <g key={node.id}>
              <motion.path
                d={getLinePath(pos.x, pos.y)}
                fill="none"
                stroke={isActive ? 'url(#core-line-active-sm)' : '#DCE3EA'}
                strokeWidth={isActive ? 2.25 : 1}
                strokeLinecap="round"
                animate={isActive && !reduced ? { strokeOpacity: [0.65, 1, 0.65] } : {}}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 4 : 3}
                fill={isActive ? '#00A8FF' : '#ffffff'}
                stroke={isActive ? '#00A8FF' : '#22D3EE'}
                strokeWidth={1.5}
                opacity={dimmed ? 0.45 : 1}
              />
            </g>
          )
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          className={`pointer-events-auto flex h-20 w-20 flex-col items-center justify-center gap-0.5 rounded-full border-2 bg-white font-display shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-lumtek-blue ${
            activeNode === coreHubNode.id
              ? 'border-lumtek-blue text-lumtek-blue'
              : 'border-lumtek-blue/30 text-lumtek-blue'
          }`}
          onMouseEnter={() => onSelect(coreHubNode.id)}
          onFocus={() => onSelect(coreHubNode.id)}
          onClick={() => onSelect(coreHubNode.id)}
          aria-pressed={activeNode === coreHubNode.id}
          aria-label={coreHubNode.title}
        >
          <HubIcon className="h-5 w-5" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase leading-none">Core</span>
          <span className="max-w-[4rem] text-center text-[7px] font-semibold leading-tight text-lumtek-text-secondary">
            {coreHubNode.title}
          </span>
        </button>
      </div>
      {coreNodes.map((node) => {
        const pos = getNodePosition(node)
        const isActive = activeNode === node.id
        const NodeIcon = getIcon(node.icon)
        return (
          <button
            key={node.id}
            type="button"
            className={`absolute flex max-w-[4.75rem] -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border px-2 py-1.5 text-[10px] font-semibold sm:max-w-none sm:px-2.5 sm:text-[11px] ${
              isActive ? 'border-lumtek-blue bg-white text-lumtek-blue shadow-glow' : 'border-lumtek-border bg-white text-lumtek-text-secondary'
            }`}
            style={{ left: toPercent(pos.x), top: toPercent(pos.y) }}
            onMouseEnter={() => onSelect(node.id)}
            onFocus={() => onSelect(node.id)}
            onClick={() => onSelect(node.id)}
          >
            <NodeIcon className="h-3 w-3" />
            {node.title}
          </button>
        )
      })}
    </div>
  )
}
