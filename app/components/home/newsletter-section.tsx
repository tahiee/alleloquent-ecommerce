"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2, Sparkles } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            {/* Icon */}
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-xl opacity-50" />
                <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 rounded-full p-5 shadow-2xl">
                  <Mail className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>

            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-300 text-sm font-semibold tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                JOIN OUR COMMUNITY
              </span>
            </div>

            <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              STAY UPDATED WITH
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                EXCLUSIVE OFFERS
              </span>
            </h2>

            <p className="mb-10 text-lg md:text-xl text-blue-100 leading-relaxed">
              Subscribe to our newsletter for exclusive offers, delicious recipes,
              seasonal seafood updates, and expert cooking tips delivered to your inbox
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-4 relative">
              <div className="flex-1 relative group">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-16 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder:text-blue-200 rounded-2xl px-6 text-lg focus:border-orange-500 focus:bg-white/20 transition-all group-hover:border-white/40"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 h-16 px-10 text-lg font-bold rounded-2xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 hover:scale-105"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    SUBSCRIBING...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    SUBSCRIBE
                    <Mail className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </div>

            {status === "success" && (
              <div className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl flex items-center gap-3 animate-in slide-in-from-bottom-2">
                <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0" />
                <p className="text-green-300 font-medium">
                  Thanks for subscribing! Check your email for confirmation.
                </p>
              </div>
            )}
          </form>

          {/* Benefits */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">🎁</div>
              <p className="text-white font-semibold mb-1">Exclusive Deals</p>
              <p className="text-blue-200 text-sm">Member-only discounts</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">📖</div>
              <p className="text-white font-semibold mb-1">Free Recipes</p>
              <p className="text-blue-200 text-sm">Expert cooking guides</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">🐟</div>
              <p className="text-white font-semibold mb-1">Early Access</p>
              <p className="text-blue-200 text-sm">New seafood arrivals</p>
            </div>
          </div>

          <p className="text-center text-blue-300 text-sm mt-6">
            Join 10,000+ seafood lovers. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
