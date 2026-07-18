import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { AnimatedSection } from "./AnimatedSection";
import { Button } from "./ui/Button";

/** Sección "marca" — el corazón del posicionamiento de lujo. Aquí no se
 * vende un producto, se vende una idea: la exclusividad de Santander Privé.
 * Mucho espacio negativo, imagen editorial, texto corto y contundente. */
export function PremiumSection() {
  return (
    <section id="premium" className="relative overflow-hidden bg-ink-950 py-28 md:py-40">
      <div className="container-brand grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <AnimatedSection className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src={siteConfig.premiumSection.image}
            alt={siteConfig.premiumSection.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            {siteConfig.premiumSection.eyebrow}
          </span>
          <h2 className="mt-5 font-display text-4xl leading-tight text-white md:text-5xl">
            {siteConfig.premiumSection.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">
            {siteConfig.premiumSection.description}
          </p>
          <div className="mt-10">
            <Button href="/prive" size="lg" showArrow>
              {siteConfig.premiumSection.cta}
            </Button>
          </div>
        </AnimatedSection>
      </div>

      {/* Halo dorado muy tenue detrás de la imagen */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-bronze-500/[0.08] blur-[120px]" />
    </section>
  );
}
