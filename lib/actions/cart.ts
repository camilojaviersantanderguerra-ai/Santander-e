"use server";

// Server Actions para el carrito real (persistente entre productos y
// páginas). Antes NO existía ningún carrito: cada "Comprar ahora" creaba
// un checkout de Shopify de un solo producto y cantidad 1, sin forma de
// combinar 2+ productos distintos en una sola orden. Esto usa el mismo
// Cart API de Shopify (ya conectado en shopify-provider.ts) pero guarda el
// ID del carrito en una cookie para que persista entre visitas a distintas
// páginas — así el cliente puede ir agregando productos de fichas
// distintas y pagar todo junto al final.

import { cookies } from "next/headers";
import { commerce } from "@/lib/commerce";
import type { Cart } from "@/lib/commerce/types";

const CART_COOKIE = "santander_cart_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

async function getOrCreateCartId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(CART_COOKIE)?.value;
  if (existing) return existing;

  const cart = await commerce.createCart();
  cookieStore.set(CART_COOKIE, cart.id, {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return cart.id;
}

/** Trae el carrito actual (o uno vacío si todavía no existe ninguno). Se
 * llama al cargar el layout raíz (server-side) para hidratar el CartProvider
 * con el estado real, sin parpadeo de "carrito vacío" al primer render. */
export async function getCurrentCart(): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) return null;
  try {
    return await commerce.getCart(cartId);
  } catch (err) {
    console.error("Error obteniendo carrito:", err);
    return null;
  }
}

export async function addToCartAction(variantId: string, quantity: number): Promise<Cart> {
  const cartId = await getOrCreateCartId();
  return commerce.addToCart(cartId, { productId: "", variantId, quantity });
}

export async function updateCartLineAction(lineId: string, quantity: number): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) return null;
  return commerce.updateCartLine(cartId, lineId, quantity);
}

export async function removeCartLineAction(lineId: string): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) return null;
  return commerce.removeCartLine(cartId, lineId);
}
