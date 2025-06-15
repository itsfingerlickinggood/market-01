
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { AlertTriangle, CheckCircle, Info, Star } from "lucide-react";

const QuickInsights = () => {
  const insights = [
    {
      type: "alert",
      icon: AlertTriangle,
      title: "High Demand Alert",
      message: "RTX 4090 availability down 15% this week",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200"
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "New Provider Added",
      message: "Lambda Labs now available in Asia-Pacific region",
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200"
    },
    {
      type: "info",
      icon: Info,
      title: "Market Trend",
      message: "AI training workloads increased 34% this month",
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200"
    }
  ];

  const providerPopularity = [
    { name: "VastAI", usage: 34, growth: "+12%" },
    { name: "RunPod", usage: 28, growth: "+8%" },
    { name: "Lambda Labs", usage: 22, growth: "+15%" },
    { name: "Paperspace", usage: 16, growth: "+5%" }
  ];

  const priceData = Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    price: 1.2 + Math.sin(i * 0.5) * 0.3 + Math.random() * 0.1
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div 
                key={index} 
                className={`p-3 rounded-lg border ${insight.bgColor}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-4 w-4 mt-0.5 ${insight.color}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {insight.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Provider Popularity */}
      <Card>
        <CardHeader>
          <CardTitle>Provider Popularity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {providerPopularity.map((provider, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{provider.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {provider.growth}
                  </Badge>
                  <span className="text-muted-foreground">{provider.usage}%</span>
                </div>
              </div>
              <Progress value={provider.usage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Trend */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>7-Day Average Price Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>7 days ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickInsights;
