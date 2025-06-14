
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const chartConfig = {
  performance: {
    label: "Performance Score",
    color: "hsl(var(--chart-1))",
  },
  utilization: {
    label: "Utilization %",
    color: "hsl(var(--chart-2))",
  },
} as const;

const PerformanceChart = () => {
  const data = [
    { model: "RTX 4090", performance: 95, utilization: 88 },
    { model: "RTX 4080", performance: 87, utilization: 82 },
    { model: "RTX 3090", performance: 78, utilization: 76 },
    { model: "RTX 3080", performance: 72, utilization: 71 },
    { model: "RTX 3070", performance: 65, utilization: 68 },
    { model: "RTX 3060", performance: 58, utilization: 64 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>GPU Performance & Utilization</CardTitle>
        <CardDescription>
          Performance scores and utilization rates by GPU model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="performance"
                fill="var(--color-performance)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="utilization"
                fill="var(--color-utilization)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
