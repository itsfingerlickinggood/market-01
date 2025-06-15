
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, HardDrive, MemoryStick, Zap, Network } from "lucide-react";
import { ProviderSpecs } from "@/data/providerCatalog";

interface HardwareSpecsSectionProps {
  specs: ProviderSpecs;
  gpuModel?: string;
}

const HardwareSpecsSection = ({ specs, gpuModel }: HardwareSpecsSectionProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-500" />
          Hardware Specs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* GPU Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="font-medium">GPU Configuration</span>
          </div>
          
          <div className="space-y-2 pl-4">
            <div className="flex flex-wrap gap-1 mb-2">
              {specs.gpuModels.map((model) => (
                <Badge 
                  key={model} 
                  variant={model.toLowerCase() === gpuModel?.toLowerCase() ? "default" : "outline"}
                  className="text-xs"
                >
                  NVIDIA {model}
                </Badge>
              ))}
            </div>
            
            {specs.cudaCores && (
              <div className="text-sm">
                <span className="text-muted-foreground">CUDA Cores:</span>
                <span className="ml-2 font-medium">{specs.cudaCores.toLocaleString()}</span>
              </div>
            )}
            
            {specs.tensorCores && (
              <div className="text-sm">
                <span className="text-muted-foreground">Tensor Cores:</span>
                <span className="ml-2 font-medium">{specs.tensorCores}</span>
              </div>
            )}
            
            <div className="text-sm">
              <span className="text-muted-foreground">VRAM:</span>
              <span className="ml-2 font-medium">{specs.vram}</span>
            </div>
          </div>
        </div>

        {/* CPU Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="h-4 w-4 text-orange-500" />
            <span className="font-medium">Processor</span>
          </div>
          <div className="text-sm text-muted-foreground pl-6">
            {specs.cpu}
          </div>
        </div>

        {/* Memory Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MemoryStick className="h-4 w-4 text-green-500" />
            <span className="font-medium">System Memory</span>
          </div>
          <div className="text-sm text-muted-foreground pl-6">
            {specs.systemRam}
          </div>
        </div>

        {/* Storage Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="h-4 w-4 text-purple-500" />
            <span className="font-medium">Storage</span>
          </div>
          <div className="text-sm text-muted-foreground pl-6">
            {specs.storage}
          </div>
        </div>

        {/* Network Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Network className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Network</span>
          </div>
          <div className="space-y-1 pl-6 text-sm">
            <div>
              <span className="text-muted-foreground">Download:</span>
              <span className="ml-2 font-medium">{specs.networkSpeed.download}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Upload:</span>
              <span className="ml-2 font-medium">{specs.networkSpeed.upload}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HardwareSpecsSection;
