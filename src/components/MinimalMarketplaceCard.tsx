
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

interface MinimalMarketplaceCardProps {
  offer: any;
  onHover: (offer: any, e: React.MouseEvent) => void;
  onLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  showPurposeMatch?: boolean;
}

const MinimalMarketplaceCard = ({ 
  offer, 
  onHover, 
  onLeave, 
  onMouseMove,
  showPurposeMatch = false 
}: MinimalMarketplaceCardProps) => {
  return (
    <Link to={`/gpu/${offer.id}`}>
      <Card 
        className={`group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer bg-card border-border/60 hover:border-border ${
          showPurposeMatch ? 'ring-1 ring-primary/50 bg-primary/5' : ''
        }`}
        onMouseEnter={(e) => onHover(offer, e)}
        onMouseLeave={onLeave}
        onMouseMove={onMouseMove}
      >
        {showPurposeMatch && (
          <div className="absolute top-1.5 right-1.5 z-10">
            <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
              <Sparkles className="h-2.5 w-2.5 mr-0.5" />
              Match
            </Badge>
          </div>
        )}
        
        <CardContent className="p-3">
          <div className="space-y-2">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-foreground truncate">
                  {offer.gpu_name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {offer.num_gpus || 1}x GPU
                </p>
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs px-1.5 py-0.5 ${
                  offer.rentable !== false 
                    ? "border-green-200 text-green-700 bg-green-50 dark:border-green-800 dark:text-green-400 dark:bg-green-950" 
                    : "border-red-200 text-red-700 bg-red-50 dark:border-red-800 dark:text-red-400 dark:bg-red-950"
                }`}
              >
                {offer.rentable !== false ? "Live" : "Off"}
              </Badge>
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-lg font-semibold text-foreground">
                  ${(offer.dph_total || 0).toFixed(3)}
                </span>
                <span className="text-xs text-muted-foreground ml-1">/hr</span>
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1 truncate">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{(offer.datacenter || "Unknown").split('(')[0].trim()}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>{Math.round((offer.reliability2 || offer.reliability || 0) * 100)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MinimalMarketplaceCard;
