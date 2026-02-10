import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, ChefHat, ArrowRight } from "lucide-react";

export function RecipeSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-orange-50/30 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold tracking-wider flex items-center gap-2">
                <ChefHat className="h-4 w-4" />
                COOKING INSPIRATION
              </span>
            </div>

            <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              WE ARE COOKING
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
                IN A FIRE
              </span>
            </h2>

            <p className="mb-8 text-lg md:text-xl text-slate-600 leading-relaxed">
              Master the art of cooking seafood with our expert-crafted recipes.
              From grilling to baking, discover new ways to prepare your
              favorite catches with techniques that bring out the best flavors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/recipes">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-6 text-lg font-bold rounded-full shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 transition-all duration-300 hover:scale-105"
                >
                  EXPLORE RECIPES
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
                <p className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-1">
                  200+
                </p>
                <p className="text-sm text-slate-600 font-medium">Recipes</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
                <p className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-1">
                  4.9★
                </p>
                <p className="text-sm text-slate-600 font-medium">Rating</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
                <p className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-1">
                  50K+
                </p>
                <p className="text-sm text-slate-600 font-medium">Cooked</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/salmonpic.png"
                alt="Grilled salmon"
                width={1900}
                height={1900}
                className="object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <ChefHat className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Chefs Special
                    </p>
                    <p className="text-xs text-slate-600">Grilled Perfection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Dots */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 grid grid-cols-4 gap-2 opacity-20">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-orange-500" />
              ))}
            </div>
          </div>
        </div>

        <RecipeGrid />
      </div>
    </section>
  );
}

function RecipeGrid() {
  const recipes = [
    {
      id: 1,
      title: "Grilled Salmon with Herbs",
      time: "30 min",
      servings: "4",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
      category: "MAIN COURSE",
    },
    {
      id: 2,
      title: "Garlic Butter Prawns",
      time: "15 min",
      servings: "2",
      image:
        "https://images.unsplash.com/photo-1633504581786-316c8b5b9b0f?w=800&q=80",
      category: "APPETIZER",
    },
    {
      id: 3,
      title: "Mediterranean Sea Bass",
      time: "45 min",
      servings: "4",
      image:
        "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
      category: "MAIN COURSE",
    },
    {
      id: 4,
      title: "Seafood Paella",
      time: "60 min",
      servings: "6",
      image:
        "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80",
      category: "SIGNATURE",
    },
  ];

  return (
    <div>
      <div className="mb-16 text-center">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold tracking-wider">
            RECIPE COLLECTION
          </span>
        </div>
        <h3 className="mb-4 text-4xl md:text-5xl font-extrabold text-slate-900">
          EXPLORE DELICIOUS <br />
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            SEASONAL RECIPES
          </span>
        </h3>
        <p className="text-slate-600 text-xl max-w-2xl mx-auto">
          Curated by our seafood experts and professional chefs
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {recipes.map((recipe, index) => (
          <Card
            key={recipe.id}
            className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-72 w-full overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                  {recipe.category}
                </span>
              </div>

              {/* Quick View Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                <Button
                  size="sm"
                  className="bg-white text-slate-900 hover:bg-orange-500 hover:text-white rounded-full font-semibold px-6"
                >
                  View Recipe
                </Button>
              </div>
            </div>

            <CardContent className="p-6">
              <h4 className="font-bold text-lg text-slate-900 mb-4 group-hover:text-orange-600 transition-colors line-clamp-2">
                {recipe.title}
              </h4>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="flex items-center gap-1 bg-slate-100 rounded-full px-3 py-1.5">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{recipe.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 rounded-full px-3 py-1.5 text-sm text-slate-600">
                  <Users className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">{recipe.servings}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/recipes">
          <Button
            size="lg"
            variant="outline"
            className="group border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-12 py-7 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            VIEW ALL RECIPES
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
