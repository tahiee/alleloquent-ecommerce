"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useFavorites } from "@/app/lib/hooks/use-favorites";
import { Product } from "@/app/types/product";

interface ProductsSectionProps {
  products: Product[];
}

const BADGES: Record<string, string> = {
  "1": "💪 HEALTHY",
  "2": "🔥 HOT SELLER",
  "3": "⭐ BESTSELLER",
  "4": "💛 ESSENTIAL",
  "5": "💪 POPULAR",
  "6": "💯 QUALITY",
  "7": "✨ PREMIUM",
};

export function ProductsSection({ products }: ProductsSectionProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 via-white to-amber-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="mb-10 text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold tracking-wider">
              OUR PRODUCTS
            </span>
          </div>
          <h2 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            NAIJA KITCHEN<br />
            <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
              ESSENTIALS! 🛒
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Fresh plantain, eggs, rice, chicken and more - handpicked from trusted farms,
            delivered to your doorstep with love! ❤️
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {products.slice(0, 8).map((product, index) => {
            const productId = product.id;
            const isLiked = isFavorite(productId);
            const badge = BADGES[product.id] || "✨ FRESH";
            const shortDescription = product.description.slice(0, 50);

            return (
              <Card
                key={product.id}
                className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-2xl"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-square w-full overflow-hidden cursor-pointer">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      quality={95}
                      priority={index < 4}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        {badge}
                      </span>
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        className="bg-white text-slate-900 hover:bg-slate-100 rounded-full font-semibold"
                      >
                        Quick View
                      </Button>
                    </div>
                  </div>
                </Link>

                {/* Favorite Button */}
                <Button
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite({
                      productId: productId,
                      productName: product.name,
                      image: product.image,
                      price: product.price,
                      addedAt: Date.now(),
                    });
                  }}
                  className={`absolute top-4 left-4 rounded-full shadow-lg transition-all ${
                    isLiked
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-white/90 hover:bg-white text-slate-600"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-white" : ""}`} />
                </Button>

              <CardContent className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
                  <span className="text-sm text-slate-500">({product.reviews})</span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 min-h-[56px]">
                  {product.name}
                </h3>

                <p className="text-sm text-slate-600 mb-3 line-clamp-1">
                  {shortDescription}...
                </p>

                <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  ₦{product.price.toLocaleString()}
                </p>
              </CardContent>

                <CardFooter className="p-5 pt-0">
                  <Link href={`/product/${product.id}`} className="w-full">
                    <Button className="w-full bg-slate-900 hover:bg-orange-500 text-white font-semibold py-5 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/50">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      View Product
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-12 py-7 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              VIEW ALL PRODUCTS
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
