import type { Metadata } from "next";
import { getAllCategoryNames, getProductsByCategory } from "@/utils/catalog";
import { commerce } from "@/lib/commerce";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Explora la colección completa de Santander E-Shopping.",
  alternates: { canonical: "/tienda" },
};

interface TiendaPageProps {
  searchParams: Promise<{ categoria?: string; buscar?: string }>;
}

/** Catálogo completo. Sin categorías fijas: el filtro de arriba se arma
 * dinámicamente a partir de lo que exista en el catálogo real (Shopify).
 * Antes el ícono de buscar del header no hacía nada — ahora navega aquí
 * con `?buscar=`, y esta página filtra por nombre/descripción. */
export default async function TiendaPage({ searchParams }: TiendaPageProps) {
  const { categoria, buscar } = await searchParams;
  const categories = await getAllCategoryNames();
  const products = categoria
    ? await getProductsByCategory(categoria)
    : await commerce.listProducts().catch(() => []);

  // Si el catálogo real viene vacío (Shopify sin productos aún) o falló,
  // getProductsByCategory ya hace fallback a demo; para "todos" replicamos
  // el mismo fallback usando getAllCategoryNames como señal de que hay datos.
  const baseProducts =
    products.length > 0
      ? products
      : await getProductsByCategory(categories[0] ?? "").catch(() => []);

  const finalProducts = buscar
    ? baseProducts.filter((p) => {
        const haystack = `${p.name} ${p.shortDescription} ${p.description} ${p.category}`.toLowerCase();
        return haystack.includes(buscar.toLowerCase());
      })
    : baseProducts;

  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand">
        <AnimatedSection className="mb-12 text-center">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            {buscar ? "Resultados de búsqueda" : "Colección completa"}
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            {buscar ? `"${buscar}"` : categoria ? categoria : "Toda la tienda"}
          </h1>
        </AnimatedSection>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <a
            href="/tienda"
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest2 transition-colors duration-300 ${
              !categoria ? "border-bronze-400 text-bronze-200" : "border-white/15 text-white/50 hover:border-white/30"
            }`}
          >
            Todas
          </a>
          {categories.map((c) => (
            <a
              key={c}
              href={`/tienda?categoria=${encodeURIComponent(c)}`}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest2 transition-colors duration-300 ${
                categoria === c ? "border-bronze-400 text-bronze-200" : "border-white/15 text-white/50 hover:border-white/30"
              }`}
            >
              {c}
            </a>
          ))}
        </div>

        {finalProducts.length === 0 ? (
          <p className="text-center text-white/50">
            {buscar
              ? `No encontramos productos para "${buscar}". Prueba con otra palabra.`
              : "Todavía no hay productos en esta categoría. Vuelve pronto."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {finalProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
