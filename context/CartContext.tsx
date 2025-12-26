// ...existing code...
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = { item: any; qty: number };
type Cart = { items: Record<string, CartItem>; total: number };

const CART_KEY = "uber_cart_v1";

const CartContext = createContext<{
  cart: Cart;
  add: (item: any) => void;
  remove: (id: string) => void;
  clearCart: () => void;
} | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: {}, total: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(CART_KEY)
      .then((s) => {
        if (!mounted) return;
        if (s) {
          try {
            const parsed = JSON.parse(s) as Cart;
            setCart(parsed);
          } catch (e) {
            console.warn("Failed to parse cart from storage", e);
          }
        }
      })
      .finally(() => {
        if (mounted) setLoaded(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(CART_KEY, JSON.stringify(cart)).catch((e) =>
      console.warn("Failed to save cart", e)
    );
  }, [cart, loaded]);

  const recalcTotal = useCallback((items: Record<string, CartItem>) => {
    return Object.values(items).reduce((s, e) => s + (e.item?.price ?? 0) * e.qty, 0);
  }, []);

  const add = useCallback((item: any) => {
    setCart((prev) => {
      const items = { ...prev.items };
      const existing = items[item.id];
      if (existing) existing.qty += 1;
      else items[item.id] = { item, qty: 1 };
      const total = recalcTotal(items);
      return { items, total };
    });
  }, [recalcTotal]);

  const remove = useCallback((id: string) => {
    setCart((prev) => {
      const items = { ...prev.items };
      const existing = items[id];
      if (!existing) return prev;
      existing.qty -= 1;
      if (existing.qty <= 0) delete items[id];
      const total = recalcTotal(items);
      return { items, total };
    });
  }, [recalcTotal]);

  const clearCart = useCallback(() => {
    setCart({ items: {}, total: 0 });
  }, []);

  return (
    <CartContext.Provider value={{ cart, add, remove, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};