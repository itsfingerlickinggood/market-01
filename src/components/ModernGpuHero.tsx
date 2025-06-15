
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Zap, Cpu, HardDrive, Wifi, TrendingUp, TrendingDown, Star, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { comprehensiveProviders, getProvidersByGpu } from "@/data/comprehensiveProviderCatalog";

interface ModernGpuHeroProps {
  gpu: any;
}

const ModernGpuHero = ({ gpu }: ModernGpuHeroProps) => {
  const [priceChange, setPriceChange] = useState(0);
  const [isAvailable, setIsAvailable] = useState(gpu.rentable !== false);

  useEffect(() => {
    // Simulate price change data
    setPriceChange((Math.random() - 0.5) * 10);
  }, []);

  const compatibleProviders = getProvidersByGpu(gpu.gpu_name || 'A100');
  const availableProviders = compatibleProviders.filter(p => p.trustScore > 80);
  const bestPrice = Math.min(...compatibleProviders.map(p => 
    p.pricing.find(pricing => pricing.gpuModel.toLowerCase().includes('a100'))?.hourly || 999
  ));

  const keyMetrics = [
    {
      label: "VRAM",
      value: `${gpu.gpu_ram || 24}GB`,
      icon: Zap,
      color: "text-blue-500"
    },
    {
      label: "CPU Cores",
      value: `${gpu.cpu_cores || 16}`,
      icon: Cpu,
      color: "text-green-500"
    },
    {
      label: "RAM",
      value: `${gpu.cpu_ram || 64}GB`,
      icon: HardDrive,
      color: "text-purple-500"
    },
    {
      label: "Network",
      value: gpu.inet_down || "10Gbps",
      icon: Wifi,
      color: "text-orange-500"
    }
  ];

  const reliability = Math.round((gpu.reliability2 || gpu.reliability || 0.85) * 100);

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      
      <div className="relative container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <Badge variant={isAvailable ? "default" : "destructive"} className="px-3 py-1">
                  {isAvailable ? "Available Now" : "Currently Rented"}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  High Performance
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {availableProviders.length} Providers
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                {gpu.gpu_name}
              </h1>
              
              <div className="flex items-center gap-6 text-muted-foreground flex-wrap">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{gpu.datacenter || gpu.country || 'Global'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>{reliability}% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {keyMetrics.map((metric) => (
                <Card key={metric.label} className="p-4 bg-card/50 backdrop-blur border border-border/50">
                  <div className="flex items-center gap-3">
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                    <div>
                      <div className="font-bold text-lg">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Provider Availability */}
            <Card className="p-6 bg-card/50 backdrop-blur border border-border/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Provider Availability</h3>
                  <span className="text-sm text-muted-foreground">{availableProviders.length} of {compatibleProviders.length} available</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableProviders.slice(0, 4).map((provider) => (
                    <div key={provider.id} className="text-center p-3 border rounded-lg">
                      <div className="text-lg mb-1">{provider.logo}</div>
                      <div className="text-xs font-medium">{provider.name}</div>
                      <div className="text-xs text-green-600 font-bold">
                        ${provider.pricing.find(p => p.gpuModel.includes('A100'))?.hourly.toFixed(2) || 'N/A'}/hr
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Performance Bar */}
            <Card className="p-6 bg-card/50 backdrop-blur border border-border/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Overall Performance</h3>
                  <span className="text-2xl font-bold text-primary">{reliability}%</span>
                </div>
                <Progress value={reliability} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Gaming</div>
                    <div className="font-medium">Excellent</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">AI/ML</div>
                    <div className="font-medium">Outstanding</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Rendering</div>
                    <div className="font-medium">Very Good</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Pricing Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/80 backdrop-blur border border-border/50 sticky top-24">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">Starting from</div>
                  <div className="text-4xl font-bold text-primary">
                    ${bestPrice.toFixed(3)}
                  </div>
                  <div className="text-muted-foreground">per hour</div>
                  
                  {/* Price Trend */}
                  <div className={`flex items-center justify-center gap-1 text-sm ${
                    priceChange >= 0 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {priceChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(priceChange).toFixed(1)}% vs last week
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily (~24h)</span>
                    <span className="font-medium">${(bestPrice * 24).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly (~168h)</span>
                    <span className="font-medium">${(bestPrice * 168).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly (~720h)</span>
                    <span className="font-medium">${(bestPrice * 720).toFixed(0)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full h-12 text-lg font-semibold"
                    disabled={!isAvailable}
                  >
                    {isAvailable ? "Compare Providers" : "Currently Unavailable"}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Add to Comparison
                  </Button>
                  
                  <Button variant="ghost" className="w-full text-sm">
                    Set Price Alert
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <div>No setup fees • Pay per hour • Cancel anytime</div>
                  <div className="text-green-600 font-medium">Best price from {availableProviders.length} providers</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernGpuHero;
