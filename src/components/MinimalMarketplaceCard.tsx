
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface MinimalMarketplaceCardProps {
  offer: any;
  onHover: (offer: any, e: React.MouseEvent) => void;
  onLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}

const MinimalMarketplaceCard = ({ 
  offer, 
  onHover, 
  onLeave, 
  onMouseMove 
}: MinimalMarketplaceCardProps) => {
  return (
    <Link to={`/gpu/${offer.id}`}>
      <Card 
        className="group relative transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border border-gray-200 bg-white cursor-pointer"
        onMouseEnter={(e) => onHover(offer, e)}
        onMouseLeave={onLeave}
        onMouseMove={onMouseMove}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {offer.gpu_name}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {offer.num_gpus || 1}x GPU
                </p>
              </div>
              <Badge 
                variant="outline" 
                className={
                  offer.rentable !== false 
                    ? "border-green-200 text-green-700 bg-green-50" 
                    : "border-red-200 text-red-700 bg-red-50"
                }
              >
                {offer.rentable !== false ? "Available" : "Offline"}
              </Badge>
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xl font-semibold text-gray-900">
                  ${(offer.dph_total || 0).toFixed(3)}
                </span>
                <span className="text-sm text-gray-500 ml-1">/hour</span>
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{(offer.datacenter || "Unknown").split('(')[0].trim()}</span>
              </div>
              <div className="flex items-center gap-1">
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
