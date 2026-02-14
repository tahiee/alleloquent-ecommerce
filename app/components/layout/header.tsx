"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  User,
  Heart,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { MobileNav } from "./mobile-nav";
import { useCart } from "@/app/lib/hooks/use-cart";
import { useFavorites } from "@/app/lib/hooks/use-favorites";
import { SearchBar } from "./search-bar";

export function Header() {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      {/* Top Bar - Announcement */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white py-2 text-center text-sm font-medium">
        🎉 Free Shipping on orders over ₦20,000 | Fresh Farm Produce Daily
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all"
          >
            <div className="relative h-14 w-14 flex-shrink-0 rounded-xl overflow-hidden ring-2 ring-orange-500/20 group-hover:ring-orange-500/40 transition-all">
              <Image
                src="/newlogo.jpeg"
                alt="Alleloquent Farms"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300 bg-black"
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                Alleloquent Farms
              </span>
              <span className="block text-xs text-slate-600 font-medium">
                Premium Fresh Raw Food
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="group relative text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </Link>

            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors py-2">
                Shop
                <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-2">
                  <Link
                    href="/products"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  >
                    All Products
                  </Link>
                  <Link
                    href="/products?category=produce"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  >
                    Fresh Produce
                  </Link>
                  <Link
                    href="/products?category=poultry"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  >
                    Poultry & Protein
                  </Link>
                  <Link
                    href="/products?category=staples"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  >
                    Staples & Provisions
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="group relative text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors py-2"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </Link>

            <Link
              href="/contact"
              className="group relative text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors py-2"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="relative rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/favorites">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all"
              >
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all"
            >
              <User className="h-5 w-5" />
            </Button>

            <Link href="/cart">
              <Button
                size="icon"
                className="relative rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 transition-all hover:scale-110"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-orange-50"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full hover:bg-orange-50"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <MobileNav onClose={() => setMobileMenuOpen(false)} />}

      {/* Search Bar */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
