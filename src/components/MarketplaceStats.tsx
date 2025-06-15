
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Zap, DollarSign, Globe, Clock, Shield } from "lucide-react";

const MarketplaceStats = () => {
  const stats = [
    {
      title: "Active GPUs",
      value: "2,847",
      change: "+12.5%",
      icon: Zap,
      description: "Available for rent",
      color: "text-blue-600"
    },
    {
      title: "Avg Price",
      value: "$1.23/hr",
      change: "-8.2%",
      icon: DollarSign,
      description: "Across all providers",
      color: "text-green-600"
    },
    {
      title: "Global Providers",
      value: "47",
      change: "+5.1%",
      icon: Globe,
      description: "Worldwide coverage",
      color: "text-purple-600"
    },
    {
      title: "Avg Response",
      value: "12ms",
      change: "-15.3%",
      icon: Clock,
      description: "API response time",
      color: "text-orange-600"
    },
    {
      title: "Uptime",
      value: "99.9%",
      change: "+0.1%",
      icon: Shield,
      description: "Service reliability",
      color: "text-emerald-600"
    },
    {
      title: "Cost Savings",
      value: "68%",
      change: "+23.1%",
      icon: TrendingUp,
      description: "vs traditional cloud",
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-semibold mb-4">Marketplace Overview</h3>
        <p className="text-lg text-muted-foreground">
          Real-time insights into the global GPU rental market
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  <span className={`text-xs font-medium ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MarketplaceStats;
