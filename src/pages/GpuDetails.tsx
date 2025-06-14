
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, Zap, Wifi } from "lucide-react";
import CandlestickChart from "@/components/CandlestickChart";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";

const GpuDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: offers } = useVastAiOffers();
  const [gpu, setGpu] = useState<any>(null);

  useEffect(() => {
    if (offers && id) {
      const foundGpu = offers.find(offer => offer.id === parseInt(id));
      setGpu(foundGpu);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GPU Information Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-2xl">{gpu.gpu_name}</CardTitle>
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
              {/* Pricing */}
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold">${gpu.dph_total?.toFixed(3) || '0'}/hour</span>
              </div>

              {/* Use Case */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Primary Use Case</h3>
                <p className="text-blue-800 text-sm">{gpu.primary_use_case}</p>
              </div>

              {/* Specifications */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Host:</span>
                    <p className="font-medium">{gpu.hostname || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <p className="font-medium">{gpu.datacenter || gpu.country || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">CPU Cores:</span>
                    <p className="font-medium">{gpu.cpu_cores}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">RAM:</span>
                    <p className="font-medium">{gpu.cpu_ram}GB</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Storage:</span>
                    <p className="font-medium">{gpu.disk_space}GB</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Power:</span>
                    <p className="font-medium">{gpu.power_connector}</p>
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
        </div>
      </main>
    </div>
  );
};

export default GpuDetails;
