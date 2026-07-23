// Proveedor "mock" usado mientras no hay una pasarela conectada.
// Sirve como referencia de implementación: cuando se integre Shopify/Stripe/Mercado Pago,
// se crea un archivo hermano (ej. shopify-provider.ts) que cumpla `CommerceProvider`
// y se cambia una sola línea en `lib/commerce/index.ts`.

import { products } from "@/data/products";
import type { CommerceProvider, Cart, CartLine } from "./types";

let mockCart: Cart = {
  id: "mock-cart",
  lines: [],
  subtotalCents: 0,
  currency: "USD",
};

export const mockProvider: CommerceProvider = {
  name: "mock",

  async listProducts() {
    return products;
  },

  async getProductBySlug(slug: string) {
    return products.find((p) => p.slug === slug) ?? null;
  },

  async createCart() {
    mockCart = { id: "mock-cart", lines: [], subtotalCents: 0, currency: "USD" };
    return mockCart;
  },

  async addToCart(cartId, line: CartLine) {
    mockCart.lines.push(line);
    return mockCart;
  },

  async getCart() {
    return mockCart;
  },

  async updateCartLine() {
    return mockCart;
  },

  async removeCartLine() {
    return mockCart;
  },

  async createCheckout() {
    // En producción esto devolverá la URL real de checkout de Shopify/Stripe/Mercado Pago.
    return { url: "/checkout" };
  },
};
