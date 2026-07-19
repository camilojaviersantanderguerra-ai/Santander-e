// Punto único de entrada al comercio. Cambiar de proveedor = cambiar esta línea.
//
// NOTA: ya está conectado a Shopify real (canal Headless, credenciales en
// .env.local). Sin embargo, el homepage (components/FeaturedProducts.tsx,
// Categories.tsx, etc.) todavía lee de /data/products.ts directamente, NO
// a través de `commerce` — eso es intencional por ahora, porque la tienda
// de Shopify aún no tiene productos cargados: si el homepage llamara a
// `commerce.listProducts()` hoy, se vería vacío. En cuanto agregues productos
// reales en Shopify, avísame para migrar esos componentes a usar `commerce`
// en vez de los datos de demostración.
import { shopifyProvider } from "./shopify-provider";
import type { CommerceProvider } from "./types";

export const commerce: CommerceProvider = shopifyProvider;

export * from "./types";
