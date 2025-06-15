
import SupabaseGpuCard from "../SupabaseGpuCard";
import { Rocket, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DeploymentCardProps {
  provider: any;
}

const DeploymentCard = ({ provider }: DeploymentCardProps) => {
  const content = (
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
  );

  return (
    <SupabaseGpuCard
      title="Quick Deploy"
      description="Pre-configured environments ready in minutes"
      icon={Rocket}
      content={content}
      action="Deploy Now"
    />
  );
};

export default DeploymentCard;
