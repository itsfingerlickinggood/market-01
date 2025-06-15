
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BarChart3, ExternalLink } from "lucide-react";

interface GpuCardHeaderProps {
  gpu: any;
  isHovered: boolean;
}

const GpuCardHeader = ({ gpu, isHovered }: GpuCardHeaderProps) => {
  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'marketplace': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'specialist': return 'bg-green-100 text-green-700 border-green-200';
      case 'hyperscaler': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-3">
      {/* Company Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-xl">{gpu.provider_logo}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-foreground text-base truncate">
                {gpu.company}
              </h3>
              <Badge className={`text-xs ${getTierBadgeColor(gpu.provider_tier)}`}>
                {gpu.provider_tier}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" />
              <span>{gpu.website}</span>
            </div>
          </div>
        </div>
        
        {/* Quick Actions - only show when not hovered */}
        {!isHovered && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="h-3 w-3 text-gray-400 hover:text-pink-500" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <BarChart3 className="h-3 w-3 text-gray-400 hover:text-blue-500" />
            </Button>
          </div>
        )}
      </div>

      {/* GPU Model Info */}
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${
              gpu.rentable !== false ? "bg-green-500 animate-pulse" : "bg-red-400"
            }`} />
            <h4 className="font-semibold text-sm truncate">{gpu.gpu_name}</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            {gpu.num_gpus || 1}x GPU • {gpu.gpu_ram || 24}GB VRAM
          </p>
        </div>
      </div>
    </div>
  );
};

export default GpuCardHeader;
