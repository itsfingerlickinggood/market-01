
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
    <div className="bg-gradient-to-r from-background via-background to-primary/5 border-b border-border">
      <div className="container mx-auto px-6 py-6">
        {/* GPU Title and Status - Improved alignment */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight">{gpu.gpu_name}</h1>
            <Badge className={`px-3 py-1 font-medium ${isRented ? 'bg-red-100 text-red-800 border-red-200' : 'bg-green-100 text-green-800 border-green-200'}`}>
              {isRented ? 'Rented' : 'Available'}
            </Badge>
          </div>
          
          {/* Category Tags - Better spacing */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-2 py-1 text-xs font-medium">Gaming</Badge>
            <Badge variant="secondary" className="px-2 py-1 text-xs font-medium">AI/ML</Badge>
            <Badge variant="secondary" className="px-2 py-1 text-xs font-medium">High-end</Badge>
          </div>
        </div>

        {/* Key Stats Row - Consistent alignment and spacing */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-card to-card/50 shadow-sm border border-border/50 hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-primary" />
                <div className="text-xl font-bold text-primary">${(gpu.dph_total || 1.0).toFixed(3)}</div>
              </div>
              <div className="text-xs text-muted-foreground font-medium">per hour</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/50 shadow-sm border border-border/50 hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-4 w-4 bg-blue-500 rounded-sm"></div>
                <div className="text-xl font-bold text-blue-500">{gpu.gpu_ram}GB</div>
              </div>
              <div className="text-xs text-muted-foreground font-medium">VRAM</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/50 shadow-sm border border-border/50 hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="h-4 w-4 text-green-500" />
                <div className="text-xl font-bold text-green-500">{performanceScore}%</div>
              </div>
              <div className="text-xs text-muted-foreground font-medium">Performance</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/50 shadow-sm border border-border/50 hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-4 w-4 bg-orange-500 rounded-sm"></div>
                <div className="text-xl font-bold text-orange-500">{gpu.cpu_cores}</div>
              </div>
              <div className="text-xs text-muted-foreground font-medium">CPU Cores</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/50 shadow-sm border border-border/50 hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-4 w-4 bg-purple-500 rounded-sm"></div>
                <div className="text-xl font-bold text-purple-500">{gpu.cpu_ram}GB</div>
              </div>
              <div className="text-xs text-muted-foreground font-medium">RAM</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/50 shadow-sm border border-border/50 hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-4 w-4 bg-red-500 rounded-sm"></div>
                <div className="text-xl font-bold text-red-500">{gpu.disk_space}GB</div>
              </div>
              <div className="text-xs text-muted-foreground font-medium">Storage</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Info Row - Better alignment and spacing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{gpu.datacenter || gpu.country || 'Global'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium text-foreground">{performanceScore}% Reliability</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Setup: ~2-5 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{gpu.inet_down || '1Gbps'} Network</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              disabled={isRented}
              className="px-6 py-2 font-medium shadow-sm"
            >
              {isRented ? "Rented" : "Rent Now"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="px-4 py-2 font-medium shadow-sm"
            >
              Compare
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactGpuHeader;
