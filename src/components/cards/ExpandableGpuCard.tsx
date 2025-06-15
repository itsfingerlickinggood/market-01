
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, BarChart3, Star, MapPin, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCardExpansion } from "@/hooks/useCardExpansion";
import { EnhancedGpuCardProps, ProviderSpread } from "@/types/card-expansion";
import MicroCandlestickChart from "@/components/charts/MicroCandlestickChart";
import ProviderSpreadIndicator from "@/components/charts/ProviderSpreadIndicator";

const ExpandableGpuCard = ({ 
  gpu, 
  className = "",
  onExpansionChange,
  onInteractionModeChange 
}: Omit<EnhancedGpuCardProps, 'expansionState' | 'interactionMode'> & {
  onExpansionChange?: (state: any) => void;
  onInteractionModeChange?: (mode: any) => void;
}) => {
  const {
    expansionState,
    interactionMode,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleDoubleClick,
    toggleFavorite,
    toggleCompare
  } = useCardExpansion();

  // Mock provider spread data
  const mockProviderSpread: ProviderSpread = {
    min: (gpu.dph_total || 1.0) * 0.85,
    max: (gpu.dph_total || 1.0) * 1.25,
    current: gpu.dph_total || 1.0,
    providers: [
      { name: 'Vast.ai', price: (gpu.dph_total || 1.0) * 0.95, trustScore: 85, availability: 'available' },
      { name: 'RunPod', price: (gpu.dph_total || 1.0) * 1.1, trustScore: 92, availability: 'available' },
      { name: 'Lambda', price: (gpu.dph_total || 1.0) * 1.05, trustScore: 88, availability: 'limited' },
      { name: 'CoreWeave', price: (gpu.dph_total || 1.0) * 0.9, trustScore: 95, availability: 'available' }
    ]
  };

  const cardHeight = {
    compact: 'h-auto',
    preview: 'h-auto',
    modal: 'h-auto',
    fullscreen: 'h-screen'
  }[expansionState.level];

  const isExpanded = expansionState.level !== 'compact';

  return (
    <Card 
      className={`
        transition-all duration-300 cursor-pointer relative overflow-hidden
        ${cardHeight}
        ${isExpanded ? 'shadow-2xl scale-105 z-10' : 'hover:shadow-lg hover:-translate-y-1'}
        ${expansionState.isComparing ? 'ring-2 ring-blue-500' : ''}
        ${expansionState.isFavorited ? 'ring-2 ring-pink-500' : ''}
        ${className}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header with Actions */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${
                gpu.rentable !== false ? "bg-green-500 animate-pulse" : "bg-red-400"
              }`} />
              <h3 className="font-semibold text-sm truncate">{gpu.gpu_name}</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {gpu.num_gpus || 1}x GPU • {gpu.gpu_ram || 24}GB VRAM
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite();
              }}
            >
              <Heart className={`h-3 w-3 ${expansionState.isFavorited ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare();
              }}
            >
              <BarChart3 className={`h-3 w-3 ${expansionState.isComparing ? 'text-blue-500' : 'text-gray-400'}`} />
            </Button>
          </div>
        </div>

        {/* Price with Micro Chart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">
              ${(gpu.dph_total || 1.0).toFixed(3)}
            </span>
            <span className="text-sm text-muted-foreground ml-1">/hr</span>
          </div>
          
          <MicroCandlestickChart 
            width={60} 
            height={30}
            showTrend={true}
            className="flex-shrink-0"
          />
        </div>

        {/* Status and Location */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Badge 
              variant={gpu.rentable !== false ? "default" : "destructive"}
              className="text-xs px-2 py-0.5"
            >
              {gpu.rentable !== false ? "Available" : "Rented"}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">
                {(gpu.datacenter || "Unknown").split('(')[0].trim()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Zap className="h-3 w-3 text-green-500" />
            <span>{Math.round((gpu.reliability2 || gpu.reliability || 0) * 100)}%</span>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-3 pt-2 border-t border-border animate-in fade-in-0 slide-in-from-top-2 duration-300">
            {/* Provider Spread */}
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-2">Provider Comparison</div>
              <ProviderSpreadIndicator spread={mockProviderSpread} />
            </div>
            
            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">CPU:</span>
                <span className="font-medium">{gpu.cpu_cores || 16} cores</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">RAM:</span>
                <span className="font-medium">{gpu.cpu_ram || 32}GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage:</span>
                <span className="font-medium">{gpu.disk_space || 500}GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network:</span>
                <span className="font-medium">{gpu.inet_down || '1Gbps'}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button 
                size="sm" 
                disabled={gpu.rentable === false}
                onClick={(e) => e.stopPropagation()}
              >
                {gpu.rentable === false ? 'Unavailable' : 'Rent Now'}
              </Button>
              <Link to={`/gpu/${gpu.id}`} onClick={(e) => e.stopPropagation()}>
                <Button variant="outline" size="sm" className="w-full">
                  Full Details
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpandableGpuCard;
