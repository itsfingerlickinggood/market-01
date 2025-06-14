
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="text-center bg-secondary/30 rounded-lg p-12">
      <h3 className="text-3xl font-bold mb-4">Ready to Find Your Perfect GPU?</h3>
      <p className="text-xl text-muted-foreground mb-8">
        Join thousands of developers and researchers finding the best GPU deals.
      </p>
      <Link to="/marketplace">
        <Button size="lg" className="text-lg px-12 py-6">
          Start Exploring
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </Link>
    </div>
  );
};

export default CTASection;
