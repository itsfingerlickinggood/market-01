
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, Star, Shield, Zap, Clock, TrendingUp, TrendingDown, 
  CheckCircle, AlertCircle, ExternalLink, Play, Heart, Bell
} from "lucide-react";

interface ProviderCentricHeroProps {
  gpu: any;
  enhancedData: any;
}

const ProviderCentricHero = ({ gpu, enhancedData }: ProviderCentricHeroProps) => {
  const provider = enhancedData.provider;
  const pricing = enhancedData.pricing;
  const reliability = Math.round((gpu.reliability2 || gpu.reliability || 0.9) * 100);

  const getTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'premium': return 'bg-gradient-to-r from-purple-500 to-purple-600';
      case 'verified': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'community': return 'bg-gradient-to-r from-green-500 to-green-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getAvailabilityStatus = () => {
    if (gpu.rentable !== false) {
      return { status: 'available', label: 'Available Now', color: 'text-green-500', icon: CheckCircle };
    }
    return { status: 'unavailable', label: 'Currently Rented', color: 'text-red-500', icon: AlertCircle };
  };

  const availabilityInfo = getAvailabilityStatus();
  const StatusIcon = availabilityInfo.icon;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background">
      {/* Provider Brand Background */}
      <div className="absolute inset-0 opacity-5">
        <div className={`w-full h-full ${getTierColor(provider.tier)}`} />
      </div>
      
      <div className="relative container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Hero Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Provider & Status Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-4xl">{provider.logo}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getTierColor(provider.tier)} text-white border-0`}>
                      {provider.tier}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Trust Score: {provider.trustScore}%
                    </Badge>
                  </div>
                  <h2 className="text-lg font-semibold text-muted-foreground">
                    {provider.name}
                  </h2>
                </div>
              </div>

              {/* GPU Title & Availability */}
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  {gpu.gpu_name}
                </h1>
                
                <div className="flex items-center gap-6 flex-wrap">
                  <div className={`flex items-center gap-2 ${availabilityInfo.color}`}>
                    <StatusIcon className="h-5 w-5" />
                    <span className="font-semibold">{availabilityInfo.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{enhancedData.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{provider.rating}/5 ({provider.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button size="lg" className="h-12 px-6" disabled={availabilityInfo.status === 'unavailable'}>
                  <Play className="h-4 w-4 mr-2" />
                  {availabilityInfo.status === 'available' ? 'Deploy Now' : 'Unavailable'}
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-4">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-4">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-4">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-card/50 backdrop-blur-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-muted-foreground">VRAM</span>
                  </div>
                  <div className="text-2xl font-bold">{gpu.gpu_ram || 24}GB</div>
                </div>
              </Card>
              
              <Card className="p-4 bg-card/50 backdrop-blur-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-muted-foreground">Setup Time</span>
                  </div>
                  <div className="text-2xl font-bold">{provider.setupTime}</div>
                </div>
              </Card>
              
              <Card className="p-4 bg-card/50 backdrop-blur-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium text-muted-foreground">Reliability</span>
                  </div>
                  <div className="text-2xl font-bold">{reliability}%</div>
                </div>
              </Card>
              
              <Card className="p-4 bg-card/50 backdrop-blur-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-muted-foreground">Support</span>
                  </div>
                  <div className="text-lg font-bold">{provider.support}</div>
                </div>
              </Card>
            </div>

            {/* Provider Features */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Provider Features</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {provider.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Enhanced Pricing Sidebar */}
          <div className="lg:col-span-4">
            <Card className="p-6 bg-card/80 backdrop-blur-sm sticky top-6">
              <div className="space-y-6">
                {/* Pricing Header */}
                <div className="text-center space-y-3">
                  <div className="text-sm text-muted-foreground">Starting from</div>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold text-primary">
                      ${pricing.hourly.toFixed(3)}
                    </div>
                    <div className="text-sm text-muted-foreground">per hour</div>
                  </div>
                  
                  {/* Price Trend */}
                  <div className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-green-50 text-green-600 dark:bg-green-950/20">
                    <TrendingDown className="h-3 w-3" />
                    5.2% lower than average
                  </div>
                </div>

                {/* Pricing Tiers */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-sm text-muted-foreground">Hourly</span>
                    <span className="font-semibold">${pricing.hourly.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-sm text-muted-foreground">Daily (~24h)</span>
                    <span className="font-semibold">${(pricing.hourly * 24).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-sm text-muted-foreground">Weekly (~168h)</span>
                    <span className="font-semibold">${Math.round(pricing.hourly * 168)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Monthly (~720h)</span>
                    <span className="font-semibold">${Math.round(pricing.hourly * 720)}</span>
                  </div>
                </div>

                {/* Commitment Options */}
                {pricing.commitment && (
                  <div className="space-y-3 pt-4 border-t border-border/30">
                    <h4 className="text-sm font-semibold">Commitment Discounts</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">30 days</span>
                        <span className="font-medium text-green-600">-{pricing.commitment['30d']}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">90 days</span>
                        <span className="font-medium text-green-600">-{pricing.commitment['90d']}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-border/30">
                  <Button 
                    className="w-full h-12 font-semibold"
                    disabled={availabilityInfo.status === 'unavailable'}
                  >
                    {availabilityInfo.status === 'available' ? 'Deploy Instance' : 'Currently Unavailable'}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="h-10">
                      Price Alert
                    </Button>
                    <Button variant="outline" size="sm" className="h-10">
                      Compare
                    </Button>
                  </div>
                </div>

                {/* Provider Trust Indicators */}
                <div className="text-center space-y-2 pt-4 border-t border-border/30">
                  <div className="text-xs text-muted-foreground">
                    {provider.guarantees.join(' • ')}
                  </div>
                  <div className="text-xs font-medium text-primary">
                    Trusted by {provider.customers}+ customers
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCentricHero;
