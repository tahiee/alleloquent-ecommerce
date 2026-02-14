"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/app/lib/hooks/use-cart";
import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingCart,
  Package,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeItem, updateQuantity } = useCart();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-orange-50/30 via-white to-orange-50/30">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
              Shopping Cart 🛒
            </h1>
            <p className="text-slate-600 text-lg">
              {cart.items.length} {cart.items.length === 1 ? "item" : "items"}{" "}
              in your cart
            </p>
          </div>

          {cart.items.length === 0 ? (
            // Empty Cart
            <Card className="p-12 text-center border-none shadow-xl">
              <div className="max-w-md mx-auto">
                <div className="mb-6 flex justify-center">
                  <div className="h-32 w-32 rounded-full bg-orange-100 flex items-center justify-center">
                    <ShoppingBag className="h-16 w-16 text-orange-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Your cart is empty
                </h2>
                <p className="text-slate-600 mb-8">
                  Looks like you haven&apos;t added any items yet. Start
                  shopping to fill your cart with fresh products!
                </p>
                <Link href="/">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-bold rounded-2xl shadow-xl shadow-orange-500/50"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <Card
                    key={`${item.productId}-${item.variantId}`}
                    className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex gap-4 p-6">
                      {/* Product Image */}
                      <div className="relative h-32 w-32 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          quality={90}
                          sizes="128px"
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-1">
                              {item.productName}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {item.variantName}
                            </p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              removeItem(item.productId, item.variantId)
                            }
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>

                        <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
                          ₦{item.price.toLocaleString()}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.quantity - 1
                                )
                              }
                              className="h-8 w-8 rounded-full hover:bg-white"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-lg font-bold w-12 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.quantity + 1
                                )
                              }
                              className="h-8 w-8 rounded-full hover:bg-white"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="text-sm text-slate-600">
                            Total: ₦
                            {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-none shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal ({cart.items.length} items)</span>
                      <span className="font-semibold">
                        ₦{cart.subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span className="font-semibold">
                        {cart.shipping === 0
                          ? "FREE"
                          : `₦${cart.shipping.toLocaleString()}`}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold text-slate-900">
                      <span>Total</span>
                      <span className="text-2xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        ₦{cart.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-7 text-lg font-bold rounded-2xl shadow-xl shadow-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/60 transition-all hover:scale-105 mb-4"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white py-6 rounded-xl font-semibold transition-all"
                    >
                      Continue Shopping
                    </Button>
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Package className="h-5 w-5 text-orange-500" />
                      <span>Free delivery on orders over ₦20,000</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <ShoppingBag className="h-5 w-5 text-orange-500" />
                      <span>100% Fresh guarantee</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
