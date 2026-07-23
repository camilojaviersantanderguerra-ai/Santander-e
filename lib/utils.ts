import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Money } from "@/types";

/** Combina clases de Tailwind evitando conflictos (patrón estándar shadcn). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea precios de forma consistente en toda la tienda.
 * Antes usaba locale "es-MX" en una tienda que solo vende y despacha en
 * Chile — cambiado a "es-CL" para que el formato de miles/decimales sea
 * el correcto para pesos chilenos (CLP). */
export function formatMoney({ amount, currency }: Money): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

/** Calcula el % de descuento entre precio original y precio actual. */
export function discountPercent(price: Money, compareAt?: Money): number | null {
  if (!compareAt || compareAt.amount <= price.amount) return null;
  return Math.round(((compareAt.amount - price.amount) / compareAt.amount) * 100);
}
