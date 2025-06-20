
import { TrendingUp, Zap, Users, Globe } from "lucide-react";

const MinimalMetricsSection = () => {
  const metrics = [
    { icon: Globe, label: "A100", value: "$0.79/HR", subtext: "80GB" },
    { icon: Zap, label: "RTX 4090", value: "$0.32/HR", subtext: "24GB" },
    { icon: Users, label: "H100", value: "$2.41/HR", subtext: "80GB" },
    { icon: TrendingUp, label: "RTX 3090", value: "$0.19/HR", subtext: "24GB" },
  ];

  return (
    <div className="py-12 border-t border-border/20">
      <div className="container mx-auto px-4">
        {/* Live pricing ticker */}
        <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between overflow-x-auto">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="flex items-center space-x-3 min-w-[120px]">
                  <div className="text-green-400 text-sm font-mono">
                    {metric.label}
                  </div>
                  <div className="text-green-400 font-mono font-semibold">
                    {metric.value}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {metric.subtext}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Proud to be backed by leading builders and investors.
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-xs font-medium text-muted-foreground">TRUSTED BY 10K+ DEVELOPERS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalMetricsSection;
