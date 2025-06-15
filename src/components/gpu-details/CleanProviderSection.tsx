
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Star } from "lucide-react";

interface CleanProviderSectionProps {
  gpu: any;
  enhancedData: any;
}

const CleanProviderSection = ({ gpu, enhancedData }: CleanProviderSectionProps) => {
  const provider = enhancedData?.provider;

  if (!provider) return null;

  return (
    <div className="space-y-3">
      {/* Provider Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="text-2xl">{provider.logo}</span>
            {provider.name}
            <Badge variant="outline" className="text-xs h-5">
              {provider.tier}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Trust Score</div>
              <div className="font-bold text-lg">{provider.trustScore}%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Rating</div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{provider.rating}/5</span>
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Customers</div>
              <div className="font-medium">{provider.customers}+</div>
            </div>
            <div>
              <div className="text-muted-foreground">Reviews</div>
              <div className="font-medium">{provider.reviews}</div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Trust Score</span>
              <span>{provider.trustScore}%</span>
            </div>
            <Progress value={provider.trustScore} className="h-1" />
          </div>
          
          <Button size="sm" variant="outline" className="mt-3 h-7 text-xs">
            <ExternalLink className="h-3 w-3 mr-1" />
            Visit {provider.name}
          </Button>
        </CardContent>
      </Card>

      {/* Provider Details */}
      <div className="grid md:grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Infrastructure</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Regions</span>
              <span>{provider.regions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Centers</span>
              <span>{provider.datacenters}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Setup Time</span>
              <span>{provider.setupTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Support</span>
              <span>{provider.support}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Specializations</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1">
              {provider.specializations?.map((spec: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs h-5">
                  {spec}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features & Guarantees */}
      <div className="grid md:grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Key Features</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1 text-xs">
              {provider.features?.map((feature: string, index: number) => (
                <div key={index} className="py-0.5">• {feature}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Service Guarantees</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1 text-xs">
              {provider.guarantees?.map((guarantee: string, index: number) => (
                <div key={index} className="py-0.5">• {guarantee}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CleanProviderSection;
