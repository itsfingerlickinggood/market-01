
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import GpuHeroSection from "@/components/GpuHeroSection";
import InteractivePricingDashboard from "@/components/InteractivePricingDashboard";
import EnhancedSpecsSection from "@/components/EnhancedSpecsSection";

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
      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground">GPU not found</p>
            <Link to="/marketplace">
              <Button variant="outline" className="mt-4">
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
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/marketplace">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Compare with</div>
              <Link to={`/gpu/${id}/compare`}>
                <Button variant="outline" size="sm">
                  View Comparison
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/marketplace">GPU Marketplace</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{gpu.gpu_name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Hero Section */}
      <GpuHeroSection gpu={gpu} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid xl:grid-cols-3 gap-8">
          {/* Left Column - Pricing Dashboard */}
          <div className="xl:col-span-2">
            <InteractivePricingDashboard gpu={gpu} providerData={providerData} />
          </div>

          {/* Right Column - Specs */}
          <div className="space-y-8">
            <EnhancedSpecsSection gpu={gpu} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GpuDetails;
