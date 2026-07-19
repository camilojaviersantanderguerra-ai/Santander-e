"use client";

import { useState, useTransition } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { createCheckoutForVariant } from "@/lib/actions/checkout";
import { Button } from "./ui/Button";
import type { ProductVariant } from "@/types";

interface BuyNowButtonProps {
  variants: ProductVariant[];
  fallbackProductId: string;
}

/**
 * Botón "Comprar ahora": crea un carrito real en Shopify (server action) y
 * redirige al checkout real de Shopify, donde el cliente paga de verdad
 * (Shopify Payments ya configurado). Si el producto tiene más de una
 * variante (ej. "2x1" vs "2x1+estuches"), muestra un selector simple antes
 * de comprar.
 */
export function BuyNowButton({ variants, fallbackProductId }: BuyNowButtonProps) {
  const hasVariants = variants.length > 0;
  const [selectedVariantId, setSelectedVariantId] = useState(
    hasVariants ? variants[0].id : fallbackProductId
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleBuyNow() {
    setError(null);
    startTransition(async () => {
      const result = await createCheckoutForVariant(selectedVariantId, 1);
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        setError(result.error ?? "No se pudo procesar la compra.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {variants.length > 1 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest2 text-white/50">Opción</span>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariantId(v.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  selectedVariantId === v.id
                    ? "border-bronze-400 bg-bronze-400/10 text-bronze-200"
                    : "border-white/15 text-white/60 hover:border-white/30"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button size="lg" onClick={handleBuyNow} showArrow className="w-full sm:w-auto">
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Procesando...
          </span>
        ) : (
          "Comprar ahora"
        )}
      </Button>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-2 text-xs text-white/40">
        <ShieldCheck className="h-3.5 w-3.5 text-bronze-400" />
        Pago 100% seguro procesado por Shopify
      </div>
    </div>
  );
}
