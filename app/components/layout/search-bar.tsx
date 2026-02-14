"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";
import { getAllProducts, type Product } from "@/app/data/products";
import Link from "next/link";
import Image from "next/image";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setSearchQuery("");
    onClose();
  }, [onClose]);

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  const searchResults = useMemo(() => {
    if (searchQuery.trim() === "") {
      return [] as Product[];
    }

    const allProducts = getAllProducts();
    const query = searchQuery.toLowerCase();
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="border-b border-slate-200 bg-white shadow-lg animate-in slide-in-from-top duration-300">
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div ref={searchRef} className="relative">
          {/* Search Input */}
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border-2 border-slate-200 focus-within:border-orange-500 transition-colors">
            <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for plantain, eggs, rice, chicken..."
              autoFocus
              className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
            />
            <button
              onClick={handleClose}
              className="p-1 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          {/* Search Results Dropdown */}
          {searchQuery.trim() !== "" && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 max-h-[400px] overflow-y-auto z-50">
              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <Search className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                  <p className="font-medium">No products found</p>
                  <p className="text-sm mt-1">Try different keywords</p>
                </div>
              ) : (
                <div className="p-2">
                  <p className="text-xs text-slate-500 px-3 py-2 font-medium">
                    {searchResults.length} {searchResults.length === 1 ? "product" : "products"} found
                  </p>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => {
                        handleClose();
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 truncate">{product.category}</p>
                        <p className="text-base font-bold text-orange-600 mt-0.5">
                          ₦{product.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
