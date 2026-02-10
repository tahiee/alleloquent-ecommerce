"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { CartItem, Cart } from "@/app/types/cart";

interface CartContextType {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "seafood_ecommerce_cart";
const SHIPPING_COST = 2000; // ₦2000 shipping fee

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initialization to load cart from localStorage
  const [cart, setCart] = useState<Cart>(() => {
    if (typeof window === "undefined") {
      return {
        items: [],
        subtotal: 0,
        shipping: SHIPPING_COST,
        total: SHIPPING_COST,
      };
    }

    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error("Failed to parse saved cart:", error);
      }
    }

    return {
      items: [],
      subtotal: 0,
      shipping: SHIPPING_COST,
      total: SHIPPING_COST,
    };
  });

  // Save cart to localStorage whenever it changes (after initial mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  const calculateTotals = (items: CartItem[]) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = items.length > 0 ? SHIPPING_COST : 0;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  };

  const addItem = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId
      );

      let updatedItems: CartItem[];
      if (existingItem) {
        // If item exists, increase quantity
        updatedItems = prevCart.items.map((item) =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        // If item doesn't exist, add it
        updatedItems = [...prevCart.items, newItem];
      }

      const totals = calculateTotals(updatedItems);
      return {
        items: updatedItems,
        ...totals,
      };
    });
  };

  const removeItem = (productId: string, variantId: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId)
      );
      const totals = calculateTotals(updatedItems);
      return {
        items: updatedItems,
        ...totals,
      };
    });
  };

  const updateQuantity = (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }

    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      );
      const totals = calculateTotals(updatedItems);
      return {
        items: updatedItems,
        ...totals,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      shipping: SHIPPING_COST,
      total: SHIPPING_COST,
    });
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
