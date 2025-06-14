
import { TrendingUp, Target, Zap } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="text-center p-6 border border-border rounded-lg bg-card">
        <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
        <h4 className="text-xl font-semibold mb-2">Live Price Tracking</h4>
        <p className="text-muted-foreground">
          Monitor real-time price fluctuations across multiple providers and get the best deals.
        </p>
      </div>
      <div className="text-center p-6 border border-border rounded-lg bg-card">
        <Target className="h-12 w-12 text-primary mx-auto mb-4" />
        <h4 className="text-xl font-semibold mb-2">Smart Recommendations</h4>
        <p className="text-muted-foreground">
          Get personalized GPU recommendations based on your specific use case and requirements.
        </p>
      </div>
      <div className="text-center p-6 border border-border rounded-lg bg-card">
        <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
        <h4 className="text-xl font-semibold mb-2">Instant Deployment</h4>
        <p className="text-muted-foreground">
          Quick access to available GPUs with one-click deployment across trusted providers.
        </p>
      </div>
    </div>
  );
};

export default FeaturesSection;
