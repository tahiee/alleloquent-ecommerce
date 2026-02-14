import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Thermometer } from "lucide-react";

export function TrustSection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1920&q=90"
          alt="Fresh farm produce"
          fill
          quality={95}
          sizes="100vw"
          className="object-cover brightness-50 scale-105"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-300 text-sm font-semibold tracking-wider">
              ✨ FARM-TO-TABLE EXCELLENCE
            </span>
          </div>

          <h2 className="mb-8 text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            SKIP THE
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              MARKET STRESS
            </span>
            <br />
            ORDER FRESH! 🌾
          </h2>

          <p className="mb-10 text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
            Why struggle in crowded markets? Get premium fresh food delivered straight
            from trusted farms to your doorstep. Farm-fresh plantain, eggs, rice,
            chicken and more - all within 24 hours of harvest!
          </p>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-white">24hrs</p>
                  <p className="text-sm text-gray-300">
                    From farm to your door
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <Thermometer className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-white">100%</p>
                  <p className="text-sm text-gray-300">Fresh guarantee</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button
                size="lg"
                className="group bg-orange-500 text-white hover:bg-orange-600 px-10 py-7 text-lg font-bold rounded-full shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 hover:scale-105"
              >
                SHOP FRESH NOW
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-7 text-lg font-bold rounded-full border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                LEARN MORE
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
