
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import MicroCandlestickChart from "./MicroCandlestickChart";

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
      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${
        available ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
      }`} 
    />
  );

  if (viewMode === "list") {
    return (
      <Link to={`/gpu/${offer.id}`}>
        <div 
          className="group relative flex items-center justify-between py-3 px-1 hover:bg-muted/30 transition-all duration-300 border-b border-border/40 last:border-b-0 cursor-pointer hover:translate-x-1"
          onMouseEnter={(e) => onHover(offer, e)}
          onMouseLeave={onLeave}
          onMouseMove={onMouseMove}
        >
          {/* Left: GPU Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <StatusDot available={offer.rentable !== false} />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate text-sm transition-colors duration-300">
                {offer.gpu_name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 transition-colors duration-300">
                {offer.datacenter?.split('(')[0]?.trim() || "Unknown"} • {offer.num_gpus || 1}x
              </p>
            </div>
          </div>

          {/* Center: Price Chart */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <MicroCandlestickChart 
                basePrice={offer.dph_total || 1.0}
                width={70}
                height={28}
              />
            </div>
          </div>

          {/* Right: Price & Match */}
          <div className="flex items-center gap-3">
            {showPurposeMatch && (
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-0.5 transition-colors duration-300">
                <Sparkles className="h-2.5 w-2.5 mr-1" />
                Match
              </Badge>
            )}
            <div className="text-right">
              <div className="font-semibold text-foreground text-sm transition-colors duration-300">
                ${(offer.dph_total || 0).toFixed(3)}
              </div>
              <div className="text-xs text-muted-foreground transition-colors duration-300">/hour</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/gpu/${offer.id}`}>
      <Card 
        className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer border-0 bg-transparent hover:bg-card/50 hover:shadow-xl ${
          showPurposeMatch ? 'ring-1 ring-primary/20 bg-primary/5' : ''
        } p-0`}
        onMouseEnter={(e) => onHover(offer, e)}
        onMouseLeave={onLeave}
        onMouseMove={onMouseMove}
      >
        {/* Purpose Match Indicator */}
        {showPurposeMatch && (
          <div className="absolute top-2 right-2 z-10">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="p-4 space-y-3">
          {/* Header with Status */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <StatusDot available={offer.rentable !== false} />
                <h3 className="font-medium text-foreground truncate text-sm leading-tight transition-colors duration-300">
                  {offer.gpu_name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground transition-colors duration-300">
                {offer.num_gpus || 1}x GPU
              </p>
            </div>
          </div>

          {/* Price Chart Section */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-foreground text-lg tracking-tight transition-colors duration-300">
                ${(offer.dph_total || 0).toFixed(3)}
              </span>
              <span className="text-muted-foreground ml-1 text-xs transition-colors duration-300">/hr</span>
            </div>
            <div className="flex-shrink-0">
              <MicroCandlestickChart 
                basePrice={offer.dph_total || 1.0}
                width={84}
                height={32}
              />
            </div>
          </div>

          {/* Footer Info - Ghost Light */}
          <div className="flex items-center justify-between text-xs text-muted-foreground transition-colors duration-300">
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
