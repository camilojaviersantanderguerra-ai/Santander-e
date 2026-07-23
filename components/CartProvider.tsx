"use client";

// Contexto de carrito en el cliente. El estado "de verdad" vive en Shopify
// (vía el carrito con ID guardado en cookie); este contexto solo cachea esa
// data en memoria para que el ícono del header y el drawer se actualicen al
// instante sin recargar la página, y llama a los Server Actions
// correspondientes (lib/actions/cart.ts) para cada cambio real.

import { createContext, useContext, useState, useTransition, type ReactNode } from "react";
import type { Cart } from "@/lib/commerce/types";
import { addToCartAction, updateCartLineAction, removeCartLineAction } from "@/lib/actions/cart";

interface CartContextValue {
  cart: Cart | null;
  totalQuantity: number;
  isOpen: boolean;
  isPending: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    // Si algún componente se renderiza fuera del provider (no debería pasar,
    // pero por seguridad) devolvemos un stub inofensivo en vez de explotar.
    return {
      cart: null,
      totalQuantity: 0,
      isOpen: false,
      isPending: false,
      openCart: () => {},
      closeCart: () => {},
      addItem: async () => {},
      updateLine: () => {},
      removeLine: () => {},
    };
  }
  return ctx;
}

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null;
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const totalQuantity = cart?.totalQuantity ?? 0;

  async function addItem(variantId: string, quantity: number) {
    return new Promise<void>((resolve) => {
      startTransition(async () => {
        try {
          const updated = await addToCartAction(variantId, quantity);
          setCart(updated);
          setIsOpen(true);
        } finally {
          resolve();
        }
      });
    });
  }

  function updateLine(lineId: string, quantity: number) {
    startTransition(async () => {
      const updated = await updateCartLineAction(lineId, quantity);
      if (updated) setCart(updated);
    });
  }

  function removeLine(lineId: string) {
    startTransition(async () => {
      const updated = await removeCartLineAction(lineId);
      if (updated) setCart(updated);
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        isOpen,
        isPending,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        updateLine,
        removeLine,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
