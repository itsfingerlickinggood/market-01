
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Zap, Cpu, HardDrive, Wifi, Shield, Monitor } from "lucide-react";
import { useState } from "react";

interface ModernSpecsSectionProps {
  gpu: any;
  detailed?: boolean;
}

const ModernSpecsSection = ({ gpu, detailed = false }: ModernSpecsSectionProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(detailed ? ['performance', 'gpu', 'system'] : ['performance']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const performanceScores = [
    { name: "Gaming Performance", score: 94, color: "bg-blue-500", description: "4K gaming, high FPS" },
    { name: "AI/ML Training", score: 92, color: "bg-green-500", description: "Deep learning, neural networks" },
    { name: "3D Rendering", score: 88, color: "bg-purple-500", description: "Blender, Maya, 3ds Max" },
    { name: "Cryptocurrency Mining", score: 76, color: "bg-yellow-500", description: "Ethereum, Bitcoin mining" },
    { name: "Video Encoding", score: 91, color: "bg-red-500", description: "H.264, H.265, AV1" },
    { name: "Scientific Computing", score: 89, color: "bg-indigo-500", description: "CUDA, OpenCL workloads" }
  ];

  const specifications = {
    gpu: {
      icon: Monitor,
      title: "GPU Specifications",
      color: "text-blue-500",
      specs: {
        "GPU Memory": `${gpu.gpu_ram || 24}GB GDDR6X`,
        "Memory Bus": "384-bit",
        "CUDA Cores": "16,384",
        "RT Cores": "128 (3rd Gen)",
        "Tensor Cores": "512 (4th Gen)",
        "Base Clock": "2,230 MHz",
        "Boost Clock": "2,520 MHz",
        "Memory Bandwidth": "1,008 GB/s",
        "TDP": "450W",
        "Architecture": "Ada Lovelace"
      }
    },
    system: {
      icon: Cpu,
      title: "System Configuration",
      color: "text-green-500",
      specs: {
        "CPU": `${gpu.cpu_cores || 16} vCPU cores`,
        "CPU Model": "Intel Xeon E5-2690 v3",
        "System RAM": `${gpu.cpu_ram || 64}GB DDR4`,
        "Storage": `${gpu.disk_space || 1000}GB NVMe SSD`,
        "Storage Type": "PCIe 4.0 NVMe",
        "Read Speed": "7,000 MB/s",
        "Write Speed": "6,500 MB/s",
        "Operating System": "Ubuntu 22.04 LTS",
        "Docker": "Pre-installed",
        "NVIDIA Drivers": "Latest"
      }
    },
    network: {
      icon: Wifi,
      title: "Network & Connectivity",
      color: "text-purple-500",
      specs: {
        "Bandwidth": `${gpu.inet_down || '10Gbps'} down / 1Gbps up`,
        "Network Type": "Dedicated Fiber",
        "Latency": "< 5ms (regional)",
        "IPv4/IPv6": "Dual Stack",
        "DDoS Protection": "Included",
        "VPC Support": "Yes",
        "Load Balancer": "Available",
        "CDN Integration": "CloudFlare",
        "Firewall": "Configurable",
        "VPN Access": "WireGuard, OpenVPN"
      }
    },
    security: {
      icon: Shield,
      title: "Security & Compliance",
      color: "text-red-500",
      specs: {
        "Encryption": "AES-256 at rest",
        "Transit Encryption": "TLS 1.3",
        "Secure Boot": "Enabled",
        "TPM": "2.0",
        "Compliance": "SOC 2 Type II",
        "Monitoring": "24/7 SOC",
        "Backup": "Automated daily",
        "Access Control": "RBAC",
        "Audit Logs": "Complete trail",
        "Vulnerability Scanning": "Weekly"
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Benchmarks */}
      <Card className="overflow-hidden">
        <Collapsible 
          open={expandedSections.includes('performance')}
          onOpenChange={() => toggleSection('performance')}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Performance Benchmarks
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  expandedSections.includes('performance') ? 'rotate-180' : ''
                }`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {performanceScores.map((benchmark) => (
                  <div key={benchmark.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{benchmark.name}</div>
                        <div className="text-sm text-muted-foreground">{benchmark.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{benchmark.score}%</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>
                    <Progress value={benchmark.score} className="h-2" />
                  </div>
                ))}
              </div>
              
              {detailed && (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-3">Benchmark Details</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">3DMark Time Spy</div>
                      <div className="font-medium">25,847 points</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Blender BMW27</div>
                      <div className="font-medium">1.2 minutes</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">OctaneBench</div>
                      <div className="font-medium">642 points</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Detailed Specifications */}
      {Object.entries(specifications).map(([key, section]) => (
        <Card key={key} className="overflow-hidden">
          <Collapsible 
            open={expandedSections.includes(key)}
            onOpenChange={() => toggleSection(key)}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <section.icon className={`h-5 w-5 ${section.color}`} />
                    {section.title}
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    expandedSections.includes(key) ? 'rotate-180' : ''
                  }`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                  {Object.entries(section.specs).map(([specKey, value]) => (
                    <div key={specKey} className="flex items-center justify-between py-2 border-b border-border/30 last:border-b-0">
                      <span className="text-muted-foreground font-medium">{specKey}</span>
                      <span className="font-semibold text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-500" />
            Included Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "GPU Optimization",
              "Auto-scaling",
              "API Access",
              "Container Support",
              "Load Balancing",
              "24/7 Monitoring",
              "DDoS Protection",
              "Free SSL",
              "Automated Backups",
              "VPC Networking",
              "Custom Images",
              "SSH Access"
            ].map((feature) => (
              <Badge key={feature} variant="secondary" className="px-3 py-1">
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernSpecsSection;
