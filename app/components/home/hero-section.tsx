"use client";

import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-150 w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <Image
          src="/homeimg.png"
          alt="Fresh raw food"
          fill
          quality={100}
          priority
          sizes="100vw"
          className="object-cover brightness-110 scale-105 animate-in zoom-in duration-1000"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />
      <div className="absolute inset-0 bg-linear-to-r from-orange-900/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="mb-6 inline-block">
              <span className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-300 text-sm font-semibold tracking-wider">
                FRESH RAW FOOD MARKETPLACE
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom duration-700">
              NAIJA&apos;S FRESHEST
              <span className="block mt-2 bg-linear-to-r from-orange-400 via-yellow-400 to-orange-600 bg-clip-text text-transparent">
                FARM MARKET! 🌾
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-200 md:text-xl lg:text-2xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              Skip the market wahala! Get premium plantain, eggs, rice, chicken
              & more delivered fresh to your door. From farm to table in 24
              hours! 🚚✨
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="group bg-orange-500 text-white hover:bg-orange-600 px-10 py-7 text-lg font-bold rounded-full shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 hover:scale-105"
                >
                  EXPLORE NOW
                  <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-7 text-lg font-bold rounded-full border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105 bg-black"
                >
                  LEARN MORE
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs tracking-widest">SCROLL DOWN</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>
    </section>
  );
}
