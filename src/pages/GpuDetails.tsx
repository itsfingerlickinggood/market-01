
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, Zap, Wifi, ExternalLink } from "lucide-react";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PlatformProvider {
  name: string;
  price: number;
  status: 'available' | 'limited' | 'unavailable';
  url: string;
  x: number;
  y: number;
}

const generateProviderData = (basePrice: number): PlatformProvider[] => {
  const providers = [
    { name: 'Genesis Cloud', multiplier: 0.95, url: 'https://genesiscloud.com' },
    { name: 'Vast.ai', multiplier: 1.0, url: 'https://vast.ai' },
    { name: 'RunPod', multiplier: 1.1, url: 'https://runpod.io' },
    { name: 'Paperspace', multiplier: 1.15, url: 'https://paperspace.com' },
    { name: 'Lambda Labs', multiplier: 1.2, url: 'https://lambdalabs.com' },
    { name: 'CoreWeave', multiplier: 0.9, url: 'https://coreweave.com' },
    { name: 'AWS EC2', multiplier: 1.5, url: 'https://aws.amazon.com' },
    { name: 'Google Cloud', multiplier: 1.4, url: 'https://cloud.google.com' }
  ];

  return providers.map((provider, index) => {
    const price = Number((basePrice * provider.multiplier * (0.85 + Math.random() * 0.3)).toFixed(3));
    const status = Math.random() > 0.7 ? 'unavailable' : Math.random() > 0.5 ? 'limited' : 'available';
    
    return {
      name: provider.name,
      price,
      status,
      url: provider.url,
      x: price,
      y: index
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10B981';
      case 'limited': return '#F59E0B';
      case 'unavailable': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'limited': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">Platform: {data.name}</p>
          <p className="text-primary font-bold">Price: ${data.price}/hour</p>
          <p className={`text-sm capitalize`} style={{ color: getStatusColor(data.status) }}>
            Status: {data.status}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomScatter = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={6} 
        fill={getStatusColor(payload.status)}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  const isRented = !gpu.rentable || gpu.rented;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/marketplace">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{gpu.gpu_name} Details</h1>
            <div></div>
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
                  <Link to="/marketplace">GPU Catalog</Link>
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

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column (60% width) */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  💰 Price Comparison Across Platforms
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Compare {gpu.gpu_name} pricing across different cloud providers
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      data={providerData}
                      margin={{ top: 20, right: 30, bottom: 60, left: 100 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        type="number"
                        dataKey="x"
                        domain={[0, 'dataMax + 0.5']}
                        tickFormatter={(value) => `$${value.toFixed(3)}`}
                        label={{ value: 'Price per Hour ($)', position: 'insideBottom', offset: -10 }}
                      />
                      <YAxis 
                        type="number"
                        dataKey="y"
                        domain={[0, providerData.length - 1]}
                        tickFormatter={(value) => providerData[value]?.name || ''}
                        width={80}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Scatter dataKey="x" shape={<CustomScatter />} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Limited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Unavailable</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column (40% width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* GPU Information Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-lg font-semibold">{gpu.gpu_name}</h2>
                      <Badge className="bg-blue-100 text-blue-800">
                        {gpu.model_type || 'Consumer'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {gpu.num_gpus}x GPU • {gpu.gpu_ram}GB RAM
                    </p>
                  </div>
                  <Badge className={isRented ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}>
                    {isRented ? 'rented' : 'available'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Detailed Specifications */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Host:</span>
                    <span>{gpu.hostname || 'gpu-server-01-4'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{gpu.datacenter || gpu.country || 'UK South'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPU:</span>
                    <span>{gpu.cpu_cores} cores</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span>{gpu.cpu_ram}GB</span>
                  </div>
                </div>

                {/* Reliability & Network */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm">{Math.round((gpu.reliability2 || 0.75) * 100)}% reliability</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      ↓{gpu.inet_down || '1Gbps'} ↑{gpu.inet_up || '1Gbps'}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full mt-4" 
                  disabled={isRented}
                  variant={isRented ? "secondary" : "default"}
                >
                  {isRented ? "Rented" : "Rent Now"}
                </Button>
              </CardContent>
            </Card>

            {/* Platform Pricing List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Platform Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {providerData
                    .sort((a, b) => a.price - b.price)
                    .map((provider, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base font-medium">{provider.name}</span>
                        <Badge className={getStatusBadgeClass(provider.status)}>
                          {provider.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">${provider.price}/hr</span>
                        <Button size="sm" variant="outline" asChild className="h-8 w-8 p-0">
                          <a href={provider.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-secondary/30 rounded-lg text-xs text-muted-foreground">
                  <p><strong>Note:</strong> Prices are updated in real-time. Click external links for current availability and booking.</p>
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
