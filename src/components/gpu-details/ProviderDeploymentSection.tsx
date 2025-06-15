
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Clock, Code, Terminal, PlayCircle, FileText } from "lucide-react";

interface ProviderDeploymentSectionProps {
  gpu: any;
  enhancedData: any;
}

const ProviderDeploymentSection = ({ gpu, enhancedData }: ProviderDeploymentSectionProps) => {
  const provider = enhancedData.provider;

  return (
    <div className="space-y-6">
      {/* Quick Deploy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-500" />
            Quick Deployment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">{provider.setupTime}</div>
            <div className="text-muted-foreground">Average setup time</div>
            <Button size="lg" className="w-full max-w-md">
              <PlayCircle className="h-4 w-4 mr-2" />
              Deploy {gpu.gpu_name} Now
            </Button>
          </div>

          {/* Deployment Steps */}
          <div className="space-y-4">
            <h4 className="font-semibold">Deployment Process</h4>
            <div className="space-y-3">
              {[
                { step: 1, title: "Configure Instance", time: "30 seconds", description: "Select your preferred configuration and region" },
                { step: 2, title: "Payment Setup", time: "1 minute", description: "Add payment method and confirm billing" },
                { step: 3, title: "Instance Launch", time: provider.setupTime, description: "Automatic provisioning and setup" },
                { step: 4, title: "Ready to Use", time: "Immediate", description: "SSH access and GPU available" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{item.title}</span>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.time}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-green-500" />
            Configuration Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OS Templates */}
          <div className="space-y-3">
            <h4 className="font-semibold">Operating Systems</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {provider.osTemplates?.map((os: string, index: number) => (
                <Badge key={index} variant="outline" className="justify-center">
                  {os}
                </Badge>
              ))}
            </div>
          </div>

          {/* Pre-installed Frameworks */}
          <div className="space-y-3">
            <h4 className="font-semibold">AI/ML Frameworks</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {provider.frameworks?.map((framework: string, index: number) => (
                <Badge key={index} variant="secondary" className="justify-center">
                  {framework}
                </Badge>
              ))}
            </div>
          </div>

          {/* Development Tools */}
          <div className="space-y-3">
            <h4 className="font-semibold">Development Tools</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {provider.tools?.map((tool: string, index: number) => (
                <Badge key={index} variant="outline" className="justify-center">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API & Automation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-purple-500" />
            API & Automation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">API Access</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>REST API:</span>
                  <span className="font-medium text-green-600">Available</span>
                </div>
                <div className="flex justify-between">
                  <span>CLI Tools:</span>
                  <span className="font-medium text-green-600">Available</span>
                </div>
                <div className="flex justify-between">
                  <span>Terraform:</span>
                  <span className="font-medium text-green-600">Supported</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate Limits:</span>
                  <span className="font-medium">1000/hour</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Integration</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Webhooks:</span>
                  <span className="font-medium text-green-600">Supported</span>
                </div>
                <div className="flex justify-between">
                  <span>Monitoring APIs:</span>
                  <span className="font-medium text-green-600">Available</span>
                </div>
                <div className="flex justify-between">
                  <span>Auto-scaling:</span>
                  <span className="font-medium text-green-600">Available</span>
                </div>
                <div className="flex justify-between">
                  <span>Load Balancing:</span>
                  <span className="font-medium text-blue-600">Premium</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              API Documentation
            </Button>
            <Button variant="outline" className="flex-1">
              <Terminal className="h-4 w-4 mr-2" />
              CLI Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderDeploymentSection;
