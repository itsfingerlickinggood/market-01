
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { purposeTags } from "@/components/PurposeFilterTags";

interface MarketplaceGpuGridProps {
  offers: any[];
  isLoading: boolean;
  selectedPurpose: string | null;
  onGpuHover: (offer: any, e: React.MouseEvent) => void;
  onGpuLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}

const MarketplaceGpuGrid = ({
  offers,
  isLoading,
  selectedPurpose,
  onGpuHover,
  onGpuLeave,
  onMouseMove
}: MarketplaceGpuGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {offers.map((offer) => (
        <Link key={offer.id} to={`/gpu/${offer.id}`}>
          <Card 
            className={`hover:shadow-lg transition-all cursor-pointer ${
              selectedPurpose && offer.recommendationScore && offer.recommendationScore > 80 ? 
              'border-2 border-primary/30 bg-primary/5' : ''
            }`}
            onMouseEnter={(e) => onGpuHover(offer, e)}
            onMouseLeave={onGpuLeave}
            onMouseMove={onMouseMove}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{offer.gpu_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {offer.num_gpus || 1}x GPU • {offer.gpu_ram || offer.specs?.vramCapacity || 'N/A'}GB VRAM
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  {selectedPurpose && offer.recommendationScore && offer.recommendationScore > 80 && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Perfect Match
                    </Badge>
                  )}
                  <Badge className={
                    offer.availability === 'available' ? "bg-green-100 text-green-800" :
                    offer.availability === 'limited' ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {offer.availability}
                  </Badge>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">
                  ${(offer.dph_total || offer.pricing?.onDemand || 0).toFixed(3)}/hour
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {(offer.datacenter || offer.location || "Unknown").split('(')[0].trim()}
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-sm mb-3">
                <Zap className="h-3 w-3 text-yellow-500" />
                {Math.round((offer.reliability2 || offer.reliability || 0) * 100)}% reliability
              </div>
              
              {selectedPurpose && offer.recommendationScore && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Match Score</span>
                    <span>{Math.round(offer.recommendationScore)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${offer.recommendationScore}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>CPU: {offer.cpu_cores || 8} cores</span>
                  <span>RAM: {offer.cpu_ram || 32}GB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default MarketplaceGpuGrid;
