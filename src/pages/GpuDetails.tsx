
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useGpuDetailsData } from "@/hooks/useGpuDetailsData";
import { useGpuDetailsActions } from "@/hooks/useGpuDetailsActions";
import ProviderCentricHero from "@/components/gpu-details/ProviderCentricHero";
import EnhancedGpuDetailsHeader from "@/components/gpu-details/EnhancedGpuDetailsHeader";
import ModernGpuDetailsSidebar from "@/components/gpu-details/ModernGpuDetailsSidebar";
import ProviderCentricContent from "@/components/gpu-details/ProviderCentricContent";

const GpuDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { gpu, providerData, enhancedGpuData } = useGpuDetailsData(id);
  const {
    isFavorited,
    hasAlert,
    activeSection,
    setActiveSection,
    handleFavorite,
    handleAlert,
    handleShare
  } = useGpuDetailsActions();

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'provider', label: 'Provider Info', icon: 'Building' },
    { id: 'specs', label: 'Specifications', icon: 'Cpu' },
    { id: 'pricing', label: 'Pricing & Plans', icon: 'DollarSign' },
    { id: 'deployment', label: 'Deploy', icon: 'Rocket' },
    { id: 'compare', label: 'Compare', icon: 'BarChart3' }
  ];

  if (!gpu || !enhancedGpuData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading GPU details...</p>
          <Link to="/marketplace">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with Provider Context */}
      <EnhancedGpuDetailsHeader
        gpu={gpu}
        enhancedData={enhancedGpuData}
        isFavorited={isFavorited}
        hasAlert={hasAlert}
        activeSection={activeSection}
        navigationSections={navigationSections}
        onFavorite={handleFavorite}
        onAlert={handleAlert}
        onShare={handleShare}
        onSectionChange={setActiveSection}
      />

      {/* Provider-Centric Hero Section */}
      <ProviderCentricHero gpu={gpu} enhancedData={enhancedGpuData} />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Modern Sidebar Navigation */}
          <ModernGpuDetailsSidebar
            activeSection={activeSection}
            navigationSections={navigationSections}
            onSectionChange={setActiveSection}
          />

          {/* Provider-Centric Content Area */}
          <ProviderCentricContent
            activeSection={activeSection}
            gpu={gpu}
            enhancedData={enhancedGpuData}
            providerData={providerData}
          />
        </div>
      </div>
    </div>
  );
};

export default GpuDetails;
