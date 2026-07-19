# Santander E-Shopping

Tienda ecommerce premium construida con Next.js 15 (App Router), TypeScript,
Tailwind CSS y Framer Motion. Diseñada como marca — no como plantilla — con
foco total en percepción de lujo, conversión y velocidad.

> **Nota de seguridad:** `package.json` fija `next` en `^15.5.7`. La versión
> `15.0.3` usada inicialmente tenía una vulnerabilidad crítica (CVE-2025-66478,
> RCE vía React Server Components). Ya está corregido en este paquete — solo
> asegúrate de correr `npm install` de nuevo para que se instale la versión
> parcheada.

> **Logo:** `components/Logo.tsx` dibuja el emblema del fénix en SVG con
> fondo 100% transparente (dorado/bronce sobre el negro del sitio) — es una
> recreación vectorial, no la foto original. La foto real del cliente vive en
> `public/logo-original.jpg` y se usa solo para las imágenes de Open
> Graph/Twitter/Schema.org (`data/site-config.ts` → `brand.logoPath`), donde
> el fondo no estorba.
>
> Si en algún momento se consigue una versión de la foto real con el fondo
> ya recortado (PNG con transparencia, vía remove.bg o Photoshop), se puede
> reemplazar el `<svg>` de `Logo.tsx` por un `<Image src="/logo-cutout.png" />`
> para usar el logo real también en el header/footer/hero.

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

## Conectar Shopify / Stripe / Mercado Pago

El frontend nunca habla directamente con un proveedor de pagos: todo pasa por
la interfaz `CommerceProvider` en `lib/commerce/types.ts`.

**Shopify ya está conectado** (`lib/commerce/shopify-provider.ts`, canal
Headless vía Storefront API). Las credenciales viven en `.env.local`
(excluido de Git):

```
SHOPIFY_STORE_DOMAIN=c8jcre-vc.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxx   (token privado, solo servidor)
SHOPIFY_API_VERSION=2026-04
```

`lib/commerce/index.ts` ya exporta `shopifyProvider` como `commerce`, y **todo
el sitio ya está conectado en vivo**:

- El homepage (`FeaturedProducts`), `/tienda` (catálogo completo con filtro
  por categoría) y `/producto/[slug]` (detalle) leen productos reales desde
  Shopify a través de `utils/catalog.ts`. Si Shopify no devuelve nada (tienda
  vacía o error de red), hay un fallback silencioso a `data/products.ts` para
  que el sitio nunca se vea roto ni vacío.
- El botón **"Comprar ahora"** en cada producto (`components/BuyNowButton.tsx`)
  crea un carrito real en Shopify (`lib/actions/checkout.ts`, Server Action) y
  redirige al checkout real de Shopify — el pago se procesa 100% en la
  infraestructura de Shopify (Shopify Payments), no hay lógica de pago propia
  que mantener.
- Si un producto tiene más de una variante (ej. "2x1" vs "2x1+estuches"), el
  botón muestra un selector simple antes de comprar.

Antes de dar por bueno el flujo de pago en producción: haz una compra de
prueba de punta a punta (o revisa en Shopify → Configuración → Pagos que
Shopify Payments esté realmente activo y verificado), para confirmar que el
dinero efectivamente se procesa.

Cuando quieras desplegar en Vercel, agrega esas mismas variables en
**Project Settings → Environment Variables** (el `.env.local` solo funciona
en tu máquina, no viaja con el deploy).

Para conectar Stripe o Mercado Pago más adelante (pagos directos sin pasar
por el checkout de Shopify):

1. Crea `lib/commerce/stripe-provider.ts` o `mercadopago-provider.ts`
   implementando `CommerceProvider`, igual que `shopify-provider.ts`.
2. Cambia una línea en `lib/commerce/index.ts`.
3. Ningún componente cambia — todos consumen `commerce.listProducts()`,
   `commerce.createCart()`, etc.

Variables de entorno adicionales si se conectan esos proveedores:

```
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
/public       assets estáticos (logo real, favicon)
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
