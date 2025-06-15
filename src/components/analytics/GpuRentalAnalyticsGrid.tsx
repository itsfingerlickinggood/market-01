
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts";
import { 
  Cpu, 
  Building2, 
  Server,
  DollarSign, 
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye,
  Zap,
  Heart,
  BarChart3
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
      model: "RTX 4090",
      provider: "RunPod",
      providerColor: "#6366F1",
      currentPrice: "$2.89",
      priceChange: "+12%",
      trend: "up" as const,
      vram: "24GB",
      availability: "available",
      utilization: 87,
      priceHistory: generatePriceHistory(),
      location: "US West",
      setupTime: "2 min",
      lastRented: "5 min ago"
    },
    {
      id: 2,
      company: "NVIDIA", 
      model: "A100 80GB",
      provider: "AWS EC2",
      providerColor: "#FF9900",
      currentPrice: "$4.99",
      priceChange: "-5%",
      trend: "down" as const,
      vram: "80GB",
      availability: "limited",
      utilization: 94,
      priceHistory: generatePriceHistory(),
      location: "US East",
      setupTime: "8 min",
      lastRented: "12 min ago"
    },
    {
      id: 3,
      company: "NVIDIA",
      model: "H100 80GB", 
      provider: "Google Cloud",
      providerColor: "#4285F4",
      currentPrice: "$8.99",
      priceChange: "+24%",
      trend: "up" as const,
      vram: "80GB",
      availability: "available",
      utilization: 91,
      priceHistory: generatePriceHistory(),
      location: "EU West",
      setupTime: "5 min",
      lastRented: "3 min ago"
    },
    {
      id: 4,
      company: "NVIDIA",
      model: "RTX 4080",
      provider: "Vast.ai",
      providerColor: "#10B981",
      currentPrice: "$1.89",
      priceChange: "+8%",
      trend: "up" as const,
      vram: "16GB",
      availability: "available",
      utilization: 76,
      priceHistory: generatePriceHistory(),
      location: "Global",
      setupTime: "1 min",
      lastRented: "8 min ago"
    },
    {
      id: 5,
      company: "NVIDIA",
      model: "RTX 3090",
      provider: "Paperspace",
      providerColor: "#8B5CF6",
      currentPrice: "$1.69",
      priceChange: "-3%",
      trend: "down" as const,
      vram: "24GB",
      availability: "available", 
      utilization: 68,
      priceHistory: generatePriceHistory(),
      location: "US East",
      setupTime: "30 sec",
      lastRented: "15 min ago"
    },
    {
      id: 6,
      company: "NVIDIA",
      model: "V100 32GB",
      provider: "Lambda Labs",
      providerColor: "#F59E0B",
      currentPrice: "$2.49",
      priceChange: "+15%",
      trend: "up" as const,
      vram: "32GB",
      availability: "limited",
      utilization: 82,
      priceHistory: generatePriceHistory(),
      location: "US West",
      setupTime: "2 min",
      lastRented: "7 min ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">GPU Rental Market</h2>
          <p className="text-muted-foreground">Real-time pricing and availability across providers</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gpuRentals.map((gpu) => {
          const TrendIcon = gpu.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card 
              key={gpu.id}
              className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm border-border/60 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${
                        gpu.availability === 'available' ? "bg-green-500 animate-pulse" : "bg-orange-400"
                      }`} />
                      <Badge 
                        variant="outline" 
                        className="text-xs px-2 py-0"
                        style={{ borderColor: gpu.providerColor, color: gpu.providerColor }}
                      >
                        {gpu.provider}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{gpu.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{gpu.model}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{gpu.vram} VRAM</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Heart className="h-3 w-3 text-gray-400 hover:text-pink-500" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <BarChart3 className="h-3 w-3 text-gray-400 hover:text-blue-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price Section */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">{gpu.currentPrice}</span>
                    <span className="text-sm text-muted-foreground ml-1">/hr</span>
                  </div>
                  
                  <div className="h-12 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={gpu.priceHistory}>
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke={gpu.providerColor}
                          fill={gpu.providerColor}
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{gpu.setupTime}</span>
                  </div>
                  
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
                </div>

                {/* Utilization */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className="font-medium">{gpu.utilization}%</span>
                  </div>
                  <Progress value={gpu.utilization} className="h-2" />
                </div>

                {/* Location & Last Rented */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{gpu.location}</span>
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
