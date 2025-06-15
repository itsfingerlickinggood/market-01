
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const MinimalMetricsSection = () => {
  const metrics = [
    {
      label: "GPU Models",
      value: "247+",
      change: "+18%",
      data: Array.from({ length: 12 }, (_, i) => ({ value: 50 + i * 3 + Math.sin(i) * 10 }))
    },
    {
      label: "Providers",
      value: "24",
      change: "+3",
      data: Array.from({ length: 12 }, (_, i) => ({ value: 20 + i * 1.5 + Math.cos(i) * 5 }))
    },
    {
      label: "Active Rentals",
      value: "1,834",
      change: "+22%",
      data: Array.from({ length: 12 }, (_, i) => ({ value: 100 + i * 8 + Math.sin(i * 0.8) * 15 }))
    }
  ];

  return (
    <div className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="border-border/40 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-medium">
                    {metric.label}
                  </span>
                  <span className="text-sm text-primary font-medium">
                    {metric.change}
                  </span>
                </div>
                
                <div className="text-3xl font-bold text-foreground">
                  {metric.value}
                </div>
                
                <div className="h-16 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metric.data}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={false}
                        strokeOpacity={0.8}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MinimalMetricsSection;
