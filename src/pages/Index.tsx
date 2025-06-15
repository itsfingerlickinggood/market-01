
import { useState } from "react";
import { useWorkload } from "@/contexts/WorkloadContext";
import { useNavigate } from "react-router-dom";
import WorkloadSelector, { Workload } from "@/components/WorkloadSelector";
import Header from "@/components/Header";
import MarketplaceHero from "@/components/MarketplaceHero";
import HeroSection from "@/components/HeroSection";
import QuickInsights from "@/components/QuickInsights";
import CandlestickSection from "@/components/CandlestickSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  const { isOnboarded, setSelectedWorkload } = useWorkload();
  const navigate = useNavigate();

  const handleWorkloadSelect = (workload: Workload) => {
    setSelectedWorkload(workload);
    navigate('/marketplace');
  };

  const handleSkipOnboarding = () => {
    navigate('/marketplace');
  };

  // Show workload selector for new users
  if (!isOnboarded) {
    return (
      <WorkloadSelector 
        onWorkloadSelect={handleWorkloadSelect}
        onSkip={handleSkipOnboarding}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-16">
        <MarketplaceHero />
        
        <div className="container mx-auto px-4 py-8 space-y-12">
          <HeroSection />
          <CandlestickSection />
          <QuickInsights />
          <FeaturesSection />
          <CTASection />
        </div>
      </main>
    </div>
  );
};

export default Index;
