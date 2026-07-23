import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { siteConfig } from "@/data/site-config";
import { getAllCategoryNames } from "@/utils/catalog";
import { getCurrentCart } from "@/lib/actions/cart";

// Carga de fuentes optimizada por next/font (self-hosted, sin bloqueo de render).
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = "https://www.santander-e.cl";

// SEO completo: metadata base, Open Graph y Twitter Cards centralizados.
// Cada página puede sobreescribir campos específicos con `generateMetadata`.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s · ${siteConfig.brand.name}`,
  },
  description:
    "Tienda premium de productos virales cuidadosamente seleccionados: tecnología, hogar, fitness, viajes y más. Envío express, pago seguro y garantía en cada pedido.",
  keywords: [
    "ecommerce premium",
    "tienda online",
    "productos virales",
    "tecnología",
    "hogar",
    "fitness",
    "Santander E-Shopping",
  ],
  authors: [{ name: siteConfig.brand.name }],
  creator: siteConfig.brand.name,
  // NOTA: el canonical NO se fija aquí a nivel global — cada página define el
  // suyo propio (ver `alternates: { canonical: ... }` en cada page.tsx). Antes
  // había un canonical fijo a "/" en este layout raíz, y como Next.js hereda
  // metadata del layout a menos que la página la sobreescriba, TODAS las
  // páginas (incluidas fichas de producto y /tienda) declaraban su canonical
  // como el home — Google las trataba como "duplicado del home" y no las
  // indexaba por separado. Bug crítico de SEO, corregido.
  openGraph: {
    type: "website",
    // Antes decía "es_MX" (español de México) en una tienda que solo vende
    // y despacha en Chile — corregido a "es_CL".
    locale: "es_CL",
    url: siteUrl,
    siteName: siteConfig.brand.name,
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description:
      "Una selección curada de los productos más deseados del mundo, entregados con un nivel de detalle excepcional.",
    images: [{ url: siteConfig.brand.logoPath, width: 1200, height: 630, alt: siteConfig.brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.brand.name,
    description: siteConfig.brand.tagline,
    images: [siteConfig.brand.logoPath],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getAllCategoryNames();
  // Carrito real: se obtiene server-side a partir de la cookie (si existe)
  // para hidratar el CartProvider con el estado verdadero desde el primer
  // render — así el ícono del carrito no parpadea en 0 al recargar la
  // página con productos ya agregados.
  const initialCart = await getCurrentCart().catch(() => null);

  // Schema.org (Organization) — ayuda a Google a entender la marca desde el día uno.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand.name,
    url: siteUrl,
    logo: `${siteUrl}${siteConfig.brand.logoPath}`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "customer service",
    },
  };

  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider initialCart={initialCart}>
          <Header categories={categories} />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
