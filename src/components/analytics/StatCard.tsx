
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  description: string;
  sparklineData: Array<{ value: number }>;
  color: string;
  bgColor: string;
}

const StatCard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
  sparklineData,
  color,
  bgColor,
}: StatCardProps) => {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  
  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-card/95 via-card/98 to-card backdrop-blur-xl border-border/60 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-3 rounded-xl ${bgColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold">{value}</div>
          <div className="h-12 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color.replace('text-', '')}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{description}</p>
          <Badge 
            variant="secondary" 
            className={`flex items-center gap-1 ${
              trend === 'up' 
                ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                : 'text-red-600 bg-red-100 dark:bg-red-900/20'
            }`}
          >
            <TrendIcon className="h-3 w-3" />
            {change}
          </Badge>
        </div>
        
        <Progress 
          value={Math.abs(parseInt(change.replace('%', '').replace('+', '')))} 
          className="h-2"
        />
      </CardContent>
    </Card>
  );
};

export default StatCard;
