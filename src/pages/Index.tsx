
import Header from "@/components/Header";
import CleanHeroSection from "@/components/CleanHeroSection";
import MinimalMetricsSection from "@/components/MinimalMetricsSection";
import RealtimeGpuShowcase from "@/components/RealtimeGpuShowcase";
import CleanFeaturesSection from "@/components/CleanFeaturesSection";
import UseCasesSection from "@/components/UseCasesSection";
import SocialProofSection from "@/components/SocialProofSection";
import CleanCTASection from "@/components/CleanCTASection";
import CleanCareersSection from "@/components/CleanCareersSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-16">
        <CleanHeroSection />
        <MinimalMetricsSection />
        <RealtimeGpuShowcase />
        <CleanFeaturesSection />
        <UseCasesSection />
        <SocialProofSection />
        <CleanCTASection />
        <CleanCareersSection />
      </main>
    </div>
  );
};

export default Index;
