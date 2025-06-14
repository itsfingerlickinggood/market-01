
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

const MinimalGpuCard = ({ offer }: MinimalGpuCardProps) => {
  const priceData = generatePriceTrend(offer.dph_total || 1.0);
  const priceChange = Math.random() > 0.5 ? 1 : -1; // Random for demo

  return (
    <Link to={`/gpu/${offer.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer p-4">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">
                {offer.gpu_name || 'GPU'}
              </h3>
              <p className="text-sm text-muted-foreground">
                ${offer.dph_total?.toFixed(3) || '0'}/hour
              </p>
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
