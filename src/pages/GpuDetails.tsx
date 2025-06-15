
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Share2, Heart, Bell, ExternalLink, Menu, ChevronRight } from "lucide-react";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { useToast } from "@/hooks/use-toast";
import ModernGpuHero from "@/components/ModernGpuHero";
import ModernSpecsSection from "@/components/ModernSpecsSection";
import ModernProviderComparison from "@/components/ModernProviderComparison";
import ModernDeploymentWizard from "@/components/ModernDeploymentWizard";
import ModernPriceAlerts from "@/components/ModernPriceAlerts";

interface PlatformProvider {
  name: string;
  price: number;
  status: 'available' | 'limited' | 'unavailable';
  url: string;
  logo: string;
  setupTime: string;
  reliability: number;
  features: string[];
}

const generateProviderData = (basePrice: number): PlatformProvider[] => {
  const providers = [
    { name: 'Vast.ai', multiplier: 1.0, url: 'https://vast.ai', logo: '🟢', setupTime: '2-5 min', reliability: 85 },
    { name: 'RunPod', multiplier: 1.1, url: 'https://runpod.io', logo: '🟣', setupTime: '1-3 min', reliability: 92 },
    { name: 'Lambda Labs', multiplier: 1.2, url: 'https://lambdalabs.com', logo: '🟡', setupTime: '2-4 min', reliability: 88 },
    { name: 'Paperspace', multiplier: 1.15, url: 'https://paperspace.com', logo: '🔴', setupTime: '1-2 min', reliability: 80 },
    { name: 'CoreWeave', multiplier: 0.9, url: 'https://coreweave.com', logo: '⚫', setupTime: '10-20 min', reliability: 95 },
    { name: 'Genesis Cloud', multiplier: 0.95, url: 'https://genesiscloud.com', logo: '🔵', setupTime: '5-10 min', reliability: 87 }
  ];

  return providers.map((provider) => {
    const price = Number((basePrice * provider.multiplier * (0.85 + Math.random() * 0.3)).toFixed(3));
    const status = Math.random() > 0.7 ? 'unavailable' : Math.random() > 0.5 ? 'limited' : 'available';
    
    return {
      name: provider.name,
      price,
      status,
      url: provider.url,
      logo: provider.logo,
      setupTime: provider.setupTime,
      reliability: provider.reliability,
      features: ['GPU Optimization', 'Auto-scaling', 'API Access']
    };
  });
};

const GpuDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: offers } = useVastAiOffers();
  const { toast } = useToast();
  const [gpu, setGpu] = useState<any>(null);
  const [providerData, setProviderData] = useState<PlatformProvider[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasAlert, setHasAlert] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (offers && id) {
      const foundGpu = offers.find(offer => offer.id === parseInt(id));
      setGpu(foundGpu);
      
      if (foundGpu) {
        const providers = generateProviderData(foundGpu.dph_total || 1.0);
        setProviderData(providers);
      }
    }
  }, [offers, id]);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited 
        ? "This GPU has been removed from your favorites." 
        : "This GPU has been added to your favorites.",
    });
  };

  const handleAlert = () => {
    setHasAlert(!hasAlert);
    toast({
      title: hasAlert ? "Alert removed" : "Price alert set",
      description: hasAlert 
        ? "You will no longer receive price alerts for this GPU." 
        : "You'll be notified when the price changes.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "GPU details link has been copied to your clipboard.",
    });
  };

  if (!gpu) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">GPU not found</p>
          <Link to="/marketplace">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const navigationSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specifications' },
    { id: 'providers', label: 'Providers' },
    { id: 'deployment', label: 'Deploy' },
    { id: 'alerts', label: 'Alerts' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Navigation Header */}
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
              
              {/* Breadcrumb */}
              <nav className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link to="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground font-medium">{gpu.gpu_name}</span>
              </nav>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleFavorite}
                className={isFavorited ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleAlert}
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
                        onClick={() => setActiveSection(section.id)}
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

      {/* Hero Section */}
      <ModernGpuHero gpu={gpu} />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
                Navigation
              </h3>
              {navigationSections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.label}
                </Button>
              ))}
            </div>
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-9">
            <div className="space-y-8">
              {activeSection === 'overview' && (
                <div className="space-y-8">
                  <ModernSpecsSection gpu={gpu} />
                  <ModernProviderComparison providers={providerData.slice(0, 3)} />
                </div>
              )}
              
              {activeSection === 'specs' && (
                <ModernSpecsSection gpu={gpu} detailed />
              )}
              
              {activeSection === 'providers' && (
                <ModernProviderComparison providers={providerData} />
              )}
              
              {activeSection === 'deployment' && (
                <ModernDeploymentWizard gpu={gpu} />
              )}
              
              {activeSection === 'alerts' && (
                <ModernPriceAlerts gpu={gpu} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default GpuDetails;
