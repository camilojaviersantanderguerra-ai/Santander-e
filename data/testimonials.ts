import type { Testimonial } from "@/types";

// Antes este archivo tenía 4 testimonios 100% inventados (nombres, ciudades
// y citas ficticias, cada uno marcado `verified: true` sin serlo). Se vacía
// a propósito: la tienda recién está partiendo y no tiene reseñas reales
// todavía. El componente `Testimonials.tsx` oculta automáticamente la
// grilla de reseñas cuando este arreglo está vacío, así que el sitio no
// muestra huecos raros — simplemente no promete algo que no existe.
// Cuando lleguen las primeras reseñas reales de clientes, agrégalas aquí
// con el mismo formato.
export const testimonials: Testimonial[] = [];
