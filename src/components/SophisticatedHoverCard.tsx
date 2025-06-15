
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { MapPin, Zap, Clock, Shield, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface SophisticatedHoverCardProps {
  gpu: any;
  position: { x: number; y: number };
  onClose: () => void;
}

const SophisticatedHoverCard = ({ gpu, position, onClose }: SophisticatedHoverCardProps) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [priceChange, setPriceChange] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Generate ultra-minimal 7-day price trend
    const generatePriceTrend = () => {
      const basePrice = gpu.dph_total || 1.0;
      const data = [];
      
      for (let i = 6; i >= 0; i--) {
        const variation = (Math.random() - 0.5) * 0.12;
        const price = basePrice * (1 + variation * 0.3);
        data.push({
          day: i,
          price: Number(price.toFixed(3))
        });
      }
      
      const firstPrice = data[0].price;
      const lastPrice = data[data.length - 1].price;
      const change = ((lastPrice - firstPrice) / firstPrice) * 100;
      
      setPriceHistory(data);
      setPriceChange(change);
    };

    generatePriceTrend();
    
    // Micro bounce animation delay
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [gpu]);

  // Smart edge-aware positioning
  const getOptimalPosition = () => {
    const cardWidth = 280;
    const cardHeight = 240;
    const padding = 16;
    
    let left = position.x + 12;
    let top = position.y - 120;
    
    // Horizontal edge detection
    if (left + cardWidth > window.innerWidth - padding) {
      left = position.x - cardWidth - 12;
    }
    if (left < padding) {
      left = padding;
    }
    
    // Vertical edge detection
    if (top + cardHeight > window.innerHeight - padding) {
      top = window.innerHeight - cardHeight - padding;
    }
    if (top < padding) {
      top = padding;
    }
    
    return { left, top };
  };

  const cardPosition = getOptimalPosition();
  const isPositiveTrend = priceChange >= 0;

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none"
      onClick={onClose}
    >
      <Card 
        className={`absolute w-70 bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-2xl transition-all duration-300 pointer-events-auto ${
          isVisible ? 'animate-in fade-in-0 zoom-in-95' : 'opacity-0 scale-95'
        }`}
        style={{
          left: cardPosition.left,
          top: cardPosition.top,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-4 space-y-4">
          {/* Ultra-Minimal Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-base truncate">
                {gpu.gpu_name || 'GPU'}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  gpu.rentable !== false ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                }`} />
                <span className="text-xs text-gray-500">
                  {gpu.rentable !== false ? "Live" : "Offline"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                ${(gpu.dph_total || 1.0).toFixed(3)}/hr
              </div>
            </div>
          </div>

          {/* Micro Price Trend Graph */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">7-day trend</span>
              <div className={`flex items-center gap-1 text-xs ${
                isPositiveTrend ? 'text-rose-600' : 'text-emerald-600'
              }`}>
                {isPositiveTrend ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(priceChange).toFixed(1)}%
              </div>
            </div>
            
            <div className="h-8 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={isPositiveTrend ? "#ef4444" : "#10b981"} 
                    strokeWidth={1.5}
                    dot={false}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Essential Stats - Ghost Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-3.5 w-3.5 text-blue-500" />
              <div>
                <div className="font-medium text-gray-900 text-sm">{Math.round((gpu.reliability2 || gpu.reliability || 0) * 100)}%</div>
                <div className="text-xs text-gray-400">Uptime</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-3.5 w-3.5 text-green-500" />
              <div>
                <div className="font-medium text-gray-900 text-sm truncate">{gpu.datacenter?.split('(')[0] || "Unknown"}</div>
                <div className="text-xs text-gray-400">Location</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-3.5 w-3.5 text-orange-500" />
              <div>
                <div className="font-medium text-gray-900 text-sm">{gpu.num_gpus || 1}x</div>
                <div className="text-xs text-gray-400">GPUs</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-3.5 w-3.5 text-purple-500" />
              <div>
                <div className="font-medium text-gray-900 text-sm">{gpu.gpu_ram || 24}GB</div>
                <div className="text-xs text-gray-400">VRAM</div>
              </div>
            </div>
          </div>

          {/* Ultra-Compact Specs */}
          <div className="text-sm text-gray-500 bg-gray-50/50 p-3 rounded-lg space-y-1">
            <div className="flex justify-between">
              <span>CPU:</span>
              <span className="font-medium text-gray-700">{gpu.cpu_cores || 16} cores</span>
            </div>
            <div className="flex justify-between">
              <span>RAM:</span>
              <span className="font-medium text-gray-700">{gpu.cpu_ram || 32}GB</span>
            </div>
            <div className="flex justify-between">
              <span>Storage:</span>
              <span className="font-medium text-gray-700">{gpu.disk_space || 500}GB</span>
            </div>
          </div>

          {/* Ghost Action */}
          <Button 
            className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 text-sm h-9" 
            disabled={gpu.rentable === false}
          >
            {gpu.rentable === false ? 'Unavailable' : 'Rent Now'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SophisticatedHoverCard;
