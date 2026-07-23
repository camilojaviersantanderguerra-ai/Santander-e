import type { Metadata } from "next";
import { getAllProducts } from "@/utils/catalog";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Santander Privé",
  description:
    "La selección más cuidada del catálogo Santander E-Shopping: los productos que pasan el filtro más exigente.",
  alternates: { canonical: "/prive" },
};

/** Antes este link (footer + sección Premium del home) apuntaba a "/prive"
 * y la página no existía (404). Esta vista muestra una selección real del
 * catálogo (no una promesa vacía ni una cifra inventada) — los productos
 * mejor valorados o de mayor cuidado dentro de lo que hoy vendemos. */
export default async function PrivePage() {
  const products = await getAllProducts();
  const seleccion = [...products]
    .sort((a, b) => b.price.amount - a.price.amount)
    .slice(0, 8);

  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-3xl text-center">
        <AnimatedSection>
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            {siteConfig.premiumSection.eyebrow}
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            {siteConfig.premiumSection.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55">
            {siteConfig.premiumSection.description}
          </p>
        </AnimatedSection>
      </div>

      <div className="container-brand mt-16">
        {seleccion.length === 0 ? (
          <p className="text-center text-white/50">
            Estamos preparando la próxima selección Privé. Vuelve pronto.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seleccion.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
