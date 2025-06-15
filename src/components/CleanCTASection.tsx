
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CleanCTASection = () => {
  return (
    <div className="py-20">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h3 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to get started?
          </h3>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Join thousands finding the perfect GPU for their needs.
          </p>
        </div>
        
        <div className="pt-4">
          <Link to="/marketplace">
            <Button size="lg" className="text-lg px-12 py-6 rounded-lg">
              Explore marketplace
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CleanCTASection;
