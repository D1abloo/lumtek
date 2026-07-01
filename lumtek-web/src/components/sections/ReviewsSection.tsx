import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { reviews, reviewsDisclaimer } from '../../data/reviews'
import { AnimatedReveal } from '../ui/AnimatedReveal'
import { SectionTitle } from '../ui/SectionTitle'

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" aria-label={`Valoración: ${rating} de 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-lumtek-border'}`}
        strokeWidth={1.5}
      />
    ))}
  </div>
)

export const ReviewsSection = () => {
  return (
    <section id="resenas" className="section-y relative overflow-hidden bg-[#f0f9ff]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,168,255,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl section-x">
        <SectionTitle
          eyebrow="Reseñas"
          title="Lo que valoran nuestros clientes"
          description="Opiniones ficticias basadas en situaciones habituales de instalación, configuración y mantenimiento de sistemas domóticos y de seguridad."
          center
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <AnimatedReveal key={review.id} delay={i * 0.05}>
              <motion.article
                className="group flex h-full flex-col rounded-2xl border border-lumtek-border/80 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-lumtek-blue/30 hover:shadow-glow"
                whileHover={{ y: -4 }}
              >
                <StarRating rating={review.rating} />

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-lumtek-text-secondary">
                  &ldquo;{review.comment}&rdquo;
                </blockquote>

                <div className="mt-5 border-t border-lumtek-border pt-4">
                  <p className="font-display text-sm font-semibold text-lumtek-text">{review.name}</p>
                  <p className="mt-0.5 text-xs text-lumtek-text-secondary">{review.type}</p>
                  <span className="mt-2 inline-block rounded-full bg-lumtek-blue/8 px-2.5 py-0.5 text-[10px] font-medium text-lumtek-blue">
                    {review.service}
                  </span>
                </div>
              </motion.article>
            </AnimatedReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-lumtek-text-secondary/80">{reviewsDisclaimer}</p>
      </div>
    </section>
  )
}
