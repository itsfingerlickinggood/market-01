
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Clock, Shield, Zap, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts";

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

interface ModernProviderComparisonProps {
  providers: PlatformProvider[];
}

const ModernProviderComparison = ({ providers }: ModernProviderComparisonProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-foreground">{label}</p>
          <p className="text-primary font-medium">${data.price.toFixed(3)}/hour</p>
          <p className="text-sm text-muted-foreground">{data.status}</p>
        </div>
      );
    }
    return null;
  };

  // Generate price history for chart
  const priceHistory = providers.slice(0, 5).map((provider, index) => ({
    name: provider.name.split(' ')[0], // Shorten names for chart
    current: provider.price,
    lastWeek: provider.price * (0.9 + Math.random() * 0.2),
    trend: Math.random() > 0.5 ? 'up' : 'down'
  }));

  return (
    <div className="space-y-8">
      {/* Price Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            Price Comparison Across Providers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={providers} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="name" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis 
                  fontSize={12}
                  tickFormatter={(value) => `$${value.toFixed(2)}`}
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

      {/* Price Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <LineChart className="h-5 w-5 text-green-500" />
            Price Trends (7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={(value) => `$${value.toFixed(2)}`} />
                <Tooltip 
                  formatter={(value: any) => [`$${value.toFixed(3)}`, 'Price']}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="lastWeek" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeDasharray="5 5"
                  name="Last Week"
                />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Current"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Provider Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {providers.map((provider, index) => (
          <Card key={provider.name} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              {/* Provider Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{provider.logo}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        provider.status === 'available' ? 'bg-green-500 animate-pulse' :
                        provider.status === 'limited' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <Badge variant={
                        provider.status === 'available' ? 'default' :
                        provider.status === 'limited' ? 'secondary' : 'destructive'
                      } className="text-xs">
                        {provider.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {index === 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    Best Value
                  </Badge>
                )}
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    ${provider.price.toFixed(3)}
                  </span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ~${(provider.price * 24 * 30).toFixed(0)}/month
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-muted-foreground">Setup Time</span>
                  </div>
                  <div className="font-medium">{provider.setupTime}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Reliability</span>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">{provider.reliability}%</div>
                    <Progress value={provider.reliability} className="h-1" />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-sm text-muted-foreground">Features</h4>
                <div className="flex flex-wrap gap-1">
                  {provider.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button 
                  className="flex-1" 
                  disabled={provider.status === 'unavailable'}
                  size="sm"
                >
                  {provider.status === 'unavailable' ? 'Unavailable' : 'Rent Now'}
                </Button>
                <Button variant="outline" size="sm" className="px-3">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Provider</th>
                  <th className="text-left p-3 font-medium">Price</th>
                  <th className="text-left p-3 font-medium">Setup Time</th>
                  <th className="text-left p-3 font-medium">Reliability</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider.name} className="border-b hover:bg-accent/50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{provider.logo}</span>
                        <span className="font-medium">{provider.name}</span>
                      </div>
                    </td>
                    <td className="p-3 font-semibold">${provider.price.toFixed(3)}/hr</td>
                    <td className="p-3">{provider.setupTime}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span>{provider.reliability}%</span>
                        <Progress value={provider.reliability} className="h-1 w-16" />
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant={
                        provider.status === 'available' ? 'default' :
                        provider.status === 'limited' ? 'secondary' : 'destructive'
                      } className="text-xs">
                        {provider.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernProviderComparison;
