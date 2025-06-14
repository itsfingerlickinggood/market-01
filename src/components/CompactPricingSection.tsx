
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, Star, TrendingUp, TrendingDown, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface PlatformProvider {
  name: string;
  price: number;
  status: 'available' | 'limited' | 'unavailable';
  url: string;
  logo: string;
  setupTime: string;
  reliability: number;
  features: string[];
}

interface CompactPricingSectionProps {
  gpu: any;
  providerData: PlatformProvider[];
}

const CompactPricingSection = ({ gpu, providerData }: CompactPricingSectionProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-primary/20 rounded-xl p-3 shadow-xl backdrop-blur-sm">
          <p className="font-semibold text-sm text-gray-900">{label}</p>
          <p className="text-primary text-sm font-bold">${payload[0].value.toFixed(3)}/hour</p>
        </div>
      );
    }
    return null;
  };

  const bestPrice = Math.min(...providerData.map(p => p.price));
  const avgPrice = providerData.reduce((sum, p) => sum + p.price, 0) / providerData.length;

  return (
    <div className="space-y-6">
      {/* Enhanced Price Comparison Chart */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-primary/5 overflow-hidden">
        <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              Price Comparison Dashboard
            </CardTitle>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Best Price</div>
                <div className="text-lg font-bold text-green-600">${bestPrice.toFixed(3)}/hr</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Average</div>
                <div className="text-lg font-bold text-blue-600">${avgPrice.toFixed(3)}/hr</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={providerData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="name" 
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  fontSize={11}
                  tickFormatter={(value) => `$${value.toFixed(2)}`}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="price" 
                  fill="url(#priceGradient)"
                  radius={[6, 6, 0, 0]}
                  stroke="hsl(var(--primary))"
                  strokeWidth={1}
                />
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Provider Grid */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-secondary/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            Available Providers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            {providerData.slice(0, 6).map((provider, index) => (
              <Card 
                key={provider.name} 
                className={`group hover:scale-102 transition-all duration-300 shadow-lg hover:shadow-xl border-0 overflow-hidden ${
                  index === 0 ? 'ring-2 ring-green-200 bg-gradient-to-br from-green-50 to-white' :
                  provider.status === 'available' ? 'bg-gradient-to-br from-white to-blue-50' :
                  provider.status === 'limited' ? 'bg-gradient-to-br from-white to-yellow-50' :
                  'bg-gradient-to-br from-white to-gray-50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl p-2 bg-white rounded-lg shadow-sm">
                        {provider.logo}
                      </div>
                      <div>
                        <span className="font-bold text-lg">{provider.name}</span>
                        {index === 0 && (
                          <Badge className="ml-2 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm">
                            Best Value
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge 
                      className={`font-medium shadow-sm ${
                        provider.status === 'available' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300' :
                        provider.status === 'limited' ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300' :
                        'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300'
                      }`}
                    >
                      {provider.status === 'available' ? '✓ Available' :
                       provider.status === 'limited' ? '⚠ Limited' : '✗ Unavailable'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="text-2xl font-bold text-green-600">${provider.price.toFixed(3)}</div>
                      <div className="text-xs text-green-600 font-medium">per hour</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Monthly: ${(provider.price * 24 * 30).toFixed(0)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2 px-3 py-1 bg-blue-100 rounded-full">
                        <Clock className="h-3 w-3 text-blue-600" />
                        <span className="text-xs font-medium text-blue-800">{provider.setupTime}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 rounded-full">
                        <Star className="h-3 w-3 text-yellow-600" />
                        <span className="text-xs font-medium text-yellow-800">{provider.reliability}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className={`flex-1 font-medium transition-all duration-300 ${
                        provider.status === 'unavailable'
                          ? 'bg-gray-200 text-gray-500'
                          : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl hover:scale-105'
                      }`}
                      disabled={provider.status === 'unavailable'}
                    >
                      {provider.status === 'unavailable' ? 'Unavailable' : 'Rent Now'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="p-2 hover:bg-primary/10 border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactPricingSection;
