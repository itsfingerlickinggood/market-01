
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Code2, Package, Wrench } from "lucide-react";
import { SoftwareEnvironment } from "@/data/providerCatalog";

interface SoftwareEnvironmentSectionProps {
  software: SoftwareEnvironment;
}

const SoftwareEnvironmentSection = ({ software }: SoftwareEnvironmentSectionProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-green-500" />
          Software & Environment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Operating System */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Monitor className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Operating System</span>
          </div>
          <div className="flex flex-wrap gap-1 pl-6">
            {software.os.map((os) => (
              <Badge key={os} variant="outline" className="text-xs">
                {os}
              </Badge>
            ))}
          </div>
        </div>

        {/* CUDA Versions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="font-medium">CUDA Versions</span>
          </div>
          <div className="flex flex-wrap gap-1 pl-6">
            {software.cudaVersions.map((version) => (
              <Badge key={version} variant="secondary" className="text-xs">
                CUDA {version}
              </Badge>
            ))}
          </div>
        </div>

        {/* Pre-configured Templates */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Package className="h-4 w-4 text-purple-500" />
            <span className="font-medium">Templates</span>
          </div>
          <div className="space-y-1 pl-6">
            {software.preConfiguredTemplates.map((template) => (
              <div key={template} className="text-sm text-muted-foreground">
                • {template}
              </div>
            ))}
          </div>
        </div>

        {/* Development Tools */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="h-4 w-4 text-orange-500" />
            <span className="font-medium">Development Tools</span>
          </div>
          <div className="space-y-1 pl-6">
            {software.developmentTools.map((tool) => (
              <div key={tool} className="text-sm text-muted-foreground">
                • {tool}
              </div>
            ))}
          </div>
        </div>

        {/* Container Support */}
        <div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${software.containerSupport ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="font-medium">Container Support</span>
            <Badge 
              className={software.containerSupport ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
            >
              {software.containerSupport ? 'Supported' : 'Not Supported'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoftwareEnvironmentSection;
