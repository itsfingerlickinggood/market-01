
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface UltraMinimalGpuCardProps {
  offer: any;
  onHover: (offer: any, e: React.MouseEvent) => void;
  onLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  showPurposeMatch?: boolean;
  viewMode?: "grid" | "list";
}

const UltraMinimalGpuCard = ({ 
  offer, 
  onHover, 
  onLeave, 
  onMouseMove,
  showPurposeMatch = false,
  viewMode = "grid"
}: UltraMinimalGpuCardProps) => {
  const StatusDot = ({ available }: { available: boolean }) => (
    <div 
      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
        available ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
      }`} 
    />
  );

  if (viewMode === "list") {
    return (
      <Link to={`/gpu/${offer.id}`}>
        <div 
          className="group relative flex items-center justify-between py-3 px-1 hover:bg-gray-50/30 transition-all duration-300 border-b border-gray-100/40 last:border-b-0 cursor-pointer hover:translate-x-1"
          onMouseEnter={(e) => onHover(offer, e)}
          onMouseLeave={onLeave}
          onMouseMove={onMouseMove}
        >
          {/* Left: GPU Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <StatusDot available={offer.rentable !== false} />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate text-sm">
                {offer.gpu_name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {offer.datacenter?.split('(')[0]?.trim() || "Unknown"} • {offer.num_gpus || 1}x
              </p>
            </div>
          </div>

          {/* Right: Price & Match */}
          <div className="flex items-center gap-3">
            {showPurposeMatch && (
              <Badge className="bg-blue-50 text-blue-600 border-blue-200 text-xs px-2 py-0.5">
                <Sparkles className="h-2.5 w-2.5 mr-1" />
                Match
              </Badge>
            )}
            <div className="text-right">
              <div className="font-semibold text-gray-900 text-sm">
                ${(offer.dph_total || 0).toFixed(3)}
              </div>
              <div className="text-xs text-gray-400">/hour</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/gpu/${offer.id}`}>
      <Card 
        className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer border-0 bg-transparent hover:bg-white/50 hover:shadow-xl ${
          showPurposeMatch ? 'ring-1 ring-blue-100 bg-blue-50/20' : ''
        } p-0`}
        onMouseEnter={(e) => onHover(offer, e)}
        onMouseLeave={onLeave}
        onMouseMove={onMouseMove}
      >
        {/* Purpose Match Indicator */}
        {showPurposeMatch && (
          <div className="absolute top-2 right-2 z-10">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="p-4 space-y-3">
          {/* Header with Status */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <StatusDot available={offer.rentable !== false} />
                <h3 className="font-medium text-gray-900 truncate text-sm leading-tight">
                  {offer.gpu_name}
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                {offer.num_gpus || 1}x GPU
              </p>
            </div>
          </div>

          {/* Price - Ultra Prominent */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-bold text-gray-900 text-lg tracking-tight">
                ${(offer.dph_total || 0).toFixed(3)}
              </span>
              <span className="text-gray-400 ml-1 text-xs">/hr</span>
            </div>
          </div>

          {/* Footer Info - Ghost Light */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="truncate">
              {(offer.datacenter || "Unknown").split('(')[0].trim()}
            </span>
            <span className="flex-shrink-0">
              {Math.round((offer.reliability2 || offer.reliability || 0) * 100)}%
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default UltraMinimalGpuCard;
