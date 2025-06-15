
import { Progress } from "@/components/ui/progress";
import { Cpu, Star } from "lucide-react";

interface GpuCardMetricsProps {
  performanceScore: number;
  trustScore: number;
}

const GpuCardMetrics = ({ performanceScore, trustScore }: GpuCardMetricsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <Cpu className="h-3 w-3" />
            Performance
          </span>
          <span className="font-medium">{performanceScore}%</span>
        </div>
        <Progress value={performanceScore} className="h-2" />
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <Star className="h-3 w-3" />
            Trust
          </span>
          <span className="font-medium">{trustScore}/5</span>
        </div>
        <Progress value={(trustScore / 5) * 100} className="h-2" />
      </div>
    </div>
  );
};

export default GpuCardMetrics;
