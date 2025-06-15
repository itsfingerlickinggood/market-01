
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Bell, Share2 } from "lucide-react";

interface SupabaseStyleHeaderProps {
  gpu: any;
  enhancedData: any;
  isFavorited: boolean;
  hasAlert: boolean;
  onFavorite: () => void;
  onAlert: () => void;
  onShare: () => void;
}

const SupabaseStyleHeader = ({
  gpu,
  enhancedData,
  isFavorited,
  hasAlert,
  onFavorite,
  onAlert,
  onShare
}: SupabaseStyleHeaderProps) => {
  const provider = enhancedData?.provider;
  const pricing = enhancedData?.pricing;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Navigation */}
        <div className="flex items-center gap-2 mb-3">
          <Link to="/marketplace">
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back
            </Button>
          </Link>
          <span className="text-xs text-gray-500">
            Marketplace / {gpu.gpu_name}
          </span>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {provider && <span className="text-lg">{provider.logo}</span>}
            <div>
              <h1 className="text-xl font-medium text-gray-900">{gpu.gpu_name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {provider && (
                  <Badge variant="outline" className="text-xs h-5 px-2">
                    {provider.name}
                  </Badge>
                )}
                <Badge 
                  variant={gpu.rentable !== false ? "default" : "secondary"}
                  className="text-xs h-5 px-2"
                >
                  {gpu.rentable !== false ? 'Available' : 'Unavailable'}
                </Badge>
                <span className="text-xs text-gray-500">
                  {enhancedData?.location}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                ${pricing?.hourly?.toFixed(3) || '0.000'}/hr
              </div>
              <div className="text-xs text-gray-500">
                ~${Math.round((pricing?.hourly || 0) * 24)}/day
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button size="sm" disabled={gpu.rentable === false} className="h-7 px-3 text-xs">
                {gpu.rentable !== false ? 'Deploy Now' : 'Unavailable'}
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={onFavorite}>
                <Heart className={`h-3 w-3 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={onAlert}>
                <Bell className={`h-3 w-3 ${hasAlert ? 'fill-current text-yellow-500' : ''}`} />
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={onShare}>
                <Share2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseStyleHeader;
