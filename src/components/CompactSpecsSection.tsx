
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
    { name: "Gaming", score: 92, color: "bg-blue-500" },
    { name: "AI/ML", score: 88, color: "bg-green-500" },
    { name: "Rendering", score: 85, color: "bg-purple-500" },
    { name: "Mining", score: 75, color: "bg-yellow-500" }
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
    <div className="space-y-4">
      {/* Performance Section */}
      <Card className="shadow-sm border border-border/50">
        <Collapsible 
          open={openSections.includes('performance')}
          onOpenChange={() => toggleSection('performance')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-accent/50 transition-colors rounded-t-lg">
              <CardTitle className="text-lg font-semibold flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span>Performance</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  openSections.includes('performance') ? 'rotate-180' : ''
                }`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-6 pt-0 space-y-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-sm ${metric.color}`}></div>
                      <span className="font-medium text-foreground">{metric.name}</span>
                    </div>
                    <span className="font-bold text-foreground">{metric.score}%</span>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* GPU Specs Section */}
      <Card className="shadow-sm border border-border/50">
        <Collapsible 
          open={openSections.includes('gpu')}
          onOpenChange={() => toggleSection('gpu')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-accent/50 transition-colors rounded-t-lg">
              <CardTitle className="text-lg font-semibold flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>GPU Specifications</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  openSections.includes('gpu') ? 'rotate-180' : ''
                }`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-6 pt-0 space-y-3">
              {Object.entries(gpuSpecs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground font-medium">{key}:</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* System Specs Section */}
      <Card className="shadow-sm border border-border/50">
        <Collapsible 
          open={openSections.includes('system')}
          onOpenChange={() => toggleSection('system')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-accent/50 transition-colors rounded-t-lg">
              <CardTitle className="text-lg font-semibold flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-blue-500" />
                  <span>System Config</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  openSections.includes('system') ? 'rotate-180' : ''
                }`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-6 pt-0 space-y-3">
              {Object.entries(systemSpecs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground font-medium">{key}:</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Quick Features */}
      <Card className="shadow-sm border border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">Secure Boot</Badge>
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">GPU Optimization</Badge>
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">Auto-scaling</Badge>
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">API Access</Badge>
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">VPC Network</Badge>
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">SSD Storage</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Network & Security */}
      <Card className="shadow-sm border border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-3">
            <Wifi className="h-5 w-5 text-blue-500" />
            <span>Network & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-3">
          <div className="flex items-center justify-between py-1">
            <span className="text-muted-foreground font-medium">Bandwidth:</span>
            <span className="font-semibold text-foreground">{gpu.inet_down || '10Gbps'}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-muted-foreground font-medium">Uptime SLA:</span>
            <span className="font-semibold text-foreground">99.9%</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-muted-foreground font-medium">Encryption:</span>
            <span className="font-semibold text-foreground">AES-256</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactSpecsSection;
