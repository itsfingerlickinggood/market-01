import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const CleanHeroSection = () => {
  return <div className="relative min-h-[80vh] flex items-center">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="space-y-8">
            {/* Main heading with gradient text */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
                Find Compute. Train models.
                <br />
                <span className="bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text text-transparent font-normal">
                  Scale Intelligence.
                </span>
              </h1>
            </div>
            
            {/* Description */}
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">Market01 makes AI development easy and accessible for everyone. Our platform helps you find computing power from around the world and train advanced models by connecting multiple systems. Everyone shares in the results and benefits together.</p>
            </div>
            
            {/* CTA Button */}
            <div className="pt-4">
              <Link to="/marketplace">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg font-medium">
                  GET STARTED
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default CleanHeroSection;