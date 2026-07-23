"use client";

import { testimonials } from "@/data/testimonials";
import { AnimatedSection } from "./AnimatedSection";
import { siteConfig } from "@/data/site-config";
import { Star, BadgeCheck } from "lucide-react";

/** Prueba social: estadísticas + reseñas verificadas. La autoridad se
 * transmite con números concretos, no con superlativos vacíos. */
export function Testimonials() {
  const { stat1, stat2, stat3 } = siteConfig.socialProof;

  return (
    <section className="relative bg-ink-900 py-28 md:py-36">
      <div className="container-brand">
        <AnimatedSection className="mb-16 grid grid-cols-1 gap-8 border-b border-white/[0.06] pb-16 text-center sm:grid-cols-3">
          {[stat1, stat2, stat3].map((s) => (
            <div key={s.label}>
              <p className="text-brushed font-display text-4xl md:text-5xl">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-widest2 text-white/40">{s.label}</p>
            </div>
          ))}
        </AnimatedSection>

        {testimonials.length > 0 && (
        <>
        <AnimatedSection className="mb-14 text-center">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Lo que dicen quienes ya compraron
          </span>
          <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Confianza construida pedido a pedido
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <AnimatedSection
              key={t.id}
              delay={i * 0.08}
              className="glass-panel flex flex-col gap-4 rounded-2xl p-6"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.round(t.rating) }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-bronze-400 text-bronze-400" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-white/70">"{t.quote}"</p>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                <div>
                  <p className="text-sm font-medium text-white/85">{t.name}</p>
                  <p className="text-xs text-white/40">{t.location}</p>
                </div>
                {t.verified && (
                  <div className="flex items-center gap-1 text-[11px] text-bronze-300/80">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verificado
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
        </>
        )}
      </div>
    </section>
  );
}
