// Las categorías se generan dinámicamente a partir de los productos (ver
// utils/catalog.ts). Este archivo solo aporta metadatos editoriales
// (imagen, descripción) para las categorías que se quieran destacar en home.
// Agregar una categoría nueva aquí NO requiere tocar ningún componente.

import type { Category } from "@/types";

export const featuredCategories: Category[] = [
  {
    id: "cat-tecnologia",
    slug: "tecnologia",
    name: "Tecnología",
    description: "Gadgets que redefinen lo cotidiano.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "cat-hogar",
    slug: "hogar",
    name: "Hogar",
    description: "Objetos que transforman un espacio en un santuario.",
    image:
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "cat-fitness",
    slug: "fitness",
    name: "Fitness",
    description: "Rendimiento sin compromiso.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "cat-viajes",
    slug: "viajes",
    name: "Viajes",
    description: "Equipaje y accesorios para moverse con intención.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "cat-accesorios",
    slug: "accesorios",
    name: "Accesorios",
    description: "El detalle final de cada rutina.",
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "cat-belleza",
    slug: "belleza",
    name: "Belleza",
    description: "Rituales diarios, resultados notables.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
  },
];
