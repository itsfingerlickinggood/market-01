
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingDown, TrendingUp, Clock, Shield } from "lucide-react";

interface ProviderPricingSectionProps {
  gpu: any;
  enhancedData: any;
}

const ProviderPricingSection = ({ gpu, enhancedData }: ProviderPricingSectionProps) => {
  const pricing = enhancedData.pricing;
  const provider = enhancedData.provider;

  return (
    <div className="space-y-6">
      {/* Main Pricing Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            Pricing Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg border">
              <div className="text-2xl font-bold text-primary">${pricing.hourly.toFixed(3)}</div>
              <div className="text-sm text-muted-foreground">per hour</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-xl font-bold">${(pricing.hourly * 24).toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">per day</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-xl font-bold">${Math.round(pricing.hourly * 168)}</div>
              <div className="text-sm text-muted-foreground">per week</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-xl font-bold">${Math.round(pricing.hourly * 720)}</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </div>

          {/* Commitment Discounts */}
          {pricing.commitment && (
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Commitment Discounts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">30-Day Commitment</span>
                    <Badge className="bg-green-100 text-green-800">
                      -{pricing.commitment['30d']}%
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Save ${((pricing.hourly * 720 * pricing.commitment['30d']) / 100).toFixed(0)}/month
                  </div>
                  <div className="text-lg font-bold">
                    ${(pricing.hourly * (1 - pricing.commitment['30d'] / 100)).toFixed(3)}/hour
                  </div>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">90-Day Commitment</span>
                    <Badge className="bg-green-100 text-green-800">
                      -{pricing.commitment['90d']}%
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Save ${((pricing.hourly * 720 * pricing.commitment['90d']) / 100).toFixed(0)}/month
                  </div>
                  <div className="text-lg font-bold">
                    ${(pricing.hourly * (1 - pricing.commitment['90d'] / 100)).toFixed(3)}/hour
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spot Pricing */}
          {pricing.spot && (
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-orange-500" />
                Spot Pricing
              </h4>
              <div className="p-4 border rounded-lg bg-orange-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Current Spot Price</span>
                  <Badge className="bg-orange-100 text-orange-800">
                    -{Math.round(((pricing.hourly - pricing.spot) / pricing.hourly) * 100)}%
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  ${pricing.spot.toFixed(3)}/hour
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  *Subject to availability and may be interrupted
                </div>
              </div>
            </div>
          )}

          {/* Billing Information */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-500" />
              Billing & Terms
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Billing Increment:</span>
                  <span className="font-medium">{pricing.billingIncrement || 'Per minute'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum Charge:</span>
                  <span className="font-medium">{pricing.minimumCharge || '1 hour'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Setup Fee:</span>
                  <span className="font-medium">{pricing.setupFee || 'None'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Payment Methods:</span>
                  <span className="font-medium">Credit Card, Crypto</span>
                </div>
                <div className="flex justify-between">
                  <span>Refund Policy:</span>
                  <span className="font-medium">Pro-rated</span>
                </div>
                <div className="flex justify-between">
                  <span>Currency:</span>
                  <span className="font-medium">USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1">
              Deploy at ${pricing.hourly.toFixed(3)}/hour
            </Button>
            <Button variant="outline">
              Set Price Alert
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Price Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Market Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="font-medium">Market Position</span>
              </span>
              <span className="text-green-600 font-semibold">
                {pricing.marketPosition || '15% below average'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              This provider offers competitive pricing for {gpu.gpu_name} instances compared to major cloud providers.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderPricingSection;
