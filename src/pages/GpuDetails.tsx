
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useGpuDetailsData } from "@/hooks/useGpuDetailsData";
import { useGpuDetailsActions } from "@/hooks/useGpuDetailsActions";
import SupabaseStyleHeader from "@/components/gpu-details/SupabaseStyleHeader";
import SupabaseStyleGrid from "@/components/gpu-details/SupabaseStyleGrid";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-gray-600">Loading...</p>
          <Link to="/marketplace">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SupabaseStyleHeader
        gpu={gpu}
        enhancedData={enhancedGpuData}
        isFavorited={isFavorited}
        hasAlert={hasAlert}
        onFavorite={handleFavorite}
        onAlert={handleAlert}
        onShare={handleShare}
      />
      
      <SupabaseStyleGrid
        gpu={gpu}
        enhancedData={enhancedGpuData}
        providerData={providerData}
      />
    </div>
  );
};

export default GpuDetails;
