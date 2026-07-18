// Punto único de entrada al comercio. Cambiar de proveedor = cambiar esta línea.
import { mockProvider } from "./mock-provider";
import type { CommerceProvider } from "./types";

export const commerce: CommerceProvider = mockProvider;

export * from "./types";
