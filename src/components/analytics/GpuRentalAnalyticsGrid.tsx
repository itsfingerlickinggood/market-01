
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from "recharts";
import { 
  Cpu, 
  Building2, 
  Server,
  DollarSign, 
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  MapPin,
  Zap,
  Heart,
  BarChart3,
  Star,
  Shield,
  Sparkles
} from "lucide-react";

const GpuRentalAnalyticsGrid = () => {
  const generatePriceHistory = () => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      price: 2.5 + Math.sin(i * 0.3) * 0.8 + Math.random() * 0.4
    }));
  };

  const gpuRentals = [
    {
      id: 1,
      company: "NVIDIA",
      companyLogo: "🟢",
      model: "RTX 4090",
      tier: "High-End",
      provider: "RunPod",
      providerColor: "#6366F1",
      providerIcon: "🚀",
      currentPrice: 2.89,
      priceChange: "+12%",
      trend: "up" as const,
      vram: "24GB",
      availability: "available",
      utilization: 87,
      reliability: 95,
      priceHistory: generatePriceHistory(),
      location: "US West",
      setupTime: "2 min",
      lastRented: "5 min ago",
      performanceScore: 92,
      trustScore: 4.8
    },
    {
      id: 2,
      company: "NVIDIA", 
      companyLogo: "🟢",
      model: "A100 80GB",
      tier: "Enterprise",
      provider: "AWS EC2",
      providerColor: "#FF9900",
      providerIcon: "☁️",
      currentPrice: 4.99,
      priceChange: "-5%",
      trend: "down" as const,
      vram: "80GB",
      availability: "limited",
      utilization: 94,
      reliability: 99,
      priceHistory: generatePriceHistory(),
      location: "US East",
      setupTime: "8 min",
      lastRented: "12 min ago",
      performanceScore: 98,
      trustScore: 4.9
    },
    {
      id: 3,
      company: "NVIDIA",
      companyLogo: "🟢",
      model: "H100 80GB", 
      tier: "Enterprise",
      provider: "Google Cloud",
      providerColor: "#4285F4",
      providerIcon: "🌐",
      currentPrice: 8.99,
      priceChange: "+24%",
      trend: "up" as const,
      vram: "80GB",
      availability: "available",
      utilization: 91,
      reliability: 97,
      priceHistory: generatePriceHistory(),
      location: "EU West",
      setupTime: "5 min",
      lastRented: "3 min ago",
      performanceScore: 100,
      trustScore: 4.7
    },
    {
      id: 4,
      company: "NVIDIA",
      companyLogo: "🟢",
      model: "RTX 4080",
      tier: "High-End",
      provider: "Vast.ai",
      providerColor: "#10B981",
      providerIcon: "⚡",
      currentPrice: 1.89,
      priceChange: "+8%",
      trend: "up" as const,
      vram: "16GB",
      availability: "available",
      utilization: 76,
      reliability: 88,
      priceHistory: generatePriceHistory(),
      location: "Global",
      setupTime: "1 min",
      lastRented: "8 min ago",
      performanceScore: 85,
      trustScore: 4.3
    },
    {
      id: 5,
      company: "NVIDIA",
      companyLogo: "🟢",
      model: "RTX 3090",
      tier: "Mid-Range",
      provider: "Paperspace",
      providerColor: "#8B5CF6",
      providerIcon: "📄",
      currentPrice: 1.69,
      priceChange: "-3%",
      trend: "down" as const,
      vram: "24GB",
      availability: "available", 
      utilization: 68,
      reliability: 92,
      priceHistory: generatePriceHistory(),
      location: "US East",
      setupTime: "30 sec",
      lastRented: "15 min ago",
      performanceScore: 78,
      trustScore: 4.5
    },
    {
      id: 6,
      company: "NVIDIA",
      companyLogo: "🟢",
      model: "V100 32GB",
      tier: "Professional",
      provider: "Lambda Labs",
      providerColor: "#F59E0B",
      providerIcon: "λ",
      currentPrice: 2.49,
      priceChange: "+15%",
      trend: "up" as const,
      vram: "32GB",
      availability: "limited",
      utilization: 82,
      reliability: 94,
      priceHistory: generatePriceHistory(),
      location: "US West",
      setupTime: "2 min",
      lastRented: "7 min ago",
      performanceScore: 88,
      trustScore: 4.6
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Enterprise": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "High-End": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Professional": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Mid-Range": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            GPU Rental Market
          </h2>
          <p className="text-muted-foreground text-lg">Real-time pricing and availability across providers</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            <Activity className="h-3 w-3 mr-1 animate-pulse" />
            Live Data
          </Badge>
          <Badge variant="outline" className="border-primary/20 text-primary">
            <Sparkles className="h-3 w-3 mr-1" />
            6 Providers
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gpuRentals.map((gpu) => {
          const TrendIcon = gpu.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card 
              key={gpu.id}
              className="group relative overflow-hidden bg-gradient-to-br from-card/95 via-card/98 to-card backdrop-blur-xl border-border/60 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Gradient overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

              <CardHeader className="pb-4 relative z-10">
                {/* Company & Provider Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{gpu.companyLogo}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-foreground">{gpu.company}</h3>
                        <Badge className={`text-xs px-2 py-0.5 border ${getTierColor(gpu.tier)}`}>
                          {gpu.tier}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{gpu.model}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
                      <Heart className="h-4 w-4 text-gray-400 hover:text-pink-500 transition-colors" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
                      <BarChart3 className="h-4 w-4 text-gray-400 hover:text-blue-500 transition-colors" />
                    </Button>
                  </div>
                </div>

                {/* Provider Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-lg">{gpu.providerIcon}</div>
                    <Badge 
                      variant="outline" 
                      className="font-semibold px-3 py-1 border-2"
                      style={{ 
                        borderColor: gpu.providerColor + '40', 
                        backgroundColor: gpu.providerColor + '10',
                        color: gpu.providerColor 
                      }}
                    >
                      {gpu.provider}
                    </Badge>
                  </div>
                  
                  <div className={`w-3 h-3 rounded-full ${
                    gpu.availability === 'available' ? "bg-green-500 animate-pulse shadow-lg shadow-green-500/50" : "bg-orange-400 shadow-lg shadow-orange-400/50"
                  }`} />
                </div>
              </CardHeader>

              <CardContent className="space-y-4 relative z-10">
                {/* Price Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">${gpu.currentPrice.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">/hr</span>
                  </div>
                  
                  <div className="h-12 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={gpu.priceHistory}>
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke={gpu.providerColor}
                          fill={gpu.providerColor}
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Performance & Trust Scores */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Cpu className="h-3 w-3" />
                        Performance
                      </span>
                      <span className="font-medium">{gpu.performanceScore}%</span>
                    </div>
                    <Progress value={gpu.performanceScore} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Trust
                      </span>
                      <span className="font-medium">{gpu.trustScore}/5</span>
                    </div>
                    <Progress value={(gpu.trustScore / 5) * 100} className="h-2" />
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">VRAM:</span>
                    <span className="font-medium">{gpu.vram}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Setup:</span>
                    <span className="font-medium">{gpu.setupTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{gpu.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Usage:</span>
                    <span className="font-medium">{gpu.utilization}%</span>
                  </div>
                </div>

                {/* Price Change & Actions */}
                <div className="flex items-center justify-between pt-2">
                  <Badge 
                    variant="secondary" 
                    className={`flex items-center gap-1 ${
                      gpu.trend === 'up' 
                        ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                        : 'text-red-600 bg-red-100 dark:bg-red-900/20'
                    }`}
                  >
                    <TrendIcon className="h-3 w-3" />
                    {gpu.priceChange}
                  </Badge>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Compare
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="h-7 text-xs bg-primary hover:bg-primary/90"
                      disabled={gpu.availability !== 'available'}
                    >
                      {gpu.availability === 'available' ? 'Rent Now' : 'Limited'}
                    </Button>
                  </div>
                </div>

                {/* Reliability Indicator */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border/30">
                  <Shield className="h-3 w-3 text-green-500" />
                  <span>{gpu.reliability}% uptime</span>
                  <span>•</span>
                  <span>Last rented {gpu.lastRented}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GpuRentalAnalyticsGrid;
