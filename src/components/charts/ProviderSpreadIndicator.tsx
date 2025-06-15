
import { Badge } from "@/components/ui/badge";
import { ProviderSpread } from '@/types/card-expansion';

interface ProviderSpreadIndicatorProps {
  spread: ProviderSpread;
  className?: string;
}

const ProviderSpreadIndicator = ({ spread, className = "" }: ProviderSpreadIndicatorProps) => {
  const getRelativePosition = (price: number) => {
    const range = spread.max - spread.min;
    if (range === 0) return 50;
    return ((price - spread.min) / range) * 100;
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'limited': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Price Range Bar */}
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 opacity-50" />
          
          {/* Provider dots */}
          {spread.providers.map((provider, index) => (
            <div
              key={index}
              className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm ${getTrustScoreColor(provider.trustScore)}`}
              style={{ left: `${getRelativePosition(provider.price)}%` }}
              title={`${provider.name}: $${provider.price.toFixed(3)}/hr (Trust: ${provider.trustScore}%)`}
            />
          ))}
          
          {/* Current price indicator */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md"
            style={{ left: `${getRelativePosition(spread.current)}%` }}
          />
        </div>
        
        {/* Price labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>${spread.min.toFixed(3)}</span>
          <span className="font-medium text-blue-600">${spread.current.toFixed(3)}</span>
          <span>${spread.max.toFixed(3)}</span>
        </div>
      </div>
      
      {/* Provider count and availability */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">{spread.providers.length} providers</span>
          <div className="flex gap-1">
            {spread.providers.slice(0, 3).map((provider, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${getAvailabilityColor(provider.availability)}`}
                title={`${provider.name}: ${provider.availability}`}
              />
            ))}
            {spread.providers.length > 3 && (
              <span className="text-gray-400">+{spread.providers.length - 3}</span>
            )}
          </div>
        </div>
        
        <Badge variant="outline" className="text-xs">
          {spread.providers.filter(p => p.availability === 'available').length} available
        </Badge>
      </div>
    </div>
  );
};

export default ProviderSpreadIndicator;
