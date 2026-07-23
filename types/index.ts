// Tipos centrales de la tienda.
// Mantener esta capa desacoplada de cualquier proveedor (Shopify/Stripe/Mercado Pago)
// para que el frontend nunca dependa de la forma exacta de una API externa.

export interface Money {
  amount: number;
  // "CLP" faltaba en esta unión aunque la tienda opera 100% en pesos
  // chilenos — el código funcionaba igual porque `toMoney()` en
  // shopify-provider.ts hace un cast forzado, pero el tipo no reflejaba
  // la realidad. Se agrega para que TypeScript detecte errores reales.
  currency: "USD" | "MXN" | "EUR" | "COP" | "ARS" | "CLP";
}

export interface ProductBadge {
  label: string;
  tone?: "bronze" | "gold" | "outline";
}

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier?: number;
  /** Precio absoluto de la variante (Shopify permite precios distintos por
   * variante, no solo un modificador sobre el precio base). Si está presente,
   * tiene prioridad sobre `priceModifier`. */
  price?: Money;
  inStock: boolean;
}

// Los productos NO tienen categorías fijas: "category" es un string libre
// que alimenta dinámicamente la navegación y los filtros.
export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  /** Versión con formato (HTML) de la descripción — permite listas de
   * especificaciones legibles en la ficha de producto. El texto plano en
   * `description` se sigue usando para el meta description / SEO, donde
   * las etiquetas HTML no sirven. */
  descriptionHtml?: string;
  price: Money;
  compareAtPrice?: Money;
  category: string;
  tags: string[];
  image: string;
  gallery?: string[];
  badges?: ProductBadge[];
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  stockLevel?: number; // usado para mensajes de escasez
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar?: string;
  verified?: boolean;
}

export interface Benefit {
  id: string;
  icon: string; // nombre de ícono de lucide-react
  title: string;
  description: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    logoPath: string;
    logoAlt: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    backgroundImage: string;
    backgroundVideo?: string;
  };
  premiumSection: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    cta: string;
  };
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    cta: string;
    disclaimer: string;
  };
  socialProof: {
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
    stat3: { value: string; label: string };
  };
  footer: {
    description: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    legalLinks: { label: string; href: string }[];
  };
  contact: {
    email: string;
    whatsapp?: string;
  };
}
