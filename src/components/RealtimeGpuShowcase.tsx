
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, MapPin, Cpu, HardDrive, Activity } from "lucide-react";
import { Link } from "react-router-dom";

interface GpuOffer {
  id: string;
  model: string;
  vram: string;
  location: string;
  price: number;
  status: 'online' | 'busy' | 'queue';
  cores: number;
  provider: string;
  availability: number;
}

const RealtimeGpuShowcase = () => {
  const [gpuOffers, setGpuOffers] = useState<GpuOffer[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock real-time GPU data
  useEffect(() => {
    const mockOffers: GpuOffer[] = [
      {
        id: '1',
        model: 'RTX 4090',
        vram: '24GB',
        location: 'US-East',
        price: 0.89,
        status: 'online',
        cores: 16384,
        provider: 'CloudGPU',
        availability: 98
      },
      {
        id: '2',
        model: 'A100 80GB',
        vram: '80GB',
        location: 'EU-West',
        price: 2.45,
        status: 'online',
        cores: 6912,
        provider: 'AICompute',
        availability: 95
      },
      {
        id: '3',
        model: 'H100',
        vram: '80GB',
        location: 'US-West',
        price: 3.21,
        status: 'busy',
        cores: 14592,
        provider: 'TensorCloud',
        availability: 87
      },
      {
        id: '4',
        model: 'RTX 3090',
        vram: '24GB',
        location: 'Asia-East',
        price: 0.65,
        status: 'online',
        cores: 10496,
        provider: 'FastGPU',
        availability: 92
      },
      {
        id: '5',
        model: 'V100',
        vram: '32GB',
        location: 'EU-Central',
        price: 1.89,
        status: 'queue',
        cores: 5120,
        provider: 'MLCloud',
        availability: 76
      },
      {
        id: '6',
        model: 'RTX 4080',
        vram: '16GB',
        location: 'US-Central',
        price: 0.72,
        status: 'online',
        cores: 9728,
        provider: 'QuickGPU',
        availability: 94
      }
    ];

    setGpuOffers(mockOffers);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setGpuOffers(prev => prev.map(gpu => ({
        ...gpu,
        price: gpu.price + (Math.random() - 0.5) * 0.1,
        availability: Math.max(70, Math.min(99, gpu.availability + (Math.random() - 0.5) * 5)),
        status: Math.random() > 0.8 ? 
          (['online', 'busy', 'queue'] as const)[Math.floor(Math.random() * 3)] : 
          gpu.status
      })));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-amber-500';
      case 'queue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'busy': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      case 'queue': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`w-2 h-2 ${getStatusColor('online')} rounded-full animate-pulse`}></div>
            <span className="text-sm text-green-600 font-medium">Live Market Data</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Available GPUs Right Now
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light mb-2">
            Real-time inventory from our global network of providers. Deploy in under 30 seconds.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {gpuOffers.map((gpu) => (
            <Card key={gpu.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/30">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{gpu.model}</h3>
                    <p className="text-sm text-muted-foreground">{gpu.provider}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-3 h-3 ${getStatusColor(gpu.status)} rounded-full ${
                        gpu.status === 'online' ? 'animate-pulse' : ''
                      }`}
                    ></div>
                    <Badge className={getStatusBadge(gpu.status)}>
                      {gpu.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-primary" />
                      <span>VRAM:</span>
                    </div>
                    <span className="font-medium">{gpu.vram}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-primary" />
                      <span>Cores:</span>
                    </div>
                    <span className="font-medium">{gpu.cores.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Location:</span>
                    </div>
                    <span className="font-medium">{gpu.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      <span>Uptime:</span>
                    </div>
                    <span className="font-medium">{gpu.availability.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      ${gpu.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">/hour</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                    disabled={gpu.status !== 'online'}
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Deploy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/marketplace">
            <Button size="lg" variant="outline" className="bg-background/50 backdrop-blur-sm border-border/40 hover:bg-muted/50 hover:border-primary/50 transition-all duration-200">
              View All Available GPUs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RealtimeGpuShowcase;
