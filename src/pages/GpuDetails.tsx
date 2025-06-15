import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import TCOCalculator from "@/components/TCOCalculator";
import UserReviews from "@/components/UserReviews";
import DeploymentTemplates from "@/components/DeploymentTemplates";
import TerraformIntegration from "@/components/TerraformIntegration";

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

  const handleDeploy = (template: any) => {
    console.log("Deploying template:", template);
    // Deploy logic would go here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-3">
            <Link to="/marketplace">
              <Button variant="outline" size="sm" className="flex items-center gap-2 shadow-sm">
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back</span>
              </Button>
            </Link>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className="shadow-sm"
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setHasAlert(!hasAlert)}
                className="shadow-sm"
              >
                <Bell className={`h-4 w-4 ${hasAlert ? 'fill-yellow-500 text-yellow-500' : ''}`} />
              </Button>
              <Button variant="outline" size="sm" className="shadow-sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Link to={`/gpu/${id}/compare`}>
                <Button variant="outline" size="sm" className="shadow-sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-sm font-medium">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/marketplace" className="text-sm font-medium">Marketplace</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium">{gpu.gpu_name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Compact Hero Section */}
      <CompactGpuHeader gpu={gpu} />

      {/* Main Content with Tabs */}
      <main className="container mx-auto px-6 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & TCO</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
            <TabsTrigger value="terraform">Terraform</TabsTrigger>
            <TabsTrigger value="specs">Full Specs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <CompactPricingSection gpu={gpu} providerData={providerData} />
              </div>
              <div className="lg:col-span-2">
                <CompactSpecsSection gpu={gpu} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <TCOCalculator 
              hourlyRate={gpu.dph_total || 1.0}
              gpuName={gpu.gpu_name}
              provider={gpu.datacenter || "Unknown"}
              hasZeroEgress={true}
            />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <UserReviews 
              gpuId={gpu.id}
              averageRating={4.2}
              totalReviews={23}
            />
          </TabsContent>

          <TabsContent value="deploy" className="space-y-6">
            <DeploymentTemplates 
              gpuVram={gpu.gpu_ram || 24}
              gpuName={gpu.gpu_name}
              onDeploy={handleDeploy}
            />
          </TabsContent>

          <TabsContent value="terraform" className="space-y-6">
            <TerraformIntegration 
              gpuName={gpu.gpu_name}
              providerId={gpu.datacenter || "unknown"}
              region={gpu.datacenter?.split(' ')[0] || "us-east"}
            />
          </TabsContent>

          <TabsContent value="specs" className="space-y-6">
            <CompactSpecsSection gpu={gpu} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GpuDetails;
