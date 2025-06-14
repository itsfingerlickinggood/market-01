
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Zap, Cpu, HardDrive, Wifi, Shield } from "lucide-react";
import { useState } from "react";

interface CompactSpecsSectionProps {
  gpu: any;
}

const CompactSpecsSection = ({ gpu }: CompactSpecsSectionProps) => {
  const [openSections, setOpenSections] = useState<string[]>(['performance']);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const performanceMetrics = [
    { name: "Gaming", score: 92 },
    { name: "AI/ML", score: 88 },
    { name: "Rendering", score: 85 },
    { name: "Mining", score: 75 }
  ];

  const gpuSpecs = {
    "GPU Memory": `${gpu.gpu_ram || 24}GB`,
    "CUDA Cores": "16,384",
    "RT Cores": "128",
    "Tensor Cores": "512",
    "Base Clock": "2.2 GHz",
    "TDP": "450W"
  };

  const systemSpecs = {
    "CPU Cores": `${gpu.cpu_cores || 16} vCPUs`,
    "System RAM": `${gpu.cpu_ram || 64}GB`,
    "Storage": `${gpu.disk_space || 1000}GB SSD`,
    "Network": `${gpu.inet_down || '10Gbps'}`,
    "OS": "Ubuntu 20.04/22.04",
    "Docker": "Pre-installed"
  };

  return (
    <div className="space-y-3">
      {/* Performance Section */}
      <Card>
        <Collapsible 
          open={openSections.includes('performance')}
          onOpenChange={() => toggleSection('performance')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-2 cursor-pointer">
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Performance
                </div>
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-3 pt-0 space-y-2">
              {performanceMetrics.map((metric) => (
                <div key={metric.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{metric.name}</span>
                    <span className="font-medium">{metric.score}%</span>
                  </div>
                  <Progress value={metric.score} className="h-1" />
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* GPU Specs Section */}
      <Card>
        <Collapsible 
          open={openSections.includes('gpu')}
          onOpenChange={() => toggleSection('gpu')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-2 cursor-pointer">
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  GPU Specifications
                </div>
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-3 pt-0 space-y-2">
              {Object.entries(gpuSpecs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* System Specs Section */}
      <Card>
        <Collapsible 
          open={openSections.includes('system')}
          onOpenChange={() => toggleSection('system')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-2 cursor-pointer">
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-500" />
                  System Config
                </div>
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-3 pt-0 space-y-2">
              {Object.entries(systemSpecs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Quick Features */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-500" />
            Features
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">Secure Boot</Badge>
            <Badge variant="secondary" className="text-xs">GPU Optimization</Badge>
            <Badge variant="secondary" className="text-xs">Auto-scaling</Badge>
            <Badge variant="secondary" className="text-xs">API Access</Badge>
            <Badge variant="secondary" className="text-xs">VPC Network</Badge>
            <Badge variant="secondary" className="text-xs">SSD Storage</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Network & Security */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Wifi className="h-4 w-4 text-blue-500" />
            Network & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bandwidth:</span>
            <span className="font-medium">{gpu.inet_down || '10Gbps'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Uptime SLA:</span>
            <span className="font-medium">99.9%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Encryption:</span>
            <span className="font-medium">AES-256</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactSpecsSection;
