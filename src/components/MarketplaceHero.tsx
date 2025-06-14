
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, ArrowRight } from "lucide-react";

const MarketplaceHero = () => {
  return (
    <div className="bg-gradient-to-br from-background via-secondary/20 to-background border-b border-border">
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Find Your Perfect GPU Rental
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Purpose-driven GPU recommendations. Browse thousands of GPUs from top providers worldwide with intelligent filtering based on your specific use case.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHero;
