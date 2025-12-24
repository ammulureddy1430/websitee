import React, { createContext, useContext, useState } from "react";
import { MenuItemType } from "../types";

interface CartEntry {
  item: MenuItemType;
  qty: number;
}

interface CartType {
  total: number;
  items: Record<string, CartEntry>;
}

interface CartContextType {
  cart: CartType;
  add: (item: MenuItemType) => void;
  remove: (id: string) => void;
  clearCart: () => void;
}

const defaultCart: CartType = { items: {}, total: 0 };

const CartContext = createContext<CartContextType>({
  cart: defaultCart,
  add: () => {},
  remove: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartType>(defaultCart);

  const add = (item: MenuItemType) => {
    setCart((prev) => {
      const existing = prev.items[item.id];
      return {
        total: prev.total + (item.price ?? 0),
        items: {
          ...prev.items,
          [item.id]: {
            item,
            qty: existing ? existing.qty + 1 : 1,
          },
        },
      };
    });
  };

  const remove = (id: string) => {
    setCart((prev) => {
      const existing = prev.items[id];
      if (!existing) return prev;

      const newQty = existing.qty - 1;
      const newItems = { ...prev.items };

      if (newQty <= 0) delete newItems[id];
      else newItems[id] = { ...existing, qty: newQty };

      const itemPrice = existing.item.price ?? 0;
      return {
        total: Math.max(0, prev.total - itemPrice),
        items: newItems,
      };
    });
  };

  const clearCart = () => setCart(defaultCart);

  return (
    <CartContext.Provider value={{ cart, add, remove, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);