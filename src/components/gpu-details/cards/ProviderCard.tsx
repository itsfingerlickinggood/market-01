
import SupabaseGpuCard from "../SupabaseGpuCard";
import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProviderCardProps {
  provider: any;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const content = (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{provider?.logo || '☁️'}</span>
        <div>
          <div className="font-semibold text-foreground">{provider?.name || 'Cloud Provider'}</div>
          <Badge variant="outline" className="text-xs mt-1">
            {provider?.tier || 'Enterprise'} Tier
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-sm text-muted-foreground">Trust Score</div>
          <div className="font-semibold text-primary">{provider?.trustScore || 95}%</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Uptime</div>
          <div className="font-semibold text-foreground">99.9%</div>
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
  );

  return (
    <SupabaseGpuCard
      title="Provider Details"
      description={`Powered by ${provider?.name || 'Trusted Cloud Provider'}`}
      icon={Building2}
      content={content}
      action="View Provider"
    />
  );
};

export default ProviderCard;
