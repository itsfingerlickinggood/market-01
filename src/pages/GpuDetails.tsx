
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useGpuDetailsData } from "@/hooks/useGpuDetailsData";
import { useGpuDetailsActions } from "@/hooks/useGpuDetailsActions";
import SupabaseGpuHeader from "@/components/gpu-details/SupabaseGpuHeader";
import SupabaseGpuGrid from "@/components/gpu-details/SupabaseGpuGrid";

const GpuDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { gpu, providerData, enhancedGpuData } = useGpuDetailsData(id);
  const {
    isFavorited,
    hasAlert,
    handleFavorite,
    handleAlert,
    handleShare
  } = useGpuDetailsActions();

  if (!gpu || !enhancedGpuData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading GPU details...</p>
          <Link to="/marketplace">
            <Button variant="outline" size="default">
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
      <SupabaseGpuHeader
        gpu={gpu}
        enhancedData={enhancedGpuData}
        isFavorited={isFavorited}
        hasAlert={hasAlert}
        onFavorite={handleFavorite}
        onAlert={handleAlert}
        onShare={handleShare}
      />
      
      <SupabaseGpuGrid
        gpu={gpu}
        enhancedData={enhancedGpuData}
        providerData={providerData}
      />
    </div>
  );
};

export default GpuDetails;
