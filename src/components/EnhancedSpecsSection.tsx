
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Monitor, Cpu, HardDrive, Wifi, Shield, Award } from "lucide-react";

interface EnhancedSpecsSectionProps {
  gpu: any;
}

const EnhancedSpecsSection = ({ gpu }: EnhancedSpecsSectionProps) => {
  const performanceMetrics = [
    { name: "Gaming", score: 92, color: "bg-blue-500" },
    { name: "AI/ML Training", score: 88, color: "bg-green-500" },
    { name: "3D Rendering", score: 85, color: "bg-purple-500" },
    { name: "Video Editing", score: 90, color: "bg-orange-500" },
    { name: "Mining", score: 75, color: "bg-yellow-500" }
  ];

  const useCases = [
    { name: "Deep Learning", compatibility: 95, frameworks: ["TensorFlow", "PyTorch", "JAX"] },
    { name: "Game Development", compatibility: 88, frameworks: ["Unity", "Unreal", "Godot"] },
    { name: "Video Production", compatibility: 92, frameworks: ["Premiere", "DaVinci", "Blender"] },
    { name: "Scientific Computing", compatibility: 85, frameworks: ["CUDA", "OpenCL", "Jupyter"] }
  ];

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
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Performance Benchmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{metric.name}</span>
                      <span className="text-sm font-bold">{metric.score}/100</span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Performance Score</span>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round((gpu.reliability2 || 0.85) * 100)}/100
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on industry benchmarks and real-world testing
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">Display Support</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>• Up to 4x 8K displays @ 60Hz</div>
                  <div>• HDR10+ and Dolby Vision</div>
                  <div>• Hardware AV1 encoding/decoding</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="specs" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="compatibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Use Case Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {useCases.map((useCase) => (
                  <div key={useCase.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{useCase.name}</span>
                      <span className="text-sm font-bold">{useCase.compatibility}% Compatible</span>
                    </div>
                    <Progress value={useCase.compatibility} className="h-2" />
                    <div className="flex flex-wrap gap-2">
                      {useCase.frameworks.map((framework) => (
                        <Badge key={framework} variant="secondary" className="text-xs">
                          {framework}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Secure Boot</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Memory Encryption</span>
                  <Badge className="bg-green-100 text-green-800">AES-256</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Network Isolation</span>
                  <Badge className="bg-green-100 text-green-800">VPC</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data at Rest</span>
                  <Badge className="bg-green-100 text-green-800">Encrypted</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-blue-500" />
                  Network & Connectivity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bandwidth:</span>
                  <span className="font-medium">{gpu.inet_down || '10Gbps'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="font-medium">~15ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime SLA:</span>
                  <span className="font-medium">99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">DDoS Protection:</span>
                  <span className="font-medium">Included</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSpecsSection;
