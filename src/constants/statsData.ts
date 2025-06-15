
import { 
  Cpu,
  Building2,
  Server,
  DollarSign,
  Clock,
  Users
} from "lucide-react";
import { generateSparklineData } from "@/utils/sparklineData";

export const statsConfig = [
  {
    title: "GPU Models Tracked",
    value: "247",
    change: "+18%",
    trend: "up" as const,
    icon: Cpu,
    description: "across all providers",
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
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

export const getStatsWithSparklines = () => {
  return statsConfig.map(stat => ({
    ...stat,
    sparklineData: generateSparklineData(stat.trend),
  }));
};
