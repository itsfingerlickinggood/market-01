
import { Button } from "@/components/ui/button";
import { Heart, BarChart3 } from "lucide-react";

interface GpuCardHeaderProps {
  gpu: any;
  isHovered: boolean;
}

const GpuCardHeader = ({ gpu, isHovered }: GpuCardHeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-2 h-2 rounded-full ${
            gpu.rentable !== false ? "bg-green-500 animate-pulse" : "bg-red-400"
          }`} />
          <h3 className="font-semibold text-sm truncate">{gpu.gpu_name}</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          {gpu.num_gpus || 1}x GPU • {gpu.gpu_ram || 24}GB VRAM
        </p>
      </div>
      
      {/* Quick Actions - only show when not hovered */}
      {!isHovered && (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="h-3 w-3 text-gray-400 hover:text-pink-500" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <BarChart3 className="h-3 w-3 text-gray-400 hover:text-blue-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default GpuCardHeader;
