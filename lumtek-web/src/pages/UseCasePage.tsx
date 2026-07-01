import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Headphones,
  Lightbulb,
  MessageCircle,
  Quote,
  Settings,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from 'lucide-react'
import { getUseCaseBySlug, useCases } from '../data/useCases'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getIcon } from '../utils/icons'
import { AnimatedReveal } from '../components/ui/AnimatedReveal'
import { GlowButton } from '../components/ui/GlowButton'
import { OptimizedImage } from '../components/ui/OptimizedImage'

const processSteps = [
  { icon: Target, label: 'Estudio del espacio', text: 'Analizamos tu caso y definimos lo que realmente necesitas.' },
  { icon: Wrench, label: 'Instalación profesional', text: 'Montaje ordenado, seguro y adaptado a tu entorno.' },
  { icon: Settings, label: 'Puesta en marcha', text: 'Configuración, pruebas y explicación para que lo uses con confianza.' },
]

const trustItems = [
  { icon: ShieldCheck, label: 'Instalación segura' },
  { icon: Settings, label: 'Configuración a medida' },
  { icon: Headphones, label: 'Soporte cercano' },
]

const UseCasePage = () => {
  const { slug } = useParams<{ slug: string }>()
  const useCase = slug ? getUseCaseBySlug(slug) : undefined
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!useCase) return
    document.title = useCase.metaTitle
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', useCase.metaDescription)
    return () => {
      document.title = 'Lumtek | Domótica y sistemas inteligentes'
      if (meta) {
        meta.setAttribute(
          'content',
          'Lumtek ofrece soluciones de domótica, videovigilancia, control de accesos, sensores, automatización y seguridad tecnológica para viviendas, empresas y edificios.',
        )
      }
    }
  }, [useCase])

  if (!useCase) return <Navigate to="/#aplicaciones" replace />

  const Icon = getIcon(useCase.icon ?? 'Home')
  const others = useCases.filter((item) => item.id !== useCase.id).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: useCase.title,
    description: useCase.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'Lumtek',
      url: 'https://lumtek.es',
    },
    areaServed: 'España',
    serviceType: useCase.title,
    image: `https://lumtek.es${useCase.image}`,
  }

  return (
    <div className="min-h-screen bg-white page-top pb-16 sm:pb-20">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Fondo sutil */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(0 168 255 / 0.07) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-6xl section-x">
        <nav className="text-xs text-lumtek-text-secondary sm:text-sm" aria-label="Miga de pan">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="transition-colors hover:text-lumtek-blue">
                Inicio
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to="/#aplicaciones" className="transition-colors hover:text-lumtek-blue">
                Aplicaciones
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="max-w-[12rem] truncate font-medium text-lumtek-text sm:max-w-none">
              {useCase.title}
            </li>
          </ol>
        </nav>

        {/* Hero dividido */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-lumtek-border bg-white shadow-soft sm:mt-8 sm:rounded-3xl lg:grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] min-h-[240px] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
            <OptimizedImage
              src={useCase.image}
              fallbackSrc={useCase.imageRemote}
              alt={useCase.alt}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-lumtek-dark/30 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-lumtek-blue/20 bg-lumtek-blue/5 px-3 py-1">
                <Icon className="h-3.5 w-3.5 text-lumtek-blue" strokeWidth={2} />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-lumtek-blue">
                  Solución Lumtek
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-lumtek-text md:text-4xl lg:text-[2.5rem]">
                {useCase.title}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-lumtek-text-secondary md:text-lg">
                {useCase.description}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <GlowButton
                  href="/contacto"
                  variant="primary"
                  className="w-full sm:w-auto"
                  ariaLabel={`Solicitar información sobre ${useCase.title}`}
                >
                  Solicitar presupuesto
                </GlowButton>
                <Link
                  to="/#aplicaciones"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-lumtek-border bg-white px-5 py-3 text-sm font-medium text-lumtek-text transition-colors hover:border-lumtek-blue/30 hover:text-lumtek-blue sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Ver todas
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Franja de confianza */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {trustItems.map(({ icon: TrustIcon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-lumtek-border bg-lumtek-surface px-4 py-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lumtek-blue/10 text-lumtek-blue">
                <TrustIcon className="h-4 w-4" strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-lumtek-text">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-12">
          <div>
            {/* Perfil de cliente */}
            <AnimatedReveal>
              <section className="rounded-2xl border border-lumtek-blue/15 bg-gradient-to-br from-lumtek-blue/[0.04] to-white p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lumtek-blue/10 text-lumtek-blue">
                    <Users className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-lumtek-text">¿Es para ti?</h2>
                    <p className="mt-2 text-base leading-relaxed text-lumtek-text-secondary">
                      {useCase.clientProfile}
                    </p>
                  </div>
                </div>

                <blockquote className="relative mt-6 border-l-2 border-lumtek-blue pl-5">
                  <Quote className="absolute -left-1 -top-1 h-5 w-5 text-lumtek-blue/40" aria-hidden />
                  <p className="text-lg font-medium leading-snug text-lumtek-text md:text-xl">
                    {useCase.highlightQuote}
                  </p>
                </blockquote>
              </section>
            </AnimatedReveal>

            <AnimatedReveal className="mt-8">
              <p className="text-base leading-relaxed text-lumtek-text-secondary md:text-lg">
                {useCase.pageIntro}
              </p>
            </AnimatedReveal>

            {/* Reto y enfoque */}
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <AnimatedReveal delay={0.05}>
                <section className="h-full rounded-2xl border border-lumtek-border bg-white p-6 shadow-soft">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                      <Target className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <h2 className="text-base font-semibold text-lumtek-text">El reto habitual</h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-lumtek-text-secondary">
                    {useCase.challenge}
                  </p>
                </section>
              </AnimatedReveal>
              <AnimatedReveal delay={0.1}>
                <section className="h-full rounded-2xl border border-lumtek-blue/20 bg-lumtek-blue/[0.03] p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lumtek-blue/10 text-lumtek-blue">
                      <Lightbulb className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <h2 className="text-base font-semibold text-lumtek-text">Cómo te ayudamos</h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-lumtek-text-secondary">
                    {useCase.approach}
                  </p>
                </section>
              </AnimatedReveal>
            </div>

            {/* Proceso */}
            <AnimatedReveal delay={0.12} className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-lumtek-blue">
                Nuestro proceso
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {processSteps.map((step, i) => (
                  <div
                    key={step.label}
                    className="relative rounded-xl border border-lumtek-border bg-lumtek-surface p-4"
                  >
                    <span className="text-xs font-bold text-lumtek-blue/60">0{i + 1}</span>
                    <step.icon className="mt-2 h-5 w-5 text-lumtek-blue" strokeWidth={1.75} />
                    <h3 className="mt-2 text-sm font-semibold text-lumtek-text">{step.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-lumtek-text-secondary">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedReveal>

            {/* Soluciones */}
            <AnimatedReveal delay={0.14} className="mt-14">
              <h2 className="text-2xl font-bold tracking-tight text-lumtek-text md:text-3xl">
                Qué incluye esta solución
              </h2>
              <p className="mt-2 text-lumtek-text-secondary">
                Servicios y sistemas que adaptamos a las necesidades reales de tu espacio.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {useCase.solutions.map((solution, i) => (
                  <motion.article
                    key={solution.title}
                    className="group relative overflow-hidden rounded-2xl border border-lumtek-border bg-white p-5 shadow-soft transition-shadow hover:shadow-glow md:p-6"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-lumtek-blue to-lumtek-cyan opacity-80" />
                    <span className="text-xs font-bold text-lumtek-blue/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-lumtek-text group-hover:text-lumtek-blue md:text-lg">
                      {solution.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-lumtek-text-secondary">
                      {solution.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </AnimatedReveal>

            {/* Beneficios */}
            <AnimatedReveal delay={0.16} className="mt-14">
              <h2 className="text-2xl font-bold tracking-tight text-lumtek-text">
                Lo que ganas con Lumtek
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {useCase.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 rounded-xl border border-lumtek-border bg-white px-4 py-4 shadow-soft"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lumtek-blue/10">
                      <Check className="h-3.5 w-3.5 text-lumtek-blue" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm leading-relaxed text-lumtek-text-secondary">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedReveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <AnimatedReveal delay={0.08}>
              <div className="rounded-2xl border border-lumtek-border bg-white p-6 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lumtek-blue/10 text-lumtek-blue">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h2 className="mt-4 text-base font-semibold text-lumtek-text">
                  Tecnologías que integramos
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {useCase.systems.map((system) => (
                    <li
                      key={system}
                      className="rounded-full border border-lumtek-border bg-lumtek-surface px-3 py-1 text-xs font-medium text-lumtek-text-secondary"
                    >
                      {system}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-6 text-sm font-semibold text-lumtek-text">También incluye</h3>
                <ul className="mt-3 space-y-2.5">
                  {useCase.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-sm text-lumtek-text-secondary"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lumtek-blue" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.12}>
              <div className="rounded-2xl border border-lumtek-blue/25 bg-gradient-to-br from-lumtek-blue/8 to-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lumtek-blue/15 text-lumtek-blue">
                  <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h2 className="mt-4 text-base font-semibold text-lumtek-text">
                  ¿Quieres una propuesta?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-lumtek-text-secondary">
                  Cuéntanos tu espacio y te orientamos con la instalación más adecuada, sin compromiso.
                </p>
                <GlowButton
                  href="/contacto"
                  variant="primary"
                  className="mt-5 w-full"
                  ariaLabel={`Contactar por ${useCase.title}`}
                >
                  Hablar con Lumtek
                </GlowButton>
              </div>
            </AnimatedReveal>
          </aside>
        </div>

        {/* CTA ancho */}
        <AnimatedReveal className="mt-16">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-lumtek-dark to-lumtek-dark/90 px-6 py-10 text-center md:px-12 md:py-14">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Empieza con una consulta gratuita
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
              Revisamos tu caso, te explicamos opciones claras y te proponemos la solución que mejor encaje contigo.
            </p>
            <GlowButton
              href="/contacto"
              variant="primary"
              className="mt-6"
              ariaLabel="Solicitar consulta gratuita"
            >
              Solicitar consulta
            </GlowButton>
          </div>
        </AnimatedReveal>

        {/* Otras aplicaciones */}
        {others.length > 0 && (
          <AnimatedReveal className="mt-16 border-t border-lumtek-border pt-12">
            <h2 className="text-xl font-bold text-lumtek-text">Otras soluciones Lumtek</h2>
            <p className="mt-1 text-sm text-lumtek-text-secondary">
              Descubre más aplicaciones adaptadas a distintos espacios.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <Link
                  key={item.id}
                  to={`/aplicaciones/${item.id}`}
                  className="group overflow-hidden rounded-2xl border border-lumtek-border bg-white shadow-soft transition-all hover:-translate-y-0.5 hover:border-lumtek-blue/30 hover:shadow-glow"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <OptimizedImage
                      src={item.image}
                      fallbackSrc={item.imageRemote}
                      alt={item.alt}
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-lumtek-text group-hover:text-lumtek-blue">
                      {item.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-lumtek-text-secondary">
                      {item.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-lumtek-blue">
                      Ver solución
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedReveal>
        )}

        <Link
          to="/#aplicaciones"
          className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-lumtek-blue transition-colors hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a aplicaciones
        </Link>
      </div>
    </div>
  )
}

export default UseCasePage
