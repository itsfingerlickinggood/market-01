
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MinimalPriceSparklineProps {
  data: { day: string; price: number }[];
  change: number;
  className?: string;
}

const MinimalPriceSparkline = ({ data, change, className = "" }: MinimalPriceSparklineProps) => {
  const isPositive = change >= 0;
  const chartColor = "#3b82f6"; // Single blue color for all charts
  
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">7-day trend</span>
        <div className={`flex items-center gap-1 text-xs ${
          isPositive ? 'text-red-600' : 'text-green-600'
        }`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(change).toFixed(1)}%
        </div>
      </div>
      
      {/* Sparkline Chart */}
      <div className="h-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={chartColor} 
              strokeWidth={1.5}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MinimalPriceSparkline;
