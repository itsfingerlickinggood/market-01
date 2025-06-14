
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, Star } from "lucide-react";
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
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm text-foreground">{label}</p>
          <p className="text-primary text-sm font-medium">${payload[0].value.toFixed(3)}/hour</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Price Comparison Chart - Improved spacing and alignment */}
      <Card className="shadow-sm border border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <div className="h-5 w-5 bg-primary rounded-sm"></div>
            Price Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={providerData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="name" 
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
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
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Provider Grid - Enhanced alignment and spacing */}
      <Card className="shadow-sm border border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <div className="h-5 w-5 bg-blue-500 rounded-sm"></div>
            Available Providers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="grid md:grid-cols-2 gap-4">
            {providerData.slice(0, 6).map((provider) => (
              <Card 
                key={provider.name} 
                className="bg-gradient-to-br from-card to-card/50 shadow-sm border border-border/50 hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{provider.logo}</span>
                      <span className="font-semibold text-foreground">{provider.name}</span>
                    </div>
                    <Badge 
                      className={`px-2 py-1 text-xs font-medium ${
                        provider.status === 'available' ? 'bg-green-100 text-green-800 border-green-200' :
                        provider.status === 'limited' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}
                    >
                      {provider.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">${provider.price.toFixed(3)}/hr</div>
                      <div className="text-sm text-muted-foreground">
                        Monthly: <span className="font-medium">${(provider.price * 24 * 30).toFixed(0)}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">{provider.setupTime}</span>
                      </div>
                      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="font-medium">{provider.reliability}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 font-medium shadow-sm"
                      disabled={provider.status === 'unavailable'}
                    >
                      Rent Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="px-3 shadow-sm"
                    >
                      <ExternalLink className="h-3 w-3" />
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
