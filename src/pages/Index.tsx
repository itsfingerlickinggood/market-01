
import Header from "@/components/Header";
import MarketplaceHero from "@/components/MarketplaceHero";
import HeroSection from "@/components/HeroSection";
import MarketplaceStats from "@/components/MarketplaceStats";
import QuickInsights from "@/components/QuickInsights";
import LiveMarketSection from "@/components/LiveMarketSection";
import CandlestickSection from "@/components/CandlestickSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";

const mockDeals = [
  {
    id: "1",
    company: "NVIDIA",
    model: "RTX 4090",
    basePrice: 2.50,
    sites: ["VastAI", "RunPod", "Lambda Labs"],
    demandChange: "+15%"
  },
  {
    id: "2", 
    company: "NVIDIA",
    model: "A100 80GB",
    basePrice: 1.89,
    sites: ["AWS", "Google Cloud", "Azure"],
    demandChange: "+8%"
  },
  {
    id: "3",
    company: "NVIDIA", 
    model: "RTX 3090",
    basePrice: 1.20,
    sites: ["VastAI", "Paperspace"],
    demandChange: "-3%"
  },
  {
    id: "4",
    company: "AMD",
    model: "MI210",
    basePrice: 0.95,
    sites: ["Oracle Cloud", "VastAI"],
    demandChange: "+12%"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-16">
        <MarketplaceHero />
        
        <div className="container mx-auto px-4 py-8 space-y-12">
          <LiveMarketSection deals={mockDeals} />
          <CandlestickSection />
          <HeroSection />
          <MarketplaceStats />
          <QuickInsights />
          <FeaturesSection />
          <CTASection />
        </div>
      </main>
    </div>
  );
};

export default Index;
