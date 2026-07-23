// Punto único de entrada al comercio. Cambiar de proveedor = cambiar esta línea.
//
// Conectado a Shopify real (canal Headless, credenciales en .env.local).
// Todo el catálogo (homepage, /tienda, fichas de producto) ya lee del
// catálogo real vía `utils/catalog.ts` (que llama a `commerce.listProducts()`
// / `commerce.getProductBySlug()`), con fallback silencioso a
// `/data/products.ts` (demo) solo si Shopify no devuelve nada o falla.
import { shopifyProvider } from "./shopify-provider";
import type { CommerceProvider } from "./types";

export const commerce: CommerceProvider = shopifyProvider;

export * from "./types";
