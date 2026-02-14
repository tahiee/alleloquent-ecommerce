"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/app/lib/hooks/use-cart";
import { useFavorites } from "@/app/lib/hooks/use-favorites";
import { getAllProducts, type Product } from "@/app/data/products";
import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";
import {
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  Check,
  Heart,
} from "lucide-react";

export function ProductPageClient({
  product,
  productId
}: {
  product: Product | undefined;
  productId: string;
}) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[1] || product?.variants?.[0]
  );
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    const allProducts = getAllProducts();
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-slate-600 mb-4">
            Looking for product ID: <span className="font-mono bg-slate-100 px-2 py-1 rounded">{productId}</span>
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-6">
            <p className="font-semibold mb-2">Available Product IDs:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {allProducts.map(p => (
                <span key={p.id} className="bg-white px-3 py-1 rounded border">
                  {p.id}: {p.name}
                </span>
              ))}
            </div>
          </div>
          <Link href="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      productName: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      quantity: quantity,
      image: product.image,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const allProducts = getAllProducts();
  const moreProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);
  const isLiked = isFavorite(product.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-orange-50/30 via-white to-orange-50/30">
        <div className="container mx-auto max-w-7xl px-4 py-6">
        <Link href="/">
          <Button variant="ghost" className="group mb-6 hover:bg-orange-50">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                quality={100}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Favorite Button */}
              <Button
                size="icon"
                onClick={() =>
                  toggleFavorite({
                    productId: product.id,
                    productName: product.name,
                    image: product.image,
                    price: product.price,
                    addedAt: Date.now(),
                  })
                }
                className={`absolute top-6 right-6 rounded-full shadow-xl transition-all h-14 w-14 ${
                  isLiked
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white/90 hover:bg-white text-slate-600"
                }`}
              >
                <Heart className={`h-6 w-6 ${isLiked ? "fill-white" : ""}`} />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-orange-600 font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="border-t border-b border-slate-200 py-6">
              <p className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                ₦{selectedVariant?.price.toLocaleString()}
              </p>
              <p className="text-sm text-slate-600 mt-2">
                {selectedVariant && selectedVariant.stock > 0 ? (
                  <span className="text-green-600 font-semibold">
                    ✓ In Stock ({selectedVariant.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Select Size:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedVariant?.id === variant.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <p className="font-semibold text-sm text-slate-900">
                      {variant.name}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      ₦{variant.price.toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Quantity:
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-slate-100 rounded-full p-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={decreaseQuantity}
                    className="h-10 w-10 rounded-full hover:bg-white"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-bold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={increaseQuantity}
                    className="h-10 w-10 rounded-full hover:bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-slate-600">
                  Total: ₦{((selectedVariant?.price || 0) * quantity).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedVariant || !selectedVariant.stock}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-7 text-lg font-bold rounded-2xl shadow-xl shadow-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/60 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addedToCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button
                size="lg"
                onClick={() =>
                  toggleFavorite({
                    productId: product.id,
                    productName: product.name,
                    image: product.image,
                    price: product.price,
                    addedAt: Date.now(),
                  })
                }
                className={`py-7 px-8 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-105 ${
                  isLiked
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/50"
                    : "bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200"
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-white" : ""}`} />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <Card className="p-4 border-none bg-blue-50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Fast Delivery</p>
                    <p className="text-xs text-slate-600">24-hour delivery</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-none bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">100% Fresh</p>
                    <p className="text-xs text-slate-600">Quality guaranteed</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              About This Product
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Key Features
            </h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* More Products Section */}
        <div className="bg-gradient-to-b from-white to-orange-50/30 py-12 mt-12">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
                You Might Also Like 🛒
              </h2>
              <p className="text-slate-600 text-base">
                More fresh products from our farm
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {moreProducts.map((prod) => (
                <Link key={prod.id} href={`/product/${prod.id}`}>
                  <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white cursor-pointer rounded-2xl">
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        quality={95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-5">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-slate-700">{prod.rating}</span>
                        <span className="text-sm text-slate-500">({prod.reviews})</span>
                      </div>

                      <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 min-h-[56px]">
                        {prod.name}
                      </h3>

                      <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        ₦{prod.price.toLocaleString()}
                      </p>
                    </CardContent>

                    <CardFooter className="p-5 pt-0">
                      <Button className="w-full bg-slate-900 hover:bg-orange-500 text-white font-semibold py-5 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/50">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        View Product
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
