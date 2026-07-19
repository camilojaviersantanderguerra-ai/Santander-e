"use server";

// Server Action: arma un carrito real en Shopify con la variante elegida y
// devuelve la URL de checkout de Shopify (donde el cliente realmente paga).
// Se ejecuta en el servidor, así que el token privado de Shopify nunca viaja
// al navegador. Se invoca directo desde un componente cliente (ver
// components/BuyNowButton.tsx) sin necesidad de una ruta /api separada.

import { commerce } from "@/lib/commerce";

interface CheckoutResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function createCheckoutForVariant(
  variantId: string,
  quantity: number = 1
): Promise<CheckoutResult> {
  try {
    const cart = await commerce.createCart();
    const updatedCart = await commerce.addToCart(cart.id, {
      productId: "",
      variantId,
      quantity,
    });

    if (!updatedCart.checkoutUrl) {
      return { success: false, error: "Shopify no devolvió una URL de checkout." };
    }

    return { success: true, url: updatedCart.checkoutUrl };
  } catch (err) {
    console.error("Error creando checkout:", err);
    return {
      success: false,
      error: "No se pudo iniciar el pago. Intenta de nuevo en unos segundos.",
    };
  }
}
