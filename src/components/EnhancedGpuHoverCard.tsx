
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { MapPin, Zap, Clock, Shield } from "lucide-react";
import MinimalPriceSparkline from "./MinimalPriceSparkline";

interface EnhancedGpuHoverCardProps {
  gpu: any;
  position: { x: number; y: number };
  onClose: () => void;
}

const EnhancedGpuHoverCard = ({ gpu, position, onClose }: EnhancedGpuHoverCardProps) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [priceChange, setPriceChange] = useState(0);

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
  }, [gpu]);

  // Smart positioning with edge detection
  const getDialogPosition = () => {
    const dialogWidth = 280;
    const dialogHeight = 240;
    const padding = 16;
    
    let left = position.x + 15;
    let top = position.y - 120;
    
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

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none"
      onClick={onClose}
    >
      <Card 
        className="absolute w-70 bg-white/98 backdrop-blur-sm border border-gray-200 shadow-xl animate-in fade-in-0 zoom-in-95 duration-150 pointer-events-auto"
        style={{
          left: dialogPosition.left,
          top: dialogPosition.top,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-4 space-y-4">
          {/* Minimal Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-base truncate">
                {gpu.gpu_name || 'GPU'}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="outline"
                  className={gpu.rentable !== false ? "border-green-200 text-green-700 bg-green-50" : "border-red-200 text-red-700 bg-red-50"}
                >
                  {gpu.rentable !== false ? "Live" : "Offline"}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                ${(gpu.dph_total || 1.0).toFixed(3)}/hr
              </div>
            </div>
          </div>

          {/* Minimal Price Sparkline */}
          <MinimalPriceSparkline 
            data={priceHistory} 
            change={priceChange}
          />

          {/* Essential Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-blue-500" />
              <div>
                <div className="font-medium text-gray-900">{Math.round((gpu.reliability2 || gpu.reliability || 0) * 100)}%</div>
                <div className="text-xs text-gray-500">Uptime</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-green-500" />
              <div>
                <div className="font-medium text-gray-900 truncate">{gpu.datacenter?.split('(')[0] || "Unknown"}</div>
                <div className="text-xs text-gray-500">Location</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <div className="font-medium text-gray-900">{gpu.num_gpus || 1}x</div>
                <div className="text-xs text-gray-500">GPUs</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-purple-500" />
              <div>
                <div className="font-medium text-gray-900">{gpu.gpu_ram || 24}GB</div>
                <div className="text-xs text-gray-500">VRAM</div>
              </div>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg space-y-1">
            <div className="flex justify-between">
              <span>CPU:</span>
              <span className="font-medium">{gpu.cpu_cores || 16} cores</span>
            </div>
            <div className="flex justify-between">
              <span>RAM:</span>
              <span className="font-medium">{gpu.cpu_ram || 32}GB</span>
            </div>
            <div className="flex justify-between">
              <span>Storage:</span>
              <span className="font-medium">{gpu.disk_space || 500}GB</span>
            </div>
          </div>

          {/* Minimal Action */}
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
            disabled={gpu.rentable === false}
            size="sm"
          >
            {gpu.rentable === false ? 'Unavailable' : 'Rent Now'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedGpuHoverCard;
