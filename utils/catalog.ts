// Utilidades para derivar estructura dinámica del catálogo.
// La arquitectura NO fija categorías: se calculan a partir de los productos
// existentes, así que agregar un producto de una categoría inédita
// (Gadgets, Mascotas, Auto, lo que sea) actualiza la navegación solo.

import { products } from "@/data/products";
import type { Product } from "@/types";

export function getAllCategoryNames(): string[] {
  return Array.from(new Set(products.map((p) => p.category))).sort();
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getNewProducts(limit = 6): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit);
}
