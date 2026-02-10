import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative h-28 w-28 flex-shrink-0 rounded-xl overflow-hidden ring-2 ring-orange-500/20 group-hover:ring-orange-500/40 transition-all">
                <Image
                  src="/newlogo.jpeg"
                  alt="Alleloquent Farms"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300 bg-black"
                />
              </div>
              <span className="text-xl font-bold">Alleloquent Farms</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium fresh raw seafood delivered straight to your door. We
              source only the finest quality seafood from trusted suppliers
              across Nigeria and Africa.
            </p>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-lg mb-2">Products</h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/products?category=fish"
                  className="hover:text-orange-500 transition-colors"
                >
                  Fresh Fish
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=shellfish"
                  className="hover:text-orange-500 transition-colors"
                >
                  Shellfish
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=premium"
                  className="hover:text-orange-500 transition-colors"
                >
                  Premium Selection
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-orange-500 transition-colors"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-lg mb-2">Resources</h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/recipes"
                  className="hover:text-orange-500 transition-colors"
                >
                  Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/cooking-guides"
                  className="hover:text-orange-500 transition-colors"
                >
                  Cooking Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-orange-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="hover:text-orange-500 transition-colors"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-lg mb-2">Company</h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-orange-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-orange-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-orange-500 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {currentYear} Alleloquent Farms. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            🇳🇬 Proudly serving Nigeria & Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
