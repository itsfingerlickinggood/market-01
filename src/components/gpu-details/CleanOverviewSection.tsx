
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CleanOverviewSectionProps {
  gpu: any;
  enhancedData: any;
}

const CleanOverviewSection = ({ gpu, enhancedData }: CleanOverviewSectionProps) => {
  const provider = enhancedData?.provider;
  const reliability = Math.round((gpu.reliability2 || gpu.reliability || 0.9) * 100);

  return (
    <div className="space-y-3">
      {/* Quick Specs */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Quick Specs</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">VRAM</div>
              <div className="font-medium">{gpu.gpu_ram || 24}GB</div>
            </div>
            <div>
              <div className="text-muted-foreground">CPU</div>
              <div className="font-medium">{gpu.cpu_cores || 16} cores</div>
            </div>
            <div>
              <div className="text-muted-foreground">RAM</div>
              <div className="font-medium">{gpu.cpu_ram || 64}GB</div>
            </div>
            <div>
              <div className="text-muted-foreground">Network</div>
              <div className="font-medium">{gpu.inet_down || "10Gbps"}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Performance</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Reliability</span>
              <span>{reliability}%</span>
            </div>
            <Progress value={reliability} className="h-1" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
            <div className="text-center">
              <div className="text-muted-foreground">AI/ML</div>
              <div className="font-medium text-green-600">Excellent</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Gaming</div>
              <div className="font-medium text-blue-600">Very Good</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Rendering</div>
              <div className="font-medium text-purple-600">Good</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provider Summary */}
      {provider && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="text-lg">{provider.logo}</span>
              {provider.name}
              <Badge variant="outline" className="text-xs h-5">
                {provider.tier}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground">Trust Score</div>
                <div className="font-medium">{provider.trustScore}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Setup Time</div>
                <div className="font-medium">{provider.setupTime}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {provider.features?.slice(0, 3).map((feature: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs h-5">
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CleanOverviewSection;
