
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Heart, Bell, Share2, ExternalLink } from "lucide-react";

interface CleanGpuHeaderProps {
  gpu: any;
  enhancedData: any;
  isFavorited: boolean;
  hasAlert: boolean;
  activeSection: string;
  onFavorite: () => void;
  onAlert: () => void;
  onShare: () => void;
  onSectionChange: (section: string) => void;
}

const CleanGpuHeader = ({
  gpu,
  enhancedData,
  isFavorited,
  hasAlert,
  activeSection,
  onFavorite,
  onAlert,
  onShare,
  onSectionChange
}: CleanGpuHeaderProps) => {
  const provider = enhancedData?.provider;
  const pricing = enhancedData?.pricing;

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specs' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'provider', label: 'Provider' },
    { id: 'deploy', label: 'Deploy' }
  ];

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        {/* Navigation */}
        <div className="flex items-center gap-3 mb-3">
          <Link to="/marketplace">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back
            </Button>
          </Link>
          <div className="text-xs text-muted-foreground">
            <span>Marketplace</span>
            <span className="mx-1">/</span>
            <span>{gpu.gpu_name}</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {provider && <span className="text-lg">{provider.logo}</span>}
              <h1 className="text-xl font-semibold">{gpu.gpu_name}</h1>
              {provider && (
                <Badge variant="outline" className="text-xs h-5">
                  {provider.name}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{enhancedData?.location}</span>
              <span>•</span>
              <span className="text-green-600">{gpu.rentable !== false ? 'Available' : 'Unavailable'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-right mr-3">
              <div className="text-lg font-bold">${pricing?.hourly?.toFixed(3) || '0.000'}/hr</div>
              <div className="text-xs text-muted-foreground">~${Math.round((pricing?.hourly || 0) * 24)}/day</div>
            </div>
            <Button size="sm" disabled={gpu.rentable === false}>
              {gpu.rentable !== false ? 'Deploy' : 'Unavailable'}
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={onFavorite}>
              <Heart className={`h-3 w-3 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={onAlert}>
              <Bell className={`h-3 w-3 ${hasAlert ? 'fill-current text-yellow-500' : ''}`} />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={onShare}>
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeSection} onValueChange={onSectionChange}>
          <TabsList className="grid w-full grid-cols-5 h-8">
            {sections.map((section) => (
              <TabsTrigger 
                key={section.id} 
                value={section.id}
                className="text-xs h-6"
              >
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default CleanGpuHeader;
