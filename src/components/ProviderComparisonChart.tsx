
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Clock, MapPin } from "lucide-react";
import { Provider, PriceHistory } from "@/types/gpu-comparison";
import { providers } from "@/data/gpuCatalog";

interface ProviderComparisonChartProps {
  gpuId: string;
  className?: string;
}

// Generate mock price history data
const generatePriceHistory = (provider: Provider, days: number = 30) => {
  const data = [];
  const basePrice = provider.pricing.hourly;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some realistic price variation
    const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
    const price = basePrice * (1 + variation);
    
    data.push({
      date: date.toISOString().split('T')[0],
      [provider.name]: Number(price.toFixed(3))
    });
  }
  
  return data;
};

const ProviderComparisonChart = ({ gpuId, className }: ProviderComparisonChartProps) => {
  // Combine price history from all providers
  const combinedData = providers.reduce((acc, provider) => {
    const providerData = generatePriceHistory(provider);
    
    providerData.forEach((item, index) => {
      if (!acc[index]) {
        acc[index] = { date: item.date };
      }
      acc[index][provider.name] = item[provider.name];
    });
    
    return acc;
  }, [] as any[]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Price History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Price History Comparison (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [`$${value.toFixed(3)}/hr`, name]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Legend />
                {providers.map((provider) => (
                  <Line
                    key={provider.id}
                    type="monotone"
                    dataKey={provider.name}
                    stroke={provider.color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Provider Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {providers.map((provider) => (
          <Card key={provider.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Provider Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: provider.color }}>
                    {provider.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{provider.rating}</span>
                    <Badge 
                      className={`ml-2 text-xs ${
                        provider.availability === 'available' ? 'bg-green-100 text-green-800' :
                        provider.availability === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {provider.availability}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <div className="text-2xl font-bold text-green-600">
                  ${provider.pricing.hourly}/hr
                </div>
                <div className="text-sm text-muted-foreground">
                  ${provider.pricing.monthly}/month
                </div>
                {provider.pricing.spot && (
                  <div className="text-sm text-blue-600">
                    Spot: ${provider.pricing.spot}/hr
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-3 w-3" />
                  <span>Setup: {provider.setupTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3 w-3" />
                  <span>{provider.locations.slice(0, 2).join(', ')}</span>
                  {provider.locations.length > 2 && (
                    <span className="text-muted-foreground">+{provider.locations.length - 2}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Key Features:</div>
                <div className="space-y-1">
                  {provider.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="text-xs text-muted-foreground">
                      • {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="mb-4 space-y-2">
                <div>
                  <div className="text-xs font-medium text-green-600 mb-1">Pros:</div>
                  <div className="text-xs text-muted-foreground">
                    {provider.pros.slice(0, 2).join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-red-600 mb-1">Cons:</div>
                  <div className="text-xs text-muted-foreground">
                    {provider.cons.slice(0, 2).join(', ')}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  disabled={provider.availability === 'unavailable'}
                  style={{ backgroundColor: provider.color }}
                >
                  {provider.availability === 'unavailable' ? 'Unavailable' : 'Rent Now'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(provider.website, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Visit Provider
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProviderComparisonChart;
