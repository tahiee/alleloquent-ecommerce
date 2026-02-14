import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function WhySection() {
  const features = [
    "Sourced from trusted farms",
    "24-hour freshness guarantee",
    "Farm-fresh quality food",
    "Carefully packaged & shipped",
    "Sustainable farming practices",
    "Expert quality selection",
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold tracking-wider">
                WHY CHOOSE US
              </span>
            </div>

            <h2 className="mb-6 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              WHY CHOOSE
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                ALLELOQUENT? 🌟
              </span>
            </h2>

            <p className="mb-6 text-lg text-slate-600 leading-relaxed">
              We are not just another food delivery service - we are your trusted farm partner!
              Every morning, we handpick the freshest plantain, eggs, rice, and poultry
              from local farms you can trust. No middlemen, no delays, just pure freshness! 🌾
            </p>

            <p className="mb-8 text-lg text-slate-600 leading-relaxed">
              From farm to your kitchen in 24 hours. That is our promise to you and your family! 👨‍👩‍👧‍👦✨
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <CheckCircle2 className="h-6 w-6 text-orange-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=90"
                alt="Fresh food packaging"
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium mb-1">
                      Customer Satisfaction
                    </p>
                    <p className="text-3xl font-extrabold text-slate-900">
                      99.8%
                    </p>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Dots */}
            <div className="absolute -top-4 -right-4 w-24 h-24 grid grid-cols-4 gap-2 opacity-20">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-orange-500" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
