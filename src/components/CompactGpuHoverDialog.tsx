
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, MapPin, Zap } from "lucide-react";

interface CompactGpuHoverDialogProps {
  gpu: any;
  position: { x: number; y: number };
  onClose: () => void;
}

const CompactGpuHoverDialog = ({ gpu, position, onClose }: CompactGpuHoverDialogProps) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    // Generate mini price history for the last 24 hours
    const generateMiniPriceHistory = () => {
      const basePrice = gpu.dph_total || gpu.pricing?.onDemand || 1.0;
      const data = [];
      let currentPrice = basePrice;
      
      for (let i = 23; i >= 0; i--) {
        const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
        currentPrice = basePrice * (1 + variation * 0.1);
        data.push({
          time: i,
          price: Number(currentPrice.toFixed(3))
        });
      }
      
      // Calculate price change percentage
      const firstPrice = data[0].price;
      const lastPrice = data[data.length - 1].price;
      const change = ((lastPrice - firstPrice) / firstPrice) * 100;
      
      setPriceHistory(data);
      setPriceChange(change);
    };

    generateMiniPriceHistory();
  }, [gpu]);

  // Smart positioning to avoid screen edges
  const getDialogPosition = () => {
    const dialogWidth = 320;
    const dialogHeight = 280;
    const padding = 20;
    
    let left = position.x + 10;
    let top = position.y - 140;
    
    // Adjust horizontal position
    if (left + dialogWidth > window.innerWidth - padding) {
      left = position.x - dialogWidth - 10;
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
  const isPositiveChange = priceChange >= 0;

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none"
      onClick={onClose}
    >
      <Card 
        className="absolute w-80 h-70 bg-gray-900/95 backdrop-blur-md border-gray-700 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150 pointer-events-auto"
        style={{
          left: dialogPosition.left,
          top: dialogPosition.top,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-4 space-y-3">
          {/* Header - Compact */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white text-lg truncate">
                {gpu.gpu_name || 'GPU'}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={gpu.rentable !== false ? "bg-green-100 text-green-800 text-xs" : "bg-red-100 text-red-800 text-xs"}>
                  {gpu.rentable !== false ? "Online" : "Offline"}
                </Badge>
                <span className="text-gray-400 text-xs">
                  {gpu.datacenter || gpu.location || "Unknown"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-white">
                ${(gpu.dph_total || gpu.pricing?.onDemand || 1.0).toFixed(3)}/hr
              </div>
              <div className={`flex items-center gap-1 text-xs ${isPositiveChange ? 'text-red-400' : 'text-green-400'}`}>
                {isPositiveChange ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(priceChange).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Quick Info Row */}
          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{gpu.datacenter?.split('(')[0]?.trim() || 'NYC'}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>12ms</span>
            </div>
          </div>

          {/* Small Price Graph */}
          <div className="h-24 w-full bg-gray-800/50 rounded-lg p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                  dot={false}
                  activeDot={{ r: 3, stroke: '#22c55e', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Specs */}
          <div className="text-sm text-gray-300 text-center">
            {gpu.gpu_ram || gpu.specs?.vramCapacity || 24}GB | {gpu.cpu_cores || 16}K Cores | {gpu.cpu_ram || 32}GB RAM
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              className="flex-1 h-8 text-xs" 
              disabled={gpu.rentable === false}
            >
              Rent Now
            </Button>
            <Button variant="outline" className="h-8 text-xs px-3">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactGpuHoverDialog;
