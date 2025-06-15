
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building, Shield, Clock, Users, Star, CheckCircle, 
  ExternalLink, Award, Globe, Headphones
} from "lucide-react";

interface ProviderOverviewSectionProps {
  gpu: any;
  enhancedData: any;
  detailed?: boolean;
}

const ProviderOverviewSection = ({ gpu, enhancedData, detailed = false }: ProviderOverviewSectionProps) => {
  const provider = enhancedData.provider;

  const getTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'verified': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'community': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Provider Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{provider.logo}</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{provider.name}</CardTitle>
                  <Badge className={getTierColor(provider.tier)}>
                    {provider.tier}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{provider.rating}/5 ({provider.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{provider.customers}+ customers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <span>{provider.regions} regions</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Provider
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Trust Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                Trust Score
              </h4>
              <span className="text-2xl font-bold text-primary">{provider.trustScore}%</span>
            </div>
            <Progress value={provider.trustScore} className="h-2" />
            <div className="text-sm text-muted-foreground">
              Based on reliability, customer reviews, and platform history
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-accent/30 rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-2 text-blue-500" />
              <div className="font-semibold">{provider.setupTime}</div>
              <div className="text-xs text-muted-foreground">Setup Time</div>
            </div>
            <div className="text-center p-3 bg-accent/30 rounded-lg">
              <Headphones className="h-5 w-5 mx-auto mb-2 text-green-500" />
              <div className="font-semibold">{provider.support}</div>
              <div className="text-xs text-muted-foreground">Support</div>
            </div>
            <div className="text-center p-3 bg-accent/30 rounded-lg">
              <Award className="h-5 w-5 mx-auto mb-2 text-purple-500" />
              <div className="font-semibold">{Math.round((gpu.reliability2 || gpu.reliability || 0.9) * 100)}%</div>
              <div className="text-xs text-muted-foreground">Uptime SLA</div>
            </div>
            <div className="text-center p-3 bg-accent/30 rounded-lg">
              <Building className="h-5 w-5 mx-auto mb-2 text-orange-500" />
              <div className="font-semibold">{provider.datacenters}</div>
              <div className="text-xs text-muted-foreground">Data Centers</div>
            </div>
          </div>

          {/* Provider Features */}
          <div className="space-y-3">
            <h4 className="font-semibold">Key Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {provider.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {detailed && (
            <>
              {/* Provider Specializations */}
              <div className="space-y-3">
                <h4 className="font-semibold">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {provider.specializations?.map((spec: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-3">
                <h4 className="font-semibold">Service Guarantees</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {provider.guarantees?.map((guarantee: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span>{guarantee}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderOverviewSection;
