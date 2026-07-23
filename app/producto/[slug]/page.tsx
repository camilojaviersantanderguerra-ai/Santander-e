import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/utils/catalog";
import { formatMoney, discountPercent } from "@/lib/utils";
import { BuyNowButton } from "@/components/BuyNowButton";
import { ProductGallery } from "@/components/ProductGallery";
import { Star, Flame, ShieldCheck, Truck, RotateCcw } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Metadata dinámica por producto: cada página de producto tiene su propio
// título/descripción/OG para SEO y para que se vea bien al compartir en redes.
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/producto/${slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

/** Página de detalle de producto. Server Component: obtiene el producto
 * real de Shopify (o demo como fallback) y renderiza todo en el servidor;
 * solo el botón de compra es interactivo (BuyNowButton, "use client"). */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const discount = discountPercent(product.price, product.compareAtPrice);
  const gallery = [product.image, ...(product.gallery ?? [])].filter(Boolean) as string[];
  const outOfStock =
    product.stockLevel === 0 ||
    (product.variants && product.variants.length > 0 && product.variants.every((v) => !v.inStock));
  const lowStock = !outOfStock && (product.stockLevel ?? 99) <= 8 && (product.stockLevel ?? 0) > 0;

  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Galería (interactiva: clic en miniatura cambia la imagen principal) */}
        <ProductGallery images={gallery} alt={product.name} discount={discount} />

        {/* Info + compra */}
        <div className="flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-widest2 text-bronze-300/70">
            {product.category}
          </span>
          <h1 className="mt-4 font-display text-3xl leading-tight text-white md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            {product.rating && (
              <div className="flex items-center gap-1 text-sm text-white/60">
                <Star className="h-4 w-4 fill-bronze-400 text-bronze-400" />
                {product.rating} {product.reviewCount ? `(${product.reviewCount} reseñas)` : ""}
              </div>
            )}
            {lowStock && (
              <div className="flex items-center gap-1.5 text-sm text-bronze-300">
                <Flame className="h-4 w-4" />
                Quedan {product.stockLevel} unidades
              </div>
            )}
            {outOfStock && (
              <div className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-widest2 text-white/60">
                Agotado
              </div>
            )}
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-brushed font-display text-4xl font-semibold">
              {formatMoney(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-white/30 line-through">
                {formatMoney(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.descriptionHtml ? (
            // Se usa descriptionHtml (con <p>/<ul>) en vez del texto plano
            // de Shopify, que juntaba las viñetas de la descripción en una
            // sola oración corrida sin puntuación. El contenido viene del
            // panel de Shopify de esta misma tienda (no de un tercero), por
            // eso renderizarlo como HTML es seguro.
            <div
              className="prose-product mt-6 max-w-md text-base leading-relaxed text-white/55 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:marker:text-bronze-400 [&_p]:mt-3 [&_p:first-child]:mt-0"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : (
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
              {product.description || product.shortDescription}
            </p>
          )}

          <div className="mt-10">
            <BuyNowButton
              variants={product.variants ?? []}
              fallbackProductId={product.id}
              outOfStock={outOfStock}
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-white/[0.06] pt-8 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Truck className="h-4 w-4 text-bronze-400" />
              Envío a todo Chile
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck className="h-4 w-4 text-bronze-400" />
              Garantía de satisfacción
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <RotateCcw className="h-4 w-4 text-bronze-400" />
              Devolución fácil (30 días)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
