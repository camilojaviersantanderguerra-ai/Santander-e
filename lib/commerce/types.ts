// Contrato único de "proveedor de comercio". Cualquier backend (Shopify Storefront API,
// Stripe Checkout, Mercado Pago Checkout Pro, o un backend propio) implementa esta
// interfaz. El frontend SOLO habla con `CommerceProvider`, nunca con el SDK del
// proveedor directamente. Así, conectar Shopify/Stripe/Mercado Pago más adelante
// no exige tocar componentes ni páginas.

import type { Money, Product } from "@/types";

export interface CartLine {
  productId: string;
  variantId?: string;
  quantity: number;
}

/** Línea de carrito ENRIQUECIDA para mostrar en el carrito real (nombre,
 * imagen, precio) — a diferencia de `CartLine`, que es solo lo mínimo para
 * pedir agregar algo al carrito. */
export interface CartLineDisplay {
  /** ID de la línea en Shopify (necesario para actualizar/eliminar). */
  lineId: string;
  variantId: string;
  productTitle: string;
  variantTitle?: string;
  image?: string;
  slug?: string;
  quantity: number;
  unitPrice: Money;
  lineTotal: Money;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  /** Líneas con datos completos para UI (carrito real). Puede venir vacío
   * en el `createCart()` inicial y llenarse tras `getCart()`/`addToCart()`. */
  linesDisplay?: CartLineDisplay[];
  subtotalCents: number;
  currency: string;
  checkoutUrl?: string;
  totalQuantity?: number;
}

export interface CommerceProvider {
  name: "mock" | "shopify" | "stripe" | "mercadopago";
  listProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  createCart(): Promise<Cart>;
  addToCart(cartId: string, line: CartLine): Promise<Cart>;
  createCheckout(cartId: string): Promise<{ url: string }>;
  /** Trae el carrito completo con líneas enriquecidas (para el drawer). */
  getCart(cartId: string): Promise<Cart | null>;
  /** Cambia la cantidad de una línea existente (o la elimina si quantity=0). */
  updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart>;
  removeCartLine(cartId: string, lineId: string): Promise<Cart>;
}
