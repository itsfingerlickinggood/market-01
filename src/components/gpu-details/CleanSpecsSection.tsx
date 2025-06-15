
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CleanSpecsSectionProps {
  gpu: any;
  enhancedData: any;
}

const CleanSpecsSection = ({ gpu, enhancedData }: CleanSpecsSectionProps) => {
  const provider = enhancedData?.provider;

  const specs = [
    { label: "GPU", value: gpu.gpu_name },
    { label: "VRAM", value: `${gpu.gpu_ram || 24}GB` },
    { label: "CPU Cores", value: gpu.cpu_cores || 16 },
    { label: "CPU Model", value: gpu.cpu_name || "Not specified" },
    { label: "System RAM", value: `${gpu.cpu_ram || 64}GB` },
    { label: "Storage", value: `${gpu.disk_space || 100}GB` },
    { label: "Network Down", value: gpu.inet_down || "10Gbps" },
    { label: "Network Up", value: gpu.inet_up || "10Gbps" },
    { label: "Location", value: enhancedData?.location || "Global" },
    { label: "Datacenter", value: gpu.datacenter || "Tier 3" }
  ];

  const capabilities = provider?.capabilities || ['CUDA', 'Docker', 'SSH'];
  const frameworks = provider?.frameworks || ['PyTorch', 'TensorFlow'];
  const osTemplates = provider?.osTemplates || ['Ubuntu 20.04', 'PyTorch'];

  return (
    <div className="space-y-3">
      {/* Hardware Specifications */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Hardware Specifications</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {specs.map((spec, index) => (
              <div key={index} className="flex justify-between py-1 border-b border-border/30 last:border-0">
                <span className="text-muted-foreground">{spec.label}</span>
                <span className="font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Software & Capabilities */}
      <div className="grid md:grid-cols-3 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Capabilities</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1 text-xs">
              {capabilities.map((cap: string, index: number) => (
                <div key={index} className="py-1">{cap}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">ML Frameworks</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1 text-xs">
              {frameworks.map((framework: string, index: number) => (
                <div key={index} className="py-1">{framework}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">OS Templates</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1 text-xs">
              {osTemplates.map((os: string, index: number) => (
                <div key={index} className="py-1">{os}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CleanSpecsSection;
