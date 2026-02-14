import { Footer } from "./components/layout/footer";
import { Header } from "./components/layout/header";
import { HeroSection } from "./components/home/hero-section";
import { InfoCardsSection } from "./components/home/info-cards-section";
import { WhySection } from "./components/home/why-section";
import { MarketFeaturesSection } from "./components/home/market-features-section";
import { ProductsSection } from "./components/home/products-section";
import { TestimonialSection } from "./components/home/testimonial-section";
import { TrustSection } from "./components/home/trust-section";
import { NewsletterSection } from "./components/home/newsletter-section";
import { getActiveProducts } from "./lib/services/product-service";
import { Product } from "./types/product";

// Revalidate this page every hour (3600 seconds)
export const revalidate = 3600;

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await getActiveProducts();
  } catch (error) {
    console.error('Error loading products for homepage:', error);
    // During build, if Firebase isn't initialized, use empty array
    // The page will still render, just without products
    products = [];
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductsSection products={products} />
        <InfoCardsSection />
        <WhySection />
        <MarketFeaturesSection />
        <TestimonialSection />
        <TrustSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
