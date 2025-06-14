
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
        <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-primary text-sm">${payload[0].value.toFixed(3)}/hour</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Price Comparison Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Price Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={providerData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                <XAxis 
                  dataKey="name" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={40}
                />
                <YAxis 
                  fontSize={10}
                  tickFormatter={(value) => `$${value.toFixed(2)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="price" 
                  fill="hsl(var(--primary))"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Provider Grid */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Available Providers</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="grid md:grid-cols-2 gap-3">
            {providerData.slice(0, 6).map((provider) => (
              <div 
                key={provider.name} 
                className="border border-border rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{provider.logo}</span>
                    <span className="font-medium text-sm">{provider.name}</span>
                  </div>
                  <Badge 
                    className={
                      provider.status === 'available' ? 'bg-green-100 text-green-800' :
                      provider.status === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {provider.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold">${provider.price.toFixed(3)}/hr</div>
                    <div className="text-xs text-muted-foreground">
                      Monthly: ${(provider.price * 24 * 30).toFixed(0)}
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {provider.setupTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {provider.reliability}%
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    disabled={provider.status === 'unavailable'}
                  >
                    Rent
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactPricingSection;
