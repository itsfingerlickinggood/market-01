
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Heart, Bell, ExternalLink } from "lucide-react";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CompactGpuHeader from "@/components/CompactGpuHeader";
import CompactPricingSection from "@/components/CompactPricingSection";
import CompactSpecsSection from "@/components/CompactSpecsSection";

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
    { name: 'Genesis Cloud', multiplier: 0.95, url: 'https://genesiscloud.com', logo: '🔵', setupTime: '5-10 min', reliability: 87 },
    { name: 'AWS EC2', multiplier: 1.5, url: 'https://aws.amazon.com', logo: '🟧', setupTime: '5-10 min', reliability: 99 },
    { name: 'Google Cloud', multiplier: 1.4, url: 'https://cloud.google.com', logo: '🔵', setupTime: '3-8 min', reliability: 98 }
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
  const [gpu, setGpu] = useState<any>(null);
  const [providerData, setProviderData] = useState<PlatformProvider[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasAlert, setHasAlert] = useState(false);

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

  if (!gpu) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground">GPU not found</p>
            <Link to="/marketplace">
              <Button variant="outline" className="mt-4" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <Link to="/marketplace">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-3 w-3 mr-1" />
                Back
              </Button>
            </Link>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`h-3 w-3 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setHasAlert(!hasAlert)}
              >
                <Bell className={`h-3 w-3 ${hasAlert ? 'fill-yellow-500 text-yellow-500' : ''}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-3 w-3" />
              </Button>
              <Link to={`/gpu/${id}/compare`}>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-xs">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/marketplace" className="text-xs">Marketplace</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs">{gpu.gpu_name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Compact Hero Section */}
      <CompactGpuHeader gpu={gpu} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left Column - Pricing */}
          <div className="lg:col-span-2">
            <CompactPricingSection gpu={gpu} providerData={providerData} />
          </div>

          {/* Right Column - Specs */}
          <div>
            <CompactSpecsSection gpu={gpu} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GpuDetails;
