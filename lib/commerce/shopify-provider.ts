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
import type { CommerceProvider, Cart, CartLine } from "./types";

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
    shortDescription: node.description?.slice(0, 140) ?? "",
    description: node.description ?? "",
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

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
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
    const data = await shopifyFetch<{ cartCreate: { cart: { id: string; checkoutUrl: string } } }>(
      `mutation CartCreate {
        cartCreate {
          cart { id checkoutUrl }
        }
      }`
    );
    const cart = data.cartCreate.cart;
    return {
      id: cart.id,
      lines: [],
      subtotalCents: 0,
      currency: "USD",
      checkoutUrl: cart.checkoutUrl,
    };
  },

  async addToCart(cartId: string, line: CartLine) {
    const data = await shopifyFetch<{
      cartLinesAdd: {
        cart: {
          id: string;
          checkoutUrl: string;
          cost: { subtotalAmount: { amount: string; currencyCode: string } };
        };
      };
    }>(
      `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            cost { subtotalAmount { amount currencyCode } }
          }
        }
      }`,
      {
        cartId,
        lines: [{ merchandiseId: line.variantId ?? line.productId, quantity: line.quantity }],
      }
    );
    const cart = data.cartLinesAdd.cart;
    return {
      id: cart.id,
      lines: [line],
      subtotalCents: Math.round(parseFloat(cart.cost.subtotalAmount.amount) * 100),
      currency: cart.cost.subtotalAmount.currencyCode,
      checkoutUrl: cart.checkoutUrl,
    };
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
