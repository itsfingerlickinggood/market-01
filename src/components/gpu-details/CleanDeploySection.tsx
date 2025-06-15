
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Shield } from "lucide-react";

interface CleanDeploySectionProps {
  gpu: any;
  enhancedData: any;
}

const CleanDeploySection = ({ gpu, enhancedData }: CleanDeploySectionProps) => {
  const provider = enhancedData?.provider;
  const isAvailable = gpu.rentable !== false;

  return (
    <div className="space-y-3">
      {/* Quick Deploy */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Quick Deploy</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-medium">{gpu.gpu_name}</div>
              <div className="text-sm text-muted-foreground">
                via {provider?.name} • {enhancedData?.location}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">${enhancedData?.pricing?.hourly?.toFixed(3) || '0.000'}/hr</div>
              <div className="text-xs text-muted-foreground">Billed per minute</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={isAvailable ? "default" : "destructive"} className="text-xs h-5">
              {isAvailable ? "Available" : "Unavailable"}
            </Badge>
            {provider && (
              <Badge variant="outline" className="text-xs h-5">
                <Clock className="h-3 w-3 mr-1" />
                {provider.setupTime}
              </Badge>
            )}
          </div>
          
          <Button className="w-full" disabled={!isAvailable}>
            <Play className="h-4 w-4 mr-2" />
            {isAvailable ? 'Deploy Instance' : 'Currently Unavailable'}
          </Button>
        </CardContent>
      </Card>

      {/* Deployment Options */}
      <div className="grid md:grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Templates</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {provider?.osTemplates?.slice(0, 4).map((template: string, index: number) => (
                <Button key={index} variant="outline" size="sm" className="w-full h-7 text-xs justify-start">
                  {template}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Configuration</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">SSH Access</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Root Access</span>
              <span>Yes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Port Forwarding</span>
              <span>Available</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Custom Images</span>
              <span>Supported</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Compliance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {enhancedData?.compliance?.map((cert: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs h-5">
                {cert}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
            <div>
              <div className="text-muted-foreground">Network Security</div>
              <div>Firewall Protected</div>
            </div>
            <div>
              <div className="text-muted-foreground">Data Encryption</div>
              <div>AES-256</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CleanDeploySection;
