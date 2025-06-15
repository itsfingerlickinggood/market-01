
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

interface PriceMonitoringCardProps {
  gpu: any;
}

const PriceMonitoringCard = ({ gpu }: PriceMonitoringCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          Price Monitoring for {gpu.gpu_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">
              ${(gpu.dph_total || 1.0).toFixed(3)}
            </div>
            <div className="text-sm text-muted-foreground">Current Price/Hour</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-500">
              ${((gpu.dph_total || 1.0) * 0.85).toFixed(3)}
            </div>
            <div className="text-sm text-muted-foreground">7-Day Low</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-red-500">
              ${((gpu.dph_total || 1.0) * 1.15).toFixed(3)}
            </div>
            <div className="text-sm text-muted-foreground">7-Day High</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceMonitoringCard;
