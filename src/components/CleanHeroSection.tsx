import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const CleanHeroSection = () => {
  return <div className="text-center space-y-8 py-20">
      <div className="space-y-6">
        <h1 className="text-6xl tracking-tight leading-tight md:text-6xl font-bold text-center">
          Find GPUs in minutes,
          <br />
          <span className="text-primary">Scale to millions</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg font-normal">
          Compare real-time pricing across cloud providers and deploy high-performance GPUs instantly.
        </p>
      </div>
      
      <div className="pt-8">
        <Link to="/marketplace">
          <Button size="lg" className="rounded-lg text-white font-normal text-lg py-[10px] px-[17px]">
            Start exploring
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>;
};
export default CleanHeroSection;