
import SupabaseGpuCard from "../SupabaseGpuCard";
import { Cpu } from "lucide-react";

interface HardwareSpecsCardProps {
  gpu: any;
}

const HardwareSpecsCard = ({ gpu }: HardwareSpecsCardProps) => {
  const content = (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">GPU Memory</div>
          <div className="font-semibold text-lg text-foreground">{gpu.gpu_ram || 24}GB</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">CPU Cores</div>
          <div className="font-semibold text-lg text-foreground">{gpu.cpu_cores || 16}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">System RAM</div>
          <div className="font-medium text-foreground">{gpu.cpu_ram || 64}GB</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Storage</div>
          <div className="font-medium text-foreground">{gpu.disk_space || 500}GB SSD</div>
        </div>
      </div>
      <div className="pt-2 border-t border-border">
        <div className="text-sm text-muted-foreground mb-2">CUDA Cores</div>
        <div className="font-medium text-foreground">{gpu.cuda_cores || '10,752'}</div>
      </div>
    </div>
  );

  return (
    <SupabaseGpuCard
      title="Hardware Specifications"
      description="Complete technical specifications and capabilities"
      icon={Cpu}
      content={content}
      action="View Full Specs"
      highlight={true}
    />
  );
};

export default HardwareSpecsCard;
