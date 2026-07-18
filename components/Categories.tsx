import Image from "next/image";
import { featuredCategories } from "@/data/categories";
import { AnimatedSection } from "./AnimatedSection";

/** Grid de categorías flexible: agregar/quitar una categoría en
 * /data/categories.ts reordena el layout automáticamente (no hay
 * posiciones fijas hardcodeadas por categoría). */
export function Categories() {
  return (
    <section id="categorias" className="relative bg-ink-900 py-28 md:py-36">
      <div className="container-brand">
        <AnimatedSection className="mb-14 text-center">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Explora por interés
          </span>
          <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Una tienda, todos los mundos
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {featuredCategories.map((cat, i) => (
            <AnimatedSection key={cat.id} delay={i * 0.06}>
              <a
                href={`/tienda?categoria=${cat.slug}`}
                className="group relative block aspect-square overflow-hidden rounded-2xl border border-white/[0.06]"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 45vw, 30vw"
                  className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-lg text-white md:text-xl">{cat.name}</h3>
                  <p className="mt-1 hidden text-xs text-white/50 md:block">
                    {cat.description}
                  </p>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
