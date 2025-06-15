
interface GpuCardQuickSpecsProps {
  gpu: any;
}

const GpuCardQuickSpecs = ({ gpu }: GpuCardQuickSpecsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="flex justify-between">
        <span className="text-muted-foreground">CPU:</span>
        <span className="font-medium">{gpu.cpu_cores || 16} cores</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">RAM:</span>
        <span className="font-medium">{gpu.cpu_ram || 32}GB</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Storage:</span>
        <span className="font-medium">{gpu.disk_space || 500}GB</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Network:</span>
        <span className="font-medium">{gpu.inet_down || '1Gbps'}</span>
      </div>
    </div>
  );
};

export default GpuCardQuickSpecs;
