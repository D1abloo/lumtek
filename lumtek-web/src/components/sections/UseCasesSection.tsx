import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { useCases } from '../../data/useCases'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { OptimizedImage } from '../ui/OptimizedImage'
import { SectionTitle } from '../ui/SectionTitle'
import type { UseCase } from '../../types'

type ApplicationCardProps = {
  item: UseCase
  index: number
  side: 'left' | 'right'
  expanded: boolean
  onExpand: (id: string | null) => void
  interactive?: boolean
}

const ApplicationCard = ({
  item,
  index,
  side,
  expanded,
  onExpand,
  interactive = true,
}: ApplicationCardProps) => {
  const reduced = useReducedMotion()

  const handleEnter = () => interactive && onExpand(item.id)
  const handleLeave = () => interactive && onExpand(null)

  return (
    <motion.article
      className="group relative"
      initial={reduced ? false : { opacity: 0, y: 28, x: side === 'left' ? -24 : 24 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
    >
      <motion.div
        className={`overflow-hidden rounded-2xl border bg-white shadow-soft transition-colors duration-300 ${
          expanded
            ? 'border-lumtek-blue/40 shadow-glow'
            : 'border-lumtek-border hover:border-lumtek-blue/25'
        }`}
        animate={{ y: expanded ? -6 : 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <OptimizedImage
            src={item.image}
            fallbackSrc={item.imageRemote}
            alt={item.alt}
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 38vw"
            className={`h-full w-full object-cover transition-transform duration-700 ${
              expanded ? 'scale-[1.05]' : 'group-hover:scale-[1.03]'
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-lumtek-dark/30 via-transparent to-transparent transition-opacity duration-300 ${
              expanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
            }`}
          />
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-lumtek-blue">
                Aplicación Lumtek
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-lumtek-text md:text-xl">
                {item.title}
              </h3>
            </div>
            {interactive && (
              <Link
                to={`/aplicaciones/${item.id}`}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-lumtek-border px-2.5 py-1 text-[10px] font-medium text-lumtek-text-secondary transition-colors hover:border-lumtek-blue/40 hover:text-lumtek-blue"
                aria-label={`Ver solución completa para ${item.title}`}
              >
                Ver más
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-lumtek-text-secondary">
            {item.description}
          </p>

          {!interactive && (
            <Link
              to={`/aplicaciones/${item.id}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-lumtek-blue transition-colors hover:underline"
            >
              Ver solución completa
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-4 space-y-2 border-t border-lumtek-border pt-4" aria-label={`Soluciones para ${item.title}`}>
                  {item.details.map((detail, i) => (
                    <motion.li
                      key={detail}
                      className="flex items-start gap-2 text-sm text-lumtek-text-secondary"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-lumtek-blue" strokeWidth={2.5} />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
                <Link
                  to={`/aplicaciones/${item.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-lumtek-blue transition-colors hover:underline"
                >
                  Ver solución completa
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.article>
  )
}

type SpineProps = {
  side: 'left' | 'right'
  active: boolean
  isLast: boolean
  reduced: boolean
}

const TimelineSpine = ({ side, active, isLast, reduced }: SpineProps) => (
  <div className="relative flex h-full min-h-[120px] w-14 shrink-0 items-center justify-center">
    {!isLast && (
      <motion.div
        className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-lumtek-blue/35 via-lumtek-cyan/25 to-lumtek-blue/15"
        initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        style={{ transformOrigin: 'top' }}
        aria-hidden
      />
    )}
    <motion.div
      className={`absolute top-1/2 h-0.5 -translate-y-1/2 ${
        side === 'left' ? 'right-1/2 origin-right' : 'left-1/2 origin-left'
      }`}
      style={{ width: 'calc(50% + 0.5rem)' }}
      animate={{
        backgroundColor: active ? 'rgba(0, 168, 255, 0.9)' : 'rgba(220, 227, 234, 1)',
        boxShadow: active ? '0 0 12px rgba(0, 168, 255, 0.45)' : 'none',
      }}
      transition={{ duration: 0.25 }}
      aria-hidden
    />
    <motion.span
      className={`relative z-10 h-3.5 w-3.5 rounded-full border-2 border-white ${
        active ? 'bg-lumtek-blue shadow-glow' : 'bg-lumtek-cyan/70'
      }`}
      animate={{ scale: active ? 1.35 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      aria-hidden
    />
  </div>
)

const MobileApplicationItem = ({
  item,
  index,
  open,
  onToggle,
}: {
  item: UseCase
  index: number
  open: boolean
  onToggle: () => void
}) => (
  <motion.div
    className="relative pl-10"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.04 }}
  >
    <span
      className={`absolute left-1.5 top-10 h-3 w-3 rounded-full border-2 border-white transition-colors ${
        open ? 'bg-lumtek-blue shadow-glow' : 'bg-lumtek-cyan/80'
      }`}
      aria-hidden
    />
    <div
      className={`overflow-hidden rounded-2xl border bg-white shadow-soft ${
        open ? 'border-lumtek-blue/40' : 'border-lumtek-border'
      }`}
    >
      <button
        type="button"
        className="w-full text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <OptimizedImage
            src={item.image}
            fallbackSrc={item.imageRemote}
            alt={item.alt}
            priority={index === 0}
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center justify-between gap-2 p-4">
          <div>
            <p className="font-display text-[10px] font-semibold uppercase tracking-wider text-lumtek-blue">
              Aplicación
            </p>
            <h3 className="font-display text-base font-bold text-lumtek-text">{item.title}</h3>
          </div>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-lumtek-text-secondary transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </div>
        <p className="px-4 pb-4 text-sm text-lumtek-text-secondary">{item.description}</p>
      </button>
      <div className="border-t border-lumtek-border px-4 py-3">
        <Link
          to={`/aplicaciones/${item.id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lumtek-blue px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-opacity hover:opacity-95"
        >
          Ver más
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-lumtek-border"
          >
            <ul className="space-y-2 px-4 py-4">
              {item.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-lumtek-text-secondary">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-lumtek-blue" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="border-t border-lumtek-border px-4 py-4">
              <Link
                to={`/aplicaciones/${item.id}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-lumtek-blue/30 bg-lumtek-blue/5 px-4 py-3 text-sm font-semibold text-lumtek-blue transition-colors hover:bg-lumtek-blue/10"
              >
                Ver solución completa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
)

export const UseCasesSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null)
  const reduced = useReducedMotion()

  return (
    <section id="aplicaciones" className="section-y relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,168,255,0.05),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl section-x">
        <SectionTitle
          eyebrow="Aplicaciones Lumtek"
          title="Soluciones para cada tipo de espacio"
          description="Domótica, cámaras, accesos, automatización y seguridad aplicadas a viviendas, comunidades, oficinas, negocios y edificios."
          center
        />

        {/* Móvil */}
        <div className="relative space-y-6 md:hidden">
          <motion.div
            className="absolute bottom-6 left-3 top-6 w-px bg-gradient-to-b from-lumtek-blue/40 via-lumtek-cyan/30 to-transparent"
            initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: 'top' }}
            aria-hidden
          />
          {useCases.map((item, index) => (
            <MobileApplicationItem
              key={item.id}
              item={item}
              index={index}
              open={mobileOpenId === item.id}
              onToggle={() => setMobileOpenId(mobileOpenId === item.id ? null : item.id)}
            />
          ))}
        </div>

        {/* Tablet: rejilla 2 columnas */}
        <div className="hidden gap-5 md:grid md:grid-cols-2 lg:hidden">
          {useCases.map((item, index) => (
            <ApplicationCard
              key={item.id}
              item={item}
              index={index}
              side={index % 2 === 0 ? 'left' : 'right'}
              expanded={false}
              onExpand={() => {}}
              interactive={false}
            />
          ))}
        </div>

        {/* Escritorio: timeline zigzag con ramas laterales */}
        <div
          className="relative hidden lg:block"
          onMouseLeave={() => setExpandedId(null)}
        >
          <motion.div
            className="pointer-events-none absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-lumtek-blue/20 via-lumtek-cyan/30 to-transparent"
            initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
            aria-hidden
          />

          {useCases.map((item, index) => {
            const isLeft = index % 2 === 0
            const active = expandedId === item.id

            return (
              <div
                key={item.id}
                className={`grid grid-cols-[1fr_3.5rem_1fr] items-center ${
                  index > 0 ? 'pt-2' : ''
                } ${index < useCases.length - 1 ? 'pb-10' : ''}`}
              >
                <div className={isLeft ? 'pr-4' : 'col-start-3 pl-4'}>
                  <ApplicationCard
                    item={item}
                    index={index}
                    side={isLeft ? 'left' : 'right'}
                    expanded={active}
                    onExpand={setExpandedId}
                  />
                </div>

                <div className="col-start-2 row-start-1">
                  <TimelineSpine
                    side={isLeft ? 'left' : 'right'}
                    active={active}
                    isLast={index === useCases.length - 1}
                    reduced={reduced}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
