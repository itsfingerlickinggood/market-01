
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MiniPriceChartProps {
  data: { time: string; price: number }[];
  color?: string;
  isPositive?: boolean;
}

const MiniPriceChart = ({ data, color = "#ef4444", isPositive = false }: MiniPriceChartProps) => {
  const chartColor = isPositive ? "#10b981" : "#ef4444";
  
  return (
    <div className="w-16 h-8">
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
  );
};

export default MiniPriceChart;
