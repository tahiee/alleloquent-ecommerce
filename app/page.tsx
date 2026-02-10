import { Footer } from "./components/layout/footer";
import { Header } from "./components/layout/header";
import { HeroSection } from "./components/home/hero-section";
import { InfoCardsSection } from "./components/home/info-cards-section";
import { WhySection } from "./components/home/why-section";
import { MarketFeaturesSection } from "./components/home/market-features-section";
import { ProductsSection } from "./components/home/products-section";
import { TestimonialSection } from "./components/home/testimonial-section";
import { TrustSection } from "./components/home/trust-section";
import { RecipeSection } from "./components/home/recipe-section";
import { NewsletterSection } from "./components/home/newsletter-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <InfoCardsSection />
        <WhySection />
        <MarketFeaturesSection />
        <ProductsSection />
        <TestimonialSection />
        <TrustSection />
        <RecipeSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
