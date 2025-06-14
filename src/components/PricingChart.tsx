
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const chartConfig = {
  rtx4090: {
    label: "RTX 4090",
    color: "hsl(var(--chart-1))",
  },
  rtx4080: {
    label: "RTX 4080",
    color: "hsl(var(--chart-2))",
  },
  rtx3090: {
    label: "RTX 3090",
    color: "hsl(var(--chart-3))",
  },
} as const;

const PricingChart = () => {
  const data = [
    { time: "00:00", rtx4090: 2.5, rtx4080: 1.8, rtx3090: 1.2 },
    { time: "04:00", rtx4090: 2.3, rtx4080: 1.7, rtx3090: 1.1 },
    { time: "08:00", rtx4090: 2.8, rtx4080: 2.1, rtx3090: 1.4 },
    { time: "12:00", rtx4090: 3.2, rtx4080: 2.4, rtx3090: 1.6 },
    { time: "16:00", rtx4090: 3.5, rtx4080: 2.6, rtx3090: 1.7 },
    { time: "20:00", rtx4090: 3.1, rtx4080: 2.3, rtx3090: 1.5 },
    { time: "24:00", rtx4090: 2.7, rtx4080: 2.0, rtx3090: 1.3 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>GPU Rental Pricing Trends</CardTitle>
        <CardDescription>
          Hourly pricing trends for popular GPU models ($/hour)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="rtx4090"
                stroke="var(--color-rtx4090)"
                strokeWidth={2}
                dot={{ fill: "var(--color-rtx4090)" }}
              />
              <Line
                type="monotone"
                dataKey="rtx4080"
                stroke="var(--color-rtx4080)"
                strokeWidth={2}
                dot={{ fill: "var(--color-rtx4080)" }}
              />
              <Line
                type="monotone"
                dataKey="rtx3090"
                stroke="var(--color-rtx3090)"
                strokeWidth={2}
                dot={{ fill: "var(--color-rtx3090)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PricingChart;
