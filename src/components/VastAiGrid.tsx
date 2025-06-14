
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, DollarSign, Server, MapPin, Wifi, HardDrive, TrendingUp, TrendingDown } from "lucide-react";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import MiniPriceChart from "./MiniPriceChart";
import CandlestickChart from "./CandlestickChart";

interface VastAiGridProps {
  searchTerm: string;
  sortBy: string;
}

// Generate mock price trend data for each GPU
const generatePriceTrend = (basePrice: number) => {
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24; i++) {
    const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
    currentPrice = basePrice * (1 + variation);
    data.push({
      time: `${i}:00`,
      price: currentPrice
    });
  }
  
  return data;
};

const VastAiGrid = ({ searchTerm, sortBy }: VastAiGridProps) => {
  const { data: offers, isLoading, error } = useVastAiOffers();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading offers: {error.message}</p>
        <p className="text-sm text-gray-500 mt-2">Please check the console for more details.</p>
      </div>
    );
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No offers available at the moment.</p>
      </div>
    );
  }

  const filteredOffers = offers
    .filter(offer => 
      offer.gpu_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.hostname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.datacenter?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return (a.dph_total || 0) - (b.dph_total || 0);
        case "performance":
          return (b.reliability2 || 0) - (a.reliability2 || 0);
        case "availability":
          if (a.rentable && !b.rentable) return -1;
          if (!a.rentable && b.rentable) return 1;
          return 0;
        default:
          return 0;
      }
    });

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredOffers.map((offer) => {
        const status = getStatusBadge(offer);
        const priceData = generatePriceTrend(offer.dph_total || 0);
        const priceChange = Math.random() > 0.5 ? 1 : -1; // Random for demo
        const priceChangePercent = (Math.random() * 5).toFixed(2);
        
        return (
          <Card key={offer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{offer.gpu_name || 'GPU'}</CardTitle>
                    <Badge className={getModelTypeBadge(offer.model_type)}>
                      {offer.model_type}
                    </Badge>
                  </div>
                  <CardDescription>
                    {offer.num_gpus}x GPU • {offer.gpu_ram}GB RAM • Rank #{offer.rank}
                  </CardDescription>
                  <div className="text-xs text-gray-500 mt-1">
                    {offer.company} • {offer.interface}
                  </div>
                </div>
                <Badge className={status.color}>
                  {status.text}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Price and Mini Chart Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-semibold">${offer.dph_total?.toFixed(3) || '0'}/hour</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className={`text-xs ${priceChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {priceChange > 0 ? '+' : '-'}{priceChangePercent}%
                    </div>
                  </div>
                  <MiniPriceChart 
                    data={priceData} 
                    isPositive={priceChange > 0}
                  />
                </div>
              </div>

              {/* Candlestick Chart */}
              <div className="border rounded-lg p-3 bg-gray-50">
                <CandlestickChart 
                  gpuModel={offer.gpu_name || ''} 
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{Math.round((offer.reliability2 || 0) * 100)}% reliability</span>
                </div>
              </div>
              
              {/* Use Case */}
              <div className="text-xs text-gray-600 p-2 bg-blue-50 rounded">
                <strong>Use Case:</strong> {offer.primary_use_case}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Host:</span>
                  <span className="truncate ml-2">{offer.hostname || 'Unknown'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{offer.datacenter || offer.country || 'Unknown'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">CPU Cores:</span>
                  <span>{offer.cpu_cores}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">RAM:</span>
                  <span>{offer.cpu_ram}GB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Storage:</span>
                  <span>{offer.disk_space}GB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Power:</span>
                  <span className="text-xs">{offer.power_connector}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Wifi className="h-3 w-3" />
                  <span>↓{offer.inet_down}↑{offer.inet_up}</span>
                </div>
                {offer.verified && (
                  <Badge variant="outline" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>

              <div className="pt-4 space-y-2">
                <Button 
                  className="w-full" 
                  disabled={!offer.rentable || offer.rented}
                >
                  {!offer.rentable ? "Unavailable" : offer.rented ? "Rented" : "Rent Now"}
                </Button>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default VastAiGrid;
