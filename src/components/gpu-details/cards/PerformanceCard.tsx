
import SupabaseGpuCard from "../SupabaseGpuCard";
import { BarChart3 } from "lucide-react";

interface PerformanceCardProps {
  gpu: any;
}

const PerformanceCard = ({ gpu }: PerformanceCardProps) => {
  const content = (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Reliability Score</span>
        <span className="font-semibold">{Math.round((gpu.reliability2 || gpu.reliability || 0.9) * 100)}%</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="font-bold text-blue-700">A+</div>
          <div className="text-xs text-gray-600">AI/ML</div>
        </div>
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="font-bold text-green-700">A</div>
          <div className="text-xs text-gray-600">Training</div>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded">
          <div className="font-bold text-purple-700">A</div>
          <div className="text-xs text-gray-600">Inference</div>
        </div>
      </div>
      <div className="pt-2 border-t">
        <div className="text-sm text-gray-600">Memory Bandwidth</div>
        <div className="font-semibold">{gpu.memory_bandwidth || '935'} GB/s</div>
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
