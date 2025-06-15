
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CleanPricingSectionProps {
  gpu: any;
  enhancedData: any;
}

const CleanPricingSection = ({ gpu, enhancedData }: CleanPricingSectionProps) => {
  const pricing = enhancedData?.pricing;

  const pricingTiers = [
    { label: "Hourly", value: pricing?.hourly?.toFixed(3) || "0.000", unit: "/hr" },
    { label: "Daily", value: Math.round((pricing?.hourly || 0) * 24), unit: "/day" },
    { label: "Weekly", value: Math.round((pricing?.hourly || 0) * 168), unit: "/week" },
    { label: "Monthly", value: Math.round((pricing?.hourly || 0) * 720), unit: "/month" }
  ];

  return (
    <div className="space-y-3">
      {/* Current Pricing */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Current Pricing</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {pricingTiers.map((tier, index) => (
              <div key={index} className="text-center p-2 border rounded">
                <div className="text-xs text-muted-foreground">{tier.label}</div>
                <div className="font-bold">${tier.value}</div>
                <div className="text-xs text-muted-foreground">{tier.unit}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Details */}
      <div className="grid md:grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Billing Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Billing Increment</span>
              <span>{pricing?.billingIncrement || "Per minute"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Minimum Charge</span>
              <span>{pricing?.minimumCharge || "1 minute"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Setup Fee</span>
              <span>{pricing?.setupFee || "None"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Market Position</span>
              <Badge variant="secondary" className="text-xs h-5">
                {pricing?.marketPosition || "Average"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {pricing?.commitment && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Commitment Discounts</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">30 days</span>
                <span className="text-green-600 font-medium">-{pricing.commitment['30d']}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">90 days</span>
                <span className="text-green-600 font-medium">-{pricing.commitment['90d']}%</span>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2 h-7 text-xs">
                View Commitment Plans
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Spot Pricing */}
      {pricing?.spot && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Spot Pricing Available</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold">${pricing.spot.toFixed(3)}/hr</div>
                <div className="text-xs text-muted-foreground">
                  {Math.round(((pricing.hourly - pricing.spot) / pricing.hourly) * 100)}% savings
                </div>
              </div>
              <Button size="sm" className="h-7 text-xs">
                Use Spot Pricing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CleanPricingSection;
