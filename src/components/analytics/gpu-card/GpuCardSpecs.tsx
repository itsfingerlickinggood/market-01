
interface GpuCardSpecsProps {
  vram: string;
  setupTime: string;
  location: string;
  utilization: number;
}

const GpuCardSpecs = ({ vram, setupTime, location, utilization }: GpuCardSpecsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">VRAM:</span>
        <span className="font-medium">{vram}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Setup:</span>
        <span className="font-medium">{setupTime}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Location:</span>
        <span className="font-medium">{location}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Usage:</span>
        <span className="font-medium">{utilization}%</span>
      </div>
    </div>
  );
};

export default GpuCardSpecs;
