import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CleanHeroSection from "@/components/CleanHeroSection";
import MinimalMetricsSection from "@/components/MinimalMetricsSection";
import CleanFeaturesSection from "@/components/CleanFeaturesSection";
import CleanCTASection from "@/components/CleanCTASection";
import CommunityFeedbackSection from "@/components/CommunityFeedbackSection";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 max-w-6xl py-[33px]">
          <CleanHeroSection />
          <MinimalMetricsSection />
          <CleanFeaturesSection />
          <CleanCTASection />
          <CommunityFeedbackSection />
        </div>
      </main>
    </div>
  );
};

export default Index;