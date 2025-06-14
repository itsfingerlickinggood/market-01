
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, Zap, Wifi, ExternalLink } from "lucide-react";
import CandlestickChart from "@/components/CandlestickChart";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";

interface PlatformPrice {
  platform: string;
  price: number;
  availability: 'available' | 'limited' | 'unavailable';
  url: string;
}

const generateMultiPlatformPrices = (basePrice: number, gpuModel: string): PlatformPrice[] => {
  const platforms = [
    { name: 'Vast.ai', multiplier: 1.0, url: 'https://vast.ai' },
    { name: 'RunPod', multiplier: 1.1, url: 'https://runpod.io' },
    { name: 'Lambda Labs', multiplier: 1.2, url: 'https://lambdalabs.com' },
    { name: 'Paperspace', multiplier: 1.15, url: 'https://paperspace.com' },
    { name: 'Genesis Cloud', multiplier: 0.95, url: 'https://genesiscloud.com' }
  ];

  return platforms.map(platform => ({
    platform: platform.name,
    price: Number((basePrice * platform.multiplier * (0.9 + Math.random() * 0.2)).toFixed(3)),
    availability: Math.random() > 0.3 ? 'available' : Math.random() > 0.5 ? 'limited' : 'unavailable',
    url: platform.url
  }));
};

const GpuDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: offers } = useVastAiOffers();
  const [gpu, setGpu] = useState<any>(null);
  const [platformPrices, setPlatformPrices] = useState<PlatformPrice[]>([]);

  useEffect(() => {
    if (offers && id) {
      const foundGpu = offers.find(offer => offer.id === parseInt(id));
      setGpu(foundGpu);
      
      if (foundGpu) {
        setPlatformPrices(generateMultiPlatformPrices(foundGpu.dph_total || 1.0, foundGpu.gpu_name));
      }
    }
  }, [offers, id]);

  if (!gpu) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-gray-600">GPU not found</p>
            <Link to="/">
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

  const getStatusBadge = (offer: any) => {
    if (!offer.rentable) return { text: "unavailable", color: "bg-red-100 text-red-800" };
    if (offer.rented) return { text: "rented", color: "bg-yellow-100 text-yellow-800" };
    return { text: "available", color: "bg-green-100 text-green-800" };
  };

  const getModelTypeBadge = (modelType: string) => {
    const colors = {
      'Consumer': 'bg-blue-100 text-blue-800',
      'Professional': 'bg-purple-100 text-purple-800',
      'Datacenter': 'bg-orange-100 text-orange-800'
    };
    return colors[modelType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600';
      case 'limited': return 'text-yellow-600';
      case 'unavailable': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const status = getStatusBadge(gpu);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{gpu.gpu_name} Details</h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* GPU Information Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{gpu.gpu_name}</CardTitle>
                      <Badge className={getModelTypeBadge(gpu.model_type)}>
                        {gpu.model_type}
                      </Badge>
                    </div>
                    <p className="text-gray-600">
                      {gpu.num_gpus}x GPU • {gpu.gpu_ram}GB RAM • Rank #{gpu.rank}
                    </p>
                  </div>
                  <Badge className={status.color}>
                    {status.text}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Use Case */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Primary Use Case</h3>
                  <p className="text-blue-800 text-sm">{gpu.primary_use_case}</p>
                </div>

                {/* Specifications */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Specifications</h3>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Host:</span>
                      <span className="font-medium">{gpu.hostname || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{gpu.datacenter || gpu.country || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CPU Cores:</span>
                      <span className="font-medium">{gpu.cpu_cores}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RAM:</span>
                      <span className="font-medium">{gpu.cpu_ram}GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Storage:</span>
                      <span className="font-medium">{gpu.disk_space}GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Power:</span>
                      <span className="font-medium">{gpu.power_connector}</span>
                    </div>
                  </div>
                </div>

                {/* Network & Reliability */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span>{Math.round((gpu.reliability2 || 0) * 100)}% reliability</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Wifi className="h-4 w-4" />
                      <span className="text-sm">↓{gpu.inet_down}↑{gpu.inet_up}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    disabled={!gpu.rentable || gpu.rented}
                    size="lg"
                  >
                    {!gpu.rentable ? "Unavailable" : gpu.rented ? "Rented" : "Rent Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Platform Pricing */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Price Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Price Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <CandlestickChart 
                    gpuModel={gpu.gpu_name || ''} 
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Multi-Platform Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Multi-Platform Pricing Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {platformPrices.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{platform.platform}</span>
                        <span className={`text-sm ${getAvailabilityColor(platform.availability)}`}>
                          {platform.availability}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">${platform.price}/hour</span>
                        <Button size="sm" variant="outline" asChild>
                          <a href={platform.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <p><strong>Note:</strong> Prices are estimates and may vary. Click the external link icons to check real-time availability and pricing on each platform.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GpuDetails;
