
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, Heart, Bell, Menu, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface EnhancedGpuDetailsHeaderProps {
  gpu: any;
  enhancedData: any;
  isFavorited: boolean;
  hasAlert: boolean;
  activeSection: string;
  navigationSections: Array<{ id: string; label: string; icon?: string }>;
  onFavorite: () => void;
  onAlert: () => void;
  onShare: () => void;
  onSectionChange: (section: string) => void;
}

const EnhancedGpuDetailsHeader = ({
  gpu,
  enhancedData,
  isFavorited,
  hasAlert,
  activeSection,
  navigationSections,
  onFavorite,
  onAlert,
  onShare,
  onSectionChange
}: EnhancedGpuDetailsHeaderProps) => {
  const provider = enhancedData?.provider;

  const getTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'verified': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'community': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/marketplace">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            
            {/* Enhanced Breadcrumb with Provider */}
            <nav className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
              <ChevronRight className="h-3 w-3" />
              {provider && (
                <>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{provider.logo}</span>
                    <span className="hover:text-foreground transition-colors">{provider.name}</span>
                  </span>
                  <ChevronRight className="h-3 w-3" />
                </>
              )}
              <span className="text-foreground font-medium">{gpu.gpu_name}</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Provider Tier Badge */}
            {provider && (
              <Badge className={getTierColor(provider.tier)}>
                {provider.tier}
              </Badge>
            )}
            
            <Button variant="ghost" size="sm" onClick={onShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onFavorite}
              className={isFavorited ? "text-red-500" : ""}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onAlert}
              className={hasAlert ? "text-yellow-500" : ""}
            >
              <Bell className={`h-4 w-4 ${hasAlert ? 'fill-current' : ''}`} />
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="space-y-2 mt-8">
                  {navigationSections.map((section) => (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => onSectionChange(section.id)}
                    >
                      {section.label}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EnhancedGpuDetailsHeader;
