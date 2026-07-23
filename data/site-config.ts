// ============================================================================
// ARCHIVO MAESTRO DE CONFIGURACIÓN DE MARCA
// ----------------------------------------------------------------------------
// Todo lo que un no-desarrollador necesita cambiar (logo, textos del hero,
// promociones, redes, footer) vive aquí. Ningún componente contiene texto
// "hardcodeado": todos leen de este objeto o de los demás archivos en /data.
// ============================================================================

import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  brand: {
    name: "SANTANDER E-SHOPPING",
    tagline: "Objetos diseñados para durar. Experiencias diseñadas para sentirse.",
    logoPath: "/logo-original.jpg", // foto real del logo — usada en Open Graph/Twitter/Schema.org (metadata social), no en el header (ver components/Logo.tsx)
    logoAlt: "Santander E-Shopping",
  },
  hero: {
    eyebrow: "COLECCIÓN 2026 · EDICIÓN LIMITADA",
    headline: "Lo esencial, perfeccionado.",
    subheadline:
      "Una selección curada de los productos más deseados del mundo, entregados con el nivel de detalle que exige quien no acepta menos.",
    ctaPrimary: "Explorar la colección",
    ctaSecondary: "Ver la historia",
    backgroundImage:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=2400&auto=format&fit=crop",
  },
  premiumSection: {
    eyebrow: "SANTANDER PRIVÉ",
    title: "Para quienes esperan más de un objeto.",
    description:
      "Materiales seleccionados a mano. Ingeniería silenciosa. Empaques que se sienten como un ritual, no como una transacción. Esto es lo que separa un producto de una obsesión.",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2000&auto=format&fit=crop",
    cta: "Descubrir Privé",
  },
  newsletter: {
    title: "Sé el primero en saberlo.",
    description:
      "Acceso anticipado a lanzamientos, disponibilidad limitada y precios de preventa. Sin ruido, sin spam.",
    placeholder: "Tu correo electrónico",
    cta: "Unirme",
    disclaimer: "Al suscribirte aceptas nuestra política de privacidad. Cancela cuando quieras.",
  },
  // Antes estos 3 valores eran cifras inventadas ("128,000+ clientes en 14
  // países", "4.9/5 calificación verificada") sin ningún respaldo real —
  // publicidad engañosa verificable. Se reemplazan por compromisos reales
  // y verificables hoy mismo (política real de pago/envío/devolución),
  // sin inventar números de clientes o reseñas que todavía no existen.
  socialProof: {
    stat1: { value: "100%", label: "pago seguro y encriptado" },
    stat2: { value: "30 días", label: "para devolución sin preguntas" },
    stat3: { value: "Chile", label: "envío a todo el país" },
  },
  footer: {
    description:
      "Santander E-Shopping selecciona y distribuye los productos más relevantes del mundo, con un estándar de servicio que no negocia con la calidad.",
    columns: [
      {
        title: "Tienda",
        links: [
          { label: "Todos los productos", href: "/tienda" },
          { label: "Nuevos ingresos", href: "/tienda?filter=nuevo" },
          { label: "Más vendidos", href: "/tienda?filter=bestsellers" },
          { label: "Santander Privé", href: "/prive" },
        ],
      },
      {
        title: "Ayuda",
        links: [
          { label: "Rastrear pedido", href: "/rastreo" },
          { label: "Envíos y entregas", href: "/envios" },
          { label: "Devoluciones", href: "/devoluciones" },
          { label: "Preguntas frecuentes", href: "/faq" },
        ],
      },
      {
        title: "Compañía",
        links: [
          { label: "Nuestra historia", href: "/nosotros" },
          { label: "Sostenibilidad", href: "/sostenibilidad" },
          { label: "Prensa", href: "/prensa" },
          { label: "Contacto", href: "/contacto" },
        ],
      },
    ],
    legalLinks: [
      { label: "Términos de servicio", href: "/legal/terminos" },
      { label: "Privacidad", href: "/legal/privacidad" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
  contact: {
    email: "camilosantanderguerra@gmail.com",
  },
};
