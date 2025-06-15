
import SupabaseGpuCard from "./SupabaseGpuCard";
import { 
  Cpu, 
  DollarSign, 
  Building2, 
  Rocket, 
  BarChart3, 
  Globe, 
  Shield, 
  GitBranch,
  Zap,
  Clock,
  Database,
  Network
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SupabaseGpuGridProps {
  gpu: any;
  enhancedData: any;
  providerData: any[];
}

const SupabaseGpuGrid = ({ gpu, enhancedData, providerData }: SupabaseGpuGridProps) => {
  const provider = enhancedData?.provider;
  const pricing = enhancedData?.pricing;

  const cards = [
    {
      title: "Hardware Specifications",
      description: "Complete technical specifications and capabilities",
      icon: Cpu,
      highlight: true,
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">GPU Memory</div>
              <div className="font-semibold text-lg">{gpu.gpu_ram || 24}GB</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">CPU Cores</div>
              <div className="font-semibold text-lg">{gpu.cpu_cores || 16}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">System RAM</div>
              <div className="font-medium">{gpu.cpu_ram || 64}GB</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Storage</div>
              <div className="font-medium">{gpu.disk_space || 500}GB SSD</div>
            </div>
          </div>
          <div className="pt-2 border-t">
            <div className="text-sm text-gray-500 mb-2">CUDA Cores</div>
            <div className="font-medium">{gpu.cuda_cores || '10,752'}</div>
          </div>
        </div>
      ),
      action: "View Full Specs"
    },
    {
      title: "Pricing & Billing",
      description: "Transparent pricing with no hidden fees",
      icon: DollarSign,
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm font-medium">Hourly Rate</span>
            <span className="font-bold text-lg">${pricing?.hourly?.toFixed(3) || '0.000'}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-600">Daily (~24h)</span>
            <span className="font-medium">${Math.round((pricing?.hourly || 0) * 24)}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-600">Weekly (~168h)</span>
            <span className="font-medium">${Math.round((pricing?.hourly || 0) * 168)}</span>
          </div>
          {pricing?.spot && (
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Spot Pricing</span>
                <Badge variant="secondary" className="text-green-700 bg-green-50">
                  ${pricing.spot.toFixed(3)}/hr
                </Badge>
              </div>
            </div>
          )}
        </div>
      ),
      action: "Calculate Costs"
    },
    {
      title: "Provider Details",
      description: `Powered by ${provider?.name || 'Trusted Cloud Provider'}`,
      icon: Building2,
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{provider?.logo || '☁️'}</span>
            <div>
              <div className="font-semibold">{provider?.name || 'Cloud Provider'}</div>
              <Badge variant="outline" className="text-xs mt-1">
                {provider?.tier || 'Enterprise'} Tier
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-sm text-gray-500">Trust Score</div>
              <div className="font-semibold text-green-600">{provider?.trustScore || 95}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Uptime</div>
              <div className="font-semibold">99.9%</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {(provider?.features || ['24/7 Support', 'Auto-backup', 'Monitoring']).slice(0, 3).map((feature: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      ),
      action: "View Provider"
    },
    {
      title: "Quick Deploy",
      description: "Pre-configured environments ready in minutes",
      icon: Rocket,
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Clock className="h-4 w-4" />
            <span>Setup time: {provider?.setupTime || '< 5 min'}</span>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Popular Templates:</div>
            {(provider?.osTemplates || ['PyTorch + CUDA 12.1', 'TensorFlow 2.13', 'Ubuntu 22.04 LTS']).slice(0, 3).map((template: string, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                <span>{template}</span>
                <Badge variant="outline" className="text-xs">Ready</Badge>
              </div>
            ))}
          </div>
        </div>
      ),
      action: "Deploy Now"
    },
    {
      title: "Performance Metrics",
      description: "Benchmarks and real-world performance data",
      icon: BarChart3,
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Reliability Score</span>
            <span className="font-semibold">{Math.round((gpu.reliability2 || gpu.reliability || 0.9) * 100)}%</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="font-bold text-blue-700">A+</div>
              <div className="text-xs text-gray-600">AI/ML</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="font-bold text-green-700">A</div>
              <div className="text-xs text-gray-600">Training</div>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded">
              <div className="font-bold text-purple-700">A</div>
              <div className="text-xs text-gray-600">Inference</div>
            </div>
          </div>
          <div className="pt-2 border-t">
            <div className="text-sm text-gray-600">Memory Bandwidth</div>
            <div className="font-semibold">{gpu.memory_bandwidth || '935'} GB/s</div>
          </div>
        </div>
      ),
      action: "View Benchmarks"
    },
    {
      title: "Network & Location",
      description: "Global infrastructure with low-latency access",
      icon: Globe,
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Data Center</span>
            <span className="font-medium">{enhancedData?.location || 'US-East'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Network Speed</span>
            <span className="font-medium">{gpu.inet_down || '10 Gbps'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Latency</span>
            <span className="font-medium text-green-600">{"< 1ms"}</span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">IPv6 Support, DDoS Protection</span>
            </div>
          </div>
        </div>
      ),
      action: "Test Connection"
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security with industry certifications",
      icon: Shield,
      content: (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 mb-2">Certifications & Standards:</div>
          <div className="flex flex-wrap gap-1 mb-3">
            {(enhancedData?.compliance || ['SOC 2', 'GDPR', 'HIPAA']).map((cert: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs bg-green-50 text-green-700">
                {cert}
              </Badge>
            ))}
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div>• End-to-end encryption (AES-256)</div>
            <div>• Isolated network environments</div>
            <div>• Regular security audits</div>
          </div>
        </div>
      ),
      action: "Security Details"
    },
    {
      title: "Compare Alternatives",
      description: "See how this GPU compares to similar options",
      icon: GitBranch,
      content: (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 mb-2">Similar GPUs available:</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <div className="font-medium text-sm">RTX 4090</div>
                <div className="text-xs text-gray-500">24GB VRAM</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">$0.599/hr</div>
                <Badge variant="outline" className="text-xs">Available</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <div className="font-medium text-sm">A100 40GB</div>
                <div className="text-xs text-gray-500">40GB HBM2e</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">$1.230/hr</div>
                <Badge variant="outline" className="text-xs">Limited</Badge>
              </div>
            </div>
          </div>
        </div>
      ),
      action: "Compare GPUs"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <SupabaseGpuCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            content={card.content}
            action={card.action}
            highlight={card.highlight}
          />
        ))}
      </div>
    </div>
  );
};

export default SupabaseGpuGrid;
