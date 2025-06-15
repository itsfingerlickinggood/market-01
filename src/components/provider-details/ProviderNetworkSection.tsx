
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, MapPin, Clock, Shield } from "lucide-react";
import { ProviderInfo } from "@/data/providerCatalog";

interface ProviderNetworkSectionProps {
  provider: ProviderInfo;
}

const ProviderNetworkSection = ({ provider }: ProviderNetworkSectionProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-purple-500" />
          Provider & Network
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Host Rating */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">Host Rating</span>
          </div>
          <div className="pl-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold">{provider.hostRating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(provider.hostRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {provider.reviewCount.toLocaleString()} reviews
            </div>
          </div>
        </div>

        {/* Trust Score */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="font-medium">Trust Score</span>
          </div>
          <div className="pl-6">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${provider.trustScore * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">
                {Math.round(provider.trustScore * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Uptime */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Historical Uptime</span>
          </div>
          <div className="pl-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{provider.uptime}%</span>
              <Badge 
                className={
                  provider.uptime >= 99.5 ? 'bg-green-100 text-green-800' :
                  provider.uptime >= 98 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }
              >
                {provider.uptime >= 99.5 ? 'Excellent' :
                 provider.uptime >= 98 ? 'Good' : 'Fair'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Setup Time */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="font-medium">Setup Time</span>
          </div>
          <div className="text-sm text-muted-foreground pl-6">
            {provider.setupTime}
          </div>
        </div>

        {/* Data Centers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-red-500" />
            <span className="font-medium">Data Centers</span>
          </div>
          <div className="space-y-1 pl-6">
            {provider.dataCenterLocations.map((location) => (
              <div key={location} className="text-sm text-muted-foreground">
                • {location}
              </div>
            ))}
          </div>
        </div>

        {/* Network Performance */}
        <div>
          <div className="text-sm font-medium mb-2">Network Performance</div>
          <div className="space-y-2 pl-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Download:</span>
              <span className="font-medium">{provider.specs.networkSpeed.download}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Upload:</span>
              <span className="font-medium">{provider.specs.networkSpeed.upload}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderNetworkSection;
