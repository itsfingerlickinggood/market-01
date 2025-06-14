
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Zap, Cpu, HardDrive, Wifi, Shield, Monitor, Server } from "lucide-react";
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
    { name: "Mining", score: 75, color: "bg-orange-500" }
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
      <Card className="shadow-xl border-0 bg-gradient-to-br from-yellow-50 to-white overflow-hidden">
        <Collapsible 
          open={openSections.includes('performance')}
          onOpenChange={() => toggleSection('performance')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-yellow-50/50 transition-colors duration-200">
              <CardTitle className="text-lg flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                    <Zap className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="font-bold">Performance Metrics</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${openSections.includes('performance') ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-4 pt-0 space-y-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.name} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{metric.score}%</span>
                      <Badge className={`${metric.color} text-white shadow-sm`}>
                        {metric.score >= 90 ? 'Excellent' : metric.score >= 80 ? 'Good' : 'Fair'}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* GPU Specs Section */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <Collapsible 
          open={openSections.includes('gpu')}
          onOpenChange={() => toggleSection('gpu')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-blue-50/50 transition-colors duration-200">
              <CardTitle className="text-lg flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Monitor className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-bold">GPU Specifications</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${openSections.includes('gpu') ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-4 pt-0">
              <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
                {Object.entries(gpuSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-muted-foreground font-medium">{key}:</span>
                    <span className="font-bold text-blue-700">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* System Specs Section */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-white overflow-hidden">
        <Collapsible 
          open={openSections.includes('system')}
          onOpenChange={() => toggleSection('system')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-purple-50/50 transition-colors duration-200">
              <CardTitle className="text-lg flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Server className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="font-bold">System Configuration</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${openSections.includes('system') ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-4 pt-0">
              <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
                {Object.entries(systemSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-muted-foreground font-medium">{key}:</span>
                    <span className="font-bold text-purple-700">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Quick Features */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <span className="font-bold">Features & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 shadow-sm">
                <Shield className="h-3 w-3 mr-1" />
                Secure Boot
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 shadow-sm">
                <Zap className="h-3 w-3 mr-1" />
                GPU Optimization
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 shadow-sm">
                <HardDrive className="h-3 w-3 mr-1" />
                Auto-scaling
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 shadow-sm">
                <Cpu className="h-3 w-3 mr-1" />
                API Access
              </Badge>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 border-indigo-200 shadow-sm">
                <Wifi className="h-3 w-3 mr-1" />
                VPC Network
              </Badge>
              <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200 shadow-sm">
                <HardDrive className="h-3 w-3 mr-1" />
                SSD Storage
              </Badge>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Bandwidth:</span>
                <span className="font-bold text-blue-700">{gpu.inet_down || '10Gbps'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Uptime SLA:</span>
                <span className="font-bold text-green-700">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Encryption:</span>
                <span className="font-bold text-purple-700">AES-256</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactSpecsSection;
