
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Provider } from "@/types/gpu-comparison";

interface PriceHistoryChartProps {
  providers: Provider[];
  combinedData: any[];
}

const PriceHistoryChart = ({ providers, combinedData }: PriceHistoryChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History Comparison (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [`$${value.toFixed(3)}/hr`, name]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Legend />
              {providers.map((provider) => (
                <Line
                  key={provider.id}
                  type="monotone"
                  dataKey={provider.name}
                  stroke={provider.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceHistoryChart;
