
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, HardDrive, Wifi, Zap } from "lucide-react";

interface ProviderSpecsSectionProps {
  gpu: any;
  enhancedData: any;
}

const ProviderSpecsSection = ({ gpu, enhancedData }: ProviderSpecsSectionProps) => {
  const provider = enhancedData.provider;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Provider Infrastructure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hardware Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-muted-foreground">Compute Specifications</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">GPU Model:</span>
                  <span className="font-medium">{gpu.gpu_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">GPU Memory:</span>
                  <span className="font-medium">{gpu.gpu_ram || 24}GB VRAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">CPU Cores:</span>
                  <span className="font-medium">{gpu.cpu_cores || 16} cores</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">System RAM:</span>
                  <span className="font-medium">{gpu.cpu_ram || 64}GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Storage:</span>
                  <span className="font-medium">{gpu.disk_space || 500}GB NVMe</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-muted-foreground">Network & Location</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Location:</span>
                  <span className="font-medium">{enhancedData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Network Speed:</span>
                  <span className="font-medium">{gpu.inet_down || '10Gbps'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Upload Speed:</span>
                  <span className="font-medium">{gpu.inet_up || '10Gbps'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Data Center Tier:</span>
                  <span className="font-medium">Tier {provider.dcTier || 3}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Provider-Specific Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-muted-foreground">Provider Capabilities</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {provider.capabilities?.map((capability: string, index: number) => (
                <Badge key={index} variant="outline" className="justify-center">
                  {capability}
                </Badge>
              ))}
            </div>
          </div>

          {/* Pre-installed Software */}
          <div className="space-y-4">
            <h4 className="font-semibold text-muted-foreground">Pre-installed Software</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="text-sm font-medium">AI/ML Frameworks</h5>
                <div className="flex flex-wrap gap-1">
                  {provider.frameworks?.map((framework: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {framework}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Development Tools</h5>
                <div className="flex flex-wrap gap-1">
                  {provider.tools?.map((tool: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderSpecsSection;
