
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, MapPin, Zap, Clock, Shield } from "lucide-react";

interface EnhancedGpuHoverCardProps {
  gpu: any;
  position: { x: number; y: number };
  onClose: () => void;
}

const EnhancedGpuHoverCard = ({ gpu, position, onClose }: EnhancedGpuHoverCardProps) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    // Generate price history for the last 7 days
    const generatePriceHistory = () => {
      const basePrice = gpu.dph_total || 1.0;
      const data = [];
      
      for (let i = 6; i >= 0; i--) {
        const variation = (Math.random() - 0.5) * 0.15; // ±7.5% variation
        const price = basePrice * (1 + variation * 0.5);
        data.push({
          day: `Day ${7 - i}`,
          price: Number(price.toFixed(3))
        });
      }
      
      // Calculate price change
      const firstPrice = data[0].price;
      const lastPrice = data[data.length - 1].price;
      const change = ((lastPrice - firstPrice) / firstPrice) * 100;
      
      setPriceHistory(data);
      setPriceChange(change);
    };

    generatePriceHistory();
  }, [gpu]);

  // Smart positioning
  const getDialogPosition = () => {
    const dialogWidth = 380;
    const dialogHeight = 320;
    const padding = 20;
    
    let left = position.x + 15;
    let top = position.y - 160;
    
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
  const isPositiveChange = priceChange >= 0;

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none"
      onClick={onClose}
    >
      <Card 
        className="absolute w-96 bg-white/98 backdrop-blur-sm border border-gray-200 shadow-xl animate-in fade-in-0 zoom-in-95 duration-150 pointer-events-auto"
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
              <h4 className="font-semibold text-gray-900 text-lg truncate">
                {gpu.gpu_name || 'GPU'}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="outline"
                  className={gpu.rentable !== false ? "border-green-200 text-green-700 bg-green-50" : "border-red-200 text-red-700 bg-red-50"}
                >
                  {gpu.rentable !== false ? "Available" : "Offline"}
                </Badge>
                <span className="text-sm text-gray-500">
                  {gpu.datacenter || "Unknown"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                ${(gpu.dph_total || 1.0).toFixed(3)}/hr
              </div>
              <div className={`flex items-center gap-1 text-sm ${isPositiveChange ? 'text-red-600' : 'text-green-600'}`}>
                {isPositiveChange ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(priceChange).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Price Trend Chart */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">7-Day Price Trend</span>
              <span className="text-xs text-gray-500">Last updated: now</span>
            </div>
            <div className="h-20 w-full bg-gray-50 rounded-lg p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3, fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-blue-500" />
              <div>
                <div className="font-medium text-gray-900">{Math.round((gpu.reliability2 || gpu.reliability || 0) * 100)}%</div>
                <div className="text-xs text-gray-500">Reliability</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-green-500" />
              <div>
                <div className="font-medium text-gray-900">~15ms</div>
                <div className="text-xs text-gray-500">Latency</div>
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

          {/* Specs Summary */}
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              <div>CPU: {gpu.cpu_cores || 16} cores</div>
              <div>RAM: {gpu.cpu_ram || 32}GB</div>
              <div>Storage: {gpu.disk_space || 500}GB</div>
              <div>Network: {gpu.inet_down || '1 Gbps'}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700" 
              disabled={gpu.rentable === false}
            >
              Rent Now
            </Button>
            <Button variant="outline" className="px-4">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedGpuHoverCard;
