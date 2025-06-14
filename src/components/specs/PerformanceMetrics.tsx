
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Award, Monitor } from "lucide-react";

interface PerformanceMetricsProps {
  gpu: any;
}

const PerformanceMetrics = ({ gpu }: PerformanceMetricsProps) => {
  const performanceMetrics = [
    { name: "Gaming", score: 92, color: "bg-blue-500" },
    { name: "AI/ML Training", score: 88, color: "bg-green-500" },
    { name: "3D Rendering", score: 85, color: "bg-purple-500" },
    { name: "Video Editing", score: 90, color: "bg-orange-500" },
    { name: "Mining", score: 75, color: "bg-yellow-500" }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Performance Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{metric.name}</span>
                  <span className="text-sm font-bold">{metric.score}/100</span>
                </div>
                <Progress value={metric.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-semibold">Performance Score</span>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">
              {Math.round((gpu.reliability2 || 0.85) * 100)}/100
            </div>
            <p className="text-sm text-muted-foreground">
              Based on industry benchmarks and real-world testing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">Display Support</span>
            </div>
            <div className="space-y-2 text-sm">
              <div>• Up to 4x 8K displays @ 60Hz</div>
              <div>• HDR10+ and Dolby Vision</div>
              <div>• Hardware AV1 encoding/decoding</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
