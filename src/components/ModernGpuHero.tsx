
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Zap, Cpu, HardDrive, Wifi, TrendingUp, TrendingDown, Star, Users, Bell, Heart, Share2, ExternalLink } from "lucide-react";
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
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      label: "CPU Cores",
      value: `${gpu.cpu_cores || 16}`,
      icon: Cpu,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      label: "RAM",
      value: `${gpu.cpu_ram || 64}GB`,
      icon: HardDrive,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      label: "Network",
      value: gpu.inet_down || "10Gbps",
      icon: Wifi,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20"
    }
  ];

  const reliability = Math.round((gpu.reliability2 || gpu.reliability || 0.85) * 100);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              {/* Status & Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} 
                     aria-label={isAvailable ? "Available" : "Unavailable"} />
                <Badge variant={isAvailable ? "default" : "destructive"} className="text-xs font-medium">
                  {isAvailable ? "Available Now" : "Currently Rented"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  High Performance
                </Badge>
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {availableProviders.length} Providers
                </Badge>
              </div>
              
              {/* Title & Location */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  {gpu.gpu_name}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{gpu.datacenter || gpu.country || 'Global'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-4 w-4" />
                    <span>{reliability}% Uptime</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8/5 Rating</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                  <Heart className="h-3 w-3 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                  <Bell className="h-3 w-3 mr-1" />
                  Alert
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <Card className="p-4 border border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Key Specifications</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {keyMetrics.map((metric) => (
                  <div key={metric.label} className={`p-3 rounded-lg border border-border/30 ${metric.bgColor}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <metric.icon className={`h-4 w-4 ${metric.color}`} />
                      <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
                    </div>
                    <div className="text-lg font-bold">{metric.value}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Provider Grid */}
            <Card className="p-4 border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Available Providers</h3>
                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-primary">
                  View All
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableProviders.slice(0, 4).map((provider) => (
                  <div key={provider.id} className="p-3 border border-border/30 rounded-lg bg-background/50 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="text-center space-y-1">
                      <div className="text-xl mb-1">{provider.logo}</div>
                      <div className="text-xs font-medium truncate">{provider.name}</div>
                      <div className="text-xs font-bold text-primary">
                        ${provider.pricing.find(p => p.gpuModel.includes('A100'))?.hourly.toFixed(2) || 'N/A'}/hr
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Overview */}
            <Card className="p-4 border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-muted-foreground">Performance Overview</h3>
                <span className="text-xl font-bold text-primary">{reliability}%</span>
              </div>
              <Progress value={reliability} className="h-2 mb-4" />
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Gaming</div>
                  <div className="font-semibold text-green-600">Excellent</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">AI/ML</div>
                  <div className="font-semibold text-blue-600">Outstanding</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Rendering</div>
                  <div className="font-semibold text-purple-600">Very Good</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-4">
            <Card className="p-6 border border-border/50 bg-card/80 backdrop-blur-sm sticky top-6">
              <div className="space-y-6">
                {/* Price Header */}
                <div className="text-center space-y-2">
                  <div className="text-xs text-muted-foreground">Starting from</div>
                  <div className="text-3xl font-bold text-primary">
                    ${bestPrice.toFixed(3)}
                  </div>
                  <div className="text-sm text-muted-foreground">per hour</div>
                  
                  {/* Price Trend */}
                  <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                    priceChange >= 0 
                      ? 'text-red-600 bg-red-50 dark:bg-red-950/20' 
                      : 'text-green-600 bg-green-50 dark:bg-green-950/20'
                  }`}>
                    {priceChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(priceChange).toFixed(1)}% vs last week
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 py-4 border-y border-border/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily (~24h)</span>
                    <span className="font-semibold">${(bestPrice * 24).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Weekly (~168h)</span>
                    <span className="font-semibold">${(bestPrice * 168).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly (~720h)</span>
                    <span className="font-semibold">${(bestPrice * 720).toFixed(0)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full h-10 font-semibold"
                    disabled={!isAvailable}
                  >
                    {isAvailable ? "Compare Providers" : "Currently Unavailable"}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Add to Compare
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Price Alert
                    </Button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="text-center space-y-2 pt-4 border-t border-border/30">
                  <div className="text-xs text-muted-foreground">
                    No setup fees • Pay per hour • Cancel anytime
                  </div>
                  <div className="text-xs font-medium text-primary">
                    Best price from {availableProviders.length} trusted providers
                  </div>
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
