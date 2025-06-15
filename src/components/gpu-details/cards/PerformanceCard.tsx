
import SupabaseGpuCard from "../SupabaseGpuCard";
import { BarChart3 } from "lucide-react";

interface PerformanceCardProps {
  gpu: any;
}

const PerformanceCard = ({ gpu }: PerformanceCardProps) => {
  const content = (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Reliability Score</span>
        <span className="font-semibold text-foreground">{Math.round((gpu.reliability2 || gpu.reliability || 0.9) * 100)}%</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-primary/10 rounded">
          <div className="font-bold text-primary">A+</div>
          <div className="text-xs text-muted-foreground">AI/ML</div>
        </div>
        <div className="text-center p-2 bg-primary/10 rounded">
          <div className="font-bold text-primary">A</div>
          <div className="text-xs text-muted-foreground">Training</div>
        </div>
        <div className="text-center p-2 bg-primary/10 rounded">
          <div className="font-bold text-primary">A</div>
          <div className="text-xs text-muted-foreground">Inference</div>
        </div>
      </div>
      <div className="pt-2 border-t border-border">
        <div className="text-sm text-muted-foreground">Memory Bandwidth</div>
        <div className="font-semibold text-foreground">{gpu.memory_bandwidth || '935'} GB/s</div>
      </div>
    </div>
  );

  return (
    <SupabaseGpuCard
      title="Performance Metrics"
      description="Benchmarks and real-world performance data"
      icon={BarChart3}
      content={content}
      action="View Benchmarks"
    />
  );
};

export default PerformanceCard;
