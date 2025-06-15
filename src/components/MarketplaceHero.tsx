
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MarketplaceHero = () => {
  return (
    <div className="bg-gradient-to-br from-background via-secondary/20 to-background border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <Link to="/marketplace">
            <Button size="lg" className="text-lg px-8 py-4">
              Explore Marketplace
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHero;
