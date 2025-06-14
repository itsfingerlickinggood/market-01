
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, DollarSign, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import MiniPriceChart from "./MiniPriceChart";
import CandlestickChart from "./CandlestickChart";

interface GpuCardProps {
  offer: any;
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

const getCompanyLogo = (gpuName: string) => {
  const name = gpuName.toLowerCase();
  if (name.includes('nvidia') || name.includes('rtx') || name.includes('gtx') || name.includes('tesla') || name.includes('quadro') || name.includes('geforce')) {
    return {
      src: "/lovable-uploads/ea42f8a1-a209-460e-9282-59e2f86b0671.png",
      alt: "NVIDIA",
      company: "NVIDIA"
    };
  }
  if (name.includes('amd') || name.includes('radeon') || name.includes('rx ') || name.includes('vega')) {
    return {
      src: "/lovable-uploads/41bc1768-42eb-4076-85a7-acf5a1380358.png",
      alt: "AMD",
      company: "AMD"
    };
  }
  if (name.includes('intel') || name.includes('arc') || name.includes('xe')) {
    return {
      src: "/lovable-uploads/6b5e8159-3d79-49b1-a1df-9265f822064a.png",
      alt: "Intel",
      company: "Intel"
    };
  }
  // Default fallback
  return {
    src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center",
    alt: "GPU",
    company: "GPU"
  };
};

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

const GpuCard = ({ offer }: GpuCardProps) => {
  const status = getStatusBadge(offer);
  const priceData = generatePriceTrend(offer.dph_total || 0);
  const priceChange = Math.random() > 0.5 ? 1 : -1; // Random for demo
  const priceChangePercent = (Math.random() * 5).toFixed(2);
  const companyLogo = getCompanyLogo(offer.gpu_name || '');

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <img 
                src={companyLogo.src}
                alt={companyLogo.alt}
                className="w-8 h-8 object-contain flex-shrink-0"
              />
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <CardTitle className="text-lg truncate">{offer.gpu_name || 'GPU'}</CardTitle>
                <Badge className={getModelTypeBadge(offer.model_type)}>
                  {offer.model_type}
                </Badge>
              </div>
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
          <Link to={`/gpu/${offer.id}`}>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default GpuCard;
