// Tipos centrales de la tienda.
// Mantener esta capa desacoplada de cualquier proveedor (Shopify/Stripe/Mercado Pago)
// para que el frontend nunca dependa de la forma exacta de una API externa.

export interface Money {
  amount: number;
  currency: "USD" | "MXN" | "EUR" | "COP" | "ARS";
}

export interface ProductBadge {
  label: string;
  tone?: "bronze" | "gold" | "outline";
}

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier?: number;
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
