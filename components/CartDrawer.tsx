"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { Button } from "./ui/Button";
import { formatMoney } from "@/lib/utils";
import type { Money } from "@/types";

/** Panel lateral del carrito real. Antes el ícono de carrito del header no
 * hacía absolutamente nada (decorativo); ahora abre esto, que muestra las
 * líneas reales del carrito de Shopify (persistente entre productos),
 * permite ajustar cantidad o quitar, y lleva al checkout real con TODO lo
 * agregado — no solo un producto a la vez. */
export function CartDrawer() {
  const { cart, isOpen, isPending, closeCart, updateLine, removeLine } = useCart();
  const lines = cart?.linesDisplay ?? [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-ink-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
              <h2 className="font-display text-lg text-white">Tu carrito</h2>
              <button
                aria-label="Cerrar carrito"
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag className="h-10 w-10 text-white/20" />
                  <p className="text-sm text-white/50">Tu carrito está vacío.</p>
                  <Button href="/tienda" onClick={closeCart}>
                    Ver la colección
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {lines.map((line) => (
                    <li key={line.lineId} className="flex gap-4">
                      <a
                        href={line.slug ? `/producto/${line.slug}` : "#"}
                        onClick={closeCart}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-800"
                      >
                        {line.image && (
                          <Image src={line.image} alt={line.productTitle} fill className="object-cover" />
                        )}
                      </a>
                      <div className="flex flex-1 flex-col gap-1">
                        <a
                          href={line.slug ? `/producto/${line.slug}` : "#"}
                          onClick={closeCart}
                          className="text-sm font-medium leading-snug text-white/90 hover:text-bronze-200"
                        >
                          {line.productTitle}
                        </a>
                        {line.variantTitle && (
                          <span className="text-xs text-white/40">{line.variantTitle}</span>
                        )}
                        <span className="text-sm text-bronze-200">{formatMoney(line.unitPrice)}</span>

                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center rounded-full border border-white/15">
                            <button
                              aria-label="Restar cantidad"
                              onClick={() => updateLine(line.lineId, line.quantity - 1)}
                              disabled={isPending}
                              className="flex h-7 w-7 items-center justify-center text-white/70 hover:text-bronze-200 disabled:opacity-40"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm text-white/90">{line.quantity}</span>
                            <button
                              aria-label="Sumar cantidad"
                              onClick={() => updateLine(line.lineId, line.quantity + 1)}
                              disabled={isPending}
                              className="flex h-7 w-7 items-center justify-center text-white/70 hover:text-bronze-200 disabled:opacity-40"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            aria-label="Quitar del carrito"
                            onClick={() => removeLine(line.lineId)}
                            disabled={isPending}
                            className="flex h-7 w-7 items-center justify-center text-white/40 hover:text-red-400 disabled:opacity-40"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-white/80">
                        {formatMoney(line.lineTotal)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-white/[0.06] px-6 py-6">
                <div className="mb-4 flex items-center justify-between text-base">
                  <span className="text-white/70">Subtotal</span>
                  <span className="font-display text-xl text-white">
                    {cart
                      ? formatMoney({
                          amount: cart.subtotalCents / 100,
                          currency: cart.currency as Money["currency"],
                        })
                      : ""}
                  </span>
                </div>
                <p className="mb-4 text-xs text-white/40">
                  El envío se calcula en el siguiente paso.
                </p>
                <Button
                  href={cart?.checkoutUrl || undefined}
                  size="lg"
                  showArrow
                  className="w-full justify-center"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Actualizando...
                    </span>
                  ) : (
                    "Ir a pagar"
                  )}
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
