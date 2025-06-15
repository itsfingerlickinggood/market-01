
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface GpuCardPricingProps {
  currentPrice: number;
  priceHistory: Array<{ hour: number; price: number }>;
  providerColor: string;
}

const GpuCardPricing = ({ currentPrice, priceHistory, providerColor }: GpuCardPricingProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-primary">${currentPrice.toFixed(2)}</span>
        <span className="text-sm text-muted-foreground">/hr</span>
      </div>
      
      <div className="h-12 w-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceHistory}>
            <Area
              type="monotone"
              dataKey="price"
              stroke={providerColor}
              fill={providerColor}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GpuCardPricing;
