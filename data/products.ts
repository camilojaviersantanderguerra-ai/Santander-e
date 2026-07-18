// Catálogo de productos. En producción este arreglo se sustituye por datos
// provenientes de `commerce.listProducts()` (ver lib/commerce), que puede leer
// de Shopify, un CMS o cualquier fuente — el resto de la app no cambia.
// La categoría es un string libre: agregar productos de una categoría nueva
// (ej. "Auto", "Mascotas") no requiere ninguna migración de esquema.

import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "p-01",
    slug: "orbe-cargador-inalambrico",
    name: "Orbe · Cargador inalámbrico de aluminio",
    shortDescription: "Carga a 15W con un acabado en aluminio cepillado.",
    description:
      "Un cargador que parece esculpido, no ensamblado. Cuerpo de aluminio unibody, carga rápida de 15W y una base de silicona que protege cualquier superficie.",
    price: { amount: 890, currency: "MXN" },
    compareAtPrice: { amount: 1290, currency: "MXN" },
    category: "Tecnología",
    tags: ["nuevo", "bestseller"],
    image:
      "https://images.unsplash.com/photo-1591290619762-c384c5ff5cf8?q=80&w=1400&auto=format&fit=crop",
    badges: [{ label: "Más vendido", tone: "bronze" }],
    rating: 4.9,
    reviewCount: 2140,
    stockLevel: 12,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "p-02",
    slug: "difusor-aromatico-monolito",
    name: "Monolito · Difusor aromático de cerámica",
    shortDescription: "Silencioso, minimalista, hecho a mano.",
    description:
      "Cada pieza se cuece por 14 horas para lograr una superficie mate imperfectamente perfecta. Difusión ultrasónica silenciosa que dura hasta 10 horas.",
    price: { amount: 1450, currency: "MXN" },
    category: "Hogar",
    tags: ["edición limitada"],
    image:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1400&auto=format&fit=crop",
    badges: [{ label: "Edición limitada", tone: "gold" }],
    rating: 4.8,
    reviewCount: 860,
    stockLevel: 6,
    isFeatured: true,
  },
  {
    id: "p-03",
    slug: "banda-resistencia-pro",
    name: "Sistema Pro · Bandas de resistencia de grado profesional",
    shortDescription: "Fibra tejida, cero deslizamiento, para cualquier rutina.",
    description:
      "Diseñadas junto a entrenadores olímpicos. Fibra tejida de alta densidad que no se enrolla ni resbala, con guía de entrenamiento incluida.",
    price: { amount: 690, currency: "MXN" },
    category: "Fitness",
    tags: ["bestseller"],
    image:
      "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcf?q=80&w=1400&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 1520,
    stockLevel: 34,
    isFeatured: true,
  },
  {
    id: "p-04",
    slug: "organizador-viaje-modular",
    name: "Nómada · Sistema modular de organización de viaje",
    shortDescription: "Cuatro módulos, un solo sistema, cero caos.",
    description:
      "Cubos de compresión con costuras selladas y cremalleras YKK. Se acomodan a cualquier maleta y reducen el volumen del equipaje hasta un 40%.",
    price: { amount: 1190, currency: "MXN" },
    compareAtPrice: { amount: 1590, currency: "MXN" },
    category: "Viajes",
    tags: ["nuevo"],
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1400&auto=format&fit=crop",
    badges: [{ label: "Nuevo", tone: "outline" }],
    rating: 4.9,
    reviewCount: 430,
    stockLevel: 18,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "p-05",
    slug: "correa-cuero-italiano",
    name: "Heritage · Correa de cuero italiano de grano completo",
    shortDescription: "Curtido vegetal, hebilla de acero cepillado.",
    description:
      "Cuero de grano completo curtido de forma vegetal en Toscana. Envejece con carácter, no con desgaste. Hebilla de acero inoxidable cepillado.",
    price: { amount: 990, currency: "MXN" },
    category: "Accesorios",
    tags: ["edición limitada"],
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1400&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 310,
    stockLevel: 9,
    isFeatured: false,
  },
  {
    id: "p-06",
    slug: "fuente-agua-mascota-ceramica",
    name: "Oasis · Fuente de agua cerámica para mascotas",
    shortDescription: "Filtración silenciosa de triple etapa.",
    description:
      "Cerámica esmaltada libre de BPA con bomba ultra silenciosa y filtro de carbón de triple etapa. Agua fresca todo el día, sin ruido de fondo.",
    price: { amount: 850, currency: "MXN" },
    category: "Mascotas",
    tags: ["bestseller"],
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1400&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 980,
    stockLevel: 22,
    isFeatured: true,
  },
  {
    id: "p-07",
    slug: "organizador-cables-auto",
    name: "Console · Organizador de consola para auto",
    shortDescription: "Cuero vegano, ajuste universal, instalación en segundos.",
    description:
      "Se adapta a cualquier consola central. Compartimentos dedicados para cables, lentes y documentos, con base antideslizante.",
    price: { amount: 590, currency: "MXN" },
    category: "Auto",
    tags: ["nuevo"],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 210,
    stockLevel: 40,
    isFeatured: false,
    isNew: true,
  },
  {
    id: "p-08",
    slug: "set-rodillos-jade-facial",
    name: "Ritual · Set de rodillo facial de jade y gua sha",
    shortDescription: "Piedra natural, ritual diario de 5 minutos.",
    description:
      "Jade natural de origen certificado. Un ritual de 5 minutos que reduce la hinchazón y activa la circulación, con guía de uso incluida.",
    price: { amount: 590, currency: "MXN" },
    compareAtPrice: { amount: 790, currency: "MXN" },
    category: "Belleza",
    tags: ["bestseller"],
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop",
    badges: [{ label: "-25%", tone: "bronze" }],
    rating: 4.8,
    reviewCount: 1750,
    stockLevel: 5,
    isFeatured: true,
  },
];
