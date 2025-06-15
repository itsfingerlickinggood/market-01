
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Lightbulb,
  Star,
  Zap,
  CheckCircle
} from "lucide-react";

const SmartInsightsPanel = () => {
  const insights = [
    {
      type: "prediction",
      icon: Brain,
      title: "AI Prediction",
      message: "RTX 4090 demand will spike 35% next week based on upcoming game releases",
      confidence: 89,
      action: "Set Price Alert",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      type: "optimization",
      icon: Target,
      title: "Cost Optimization",
      message: "You could save $180/month by switching to alternative providers for AI training workloads",
      confidence: 94,
      action: "View Alternatives",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      type: "anomaly",
      icon: AlertTriangle,
      title: "Market Anomaly",
      message: "RTX 3080 prices dropped 12% below historical average - potential buying opportunity",
      confidence: 76,
      action: "Investigate",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800"
    },
    {
      type: "recommendation",
      icon: Star,
      title: "Personalized Match",
      message: "Based on your research, RTX 4070 Ti matches 97% of your requirements at optimal price point",
      confidence: 97,
      action: "View Details",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800"
    }
  ];

  const marketTrends = [
    { category: "Gaming GPUs", trend: "+12%", confidence: 85 },
    { category: "AI Training", trend: "+28%", confidence: 92 },
    { category: "Mining Cards", trend: "-8%", confidence: 78 },
    { category: "Professional", trend: "+15%", confidence: 88 }
  ];

  const recommendations = [
    {
      title: "Optimal Purchase Window",
      description: "Best time to buy: Next Tuesday 2-4 PM EST",
      impact: "Save up to $120",
      icon: CheckCircle
    },
    {
      title: "Alternative Providers",
      description: "3 providers offer better rates for your workload",
      impact: "25% cost reduction",
      icon: Lightbulb
    },
    {
      title: "Performance Upgrade",
      description: "RTX 4080 offers 40% better price/performance",
      impact: "Better value",
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* AI Insights */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Generated Insights
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Zap className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </CardTitle>
          <CardDescription>Machine learning-powered market analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${insight.bgColor} ${insight.borderColor} hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-background/50 ${insight.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {insight.message}
                    </p>
                    <Progress value={insight.confidence} className="h-1.5" />
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      {insight.action}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Market Trends & Recommendations */}
      <div className="space-y-6">
        {/* Market Trends */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Market Trends
            </CardTitle>
            <CardDescription>Real-time category performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="space-y-1">
                  <span className="font-medium text-sm">{trend.category}</span>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        trend.trend.startsWith('+') 
                          ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                          : 'text-red-600 bg-red-100 dark:bg-red-900/20'
                      }`}
                    >
                      {trend.trend}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {trend.confidence}% confidence
                    </span>
                  </div>
                </div>
                <Progress value={trend.confidence} className="w-16 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Smart Recommendations */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Smart Recommendations
            </CardTitle>
            <CardDescription>Personalized action items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="p-1.5 rounded bg-primary/10">
                    <Icon className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground">{rec.description}</p>
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      {rec.impact}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartInsightsPanel;
