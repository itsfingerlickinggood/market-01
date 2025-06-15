
import { Zap, Target, TrendingUp } from "lucide-react";

const CleanFeaturesSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-time pricing",
      description: "Live market data updated every 3 seconds"
    },
    {
      icon: Target,
      title: "Smart matching",
      description: "AI-powered recommendations for your workload"
    },
    {
      icon: Zap,
      title: "Instant deployment",
      description: "Deploy in under 60 seconds across providers"
    }
  ];

  return (
    <div className="py-20">
      <div className="text-center space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Built for speed and scale
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to find, compare, and deploy GPUs at scale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CleanFeaturesSection;
