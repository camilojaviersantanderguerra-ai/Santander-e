# Santander E-Shopping

Tienda ecommerce premium construida con Next.js 15 (App Router), TypeScript,
Tailwind CSS y Framer Motion. Diseñada como marca — no como plantilla — con
foco total en percepción de lujo, conversión y velocidad.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Para producción:

```bash
npm run build
npm run start
```

Listo para desplegar en Vercel (`vercel deploy`) o conectando el repo de GitHub
directamente en el dashboard de Vercel.

## Qué puedes editar sin tocar código

Todo el contenido vive en `/data` y se importa desde ahí — ningún componente
tiene texto quemado:

- `data/site-config.ts` — logo, textos del hero, sección Privé, newsletter,
  estadísticas de prueba social, columnas del footer, contacto.
- `data/products.ts` — catálogo. Agregar un producto de una categoría nueva
  (ej. "Auto", "Mascotas") no requiere ninguna migración: las categorías se
  calculan dinámicamente en `utils/catalog.ts`.
- `data/categories.ts` — categorías destacadas en home (imagen + descripción).
- `data/testimonials.ts` — reseñas.
- `data/benefits.ts` — barra de confianza/garantías (usa nombres de íconos de
  [lucide-react](https://lucide.dev/icons)).

## Logo real

El logo actual (`public/logo.svg`, `public/favicon.svg`) es una recreación
vectorial del emblema en bronce cepillado. Para usar el archivo original:

1. Exporta el logo en SVG (ideal) o PNG de alta resolución.
2. Colócalo en `/public/logo.svg` (o `/public/logo.png`).
3. Actualiza `siteConfig.brand.logoPath` en `data/site-config.ts` si cambias
   el nombre del archivo.
4. En `components/Logo.tsx`, reemplaza el `<svg>` inline por un
   `<Image src={siteConfig.brand.logoPath} ... />` si prefieres usar el
   archivo directamente en vez de la recreación vectorial.

## Conectar Shopify / Stripe / Mercado Pago

El frontend nunca habla directamente con un proveedor de pagos: todo pasa por
la interfaz `CommerceProvider` en `lib/commerce/types.ts`. Hoy usa
`lib/commerce/mock-provider.ts` (datos de `data/products.ts`).

Para conectar un proveedor real:

1. Crea `lib/commerce/shopify-provider.ts` (o `stripe-provider.ts` /
   `mercadopago-provider.ts`) implementando `CommerceProvider`.
2. Cambia una sola línea en `lib/commerce/index.ts`:
   ```ts
   export const commerce: CommerceProvider = shopifyProvider;
   ```
3. Ningún componente cambia — todos consumen `commerce.listProducts()`,
   `commerce.createCart()`, etc.

Variables de entorno recomendadas (crear `.env.local`, no incluido por
seguridad):

```
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_TOKEN=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
MERCADOPAGO_ACCESS_TOKEN=
```

## Estructura

```
/app          rutas (App Router), layout, metadata, sitemap, robots
/components   componentes de UI (Header, Hero, ProductCard, secciones de home...)
/components/ui  primitivos reutilizables (Button, Badge, DynamicIcon)
/data         TODO el contenido editable de la marca
/hooks        hooks compartidos (scroll progress, etc.)
/lib          utilidades + capa de abstracción de comercio
/types        tipos compartidos de TypeScript
/utils        helpers de catálogo (categorías dinámicas, productos destacados)
/public       assets estáticos (logo, favicon)
```

## Rendimiento y SEO

- Server Components por defecto; `"use client"` solo donde hay interactividad
  (menú, animaciones, formularios).
- `next/image` con `sizes` correcto en cada imagen + AVIF/WebP automático.
- Fuentes cargadas con `next/font` (self-hosted, sin bloqueo de render).
- `app/sitemap.ts` y `app/robots.ts` generados dinámicamente desde el catálogo.
- Metadata, Open Graph, Twitter Cards y JSON-LD (`Organization`) configurados
  en `app/layout.tsx`.

Antes de producción: reemplaza las imágenes de Unsplash en `/data` por
fotografía de producto real optimizada — es el mayor salto de calidad
percibida y de puntaje Lighthouse.
