
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, TrendingDown, DollarSign, Calculator, ExternalLink, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

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

interface InteractivePricingDashboardProps {
  gpu: any;
  providerData: PlatformProvider[];
}

const InteractivePricingDashboard = ({ gpu, providerData }: InteractivePricingDashboardProps) => {
  const [rentDuration, setRentDuration] = useState([24]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);

  // Generate realistic price history
  useEffect(() => {
    const generateHistory = () => {
      const basePrice = gpu.dph_total || 1.0;
      const data = [];
      
      for (let i = 23; i >= 0; i--) {
        const variation = (Math.sin(i * 0.3) + Math.random() - 0.5) * 0.2;
        const price = basePrice * (1 + variation);
        data.push({
          time: `${String(new Date().getHours() - i).padStart(2, '0')}:00`,
          price: Number(price.toFixed(3)),
          change: variation > 0 ? 'up' : 'down'
        });
      }
      return data;
    };

    setPriceHistory(generateHistory());
  }, [gpu.dph_total]);

  const calculatePrice = (hours: number, provider: PlatformProvider) => {
    const basePrice = provider.price;
    const dailyDiscount = hours >= 24 ? 0.1 : 0;
    const weeklyDiscount = hours >= 168 ? 0.2 : 0;
    const monthlyDiscount = hours >= 720 ? 0.3 : 0;
    
    const maxDiscount = Math.max(dailyDiscount, weeklyDiscount, monthlyDiscount);
    return (basePrice * hours * (1 - maxDiscount)).toFixed(2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'limited': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'unavailable': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const avgPrice = providerData.reduce((sum, p) => sum + p.price, 0) / providerData.length;
  const priceChange = priceHistory.length > 1 ? 
    ((priceHistory[priceHistory.length - 1].price - priceHistory[0].price) / priceHistory[0].price) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Live Price Ticker */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue/5 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Live Pricing Dashboard
            </CardTitle>
            <div className={`flex items-center gap-1 text-sm ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(priceChange).toFixed(1)}% (24h)
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">${avgPrice.toFixed(3)}/hr</div>
              <div className="text-sm text-muted-foreground">Average Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${Math.min(...providerData.map(p => p.price)).toFixed(3)}/hr</div>
              <div className="text-sm text-muted-foreground">Best Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{providerData.filter(p => p.status === 'available').length}</div>
              <div className="text-sm text-muted-foreground">Available Now</div>
            </div>
          </div>

          {/* Mini Price Chart */}
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <XAxis dataKey="time" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Price']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Provider Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Provider Comparison & Calculator
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Rental Duration: {rentDuration[0]} hours</span>
              <span className="text-muted-foreground">
                {rentDuration[0] >= 720 ? "30% monthly discount" :
                 rentDuration[0] >= 168 ? "20% weekly discount" :
                 rentDuration[0] >= 24 ? "10% daily discount" : "Hourly rate"}
              </span>
            </div>
            <Slider
              value={rentDuration}
              onValueChange={setRentDuration}
              max={720}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {providerData
              .sort((a, b) => a.price - b.price)
              .map((provider, index) => (
              <div 
                key={provider.name}
                className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{provider.logo}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{provider.name}</span>
                      {index === 0 && <Badge variant="secondary" className="text-xs">Best Value</Badge>}
                      <Badge className={getStatusColor(provider.status)}>
                        {provider.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {provider.setupTime}
                      </span>
                      <span>Reliability: {provider.reliability}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold">${provider.price}/hr</div>
                  <div className="text-sm text-muted-foreground">
                    Total: ${calculatePrice(rentDuration[0], provider)}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button 
                      size="sm" 
                      disabled={provider.status === 'unavailable'}
                      onClick={() => window.open(provider.url, '_blank')}
                    >
                      Rent Now
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={provider.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractivePricingDashboard;
