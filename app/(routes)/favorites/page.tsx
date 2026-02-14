"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useFavorites } from "@/app/lib/hooks/use-favorites";
import { useCart } from "@/app/lib/hooks/use-cart";
import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";
import {
  Heart,
  ShoppingCart,
  Star,
  ArrowRight,
} from "lucide-react";
import { getProduct } from "@/app/data/products";
import { useState } from "react";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const handleAddToCart = (productId: string) => {
    const product = getProduct(productId);
    if (!product) return;

    const defaultVariant = product.variants[1] || product.variants[0];

    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      productName: product.name,
      variantName: defaultVariant.name,
      price: defaultVariant.price,
      quantity: 1,
      image: product.image,
    });

    setAddedToCart(productId);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50/30 via-white to-orange-50/30">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
              My Favorites ❤️
            </h1>
            <p className="text-slate-600 text-lg">
              {favorites.length} {favorites.length === 1 ? "product" : "products"}{" "}
              you love
            </p>
          </div>

          {favorites.length === 0 ? (
            // Empty Favorites
            <Card className="p-12 text-center border-none shadow-xl">
              <div className="max-w-md mx-auto">
                <div className="mb-6 flex justify-center">
                  <div className="h-32 w-32 rounded-full bg-red-100 flex items-center justify-center">
                    <Heart className="h-16 w-16 text-red-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  No favorites yet
                </h2>
                <p className="text-slate-600 mb-8">
                  Start adding your favorite products to easily find and buy them
                  again!
                </p>
                <Link href="/">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-bold rounded-2xl shadow-xl shadow-orange-500/50"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Browse Products
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favorites.map((favorite) => {
                const product = getProduct(favorite.productId);
                if (!product) return null;

                return (
                  <Card
                    key={favorite.productId}
                    className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-2xl"
                  >
                    <div className="relative">
                      <Link href={`/product/${product.id}`}>
                        <div className="relative aspect-square w-full overflow-hidden cursor-pointer">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            quality={95}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </Link>

                      {/* Remove from Favorites Button */}
                      <Button
                        size="icon"
                        onClick={() => removeFavorite(favorite.productId)}
                        className="absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white text-red-500 shadow-lg"
                      >
                        <Heart className="h-5 w-5 fill-red-500" />
                      </Button>
                    </div>

                    <CardContent className="p-5">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-slate-700">
                          {product.rating}
                        </span>
                        <span className="text-sm text-slate-500">
                          ({product.reviews})
                        </span>
                      </div>

                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 min-h-[56px] cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </CardContent>

                    <CardFooter className="p-5 pt-0">
                      <Button
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-5 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/50"
                      >
                        {addedToCart === product.id ? (
                          <>
                            Added! ✓
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Quick Add to Cart
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Continue Shopping */}
          {favorites.length > 0 && (
            <div className="mt-12 text-center">
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all"
                >
                  Continue Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
