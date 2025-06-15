
import { Badge } from "@/components/ui/badge";
import { Shield, Star, CheckCircle, Award, Clock, Zap } from "lucide-react";
import { ProviderInfo, VerificationBadge } from "@/types/gpu-recommendation";

interface ProviderTrustBadgeProps {
  provider: ProviderInfo;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const getTierInfo = (tier: string) => {
  switch (tier) {
    case 'verified':
      return {
        label: 'Verified',
        icon: Shield,
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        description: 'Enterprise-grade provider with verified credentials'
      };
    case 'premium':
      return {
        label: 'Premium',
        icon: Award,
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        description: 'Top-tier provider with premium SLA guarantees'
      };
    case 'community':
    default:
      return {
        label: 'Community',
        icon: Star,
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
        description: 'Community-verified provider'
      };
  }
};

const getBadgeIcon = (type: string) => {
  switch (type) {
    case 'iso27001':
    case 'soc2':
    case 'enterprise':
      return Shield;
    case 'performance':
      return Zap;
    case 'uptime':
      return Clock;
    default:
      return CheckCircle;
  }
};

const ProviderTrustBadge = ({ provider, size = 'md', showDetails = false }: ProviderTrustBadgeProps) => {
  const tierInfo = getTierInfo(provider.tier);
  const TierIcon = tierInfo.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <div className="flex flex-col gap-2">
      <Badge className={`${tierInfo.color} ${sizeClasses[size]} inline-flex items-center gap-1`}>
        <TierIcon className={iconSizes[size]} />
        {tierInfo.label}
        {provider.trustScore && (
          <span className="ml-1 font-bold">
            {Math.round(provider.trustScore * 100)}%
          </span>
        )}
      </Badge>

      {showDetails && provider.verificationBadges && provider.verificationBadges.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {provider.verificationBadges
            .filter(badge => badge.verified)
            .slice(0, 3)
            .map((badge, index) => {
              const BadgeIcon = getBadgeIcon(badge.type);
              return (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border-green-200"
                >
                  <BadgeIcon className="h-3 w-3 mr-1" />
                  {badge.type.toUpperCase()}
                </Badge>
              );
            })}
        </div>
      )}

      {showDetails && provider.uptimeGuarantee && (
        <div className="text-xs text-muted-foreground">
          {provider.uptimeGuarantee}% uptime SLA
        </div>
      )}
    </div>
  );
};

export default ProviderTrustBadge;
