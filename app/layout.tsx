import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/data/site-config";

// Carga de fuentes optimizada por next/font (self-hosted, sin bloqueo de render).
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = "https://www.santander-eshopping.com";

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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
