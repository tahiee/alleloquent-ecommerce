import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";

export function ProductsSection() {
  const products = [
    {
      id: 1,
      name: "Fresh Atlantic Salmon",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
      badge: "SEASONAL",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Wild King Prawns",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80",
      badge: "POPULAR",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Fresh Sea Bass",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800&q=80",
      badge: "NEW",
      rating: 4.7,
      reviews: 56
    },
    {
      id: 4,
      name: "Premium Lobster",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1625938145312-449b1bb2e87b?w=800&q=80",
      badge: "PREMIUM",
      rating: 5.0,
      reviews: 203
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-amber-50 via-white to-amber-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold tracking-wider">
              OUR PRODUCTS
            </span>
          </div>
          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            SEASONAL HIGH PROTEIN<br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              SEAFOOD SELECTIONS
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our curated selection of premium seafood, handpicked for quality and freshness
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    {product.badge}
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

              <CardContent className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
                  <span className="text-sm text-slate-500">({product.reviews})</span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>

                <p className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  ${product.price}
                </p>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <Button className="w-full bg-slate-900 hover:bg-orange-500 text-white font-semibold py-6 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/50">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
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
