
import Header from "@/components/Header";
import MarketplaceHero from "@/components/MarketplaceHero";
import HeroSection from "@/components/HeroSection";
import LiveMarketSection from "@/components/LiveMarketSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-16">
        <MarketplaceHero />
        
        <div className="container mx-auto px-4 py-8 space-y-12">
          <HeroSection />
          <LiveMarketSection />
          <FeaturesSection />
          <CTASection />
        </div>
      </main>
    </div>
  );
};

export default Index;
