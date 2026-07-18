import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const siteUrl = "https://www.santander-eshopping.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tienda", "/prive", "/nosotros", "/contacto"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/producto/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
