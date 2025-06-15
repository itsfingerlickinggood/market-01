
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useGpuDetailsData } from "@/hooks/useGpuDetailsData";
import { useGpuDetailsActions } from "@/hooks/useGpuDetailsActions";
import ModernGpuHero from "@/components/ModernGpuHero";
import GpuDetailsHeader from "@/components/gpu-details/GpuDetailsHeader";
import GpuDetailsSidebar from "@/components/gpu-details/GpuDetailsSidebar";
import GpuDetailsContent from "@/components/gpu-details/GpuDetailsContent";

const GpuDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { gpu, providerData } = useGpuDetailsData(id);
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
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specifications' },
    { id: 'providers', label: 'Providers' },
    { id: 'deployment', label: 'Deploy' },
    { id: 'alerts', label: 'Alerts' }
  ];

  if (!gpu) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">GPU not found</p>
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
      {/* Modern Navigation Header */}
      <GpuDetailsHeader
        gpu={gpu}
        isFavorited={isFavorited}
        hasAlert={hasAlert}
        activeSection={activeSection}
        navigationSections={navigationSections}
        onFavorite={handleFavorite}
        onAlert={handleAlert}
        onShare={handleShare}
        onSectionChange={setActiveSection}
      />

      {/* Hero Section */}
      <ModernGpuHero gpu={gpu} />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar Navigation */}
          <GpuDetailsSidebar
            activeSection={activeSection}
            navigationSections={navigationSections}
            onSectionChange={setActiveSection}
          />

          {/* Content Area */}
          <GpuDetailsContent
            activeSection={activeSection}
            gpu={gpu}
            providerData={providerData}
          />
        </div>
      </div>
    </div>
  );
};

export default GpuDetails;
