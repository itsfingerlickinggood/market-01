
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Zap, Clock, Star, Monitor, Cpu, HardDrive, Wifi, DollarSign } from "lucide-react";

interface CompactGpuHeaderProps {
  gpu: any;
}

const CompactGpuHeader = ({ gpu }: CompactGpuHeaderProps) => {
  const performanceScore = Math.round((gpu.reliability2 || 0.75) * 100);
  const isRented = !gpu.rentable || gpu.rented;

  return (
    <div className="bg-gradient-to-br from-background via-primary/3 to-primary/8 border-b border-border/50">
      <div className="container mx-auto px-4 py-6">
        {/* GPU Title and Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                {gpu.gpu_name}
              </h1>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <Badge 
              className={`px-3 py-1 font-medium shadow-lg ${
                isRented 
                  ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300' 
                  : 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300'
              }`}
            >
              {isRented ? 'Currently Rented' : 'Available Now'}
            </Badge>
          </div>
          
          {/* Enhanced Category Tags */}
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 shadow-sm">
              <Monitor className="h-3 w-3 mr-1" />
              Gaming
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 shadow-sm">
              <Zap className="h-3 w-3 mr-1" />
              AI/ML
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 shadow-sm">
              <Star className="h-3 w-3 mr-1" />
              High-end
            </Badge>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-xl font-bold text-green-700">${(gpu.dph_total || 1.0).toFixed(3)}</div>
              <div className="text-xs text-green-600 font-medium">per hour</div>
            </CardContent>
          </Card>
          
          <Card className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Monitor className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-blue-700">{gpu.gpu_ram}GB</div>
              <div className="text-xs text-blue-600 font-medium">VRAM</div>
            </CardContent>
          </Card>
          
          <Card className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="text-xl font-bold text-emerald-700">{performanceScore}%</div>
              <div className="text-xs text-emerald-600 font-medium">Performance</div>
            </CardContent>
          </Card>
          
          <Card className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Cpu className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-xl font-bold text-orange-700">{gpu.cpu_cores}</div>
              <div className="text-xs text-orange-600 font-medium">CPU Cores</div>
            </CardContent>
          </Card>
          
          <Card className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <HardDrive className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-xl font-bold text-purple-700">{gpu.cpu_ram}GB</div>
              <div className="text-xs text-purple-600 font-medium">RAM</div>
            </CardContent>
          </Card>
          
          <Card className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <HardDrive className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-xl font-bold text-red-700">{gpu.disk_space}GB</div>
              <div className="text-xs text-red-600 font-medium">Storage</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Info and Actions */}
        <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border/20">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">{gpu.datacenter || gpu.country || 'Global'}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 rounded-full">
              <Star className="h-4 w-4 text-yellow-600" />
              <span className="font-medium text-yellow-800">{performanceScore}% Reliability</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">Setup: ~2-5 min</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full">
              <Wifi className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-purple-800">{gpu.inet_down || '1Gbps'} Network</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              size="sm" 
              disabled={isRented}
              className={`px-6 py-2 font-medium shadow-lg transition-all duration-300 ${
                isRented 
                  ? 'bg-gray-200 text-gray-500' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105'
              }`}
            >
              {isRented ? "Currently Rented" : "Rent Now"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="px-6 py-2 font-medium shadow-lg hover:bg-primary/10 border-primary/20 hover:scale-105 transition-all duration-300"
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
