
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { 
  Search, 
  GitCompare, 
  DollarSign, 
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Cpu,
  Server,
  Building2,
  Users,
  Zap
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
      title: "GPU Models Tracked",
      value: "247",
      change: "+18%",
      trend: "up" as const,
      icon: Cpu,
      description: "across all providers",
      sparklineData: generateSparklineData('up'),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Provider Networks",
      value: "24",
      change: "+3",
      trend: "up" as const,
      icon: Building2,
      description: "connected platforms",
      sparklineData: generateSparklineData('up'),
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Active Rentals",
      value: "1,834",
      change: "+22%",
      trend: "up" as const,
      icon: Server,
      description: "currently running",
      sparklineData: generateSparklineData('up'),
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total Market Value",
      value: "$2.4M",
      change: "+42%",
      trend: "up" as const,
      icon: DollarSign,
      description: "hourly rental capacity",
      sparklineData: generateSparklineData('up'),
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Avg Session Time",
      value: "6.2h",
      change: "-12%",
      trend: "down" as const,
      icon: Clock,
      description: "per rental session",
      sparklineData: generateSparklineData('down'),
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Active Users",
      value: "12.8K",
      change: "+28%",
      trend: "up" as const,
      icon: Users,
      description: "monthly active",
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
            className="group relative overflow-hidden bg-gradient-to-br from-card/95 via-card/98 to-card backdrop-blur-xl border-border/60 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5"
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-3 rounded-xl ${stat.bgColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="h-12 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stat.sparklineData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={stat.color.replace('text-', '')}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.description}</p>
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
                value={Math.abs(parseInt(stat.change.replace('%', '').replace('+', '')))} 
                className="h-2"
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InteractiveStatsGrid;
