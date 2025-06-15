
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface GpuCardActionsProps {
  priceChange: string;
  trend: "up" | "down";
  availability: string;
}

const GpuCardActions = ({ priceChange, trend, availability }: GpuCardActionsProps) => {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  
  return (
    <div className="flex items-center justify-between pt-2">
      <Badge 
        variant="secondary" 
        className={`flex items-center gap-1 ${
          trend === 'up' 
            ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
            : 'text-red-600 bg-red-100 dark:bg-red-900/20'
        }`}
      >
        <TrendIcon className="h-3 w-3" />
        {priceChange}
      </Badge>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Compare
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="h-7 text-xs bg-primary hover:bg-primary/90"
          disabled={availability !== 'available'}
        >
          {availability === 'available' ? 'Rent Now' : 'Limited'}
        </Button>
      </div>
    </div>
  );
};

export default GpuCardActions;
