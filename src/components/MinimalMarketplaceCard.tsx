
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface MinimalMarketplaceCardProps {
  offer: any;
  onHover: (offer: any, e: React.MouseEvent) => void;
  onLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  showPurposeMatch?: boolean;
  density?: "compact" | "comfortable";
  viewMode?: "grid" | "list";
}

const MinimalMarketplaceCard = ({ 
  offer, 
  onHover, 
  onLeave, 
  onMouseMove,
  showPurposeMatch = false,
  density = "compact",
  viewMode = "grid"
}: MinimalMarketplaceCardProps) => {
  const isCompact = density === "compact";
  const isList = viewMode === "list";

  const StatusDot = ({ available }: { available: boolean }) => (
    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
      available ? "bg-green-500" : "bg-red-400"
    }`} />
  );

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'marketplace': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'specialist': return 'bg-green-100 text-green-700 border-green-200';
      case 'hyperscaler': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (isList) {
    return (
      <Link to={`/gpu/${offer.id}`}>
        <div 
          className="group relative flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 cursor-pointer"
          onMouseEnter={(e) => onHover(offer, e)}
          onMouseLeave={onLeave}
          onMouseMove={onMouseMove}
        >
          {/* Left: Company & GPU Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <StatusDot available={offer.rentable !== false} />
            <div className="flex items-center gap-3">
              <span className="text-lg">{offer.provider_logo}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {offer.company}
                  </h3>
                  <Badge className={`text-xs ${getTierBadgeColor(offer.provider_tier)}`}>
                    {offer.provider_tier}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  {offer.gpu_name} • {offer.website}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Price & Match */}
          <div className="flex items-center gap-4">
            {showPurposeMatch && (
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Match
              </Badge>
            )}
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {offer.price_range || `$${(offer.dph_total || 0).toFixed(3)}`}
              </div>
              <div className="text-xs text-gray-500">/hour</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/gpu/${offer.id}`}>
      <Card 
        className={`group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-0 bg-white hover:bg-gray-50/50 ${
          showPurposeMatch ? 'ring-1 ring-blue-200 bg-blue-50/30' : ''
        } ${isCompact ? 'p-3' : 'p-4'}`}
        onMouseEnter={(e) => onHover(offer, e)}
        onMouseLeave={onLeave}
        onMouseMove={onMouseMove}
        style={{ borderLeft: `3px solid ${offer.provider_color}` }}
      >
        {/* Purpose Match Badge */}
        {showPurposeMatch && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5 shadow-sm">
              <Sparkles className="h-2.5 w-2.5 mr-1" />
              Match
            </Badge>
          </div>
        )}
        
        {/* Main Content */}
        <div className={`space-y-${isCompact ? '2' : '3'}`}>
          {/* Company Header with Status */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-lg">{offer.provider_logo}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <StatusDot available={offer.rentable !== false} />
                  <h3 className={`font-semibold text-gray-900 truncate ${isCompact ? 'text-sm' : 'text-base'}`}>
                    {offer.company}
                  </h3>
                </div>
                <p className={`text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  {offer.gpu_name}
                </p>
              </div>
            </div>
            <Badge className={`text-xs ${getTierBadgeColor(offer.provider_tier)}`}>
              {offer.provider_tier}
            </Badge>
          </div>

          {/* Price - Prominent */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className={`font-semibold text-gray-900 ${isCompact ? 'text-lg' : 'text-xl'}`}>
                {offer.price_range || `$${(offer.dph_total || 0).toFixed(3)}`}
              </span>
              <span className={`text-gray-500 ml-1 ${isCompact ? 'text-xs' : 'text-sm'}`}>/hr</span>
            </div>
          </div>

          {/* Provider Website & Uptime */}
          <div className={`flex items-center justify-between ${isCompact ? 'text-xs' : 'text-sm'} text-gray-500`}>
            <div className="flex items-center gap-1 truncate">
              <ExternalLink className="h-3 w-3" />
              <span className="truncate">{offer.website}</span>
            </div>
            <span className="flex-shrink-0">
              {Math.round((offer.reliability2 || offer.reliability || 0) * 100)}% uptime
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MinimalMarketplaceCard;
