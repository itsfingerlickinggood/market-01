
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProviderSpreadIndicator from "@/components/charts/ProviderSpreadIndicator";
import GpuCardQuickSpecs from "./GpuCardQuickSpecs";
import { ProviderSpread } from "@/types/card-expansion";

interface GpuCardExpandedContentProps {
  gpu: any;
}

const GpuCardExpandedContent = ({ gpu }: GpuCardExpandedContentProps) => {
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

  return (
    <div className="pt-3 space-y-3">
      <div className="relative z-10">
        {/* Provider Spread */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">Provider Comparison</div>
          <ProviderSpreadIndicator spread={mockProviderSpread} />
        </div>
        
        {/* Quick Specs */}
        <GpuCardQuickSpecs gpu={gpu} />

        {/* Details Button - Bottom Right */}
        <div className="flex justify-end pt-2">
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
  );
};

export default GpuCardExpandedContent;
