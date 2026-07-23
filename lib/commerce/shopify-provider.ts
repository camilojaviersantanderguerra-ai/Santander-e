// Proveedor real de Shopify (Storefront API vía canal Headless).
// Implementa el mismo contrato `CommerceProvider` que `mock-provider.ts`,
// así que el resto de la app no necesita saber que existe Shopify detrás.
//
// Requiere estas variables en `.env.local` (nunca se suben a Git):
//   SHOPIFY_STORE_DOMAIN=tu-tienda.myshopify.com
//   SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxx   (token PRIVADO, solo servidor)
//   SHOPIFY_API_VERSION=2026-04
//
// El token privado nunca debe usarse en el cliente — por eso este archivo
// solo se importa desde Server Components / código que corre en el servidor.

import type { Product, Money, ProductVariant } from "@/types";
import type { CommerceProvider, Cart, CartLine, CartLineDisplay } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || "2026-04";

function endpoint() {
  if (!domain) {
    throw new Error(
      "Falta SHOPIFY_STORE_DOMAIN en .env.local — no se puede consultar la Storefront API."
    );
  }
  return `https://${domain}/api/${apiVersion}/graphql.json`;
}

/** Helper central para llamar a la Storefront API con el token privado
 * (autenticación de servidor, nunca expuesta al navegador). */
async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!token) {
    throw new Error(
      "Falta SHOPIFY_STOREFRONT_TOKEN en .env.local — no se puede autenticar con Shopify."
    );
  }

  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Token privado = autenticación de servidor (ver docs de Shopify).
      "Shopify-Storefront-Private-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    // Sin caché: cada visita trae el catálogo fresco directo de Shopify.
    // (Antes se cacheaba 60s, pero eso hacía que cambios de inventario o
    // publicación tardaran en verse reflejados, o quedaran "pegados" en una
    // versión vieja en el edge de Vercel.)
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API respondió ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify Storefront API error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

// ---------------------------------------------------------------------------
// Mapeo: forma de Shopify -> tipo `Product` interno (types/index.ts).
// Mantener este mapeo aislado aquí es lo que le permite al resto de la app
// no saber nada sobre la forma de los datos de Shopify.
// ---------------------------------------------------------------------------
function toMoney(amount: string, currencyCode: string): Money {
  return { amount: parseFloat(amount), currency: currencyCode as Money["currency"] };
}

// Antes se cortaba la descripción con `.slice(0, 140)` a secas, lo que
// partía la frase a media palabra (ej. "...control por micro" en vez de
// "...control por microprocesador"). Esto se veía roto en el snippet de
// Google y en las previsualizaciones de WhatsApp/redes sociales. Ahora se
// corta en el último espacio antes del límite y se agrega "…".
function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapShopifyProduct(node: any): Product {
  const price = toMoney(
    node.priceRange.minVariantPrice.amount,
    node.priceRange.minVariantPrice.currencyCode
  );
  const compareAt = node.compareAtPriceRange?.minVariantPrice?.amount
    ? toMoney(
        node.compareAtPriceRange.minVariantPrice.amount,
        node.compareAtPriceRange.minVariantPrice.currencyCode
      )
    : undefined;

  const images = (node.images?.edges ?? []).map((e: any) => e.node.url);

  // Variantes reales de Shopify (necesarias para agregar al carrito/checkout
  // con el merchandiseId correcto — cada variante puede tener su propio precio).
  const variants: ProductVariant[] = (node.variants?.edges ?? []).map((e: any) => ({
    id: e.node.id,
    name: e.node.title,
    price: e.node.price
      ? toMoney(e.node.price.amount, e.node.price.currencyCode)
      : undefined,
    inStock: e.node.availableForSale ?? true,
  }));

  return {
    id: node.id,
    slug: node.handle,
    name: node.title,
    shortDescription: node.description ? truncateAtWord(node.description, 150) : "",
    description: node.description ?? "",
    // HTML con formato real (listas, párrafos) para la ficha de producto.
    // Antes solo se guardaba el texto plano de Shopify, que junta los
    // <li> de la descripción sin punto ni salto de línea — se leía como
    // una sola oración corrida. Con esto la ficha muestra viñetas reales.
    descriptionHtml: node.descriptionHtml ?? undefined,
    price,
    compareAtPrice: compareAt && compareAt.amount > price.amount ? compareAt : undefined,
    // Shopify no tiene "categoría" fija: usamos productType (string libre),
    // igual que el resto de la arquitectura de este proyecto.
    category: node.productType || "General",
    tags: node.tags ?? [],
    image: images[0] ?? "",
    gallery: images.slice(1),
    variants,
    isFeatured: (node.tags ?? []).includes("destacado"),
    isNew: (node.tags ?? []).includes("nuevo"),
    stockLevel: node.totalInventory ?? undefined,
  };
}

