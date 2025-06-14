
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Zap, Clock } from "lucide-react";

const RentalStats = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,543",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Rentals",
      value: "2,847",
      change: "+8.2%",
      icon: Zap,
      color: "text-blue-600"
    },
    {
      title: "Avg. Rental Duration",
      value: "4.2 hours",
      change: "-2.1%",
      icon: Clock,
      color: "text-purple-600"
    },
    {
      title: "Performance Index",
      value: "94.8%",
      change: "+5.7%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RentalStats;
