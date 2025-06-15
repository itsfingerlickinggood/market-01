
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Star, DollarSign, Clock, Shield } from "lucide-react";

interface ProviderComparisonSectionProps {
  gpu: any;
  enhancedData: any;
  providerData: any[];
}

const ProviderComparisonSection = ({ gpu, enhancedData, providerData }: ProviderComparisonSectionProps) => {
  const currentProvider = enhancedData.provider;
  
  // Add the current provider to comparison
  const allProviders = [
    {
      ...currentProvider,
      price: enhancedData.pricing.hourly,
      isCurrent: true
    },
    ...providerData.slice(0, 3).map(provider => ({
      ...provider,
      name: provider.name,
      logo: provider.logo,
      trustScore: provider.reliability || 85,
      rating: (provider.reliability || 85) / 20, // Convert to 5-star scale
      setupTime: provider.setupTime || '2-5 min',
      tier: provider.reliability > 90 ? 'Premium' : provider.reliability > 80 ? 'Verified' : 'Community',
      price: provider.price,
      isCurrent: false
    }))
  ];

  const getTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'verified': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'community': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Provider Comparison for {gpu.gpu_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Provider</th>
                    <th className="text-center py-3 px-2">Price/hour</th>
                    <th className="text-center py-3 px-2">Setup Time</th>
                    <th className="text-center py-3 px-2">Trust Score</th>
                    <th className="text-center py-3 px-2">Rating</th>
                    <th className="text-center py-3 px-2">Tier</th>
                    <th className="text-center py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allProviders.map((provider, index) => (
                    <tr 
                      key={index} 
                      className={`border-b transition-colors ${
                        provider.isCurrent 
                          ? 'bg-primary/5 border-primary/20' 
                          : 'hover:bg-accent/30'
                      }`}
                    >
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{provider.logo}</div>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {provider.name}
                              {provider.isCurrent && (
                                <Badge variant="default" className="text-xs">
                                  Current
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        <div className="font-bold text-lg">
                          ${provider.price.toFixed(3)}
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{provider.setupTime}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        <div className="flex items-center justify-center gap-1">
                          <Shield className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{provider.trustScore}%</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{provider.rating?.toFixed(1) || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        <Badge className={getTierColor(provider.tier)} variant="outline">
                          {provider.tier}
                        </Badge>
                      </td>
                      <td className="text-center py-4 px-2">
                        {provider.isCurrent ? (
                          <Badge variant="default">Selected</Badge>
                        ) : (
                          <Button variant="outline" size="sm">
                            Select
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Comparison Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <Card className="p-4">
                <div className="text-center space-y-2">
                  <DollarSign className="h-8 w-8 text-green-500 mx-auto" />
                  <div className="font-semibold">Best Price</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${Math.min(...allProviders.map(p => p.price)).toFixed(3)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {allProviders.find(p => p.price === Math.min(...allProviders.map(p => p.price)))?.name}
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="text-center space-y-2">
                  <Clock className="h-8 w-8 text-blue-500 mx-auto" />
                  <div className="font-semibold">Fastest Setup</div>
                  <div className="text-2xl font-bold text-blue-600">
                    1-2 min
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Paperspace
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="text-center space-y-2">
                  <Shield className="h-8 w-8 text-purple-500 mx-auto" />
                  <div className="font-semibold">Highest Trust</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.max(...allProviders.map(p => p.trustScore))}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {allProviders.find(p => p.trustScore === Math.max(...allProviders.map(p => p.trustScore)))?.name}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderComparisonSection;
