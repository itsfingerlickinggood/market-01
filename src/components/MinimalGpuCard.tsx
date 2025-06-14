
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import MiniPriceChart from "./MiniPriceChart";

interface MinimalGpuCardProps {
  offer: any;
}

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

const getCompanyLogo = (gpuName: string) => {
  const name = gpuName.toLowerCase();
  if (name.includes('nvidia') || name.includes('rtx') || name.includes('gtx') || name.includes('tesla') || name.includes('quadro') || name.includes('geforce')) {
    return {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&crop=center",
      alt: "NVIDIA",
      company: "NVIDIA"
    };
  }
  if (name.includes('amd') || name.includes('radeon') || name.includes('rx ') || name.includes('vega')) {
    return {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center",
      alt: "AMD",
      company: "AMD"
    };
  }
  if (name.includes('intel') || name.includes('arc') || name.includes('xe')) {
    return {
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center",
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

const MinimalGpuCard = ({ offer }: MinimalGpuCardProps) => {
  const priceData = generatePriceTrend(offer.dph_total || 1.0);
  const priceChange = Math.random() > 0.5 ? 1 : -1; // Random for demo
  const companyLogo = getCompanyLogo(offer.gpu_name || '');

  return (
    <Link to={`/gpu/${offer.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer p-4">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <img 
                src={companyLogo.src}
                alt={companyLogo.alt}
                className="w-10 h-10 object-contain rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {offer.gpu_name || 'GPU'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  ${offer.dph_total?.toFixed(3) || '0'}/hour
                </p>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <MiniPriceChart 
                data={priceData} 
                isPositive={priceChange > 0}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MinimalGpuCard;
