// Utilidades para derivar estructura dinámica del catálogo.
// La arquitectura NO fija categorías: se calculan a partir de los productos
// existentes, así que agregar un producto de una categoría inédita
// (Gadgets, Mascotas, Auto, lo que sea) actualiza la navegación solo.
//
// Fuente de datos: `commerce.listProducts()` (hoy Shopify real, ver
// lib/commerce/index.ts). Si por algún motivo Shopify no devuelve productos
// (tienda vacía o error de red), se hace fallback silencioso al catálogo de
// demostración en /data/products.ts para que el sitio nunca se vea vacío o roto.

import { cache } from "react";
import { commerce } from "@/lib/commerce";
import { products as demoProducts } from "@/data/products";
import type { Product } from "@/types";

// Envuelto en `cache()` de React: sin esto, cada página (layout para las
// categorías + la página misma para los productos) hacía su PROPIA llamada
// por separado a la API de Shopify en cada carga — el doble de peticiones
// de las necesarias, y si una de las dos fallaba o llegaba vacía (timeout,
// límite de tasa de Shopify, etc.) esa parte específica caía al catálogo de
// demostración mientras la otra sí mostraba datos reales. `cache()` hace que
// todas las llamadas dentro de una misma carga de página reutilicen el
// mismo resultado — una sola petición real a Shopify por carga de página.
export const getAllProducts = cache(async (): Promise<Product[]> => {
  try {
    const liveProducts = await commerce.listProducts();
    return liveProducts.length > 0 ? liveProducts : demoProducts;
  } catch (err) {
    console.error("No se pudo obtener el catálogo de Shopify, usando demo:", err);
    return demoProducts;
  }
});

export async function getAllCategoryNames(): Promise<string[]> {
  const products = await getAllProducts();
  return Array.from(new Set(products.map((p) => p.category))).sort();
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.isFeatured);
  // Si ningún producto real está marcado como destacado todavía (común
  // recién empezando), mostramos los primeros del catálogo en su lugar.
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getNewProducts(limit = 6): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.isNew).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = await commerce.getProductBySlug(slug);
    if (product) return product;
  } catch (err) {
    console.error("Error buscando producto en Shopify:", err);
  }
  // Fallback a demo si Shopify falla o el producto no existe ahí.
  return demoProducts.find((p) => p.slug === slug) ?? null;
}
