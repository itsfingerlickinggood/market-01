
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, ArrowRight } from "lucide-react";

const MarketplaceHero = () => {
  return (
    <div className="bg-gradient-to-br from-background via-secondary/20 to-background border-b border-border">
      <div className="container mx-auto px-4 py-16 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Find Your Perfect GPU Rental
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Purpose-driven GPU recommendations. Browse thousands of GPUs from top providers worldwide with intelligent filtering based on your specific use case.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHero;
