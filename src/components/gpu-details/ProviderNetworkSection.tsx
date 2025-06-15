
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, MapPin, Wifi, Shield, Clock, TrendingUp } from "lucide-react";
import { comprehensiveProviders, getProvidersByGpu } from "@/data/comprehensiveProviderCatalog";

interface ProviderNetworkSectionProps {
  gpu: any;
}

const ProviderNetworkSection = ({ gpu }: ProviderNetworkSectionProps) => {
  const compatibleProviders = getProvidersByGpu(gpu.gpu_name || 'A100');
  
  // Mock network performance data
  const networkRegions = [
    { region: 'US East (Virginia)', latency: '1.2ms', speed: '100 Gbps', quality: 'Excellent' },
    { region: 'US West (Oregon)', latency: '2.8ms', speed: '100 Gbps', quality: 'Excellent' },
    { region: 'Europe (Frankfurt)', latency: '15ms', speed: '80 Gbps', quality: 'Very Good' },
    { region: 'Asia Pacific (Tokyo)', latency: '45ms', speed: '50 Gbps', quality: 'Good' },
    { region: 'Global CDN', latency: 'Variable', speed: 'Up to 100 Gbps', quality: 'Optimized' }
  ];

  return (
    <div className="space-y-6">
      {/* Provider Reliability Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Provider Reliability Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {compatibleProviders.length}
              </div>
              <div className="text-sm text-muted-foreground">Compatible Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {Math.round(compatibleProviders.reduce((sum, p) => sum + p.reliability.uptime, 0) / compatibleProviders.length * 10) / 10}%
              </div>
              <div className="text-sm text-muted-foreground">Average Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {Math.round(compatibleProviders.reduce((sum, p) => sum + p.trustScore, 0) / compatibleProviders.length)}
              </div>
              <div className="text-sm text-muted-foreground">Average Trust Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Provider Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Provider Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {compatibleProviders.slice(0, 6).map((provider) => (
              <div
                key={provider.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{provider.logo}</div>
                    <div>
                      <h3 className="font-semibold">{provider.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {(provider.trustScore / 20).toFixed(1)}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {provider.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-green-600">
                      ${provider.pricing.find(p => p.gpuModel.includes('A100'))?.hourly.toFixed(2) || 'N/A'}/hr
                    </div>
                    <div className="text-xs text-muted-foreground">Setup: {provider.reliability.averageSetupTime}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Uptime</div>
                    <div className="flex items-center gap-2">
                      <Progress value={provider.reliability.uptime} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{provider.reliability.uptime}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Locations</div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-sm">{provider.locations.slice(0, 2).join(', ')}</span>
                      {provider.locations.length > 2 && (
                        <span className="text-xs text-muted-foreground">+{provider.locations.length - 2}</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">Support</div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-sm">{provider.reliability.supportResponse}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <div className="flex flex-wrap gap-1">
                    {provider.features.slice(0, 4).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-purple-500" />
            Network Performance by Region
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {networkRegions.map((region) => (
              <div
                key={region.region}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{region.region}</div>
                    <div className="text-sm text-muted-foreground">
                      Latency: {region.latency} • Speed: {region.speed}
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={
                    region.quality === 'Excellent' ? 'default' :
                    region.quality === 'Very Good' ? 'secondary' : 'outline'
                  }
                >
                  {region.quality}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Security & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['SOC 2 Type II', 'ISO 27001', 'GDPR Compliant', 'HIPAA Ready'].map((cert) => (
              <div key={cert} className="text-center p-3 border rounded-lg">
                <Shield className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="text-sm font-medium">{cert}</div>
                <div className="text-xs text-muted-foreground mt-1">Verified</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderNetworkSection;
