
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap, Target, ArrowDownToLine } from "lucide-react";
import { Link } from "react-router-dom";
import { useWorkload } from "@/contexts/WorkloadContext";
import ProviderTrustBadge from "./ProviderTrustBadge";
import { enhanceProviderWithTrust } from "@/utils/trustScore";
import { ProviderTier } from "@/types/gpu-recommendation";

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
  const { selectedWorkload } = useWorkload();

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
      {offers.map((offer) => {
        const workloadScore = offer.workloadScore || 0;
        const isHighMatch = workloadScore > 80;
        const isMediumMatch = workloadScore > 60 && workloadScore <= 80;
        
        // Mock provider data with tier assignment
        const reliability = offer.reliability2 || offer.reliability || 0;
        const tier: ProviderTier = reliability > 0.9 ? 'verified' : 
                                   reliability > 0.8 ? 'premium' : 'community';
        
        const mockProvider = {
          name: offer.datacenter || 'Unknown Provider',
          type: 'specialist' as const,
          tier,
          globalScale: 8,
          slaGuarantee: 99.9,
          securityCertifications: ['ISO27001', 'SOC2'],
          egressPolicy: 'free' as const,
          specializations: ['ai-training' as const]
        };

        const enhancedProvider = enhanceProviderWithTrust(mockProvider);
        
        return (
          <Link key={offer.id} to={`/gpu/${offer.id}`}>
            <Card 
              className={`hover:shadow-lg transition-all cursor-pointer ${
                isHighMatch ? 'border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20' :
                isMediumMatch ? 'border-2 border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-950/20' : ''
              }`}
              onMouseEnter={(e) => onGpuHover(offer, e)}
              onMouseLeave={onGpuLeave}
              onMouseMove={onMouseMove}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{offer.gpu_name}</h4>
                      <ProviderTrustBadge provider={enhancedProvider} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {offer.num_gpus || 1}x GPU • {offer.gpu_ram || offer.specs?.vramCapacity || 'N/A'}GB VRAM
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {selectedWorkload && workloadScore > 0 && (
                      <Badge className={
                        isHighMatch ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                        isMediumMatch ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }>
                        {isHighMatch ? "Perfect Match" : isMediumMatch ? "Good Match" : "Basic Match"}
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
                
                {/* Zero Egress Badge */}
                <div className="mb-2">
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    <ArrowDownToLine className="h-3 w-3" />
                    Zero Egress Fees
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
                
                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    {Math.round((offer.reliability2 || offer.reliability || 0) * 100)}% reliability
                  </div>
                  {enhancedProvider.trustScore && (
                    <div className="text-xs text-blue-600 font-medium">
                      Trust: {Math.round(enhancedProvider.trustScore * 100)}%
                    </div>
                  )}
                </div>
                
                {selectedWorkload && workloadScore > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span>{selectedWorkload.title} Match</span>
                      </div>
                      <span>{Math.round(workloadScore)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isHighMatch ? 'bg-green-500' :
                          isMediumMatch ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${workloadScore}%` }}
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
        );
      })}
    </div>
  );
};

export default MarketplaceGpuGrid;
