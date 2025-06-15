
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, BarChart3, Star, MapPin, Zap, ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useCardExpansion } from "@/hooks/useCardExpansion";
import { EnhancedGpuCardProps, ProviderSpread } from "@/types/card-expansion";
import MicroCandlestickChart from "@/components/charts/MicroCandlestickChart";
import ProviderSpreadIndicator from "@/components/charts/ProviderSpreadIndicator";
import ProviderDetailsModal from "@/components/modals/ProviderDetailsModal";
import { useProviderSelection } from "@/hooks/useProviderSelection";
import { useState } from "react";

const ExpandableGpuCard = ({ 
  gpu, 
  className = "",
  onExpansionChange,
  onInteractionModeChange 
}: Omit<EnhancedGpuCardProps, 'expansionState' | 'interactionMode'> & {
  onExpansionChange?: (state: any) => void;
  onInteractionModeChange?: (mode: any) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  
  const { getBestProvider } = useProviderSelection({ 
    gpuModel: gpu.gpu_name?.split(' ')[1] // Extract model like "H100" from "NVIDIA H100"
  });

  const bestProvider = getBestProvider();

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleProviderDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsProviderModalOpen(true);
  };

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Single unified card container with absolute positioning when hovered */}
        <div 
          className={`
            transition-all duration-500 cursor-pointer
            ${isHovered ? 
              'absolute inset-0 z-50 transform scale-110' : 
              'relative z-10 hover:shadow-lg hover:-translate-y-1'
            }
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main card content with seamless background and glossy effect */}
          <div className={`
            bg-gradient-to-br from-card via-card/98 to-primary/8 backdrop-blur-lg rounded-lg
            ${isHovered ? 
              'shadow-2xl ring-1 ring-primary/20' : 
              'shadow-sm hover:shadow-md'
            }
            transition-all duration-500 relative overflow-hidden
          `}>
            {/* Enhanced glossy overlay effect when hovered */}
            {isHovered && (
              <>
                {/* Main glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-primary/10 pointer-events-none z-10 rounded-lg" />
                {/* Moving shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse pointer-events-none z-20 rounded-lg" />
                {/* Edge glow */}
                <div className="absolute inset-0 rounded-lg ring-2 ring-primary/30 pointer-events-none z-30" />
              </>
            )}
            
            <div className={`p-4 space-y-3 transition-all duration-300 ${isHovered ? 'relative z-40' : ''}`}>
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

              {/* Seamless Expanded Content - Appears without borders */}
              {isHovered && (
                <div className="pt-3 space-y-3">
                  <div className="relative z-10">
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

                    {/* Provider Details Button */}
                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleProviderDetailsClick}
                        className="text-xs px-3 py-1 h-7 gap-1"
                      >
                        <Users className="h-3 w-3" />
                        Providers
                      </Button>

                      <Link to={`/gpu/${gpu.id}`} onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="default"
                          size="sm" 
                          disabled={gpu.rentable === false}
                          className="text-xs px-3 py-1 h-7 gap-1 shadow-lg bg-primary hover:bg-primary/90"
                        >
                          {gpu.rentable === false ? 'Unavailable' : 'Details'}
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Provider Details Modal */}
      <ProviderDetailsModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        provider={bestProvider}
        gpuModel={gpu.gpu_name?.split(' ')[1]}
      />
    </>
  );
};

export default ExpandableGpuCard;
