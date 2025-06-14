
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
  Activity
} from "lucide-react";
import { useState } from "react";

interface GpuHoverDialogProps {
  gpu: any;
  position: { x: number; y: number };
  onClose: () => void;
}

const GpuHoverDialog = ({ gpu, position, onClose }: GpuHoverDialogProps) => {
  const [rentDuration, setRentDuration] = useState([24]); // hours
  
  const calculatePrice = (hours: number) => {
    const hourlyRate = gpu.dph_total || 1.0;
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

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card 
        className="absolute w-[480px] bg-card/95 backdrop-blur border-border shadow-2xl"
        style={{
          left: Math.min(position.x, window.innerWidth - 500),
          top: Math.min(position.y, window.innerHeight - 600),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-bold">{gpu.gpu_name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {gpu.num_gpus}x GPU • {gpu.gpu_ram}GB VRAM
              </p>
            </div>
            <Badge className={gpu.rentable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {gpu.rentable ? "Available" : "Unavailable"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Pricing Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-semibold">Pricing</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">${gpu.dph_total?.toFixed(3)}/hour</div>
                <div className="text-sm text-muted-foreground">Total: ${calculatePrice(rentDuration[0])}</div>
              </div>
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

          {/* Location */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Location</span>
            </div>
            <div className="text-right">
              <div className="font-medium">{gpu.datacenter || "Unknown"}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Activity className="h-3 w-3" />
                ~15ms latency
              </div>
            </div>
          </div>

          {/* Performance Chart */}
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
              <div className="font-medium">{gpu.cpu_cores}</div>
            </div>
            <div>
              <div className="text-muted-foreground">RAM</div>
              <div className="font-medium">{gpu.cpu_ram}GB</div>
            </div>
            <div>
              <div className="text-muted-foreground">Storage</div>
              <div className="font-medium">{gpu.disk_space}GB</div>
            </div>
            <div>
              <div className="text-muted-foreground">Reliability</div>
              <div className="font-medium flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                {Math.round((gpu.reliability2 || 0) * 100)}%
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" disabled={!gpu.rentable}>
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
