
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Zap, Clock, Star } from "lucide-react";

interface CompactGpuHeaderProps {
  gpu: any;
}

const CompactGpuHeader = ({ gpu }: CompactGpuHeaderProps) => {
  const performanceScore = Math.round((gpu.reliability2 || 0.75) * 100);
  const isRented = !gpu.rentable || gpu.rented;

  return (
    <div className="bg-gradient-to-r from-background to-primary/5 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        {/* GPU Title and Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{gpu.gpu_name}</h1>
            <Badge className={isRented ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}>
              {isRented ? 'Rented' : 'Available'}
            </Badge>
          </div>
          
          {/* Category Tags */}
          <div className="flex gap-1">
            <Badge variant="secondary" className="text-xs">Gaming</Badge>
            <Badge variant="secondary" className="text-xs">AI/ML</Badge>
            <Badge variant="secondary" className="text-xs">High-end</Badge>
          </div>
        </div>

        {/* Key Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
          <Card className="bg-card/50">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary">${(gpu.dph_total || 1.0).toFixed(3)}</div>
              <div className="text-xs text-muted-foreground">per hour</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-500">{gpu.gpu_ram}GB</div>
              <div className="text-xs text-muted-foreground">VRAM</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-500">{performanceScore}%</div>
              <div className="text-xs text-muted-foreground">Performance</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-orange-500">{gpu.cpu_cores}</div>
              <div className="text-xs text-muted-foreground">CPU Cores</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-purple-500">{gpu.cpu_ram}GB</div>
              <div className="text-xs text-muted-foreground">RAM</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-red-500">{gpu.disk_space}GB</div>
              <div className="text-xs text-muted-foreground">Storage</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Info Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{gpu.datacenter || gpu.country || 'Global'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span>{performanceScore}% Reliability</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Setup: ~2-5 min</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span>{gpu.inet_down || '1Gbps'} Network</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" disabled={isRented}>
              {isRented ? "Rented" : "Rent Now"}
            </Button>
            <Button variant="outline" size="sm">
              Compare
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactGpuHeader;
