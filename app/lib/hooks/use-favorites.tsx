"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface FavoriteItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  addedAt: number;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = "freshfood_ecommerce_favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initialization to load favorites from localStorage
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse saved favorites:", error);
      return [];
    }
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = (newItem: FavoriteItem) => {
    setFavorites((prev) => {
      // Check if already exists
      const exists = prev.some((item) => item.productId === newItem.productId);
      if (exists) {
        return prev;
      }
      return [...prev, { ...newItem, addedAt: Date.now() }];
    });
  };

  const removeFavorite = (productId: string) => {
    setFavorites((prev) => prev.filter((item) => item.productId !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some((item) => item.productId === productId);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.productId)) {
      removeFavorite(item.productId);
    } else {
      addFavorite(item);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
