// Contrato único de "proveedor de comercio". Cualquier backend (Shopify Storefront API,
// Stripe Checkout, Mercado Pago Checkout Pro, o un backend propio) implementa esta
// interfaz. El frontend SOLO habla con `CommerceProvider`, nunca con el SDK del
// proveedor directamente. Así, conectar Shopify/Stripe/Mercado Pago más adelante
// no exige tocar componentes ni páginas.

import type { Product } from "@/types";

export interface CartLine {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  subtotalCents: number;
  currency: string;
  checkoutUrl?: string;
}

export interface CommerceProvider {
  name: "mock" | "shopify" | "stripe" | "mercadopago";
  listProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  createCart(): Promise<Cart>;
  addToCart(cartId: string, line: CartLine): Promise<Cart>;
  createCheckout(cartId: string): Promise<{ url: string }>;
}
