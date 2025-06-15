
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { 
  Search, 
  Compare, 
  DollarSign, 
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye
} from "lucide-react";

const InteractiveStatsGrid = () => {
  const generateSparklineData = (trend: 'up' | 'down' | 'stable') => {
    const baseValue = 50;
    return Array.from({ length: 12 }, (_, i) => {
      let value = baseValue;
      if (trend === 'up') {
        value += i * 2 + Math.random() * 10;
      } else if (trend === 'down') {
        value -= i * 1.5 + Math.random() * 8;
      } else {
        value += Math.sin(i * 0.5) * 5 + Math.random() * 6;
      }
      return { value };
    });
  };

  const stats = [
    {
      title: "Total Searches",
      value: "2,847",
      change: "+23%",
      trend: "up" as const,
      icon: Search,
      description: "vs last month",
      sparklineData: generateSparklineData('up'),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "GPU Comparisons",
      value: "1,234",
      change: "+18%",
      trend: "up" as const,
      icon: Compare,
      description: "active comparisons",
      sparklineData: generateSparklineData('up'),
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Time Spent",
      value: "127h",
      change: "+12%",
      trend: "up" as const,
      icon: Clock,
      description: "research time",
      sparklineData: generateSparklineData('up'),
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Money Saved",
      value: "$4,580",
      change: "+34%",
      trend: "up" as const,
      icon: DollarSign,
      description: "through research",
      sparklineData: generateSparklineData('up'),
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Active Sessions",
      value: "89",
      change: "-5%",
      trend: "down" as const,
      icon: Activity,
      description: "current active",
      sparklineData: generateSparklineData('down'),
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Page Views",
      value: "15.2k",
      change: "+8%",
      trend: "up" as const,
      icon: Eye,
      description: "this month",
      sparklineData: generateSparklineData('up'),
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card 
            key={index}
            className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm border-border/60 hover:shadow-lg hover:shadow-primary/5"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor} transition-all duration-300 group-hover:scale-110`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="h-12 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stat.sparklineData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={stat.color.replace('text-', '#')}
                        strokeWidth={2}
                        dot={false}
                        activeDot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <Badge 
                  variant="secondary" 
                  className={`flex items-center gap-1 ${
                    stat.trend === 'up' 
                      ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                      : 'text-red-600 bg-red-100 dark:bg-red-900/20'
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {stat.change}
                </Badge>
              </div>
              
              <Progress 
                value={Math.abs(parseInt(stat.change.replace('%', '')))} 
                className="h-1.5"
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InteractiveStatsGrid;
