
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { 
  Cpu, 
  TrendingUp,
  TrendingDown,
  Heart,
  BarChart3,
  Star,
  Shield
} from "lucide-react";
import { getTierColor } from "@/utils/tierColors";

interface GpuRental {
  id: number;
  company: string;
  companyLogo: string;
  model: string;
  tier: string;
  provider: string;
  providerColor: string;
  providerIcon: string;
  currentPrice: number;
  priceChange: string;
  trend: "up" | "down";
  vram: string;
  availability: string;
  utilization: number;
  reliability: number;
  priceHistory: Array<{ hour: number; price: number }>;
  location: string;
  setupTime: string;
  lastRented: string;
  performanceScore: number;
  trustScore: number;
}

interface GpuRentalCardProps {
  gpu: GpuRental;
}

const GpuRentalCard = ({ gpu }: GpuRentalCardProps) => {
  const TrendIcon = gpu.trend === 'up' ? TrendingUp : TrendingDown;
  
  return (
    <Card 
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
};

export default GpuRentalCard;
