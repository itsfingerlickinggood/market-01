
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { MapPin, Zap, Clock, Shield, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MinimalPriceSparkline from "./MinimalPriceSparkline";

interface EnhancedGpuHoverCardProps {
  gpu: any;
  position: { x: number; y: number };
  onClose: () => void;
}

const EnhancedGpuHoverCard = ({ gpu, position, onClose }: EnhancedGpuHoverCardProps) => {
  const navigate = useNavigate();
  const [priceHistory, setPriceHistory] = useState([]);
  const [priceChange, setPriceChange] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Generate minimal price history for sparkline
    const generatePriceHistory = () => {
      const basePrice = gpu.dph_total || 1.0;
      const data = [];
      
      for (let i = 6; i >= 0; i--) {
        const variation = (Math.random() - 0.5) * 0.15;
        const price = basePrice * (1 + variation * 0.5);
        data.push({
          day: `D${7 - i}`,
          price: Number(price.toFixed(3))
        });
      }
      
      const firstPrice = data[0].price;
      const lastPrice = data[data.length - 1].price;
      const change = ((lastPrice - firstPrice) / firstPrice) * 100;
      
      setPriceHistory(data);
      setPriceChange(change);
    };

    generatePriceHistory();
    
    // Smooth entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [gpu]);

  // Smart positioning with edge detection
  const getDialogPosition = () => {
    const dialogWidth = 300;
    const dialogHeight = 280;
    const padding = 16;
    
    let left = position.x + 15;
    let top = position.y - 140;
    
    if (left + dialogWidth > window.innerWidth - padding) {
      left = position.x - dialogWidth - 15;
    }
    if (left < padding) {
      left = padding;
    }
    
    if (top + dialogHeight > window.innerHeight - padding) {
      top = window.innerHeight - dialogHeight - padding;
    }
    if (top < padding) {
      top = padding;
    }
    
    return { left, top };
  };

  const dialogPosition = getDialogPosition();
  const isPositiveTrend = priceChange >= 0;

  const handleRentNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    navigate(`/gpu/${gpu.id}`);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none"
      onClick={onClose}
    >
      <Card 
        className={`absolute w-75 bg-background/98 backdrop-blur-md border border-border shadow-2xl transition-all duration-300 pointer-events-auto ${
          isVisible ? 'animate-in fade-in-0 zoom-in-95' : 'opacity-0 scale-95'
        }`}
        style={{
          left: dialogPosition.left,
          top: dialogPosition.top,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-base truncate">
                {gpu.gpu_name || 'GPU'}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  gpu.rentable !== false ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                }`} />
                <Badge 
                  variant="outline"
                  className={`text-xs ${gpu.rentable !== false ? 
                    "border-emerald-200 text-emerald-700 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:bg-emerald-950/50" : 
                    "border-rose-200 text-rose-700 bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:bg-rose-950/50"
                  }`}
                >
                  {gpu.rentable !== false ? "Available" : "Offline"}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-foreground">
                ${(gpu.dph_total || 1.0).toFixed(3)}
              </div>
              <div className="text-xs text-muted-foreground">/hour</div>
            </div>
          </div>

          {/* Price Trend */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">7-day price trend</span>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                isPositiveTrend ? 'text-rose-600' : 'text-emerald-600'
              }`}>
                {isPositiveTrend ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(priceChange).toFixed(1)}%
              </div>
            </div>
            
            <MinimalPriceSparkline 
              data={priceHistory} 
              change={priceChange}
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-emerald-500" />
              <div>
                <div className="font-medium text-foreground">{Math.round((gpu.reliability2 || gpu.reliability || 0) * 100)}%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-500" />
              <div>
                <div className="font-medium text-foreground truncate">{gpu.datacenter?.split('(')[0] || "Unknown"}</div>
                <div className="text-xs text-muted-foreground">Location</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <div className="font-medium text-foreground">{gpu.num_gpus || 1}x</div>
                <div className="text-xs text-muted-foreground">GPUs</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-purple-500" />
              <div>
                <div className="font-medium text-foreground">{gpu.gpu_ram || 24}GB</div>
                <div className="text-xs text-muted-foreground">VRAM</div>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg space-y-1">
            <div className="flex justify-between">
              <span>CPU:</span>
              <span className="font-medium text-foreground">{gpu.cpu_cores || 16} cores</span>
            </div>
            <div className="flex justify-between">
              <span>RAM:</span>
              <span className="font-medium text-foreground">{gpu.cpu_ram || 32}GB</span>
            </div>
            <div className="flex justify-between">
              <span>Storage:</span>
              <span className="font-medium text-foreground">{gpu.disk_space || 500}GB</span>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors" 
            disabled={gpu.rentable === false}
            size="sm"
            onClick={handleRentNow}
          >
            {gpu.rentable === false ? 'Unavailable' : 'View Details & Rent'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedGpuHoverCard;
