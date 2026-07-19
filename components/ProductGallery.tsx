"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  discount?: number | null;
}

/**
 * Galería de producto interactiva:
 * - Imagen principal + miniaturas debajo. Clic en una miniatura cambia
 *   cuál imagen se muestra como principal.
 * - Clic en la imagen principal abre esa misma foto en grande, a pantalla
 *   casi completa (lightbox), para que el cliente pueda verla en detalle.
 * Es "use client" porque necesita estado (useState) para recordar cuál
 * imagen está activa y si el lightbox está abierto.
 */
export function ProductGallery({ images, alt, discount }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const mainImage = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setZoomOpen(true)}
        aria-label="Ver imagen en grande"
        className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-850"
      >
        {mainImage && (
          <Image
            src={mainImage}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}
        {discount ? (
          <div className="absolute left-4 top-4">
            <Badge tone="bronze">-{discount}%</Badge>
          </div>
        ) : null}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-ink-950/80 px-3 py-1.5 text-[11px] text-white/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ZoomIn className="h-3.5 w-3.5" />
          Ver en grande
        </div>
      </button>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1} de ${alt}`}
              aria-pressed={active === i}
              className={`relative aspect-square overflow-hidden rounded-xl border bg-ink-850 transition-colors duration-300 ${
                active === i
                  ? "border-bronze-400"
                  : "border-white/[0.06] hover:border-white/20"
              }`}
            >
              <Image src={img} alt={`${alt} ${i + 1}`} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoomOpen && mainImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-6 backdrop-blur-sm"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label="Cerrar"
            className="absolute right-6 top-6 rounded-full border border-white/15 p-2 text-white/70 transition-colors duration-300 hover:border-white/40 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-full w-full max-w-3xl">
            <Image
              src={mainImage}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
