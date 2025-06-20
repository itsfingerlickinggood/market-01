
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CleanCTASection = () => {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-2xl"></div>
          
          <div className="relative z-10 text-center space-y-8 py-16">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-light text-foreground">
                Ready to get started?
              </h3>
              <p className="text-xl text-muted-foreground max-w-lg mx-auto font-light">
                Join thousands finding the perfect GPU for their needs.
              </p>
            </div>
            
            <div className="pt-4">
              <Link to="/marketplace">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg rounded-lg font-medium">
                  Explore marketplace
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanCTASection;
