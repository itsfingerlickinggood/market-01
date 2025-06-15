
import SupabaseStyleCard from "./SupabaseStyleCard";
import { 
  Cpu, 
  DollarSign, 
  Building, 
  Rocket, 
  BarChart3, 
  Globe, 
  Shield, 
  GitBranch 
} from "lucide-react";

interface SupabaseStyleGridProps {
  gpu: any;
  enhancedData: any;
  providerData: any[];
}

const SupabaseStyleGrid = ({ gpu, enhancedData, providerData }: SupabaseStyleGridProps) => {
  const provider = enhancedData?.provider;
  const pricing = enhancedData?.pricing;

  const cards = [
    {
      title: "GPU Overview",
      description: "Core specifications and performance metrics",
      icon: Cpu,
      content: (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-gray-500">VRAM</div>
              <div className="font-medium">{gpu.gpu_ram || 24}GB</div>
            </div>
            <div>
              <div className="text-gray-500">CPU Cores</div>
              <div className="font-medium">{gpu.cpu_cores || 16}</div>
            </div>
            <div>
              <div className="text-gray-500">System RAM</div>
              <div className="font-medium">{gpu.cpu_ram || 64}GB</div>
            </div>
            <div>
              <div className="text-gray-500">Storage</div>
              <div className="font-medium">{gpu.disk_space || 500}GB</div>
            </div>
          </div>
        </div>
      ),
      action: "View Details"
    },
    {
      title: "Pricing Options",
      description: "Flexible pricing for every budget",
      icon: DollarSign,
      content: (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Hourly Rate</span>
            <span className="font-semibold">${pricing?.hourly?.toFixed(3) || '0.000'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Daily Rate</span>
            <span className="font-medium">${Math.round((pricing?.hourly || 0) * 24)}</span>
          </div>
          {pricing?.spot && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Spot Pricing</span>
              <span className="font-medium text-green-600">${pricing.spot.toFixed(3)}</span>
            </div>
          )}
        </div>
      ),
      action: "View Pricing"
    },
    {
      title: "Provider Information",
      description: `Powered by ${provider?.name || 'Cloud Provider'}`,
      icon: Building,
      content: (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{provider?.logo}</span>
            <div>
              <div className="font-medium">{provider?.name}</div>
              <div className="text-xs text-gray-500">{provider?.tier} Tier</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-gray-500">Trust Score</div>
              <div className="font-medium">{provider?.trustScore}%</div>
            </div>
            <div>
              <div className="text-gray-500">Setup Time</div>
              <div className="font-medium">{provider?.setupTime}</div>
            </div>
          </div>
        </div>
      ),
      action: "Learn More"
    },
    {
      title: "Deploy Templates",
      description: "Pre-configured environments ready to use",
      icon: Rocket,
      content: (
        <div className="space-y-2">
          <div className="text-sm text-gray-600">Available Templates:</div>
          <div className="space-y-1">
            {provider?.osTemplates?.slice(0, 3).map((template: string, index: number) => (
              <div key={index} className="text-xs px-2 py-1 bg-gray-100 rounded">
                {template}
              </div>
            ))}
          </div>
        </div>
      ),
      action: "Browse All"
    },
    {
      title: "Performance Metrics",
      description: "Benchmarks and reliability scores",
      icon: BarChart3,
      content: (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Reliability</span>
            <span className="font-medium">{Math.round((gpu.reliability2 || gpu.reliability || 0.9) * 100)}%</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div className="p-2 bg-blue-50 rounded">
              <div className="font-medium text-blue-600">A+</div>
              <div className="text-gray-500">AI/ML</div>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <div className="font-medium text-green-600">A</div>
              <div className="text-gray-500">Gaming</div>
            </div>
            <div className="p-2 bg-purple-50 rounded">
              <div className="font-medium text-purple-600">A</div>
              <div className="text-gray-500">Render</div>
            </div>
          </div>
        </div>
      ),
      action: "View Benchmarks"
    },
    {
      title: "Location & Network",
      description: "Global infrastructure and connectivity",
      icon: Globe,
      content: (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Location</span>
            <span className="font-medium">{enhancedData?.location}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Network</span>
            <span className="font-medium">{gpu.inet_down || '10Gbps'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Latency</span>
            <span className="font-medium">< 1ms</span>
          </div>
        </div>
      ),
      action: "View Locations"
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security standards",
      icon: Shield,
      content: (
        <div className="space-y-2">
          <div className="text-sm text-gray-600">Certifications:</div>
          <div className="flex flex-wrap gap-1">
            {enhancedData?.compliance?.map((cert: string, index: number) => (
              <span key={index} className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">
                {cert}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-500">
            AES-256 encryption • Firewall protected
          </div>
        </div>
      ),
      action: "Security Details"
    },
    {
      title: "Compare & Alternatives",
      description: "See how this GPU stacks up",
      icon: GitBranch,
      content: (
        <div className="space-y-2">
          <div className="text-sm text-gray-600">Similar GPUs available:</div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>RTX 4090</span>
              <span className="text-green-600">$0.599/hr</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>A100 40GB</span>
              <span className="text-blue-600">$1.230/hr</span>
            </div>
          </div>
        </div>
      ),
      action: "Compare Now"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <SupabaseStyleCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            content={card.content}
            action={card.action}
          />
        ))}
      </div>
    </div>
  );
};

export default SupabaseStyleGrid;
