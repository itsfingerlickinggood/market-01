
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Cpu } from "lucide-react";

interface SpecificationTablesProps {
  gpu: any;
}

const SpecificationTables = ({ gpu }: SpecificationTablesProps) => {
  const specs = {
    "GPU Memory": `${gpu.gpu_ram || 24}GB GDDR6X`,
    "Memory Bandwidth": "1008 GB/s",
    "CUDA Cores": "16,384",
    "RT Cores": "128 (3rd gen)",
    "Tensor Cores": "512 (4th gen)",
    "Base Clock": "2.2 GHz",
    "Boost Clock": "2.5 GHz",
    "Memory Speed": "21 Gbps",
    "Bus Width": "384-bit",
    "TDP": "450W"
  };

  const systemSpecs = {
    "CPU Cores": `${gpu.cpu_cores || 16} vCPUs`,
    "System RAM": `${gpu.cpu_ram || 64}GB DDR4`,
    "Storage": `${gpu.disk_space || 1000}GB NVMe SSD`,
    "Network": `${gpu.inet_down || '10Gbps'} / ${gpu.inet_up || '10Gbps'}`,
    "OS Support": "Ubuntu 20.04/22.04, Windows Server",
    "Docker": "Pre-installed with GPU support"
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            GPU Specifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-muted-foreground">{key}:</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-blue-500" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(systemSpecs).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-muted-foreground">{key}:</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecificationTables;
