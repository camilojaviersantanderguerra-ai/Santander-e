"use client";

import { useState, useTransition } from "react";
import { Loader2, ShieldCheck, Minus, Plus, ShoppingBag } from "lucide-react";
import { createCheckoutForVariant } from "@/lib/actions/checkout";
import { useCart } from "./CartProvider";
import { Button } from "./ui/Button";
import type { ProductVariant } from "@/types";

interface BuyNowButtonProps {
  variants: ProductVariant[];
  fallbackProductId: string;
  outOfStock?: boolean;
}

/**
 * Antes este componente solo tenía "Comprar ahora" (checkout instantáneo de
 * UN producto, cantidad fija en 1) y no existía forma de agregar más de una
 * unidad ni de combinar productos distintos en una sola compra — el techo
 * de ticket promedio más grande del sitio. Ahora incluye:
 * - Selector de cantidad.
 * - "Agregar al carrito" (usa el carrito real persistente, ver CartProvider).
 * - "Comprar ahora" sigue existiendo para quien quiere pagar de inmediato,
 *   ahora respetando la cantidad elegida.
 * - Estado "Agotado": deshabilita ambos botones en vez de dejar comprar
 *   algo sin stock.
 */
export function BuyNowButton({ variants, fallbackProductId, outOfStock = false }: BuyNowButtonProps) {
  const hasVariants = variants.length > 0;
  const [selectedVariantId, setSelectedVariantId] = useState(
    hasVariants ? variants[0].id : fallbackProductId
  );
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { addItem, isPending: cartPending } = useCart();

  function handleBuyNow() {
    setError(null);
    startTransition(async () => {
      const result = await createCheckoutForVariant(selectedVariantId, quantity);
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        setError(result.error ?? "No se pudo procesar la compra.");
      }
    });
  }

  async function handleAddToCart() {
    setError(null);
    try {
      await addItem(selectedVariantId, quantity);
    } catch {
      setError("No se pudo agregar al carrito. Intenta de nuevo.");
    }
  }

  if (outOfStock) {
    return (
      <div className="flex flex-col gap-3">
        <Button size="lg" className="w-full cursor-not-allowed opacity-50 sm:w-auto" onClick={() => {}}>
          Agotado
        </Button>
        <p className="text-sm text-white/50">
          Este producto no tiene stock en este momento. Escríbenos si quieres que te avisemos cuando vuelva.
        </p>
      </div>
    );
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
                disabled={!v.inStock}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
                  selectedVariantId === v.id
                    ? "border-bronze-400 bg-bronze-400/10 text-bronze-200"
                    : "border-white/15 text-white/60 hover:border-white/30"
                }`}
              >
                {v.name}
                {!v.inStock ? " (agotado)" : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-widest2 text-white/50">Cantidad</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-white/15">
            <button
              type="button"
              aria-label="Restar cantidad"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-bronze-200"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-base text-white">{quantity}</span>
            <button
              type="button"
              aria-label="Sumar cantidad"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-bronze-200"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          variant="secondary"
          onClick={handleAddToCart}
          className="w-full justify-center sm:w-auto"
        >
          {cartPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Agregando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" /> Agregar al carrito
            </span>
          )}
        </Button>

        <Button size="lg" onClick={handleBuyNow} showArrow className="w-full justify-center sm:w-auto">
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Procesando...
            </span>
          ) : (
            "Comprar ahora"
          )}
        </Button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-2 text-xs text-white/40">
        <ShieldCheck className="h-3.5 w-3.5 text-bronze-400" />
        Pago 100% seguro procesado por Shopify
      </div>
    </div>
  );
}
