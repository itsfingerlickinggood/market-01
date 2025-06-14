
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Bell, Share2, Zap, Clock, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface GpuHeroSectionProps {
  gpu: any;
}

const GpuHeroSection = ({ gpu }: GpuHeroSectionProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasAlert, setHasAlert] = useState(false);

  const performanceScore = Math.round((gpu.reliability2 || 0.75) * 100);
  const isRented = !gpu.rentable || gpu.rented;

  // Generate price comparison data for different platforms
  const generatePriceData = () => {
    const basePrice = gpu.dph_total || 1.0;
    return [
      { platform: 'Vast.ai', price: basePrice, status: 'available' },
      { platform: 'RunPod', price: basePrice * 1.1, status: 'available' },
      { platform: 'Lambda', price: basePrice * 1.2, status: 'limited' },
      { platform: 'Paperspace', price: basePrice * 1.15, status: 'available' },
      { platform: 'CoreWeave', price: basePrice * 0.9, status: 'unavailable' },
      { platform: 'AWS EC2', price: basePrice * 1.5, status: 'available' }
    ];
  };

  const priceData = generatePriceData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary">${payload[0].value.toFixed(3)}/hour</p>
          <p className="text-sm text-muted-foreground capitalize">{payload[0].payload.status}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,163,74,0.1),transparent_70%)]" />
      </div>
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold">{gpu.gpu_name}</h1>
            <Badge className={isRented ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}>
              {isRented ? 'Rented' : 'Available'}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            {gpu.num_gpus}x GPU • Professional Grade • {gpu.hostname || 'Enterprise Server'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Price Comparison Chart */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Price Comparison Across Platforms</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <XAxis 
                        dataKey="platform" 
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={60}
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

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{performanceScore}%</div>
                  <div className="text-xs text-muted-foreground">Performance</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">{gpu.gpu_ram}GB</div>
                  <div className="text-xs text-muted-foreground">VRAM</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">{gpu.cpu_cores}</div>
                  <div className="text-xs text-muted-foreground">CPU Cores</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* GPU Info & Actions */}
          <div className="space-y-6">
            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <div className="font-semibold">{gpu.datacenter || gpu.country || 'Global'}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Reliability</span>
                  </div>
                  <div className="font-semibold">{performanceScore}% Uptime</div>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Card */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-muted-foreground">Starting at</div>
                    <div className="text-3xl font-bold">${(gpu.dph_total || 1.0).toFixed(3)}/hour</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Monthly est.</div>
                    <div className="text-xl font-semibold">${((gpu.dph_total || 1.0) * 24 * 30).toFixed(0)}</div>
                  </div>
                </div>
                
                <div className="flex gap-3 mb-4">
                  <Button 
                    className="flex-1" 
                    disabled={isRented}
                    size="lg"
                  >
                    {isRented ? "Currently Rented" : "Rent Now"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setHasAlert(!hasAlert)}
                  >
                    <Bell className={`h-4 w-4 ${hasAlert ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Setup: ~2-5 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    <span>Network: {gpu.inet_down || '1Gbps'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GpuHeroSection;