// Fragmento reutilizado por createCart/addToCart/getCart/updateCartLine/
// removeCartLine: siempre devolvemos el carrito completo con líneas
// "enriquecidas" (nombre, imagen, precio) para que el CartDrawer no tenga
// que hacer una consulta aparte por cada producto.
const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              title
              handle
              featuredImage { url }
            }
          }
        }
      }
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCart(node: any): Cart {
  const lines = (node.lines?.edges ?? []).map((e: any) => e.node);
  const linesDisplay = lines.map((l: any) => ({
    lineId: l.id,
    variantId: l.merchandise.id,
    productTitle: l.merchandise.product.title,
    variantTitle:
      l.merchandise.title && l.merchandise.title !== "Default Title" ? l.merchandise.title : undefined,
    image: l.merchandise.product.featuredImage?.url,
    slug: l.merchandise.product.handle,
    quantity: l.quantity,
    unitPrice: toMoney(l.merchandise.price.amount, l.merchandise.price.currencyCode),
    lineTotal: toMoney(l.cost.totalAmount.amount, l.cost.totalAmount.currencyCode),
  }));

  return {
    id: node.id,
    lines: linesDisplay.map((l: CartLineDisplay) => ({ variantId: l.variantId, productId: "", quantity: l.quantity })),
    linesDisplay,
    subtotalCents: Math.round(parseFloat(node.cost.subtotalAmount.amount) * 100),
    currency: node.cost.subtotalAmount.currencyCode,
    checkoutUrl: node.checkoutUrl,
    totalQuantity: node.totalQuantity ?? linesDisplay.reduce((sum: number, l: CartLineDisplay) => sum + l.quantity, 0),
  };
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  descriptionHtml
  productType
  tags
  totalInventory
  priceRange {
    minVariantPrice { amount currencyCode }
  }
  compareAtPriceRange {
    minVariantPrice { amount currencyCode }
  }
  images(first: 6) {
    edges { node { url altText } }
  }
  variants(first: 25) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount currencyCode }
      }
    }
  }
`;

export const shopifyProvider: CommerceProvider = {
  name: "shopify",

  async listProducts() {
    const data = await shopifyFetch<{
      products: { edges: { node: unknown }[] };
    }>(
      `query Products {
        products(first: 50) {
          edges { node { ${PRODUCT_FIELDS} } }
        }
      }`
    );
    return data.products.edges.map((e) => mapShopifyProduct(e.node));
  },

  async getProductBySlug(slug: string) {
    const data = await shopifyFetch<{ productByHandle: unknown | null }>(
      `query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) { ${PRODUCT_FIELDS} }
      }`,
      { handle: slug }
    );
    return data.productByHandle ? mapShopifyProduct(data.productByHandle) : null;
  },

  async createCart() {
    const data = await shopifyFetch<{ cartCreate: { cart: unknown } }>(
      `mutation CartCreate {
        cartCreate {
          cart { ${CART_FIELDS} }
        }
      }`
    );
    return mapCart(data.cartCreate.cart);
  },

  // Antes esto devolvía SOLO la línea que se acababa de agregar (`lines:
  // [line]`), nunca el carrito completo — imposible construir un carrito
  // real con varios productos distintos a partir de eso. Ahora
  // `cartLinesAdd` fusiona automáticamente si la variante ya estaba en el
  // carrito (comportamiento nativo de Shopify) y devolvemos el carrito
  // COMPLETO con todas sus líneas.
  async addToCart(cartId: string, line: CartLine) {
    const data = await shopifyFetch<{ cartLinesAdd: { cart: unknown } }>(
      `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${CART_FIELDS} }
        }
      }`,
      {
        cartId,
        lines: [{ merchandiseId: line.variantId ?? line.productId, quantity: line.quantity }],
      }
    );
    return mapCart(data.cartLinesAdd.cart);
  },

  async getCart(cartId: string) {
    const data = await shopifyFetch<{ cart: unknown | null }>(
      `query GetCart($id: ID!) {
        cart(id: $id) { ${CART_FIELDS} }
      }`,
      { id: cartId }
    );
    return data.cart ? mapCart(data.cart) : null;
  },

  async updateCartLine(cartId: string, lineId: string, quantity: number) {
    if (quantity <= 0) {
      return shopifyProvider.removeCartLine(cartId, lineId);
    }
    const data = await shopifyFetch<{ cartLinesUpdate: { cart: unknown } }>(
      `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${CART_FIELDS} }
        }
      }`,
      { cartId, lines: [{ id: lineId, quantity }] }
    );
    return mapCart(data.cartLinesUpdate.cart);
  },

  async removeCartLine(cartId: string, lineId: string) {
    const data = await shopifyFetch<{ cartLinesRemove: { cart: unknown } }>(
      `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${CART_FIELDS} }
        }
      }`,
      { cartId, lineIds: [lineId] }
    );
    return mapCart(data.cartLinesRemove.cart);
  },

  async createCheckout(cartId: string) {
    // En el modelo actual de Shopify (Cart API), el checkout es simplemente
    // la `checkoutUrl` que ya viene incluida en el carrito — no hay un paso
    // de "crear checkout" aparte.
    const data = await shopifyFetch<{ cart: { checkoutUrl: string } | null }>(
      `query CartCheckoutUrl($id: ID!) {
        cart(id: $id) { checkoutUrl }
      }`,
      { id: cartId }
    );
    if (!data.cart) throw new Error("Carrito no encontrado en Shopify.");
    return { url: data.cart.checkoutUrl };
  },
};
