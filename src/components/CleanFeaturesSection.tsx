
import { Zap, Target, TrendingUp, Code, Shield, Cpu } from "lucide-react";

const CleanFeaturesSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-time pricing",
      description: "Live market data updated every 3 seconds across all providers",
      number: "01"
    },
    {
      icon: Target,
      title: "Smart matching",
      description: "AI-powered recommendations based on your specific workload needs",
      number: "02"
    },
    {
      icon: Zap,
      title: "Instant deployment",
      description: "Deploy in under 60 seconds with one-click templates",
      number: "03"
    },
    {
      icon: Code,
      title: "Protocol integration",
      description: "Native support for popular ML frameworks and distributed training",
      number: "04"
    },
    {
      icon: Shield,
      title: "Enterprise security",
      description: "Bank-grade security with SOC2 compliance and data encryption",
      number: "05"
    },
    {
      icon: Cpu,
      title: "Global compute",
      description: "Access to the world's largest network of GPU providers",
      number: "06"
    }
  ];

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Built for speed and scale
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Everything you need to find, compare, and deploy GPUs at enterprise scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="border border-border/20 rounded-lg p-6 h-full hover:border-primary/30 transition-all duration-300 bg-card/20 backdrop-blur-sm">
                    <div className="flex items-start space-x-4">
                      <div className="text-primary/60 text-sm font-mono min-w-[24px]">
                        {feature.number}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-medium text-foreground">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanFeaturesSection;
