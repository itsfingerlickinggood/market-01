
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketplaceDealProps {
  gpu: {
    id: string;
    company: string;
    model: string;
    basePrice: number;
    sites: string[];
    demandChange: string;
  };
}

const generatePriceData = (basePrice: number) => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: i,
    price: basePrice * (0.85 + Math.random() * 0.3)
  }));
};

const getCompanyLogo = (company: string) => {
  const companyLower = company.toLowerCase();
  if (companyLower.includes('nvidia')) {
    return "/lovable-uploads/ea42f8a1-a209-460e-9282-59e2f86b0671.png";
  }
  if (companyLower.includes('amd')) {
    return "/lovable-uploads/41bc1768-42eb-4076-85a7-acf5a1380358.png";
  }
  if (companyLower.includes('intel')) {
    return "/lovable-uploads/6b5e8159-3d79-49b1-a1df-9265f822064a.png";
  }
  return "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center";
};

const MarketplaceDeal = ({ gpu }: MarketplaceDealProps) => {
  const [currentSiteIndex, setCurrentSiteIndex] = useState(0);
  const [priceData, setPriceData] = useState(() => generatePriceData(gpu.basePrice));
  const [currentPrice, setCurrentPrice] = useState(() => gpu.basePrice * (0.85 + Math.random() * 0.3));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSiteIndex((prevIndex) => (prevIndex + 1) % gpu.sites.length);
      
      const newPriceData = generatePriceData(gpu.basePrice);
      const newCurrentPrice = gpu.basePrice * (0.85 + Math.random() * 0.3);
      
      setPriceData(newPriceData);
      setCurrentPrice(newCurrentPrice);
    }, 3000);

    return () => clearInterval(interval);
  }, [gpu.basePrice, gpu.sites.length]);

  const currentSite = gpu.sites[currentSiteIndex];
  const isPositiveDemand = gpu.demandChange.startsWith('+');

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={getCompanyLogo(gpu.company)} 
            alt={gpu.company}
            className="w-10 h-10 object-contain"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{gpu.company}</h3>
            <p className="text-sm text-muted-foreground">{gpu.model}</p>
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            isPositiveDemand ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isPositiveDemand ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {gpu.demandChange}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-sm px-3 py-1 animate-pulse">
              {currentSite}
            </Badge>
            <span className="font-medium text-lg text-primary">
              ${currentPrice.toFixed(2)}/hr
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground mb-2">
            Demand {isPositiveDemand ? 'increased' : 'decreased'} in last hour
          </div>
          
          <div className="h-20 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketplaceDeal;
