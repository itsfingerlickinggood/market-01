
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Award, Star, X } from "lucide-react";

interface TrustFilterSectionProps {
  selectedTiers: string[];
  onTierToggle: (tier: string) => void;
  onClearFilters: () => void;
}

const trustTiers = [
  {
    id: 'premium',
    label: 'Premium',
    icon: Award,
    color: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    description: 'Top-tier providers with premium SLA'
  },
  {
    id: 'verified',
    label: 'Verified',
    icon: Shield,
    color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    description: 'Enterprise-grade verified providers'
  },
  {
    id: 'community',
    label: 'Community',
    icon: Star,
    color: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    description: 'Community-verified providers'
  }
];

const TrustFilterSection = ({ selectedTiers, onTierToggle, onClearFilters }: TrustFilterSectionProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Provider Trust</CardTitle>
          {selectedTiers.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-6 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {trustTiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTiers.includes(tier.id);
            
            return (
              <Badge
                key={tier.id}
                variant={isSelected ? "default" : "outline"}
                className={`w-full justify-start cursor-pointer transition-colors ${
                  isSelected ? tier.color : 'hover:bg-muted'
                }`}
                onClick={() => onTierToggle(tier.id)}
              >
                <Icon className="h-3 w-3 mr-2" />
                <div className="flex-1 text-left">
                  <div className="font-medium">{tier.label}</div>
                  <div className="text-xs opacity-70">{tier.description}</div>
                </div>
              </Badge>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground">
            <div className="font-medium mb-1">Trust Indicators:</div>
            <ul className="space-y-0.5">
              <li>• Security certifications</li>
              <li>• Uptime guarantees</li>
              <li>• Performance verification</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustFilterSection;
