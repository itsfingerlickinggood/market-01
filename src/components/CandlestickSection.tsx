
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UltraMinimalGpuCard from "./UltraMinimalGpuCard";
import MicroCandlestickChart from "./MicroCandlestickChart";

const CandlestickSection = () => {
  const [featuredGpus] = useState([
    { 
      id: '1', 
      gpu_name: 'RTX 4090', 
      dph_total: 2.45, 
      datacenter: 'NYC-East', 
      num_gpus: 1, 
      rentable: true,
      reliability: 0.98,
      gpu_ram: 24
    },
    { 
      id: '2', 
      gpu_name: 'A100 80GB', 
      dph_total: 3.12, 
      datacenter: 'AWS US-West', 
      num_gpus: 1, 
      rentable: true,
      reliability: 0.99,
      gpu_ram: 80
    },
    { 
      id: '3', 
      gpu_name: 'RTX 3090', 
      dph_total: 1.89, 
      datacenter: 'EU-Central', 
      num_gpus: 1, 
      rentable: true,
      reliability: 0.95,
      gpu_ram: 24
    },
    { 
      id: '4', 
      gpu_name: 'H100', 
      dph_total: 3.89, 
      datacenter: 'Google Cloud', 
      num_gpus: 1, 
      rentable: false,
      reliability: 0.99,
      gpu_ram: 80
    },
    { 
      id: '5', 
      gpu_name: 'RTX 4080', 
      dph_total: 1.76, 
      datacenter: 'Lambda Labs', 
      num_gpus: 1, 
      rentable: true,
      reliability: 0.97,
      gpu_ram: 16
    },
    { 
      id: '6', 
      gpu_name: 'RTX 3080', 
      dph_total: 1.23, 
      datacenter: 'Paperspace', 
      num_gpus: 1, 
      rentable: true,
      reliability: 0.94,
      gpu_ram: 10
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredGpu, setHoveredGpu] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000); // Update every 5 seconds for "live" feel

    return () => clearInterval(interval);
  }, []);

  const handleGpuHover = (offer: any, e: React.MouseEvent) => {
    setHoveredGpu(offer);
  };

  const handleGpuLeave = () => {
    setHoveredGpu(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Handle mouse move for hover card positioning
  };

  return (
    <div className="mb-12">
      {/* Live Market Banner */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-600">Live Market Data</span>
          <Badge variant="outline" className="text-xs">
            Updated {currentTime.toLocaleTimeString()}
          </Badge>
        </div>
        <h3 className="text-3xl font-semibold mb-4">GPU Price Trends</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real-time Japanese candlestick charts showing 7-day price movements across all providers
        </p>
      </div>

      {/* Featured Market Overview */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-background via-background to-primary/5 border border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-medium">Market Overview</span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Range: $0.00 - $4.00/hr</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-2 bg-emerald-500 rounded-sm"></div>
                  <span>Bullish</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-2 bg-rose-500 rounded-sm"></div>
                  <span>Bearish</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1">156</div>
                <div className="text-sm text-muted-foreground">GPUs Trending Up</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">$1.87</div>
                <div className="text-sm text-muted-foreground">Average Price/Hour</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">94%</div>
                <div className="text-sm text-muted-foreground">Market Availability</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Featured GPUs Grid with Embedded Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredGpus.map((gpu) => (
          <UltraMinimalGpuCard
            key={gpu.id}
            offer={gpu}
            onHover={handleGpuHover}
            onLeave={handleGpuLeave}
            onMouseMove={handleMouseMove}
            viewMode="grid"
          />
        ))}
      </div>

      {/* Market Insights */}
      <div className="mt-8 text-center">
        <div className="bg-muted/30 rounded-lg p-6 max-w-4xl mx-auto">
          <h4 className="text-lg font-medium mb-3">Market Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-background/50 rounded-lg p-4">
              <div className="font-medium text-emerald-600 mb-1">↗ 15% Price Increase</div>
              <div className="text-muted-foreground">High-end GPUs seeing demand surge</div>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <div className="font-medium text-blue-600 mb-1">🔥 Hot Deals Available</div>
              <div className="text-muted-foreground">Mid-range GPUs under $2.00/hour</div>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <div className="font-medium text-purple-600 mb-1">⚡ Peak Hours</div>
              <div className="text-muted-foreground">Best pricing 2-6 AM UTC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandlestickSection;
