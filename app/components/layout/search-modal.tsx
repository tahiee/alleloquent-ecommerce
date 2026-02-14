"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { X, Search } from "lucide-react";
import { getAllProducts, type Product } from "@/app/data/products";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleClose = useCallback(() => {
    setSearchQuery("");
    onClose();
  }, [onClose]);

  // Handle Escape key to close modal
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="container mx-auto max-w-3xl px-4 pt-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top duration-300">
          {/* Search Header */}
          <div className="flex items-center gap-4 p-6 border-b border-slate-200">
            <Search className="h-6 w-6 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              autoFocus
              className="flex-1 text-lg outline-none placeholder:text-slate-400"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              // onClick={handleClose}
              className="rounded-full hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {searchQuery.trim() === "" ? (
              <div className="p-12 text-center text-slate-500">
                <Search className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">
                  Start typing to search products...
                </p>
                <p className="text-sm mt-2">
                  Try searching for plantain, eggs, rice, or chicken
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <Search className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-2">
                  Try searching with different keywords
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                <p className="text-sm text-slate-600 px-2 mb-3">
                  Found {searchResults.length}{" "}
                  {searchResults.length === 1 ? "product" : "products"}
                </p>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={handleClose}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors group"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">
                        {product.category}
                      </p>
                      <p className="text-lg font-bold text-orange-600 mt-1">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
