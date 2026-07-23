"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatMoney, discountPercent } from "@/lib/utils";
import { Badge } from "./ui/Badge";

interface ProductCardProps {
  product: Product;
  index?: number;
}

/** Tarjeta de producto "flotante": eleva sutilmente en hover, con
 * micro-badges de escasez/prueba social sin sobrecargar el diseño. */
export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = discountPercent(product.price, product.compareAtPrice);
  const outOfStock = product.stockLevel === 0;
  const lowStock = !outOfStock && (product.stockLevel ?? 99) > 0 && (product.stockLevel ?? 99) <= 8;

  return (
    <motion.a
      href={`/producto/${product.slug}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: outOfStock ? 0 : -8 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-850/60 shadow-card transition-colors duration-500 ${
        outOfStock ? "opacity-60" : "hover:border-bronze-400/30"
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 25vw"
          className={`object-cover transition-transform duration-[1200ms] ease-premium ${
            outOfStock ? "grayscale" : "group-hover:scale-[1.06]"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {outOfStock && <Badge tone="outline">Agotado</Badge>}
          {product.badges?.map((b) => (
            <Badge key={b.label} tone={b.tone}>
              {b.label}
            </Badge>
          ))}
          {!outOfStock && discount && (
            <Badge tone="bronze">-{discount}%</Badge>
          )}
        </div>

        {lowStock && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-ink-950/80 px-3 py-1 text-[11px] text-bronze-200 backdrop-blur-sm">
            <Flame className="h-3 w-3" />
            Quedan {product.stockLevel} unidades
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-[11px] uppercase tracking-widest2 text-white/35">
          {product.category}
        </span>
        <h3 className="font-display text-lg leading-snug text-white/90">{product.name}</h3>
        <p className="text-sm text-white/45">{product.shortDescription}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-brushed font-semibold">
              {formatMoney(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-white/30 line-through">
                {formatMoney(product.compareAtPrice)}
              </span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-1 text-xs text-white/50">
              <Star className="h-3.5 w-3.5 fill-bronze-400 text-bronze-400" />
              {product.rating} ({product.reviewCount})
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
}
