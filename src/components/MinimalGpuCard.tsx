
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import MiniPriceChart from "./MiniPriceChart";
import CompactGpuHoverDialog from "./CompactGpuHoverDialog";

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

const MinimalGpuCard = ({ offer }: MinimalGpuCardProps) => {
  const [showHover, setShowHover] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const priceData = generatePriceTrend(offer.dph_total || 1.0);
  const priceChange = Math.random() > 0.5 ? 1 : -1; // Random for demo
  const companyLogo = getCompanyLogo(offer.gpu_name || '');

  const handleMouseEnter = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setShowHover(true);
  };

  const handleMouseLeave = () => {
    setShowHover(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <Link to={`/gpu/${offer.id}`}>
        <Card 
          className="hover:shadow-md transition-shadow cursor-pointer p-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <img 
                  src={companyLogo.src}
                  alt={companyLogo.alt}
                  className="w-8 h-8 object-contain flex-shrink-0"
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

      {showHover && (
        <CompactGpuHoverDialog
          gpu={offer}
          position={mousePosition}
          onClose={() => setShowHover(false)}
        />
      )}
    </>
  );
};

export default MinimalGpuCard;
