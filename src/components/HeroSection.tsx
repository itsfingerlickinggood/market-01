
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-5xl font-bold mb-6 flex items-center justify-center gap-3">
        <TrendingUp className="h-12 w-12 text-primary" />
        Real-Time GPU Marketplace
      </h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
        Track live GPU prices across multiple cloud providers. Compare deals, find the best rates, and make informed decisions for your compute needs.
      </p>
      <div className="flex gap-4 justify-center">
        <Link to="/marketplace">
          <Button size="lg" className="text-lg px-8 py-6">
            <Target className="h-5 w-5 mr-2" />
            Explore Marketplace
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </Link>
        <Button variant="outline" size="lg" className="text-lg px-8 py-6">
          View Analytics
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
