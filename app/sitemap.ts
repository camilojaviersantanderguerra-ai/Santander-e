import type { MetadataRoute } from "next";
import { getAllProducts } from "@/utils/catalog";

const siteUrl = "https://www.santander-e.cl";

// Antes este archivo usaba `data/products` (catálogo DEMO) y el dominio
// antiguo `santander-eshopping.com` — Google recibía un sitemap con
// productos que ya no existen y ninguno de los productos reales de Shopify.
// Ahora usa `getAllProducts()` (el mismo catálogo real que ve el cliente)
// y el dominio real de la tienda.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/tienda",
    "/prive",
    "/nosotros",
    "/sostenibilidad",
    "/prensa",
    "/contacto",
    "/envios",
    "/devoluciones",
    "/faq",
    "/rastreo",
    "/legal/terminos",
    "/legal/privacidad",
    "/legal/cookies",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.6,
  }));

  const products = await getAllProducts();
  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/producto/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
