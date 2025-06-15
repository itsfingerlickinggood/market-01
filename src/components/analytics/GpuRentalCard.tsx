
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GpuCardHeader from "./gpu-card/GpuCardHeader";
import GpuCardPricing from "./gpu-card/GpuCardPricing";
import GpuCardMetrics from "./gpu-card/GpuCardMetrics";
import GpuCardSpecs from "./gpu-card/GpuCardSpecs";
import GpuCardActions from "./gpu-card/GpuCardActions";
import GpuCardFooter from "./gpu-card/GpuCardFooter";

interface GpuRental {
  id: number;
  company: string;
  companyLogo: string;
  model: string;
  tier: string;
  provider: string;
  providerColor: string;
  providerIcon: string;
  currentPrice: number;
  priceChange: string;
  trend: "up" | "down";
  vram: string;
  availability: string;
  utilization: number;
  reliability: number;
  priceHistory: Array<{ hour: number; price: number }>;
  location: string;
  setupTime: string;
  lastRented: string;
  performanceScore: number;
  trustScore: number;
}

interface GpuRentalCardProps {
  gpu: GpuRental;
}

const GpuRentalCard = ({ gpu }: GpuRentalCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-to-br from-card/95 via-card/98 to-card backdrop-blur-xl border-border/60 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

      <CardHeader className="pb-4 relative z-10">
        <GpuCardHeader
          company={gpu.company}
          companyLogo={gpu.companyLogo}
          model={gpu.model}
          tier={gpu.tier}
          provider={gpu.provider}
          providerColor={gpu.providerColor}
          providerIcon={gpu.providerIcon}
          availability={gpu.availability}
        />
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        {/* Price Section */}
        <GpuCardPricing
          currentPrice={gpu.currentPrice}
          priceHistory={gpu.priceHistory}
          providerColor={gpu.providerColor}
        />

        {/* Performance & Trust Scores */}
        <GpuCardMetrics
          performanceScore={gpu.performanceScore}
          trustScore={gpu.trustScore}
        />

        {/* Specs Grid */}
        <GpuCardSpecs
          vram={gpu.vram}
          setupTime={gpu.setupTime}
          location={gpu.location}
          utilization={gpu.utilization}
        />

        {/* Price Change & Actions */}
        <GpuCardActions
          priceChange={gpu.priceChange}
          trend={gpu.trend}
          availability={gpu.availability}
        />

        {/* Reliability Indicator */}
        <GpuCardFooter
          reliability={gpu.reliability}
          lastRented={gpu.lastRented}
        />
      </CardContent>
    </Card>
  );
};

export default GpuRentalCard;
