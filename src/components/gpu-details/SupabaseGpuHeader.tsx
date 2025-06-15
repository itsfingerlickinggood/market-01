
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Bell, Share2, Zap } from "lucide-react";

interface SupabaseGpuHeaderProps {
  gpu: any;
  enhancedData: any;
  isFavorited: boolean;
  hasAlert: boolean;
  onFavorite: () => void;
  onAlert: () => void;
  onShare: () => void;
}

const SupabaseGpuHeader = ({
  gpu,
  enhancedData,
  isFavorited,
  hasAlert,
  onFavorite,
  onAlert,
  onShare
}: SupabaseGpuHeaderProps) => {
  const provider = enhancedData?.provider;
  const pricing = enhancedData?.pricing;

  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* Navigation */}
        <div className="flex items-center gap-2 mb-4">
          <Link to="/marketplace">
            <Button variant="ghost" size="default" className="h-8 px-3 text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">{gpu.gpu_name}</span>
        </div>

        {/* Main Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {provider && <span className="text-xl">{provider.logo}</span>}
              <h1 className="text-2xl font-semibold text-foreground">{gpu.gpu_name}</h1>
              <Badge variant="outline" className="text-sm px-2 py-1">
                {gpu.rentable !== false ? 'Available' : 'Unavailable'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                {gpu.gpu_ram || 24}GB VRAM
              </span>
              <span>•</span>
              <span>{enhancedData?.location || 'Global'}</span>
              <span>•</span>
              <span>{provider?.setupTime || '< 5 min'} setup</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right mr-4">
              <div className="text-2xl font-bold text-foreground">
                ${pricing?.hourly?.toFixed(3) || '0.000'}/hr
              </div>
              <div className="text-sm text-muted-foreground">
                ~${Math.round((pricing?.hourly || 0) * 24)}/day
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="default" disabled={gpu.rentable === false} className="px-6">
                {gpu.rentable !== false ? 'Deploy Now' : 'Unavailable'}
              </Button>
              <Button variant="outline" size="default" className="w-9 h-9 p-0" onClick={onFavorite}>
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="default" className="w-9 h-9 p-0" onClick={onAlert}>
                <Bell className={`h-4 w-4 ${hasAlert ? 'fill-current text-yellow-500' : ''}`} />
              </Button>
              <Button variant="outline" size="default" className="w-9 h-9 p-0" onClick={onShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseGpuHeader;
