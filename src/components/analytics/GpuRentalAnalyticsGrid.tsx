
import { Badge } from "@/components/ui/badge";
import { Activity, Sparkles } from "lucide-react";
import GpuRentalCard from "./GpuRentalCard";
import { gpuRentalsData } from "@/utils/gpuRentalData";

const GpuRentalAnalyticsGrid = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            GPU Rental Market
          </h2>
          <p className="text-muted-foreground text-lg">Real-time pricing and availability across providers</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            <Activity className="h-3 w-3 mr-1 animate-pulse" />
            Live Data
          </Badge>
          <Badge variant="outline" className="border-primary/20 text-primary">
            <Sparkles className="h-3 w-3 mr-1" />
            6 Providers
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gpuRentalsData.map((gpu) => (
          <GpuRentalCard key={gpu.id} gpu={gpu} />
        ))}
      </div>
    </div>
  );
};

export default GpuRentalAnalyticsGrid;
