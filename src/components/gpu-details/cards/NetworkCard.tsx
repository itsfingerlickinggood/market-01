
import SupabaseGpuCard from "../SupabaseGpuCard";
import { Globe, Network } from "lucide-react";

interface NetworkCardProps {
  gpu: any;
  enhancedData: any;
}

const NetworkCard = ({ gpu, enhancedData }: NetworkCardProps) => {
  const content = (
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
  );

  return (
    <SupabaseGpuCard
      title="Network & Location"
      description="Global infrastructure with low-latency access"
      icon={Globe}
      content={content}
      action="Test Connection"
    />
  );
};

export default NetworkCard;
