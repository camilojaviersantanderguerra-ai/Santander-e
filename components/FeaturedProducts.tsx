import { getFeaturedProducts } from "@/utils/catalog";
import { ProductCard } from "./ProductCard";
import { AnimatedSection } from "./AnimatedSection";
import { Button } from "./ui/Button";

/** Productos destacados: la arquitectura no asume categorías fijas,
 * simplemente muestra lo marcado como `isFeatured` en /data/products.ts. */
export async function FeaturedProducts() {
  const featured = await getFeaturedProducts(8);

  return (
    <section className="relative bg-ink-950 py-28 md:py-36">
      <div className="container-brand">
        <AnimatedSection className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
              Selección curada
            </span>
            <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
              Lo más deseado ahora mismo
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/45">
            Cada pieza pasa un filtro de calidad antes de entrar al catálogo. Nada llega
            aquí por casualidad.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <AnimatedSection className="mt-14 flex justify-center">
          <Button href="/tienda" variant="secondary" size="lg" showArrow>
            Ver toda la colección
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
