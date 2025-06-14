
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  DollarSign, 
  MapPin, 
  Zap, 
  Clock, 
  Star, 
  Heart,
  ExternalLink,
  Activity,
  TrendingUp,
  TrendingDown,
  Thermometer
} from "lucide-react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface GpuHoverDialogProps {
  gpu: any;
  position: { x: number; y: number };
  onClose: () => void;
}

const GpuHoverDialog = ({ gpu, position, onClose }: GpuHoverDialogProps) => {
  const [rentDuration, setRentDuration] = useState([24]);
  const [realtimeData, setRealtimeData] = useState({
    utilization: 0,
    temperature: 0,
    priceChange: 0
  });

  // Generate realistic price history data
  const generatePriceHistory = () => {
    const basePrice = gpu.dph_total || gpu.pricing?.onDemand || 1.0;
    const data = [];
    let currentPrice = basePrice;
    
    for (let i = 23; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
      currentPrice = basePrice * (1 + variation * 0.1);
      data.push({
        time: `${String(new Date().getHours() - i).padStart(2, '0')}:00`,
        price: Number(currentPrice.toFixed(3)),
        hour: i
      });
    }
    return data;
  };

  const [priceHistory] = useState(generatePriceHistory());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData({
        utilization: Math.random() * 100,
        temperature: 45 + Math.random() * 30,
        priceChange: (Math.random() - 0.5) * 20
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const calculatePrice = (hours: number) => {
    const hourlyRate = gpu.dph_total || gpu.pricing?.onDemand || 1.0;
    const dailyDiscount = hours >= 24 ? 0.1 : 0;
    const weeklyDiscount = hours >= 168 ? 0.2 : 0;
    const monthlyDiscount = hours >= 720 ? 0.3 : 0;
    
    const maxDiscount = Math.max(dailyDiscount, weeklyDiscount, monthlyDiscount);
    return (hourlyRate * hours * (1 - maxDiscount)).toFixed(2);
  };

  const performanceData = [
    { metric: "Gaming", value: 85 },
    { metric: "AI/ML", value: 92 },
    { metric: "Rendering", value: 88 },
    { metric: "Mining", value: 76 }
  ];

  // Smart positioning to avoid screen edges
  const getDialogPosition = () => {
    const dialogWidth = 500;
    const dialogHeight = 700;
    const padding = 20;
    
    let left = position.x;
    let top = position.y;
    
    // Adjust horizontal position
    if (left + dialogWidth > window.innerWidth - padding) {
      left = window.innerWidth - dialogWidth - padding;
    }
    if (left < padding) {
      left = padding;
    }
    
    // Adjust vertical position
    if (top + dialogHeight > window.innerHeight - padding) {
      top = window.innerHeight - dialogHeight - padding;
    }
    if (top < padding) {
      top = padding;
    }
    
    return { left, top };
  };

  const dialogPosition = getDialogPosition();

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card 
        className="absolute w-[500px] bg-card/98 backdrop-blur-md border-border shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
        style={{
          left: dialogPosition.left,
          top: dialogPosition.top,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-bold">{gpu.gpu_name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {gpu.num_gpus || 1}x GPU • {gpu.gpu_ram || gpu.specs?.vramCapacity}GB VRAM
              </p>
            </div>
            <Badge className={gpu.rentable !== false ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {gpu.rentable !== false ? "Available" : "Unavailable"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Real-time Pricing Section with Live Chart */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-semibold">Live Pricing</span>
                {realtimeData.priceChange !== 0 && (
                  <div className={`flex items-center gap-1 text-xs ${realtimeData.priceChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {realtimeData.priceChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(realtimeData.priceChange).toFixed(1)}%
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">${(gpu.dph_total || gpu.pricing?.onDemand || 1.0).toFixed(3)}/hour</div>
                <div className="text-sm text-muted-foreground">Total: ${calculatePrice(rentDuration[0])}</div>
              </div>
            </div>
            
            {/* Live Price Chart */}
            <div className="h-24 w-full bg-muted/30 rounded-lg p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <XAxis 
                    dataKey="time" 
                    fontSize={10}
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Price']}
                    labelFormatter={(label) => `Time: ${label}`}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Duration Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Duration: {rentDuration[0]} hours</span>
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
          </div>

          {/* Real-time Performance Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Real-time Performance</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground">GPU Utilization</div>
                <div className="text-lg font-semibold">{realtimeData.utilization.toFixed(1)}%</div>
                <Progress value={realtimeData.utilization} className="h-1 mt-1" />
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Thermometer className="h-3 w-3" />
                  Temperature
                </div>
                <div className="text-lg font-semibold">{realtimeData.temperature.toFixed(0)}°C</div>
                <Progress 
                  value={(realtimeData.temperature - 30) / 50 * 100} 
                  className="h-1 mt-1" 
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Location</span>
            </div>
            <div className="text-right">
              <div className="font-medium">{gpu.datacenter || gpu.location || "Unknown"}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Activity className="h-3 w-3" />
                ~15ms latency
              </div>
            </div>
          </div>

          {/* Performance Benchmarks */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-600" />
              <span className="font-medium">Performance Benchmarks</span>
            </div>
            <div className="space-y-2">
              {performanceData.map((item) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.metric}</span>
                  <div className="flex items-center gap-2 w-32">
                    <Progress value={item.value} className="flex-1" />
                    <span className="text-sm font-medium w-8">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Server Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">CPU Cores</div>
              <div className="font-medium">{gpu.cpu_cores || 8}</div>
            </div>
            <div>
              <div className="text-muted-foreground">RAM</div>
              <div className="font-medium">{gpu.cpu_ram || 32}GB</div>
            </div>
            <div>
              <div className="text-muted-foreground">Storage</div>
              <div className="font-medium">{gpu.disk_space || 500}GB</div>
            </div>
            <div>
              <div className="text-muted-foreground">Reliability</div>
              <div className="font-medium flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                {Math.round((gpu.reliability2 || gpu.reliability || 0.95) * 100)}%
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" disabled={gpu.rentable === false}>
              <Clock className="h-4 w-4 mr-2" />
              Rent Now
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GpuHoverDialog;
