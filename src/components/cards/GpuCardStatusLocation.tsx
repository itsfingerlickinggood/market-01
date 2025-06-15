
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap } from "lucide-react";

interface GpuCardStatusLocationProps {
  gpu: any;
}

const GpuCardStatusLocation = ({ gpu }: GpuCardStatusLocationProps) => {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <Badge 
          variant={gpu.rentable !== false ? "default" : "destructive"}
          className="text-xs px-2 py-0.5"
        >
          {gpu.rentable !== false ? "Available" : "Rented"}
        </Badge>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate">
            {(gpu.datacenter || "Unknown").split('(')[0].trim()}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-1 text-muted-foreground">
        <Zap className="h-3 w-3 text-green-500" />
        <span>{Math.round((gpu.reliability2 || gpu.reliability || 0) * 100)}%</span>
      </div>
    </div>
  );
};

export default GpuCardStatusLocation;
