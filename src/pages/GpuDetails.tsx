
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, Zap, Wifi, ExternalLink } from "lucide-react";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  // Prepare chart data - sort by price for better visualization
  const chartData = [...platformPrices]
    .sort((a, b) => a.price - b.price)
    .map(platform => ({
      platform: platform.platform,
      price: platform.price,
      fill: platform.availability === 'available' ? '#22c55e' : 
            platform.availability === 'limited' ? '#eab308' : '#ef4444'
    }));

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
        <div className="flex gap-6">
          {/* Left Section - Price Chart (65% width) */}
          <div className="w-[65%]">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Price Comparison Across Platforms
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Compare {gpu.gpu_name} pricing across different cloud providers
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      layout="horizontal"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={(value) => `$${value.toFixed(3)}`}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="platform" 
                        width={90}
                      />
                      <Tooltip 
                        formatter={(value: any) => [`$${value.toFixed(3)}/hour`, 'Price']}
                        labelFormatter={(label) => `Platform: ${label}`}
                      />
                      <Bar 
                        dataKey="price" 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Limited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Unavailable</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - GPU Info & Pricing List (35% width) */}
          <div className="w-[35%] space-y-6">
            {/* GPU Information Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{gpu.gpu_name}</CardTitle>
                      <Badge className={getModelTypeBadge(gpu.model_type)}>
                        {gpu.model_type}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {gpu.num_gpus}x GPU • {gpu.gpu_ram}GB RAM
                    </p>
                  </div>
                  <Badge className={status.color}>
                    {status.text}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Host:</span>
                    <span className="font-medium">{gpu.hostname || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{gpu.datacenter || gpu.country || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CPU:</span>
                    <span className="font-medium">{gpu.cpu_cores} cores</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RAM:</span>
                    <span className="font-medium">{gpu.cpu_ram}GB</span>
                  </div>
                </div>

                {/* Reliability */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{Math.round((gpu.reliability2 || 0) * 100)}% reliability</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Wifi className="h-4 w-4" />
                    <span className="text-xs">↓{gpu.inet_down}↑{gpu.inet_up}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  disabled={!gpu.rentable || gpu.rented}
                  size="sm"
                >
                  {!gpu.rentable ? "Unavailable" : gpu.rented ? "Rented" : "Rent Now"}
                </Button>
              </CardContent>
            </Card>

            {/* Platform Pricing List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {platformPrices
                    .sort((a, b) => a.price - b.price)
                    .map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm">{platform.platform}</span>
                        <span className={`text-xs ${getAvailabilityColor(platform.availability)}`}>
                          {platform.availability}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">${platform.price}/hr</span>
                        <Button size="sm" variant="outline" asChild className="h-6 w-6 p-0">
                          <a href={platform.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                  <p><strong>Note:</strong> Prices are estimates and may vary. Click external links for real-time pricing.</p>
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
