
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MarketplaceDealProps {
  gpu: {
    id: string;
    company: string;
    model: string;
    basePrice: number;
    sites: string[];
  };
}

const generatePriceData = (basePrice: number, siteCount: number) => {
  return Array.from({ length: siteCount }, (_, siteIndex) => ({
    site: `Site ${siteIndex + 1}`,
    data: Array.from({ length: 24 }, (_, i) => ({
      time: i,
      price: basePrice * (0.8 + Math.random() * 0.4) // ±20% variation
    }))
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
  const [priceData, setPriceData] = useState(() => generatePriceData(gpu.basePrice, gpu.sites.length));
  const [currentPrices, setCurrentPrices] = useState(() => 
    gpu.sites.map(() => gpu.basePrice * (0.8 + Math.random() * 0.4))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // Update price data every 5 seconds
      const newPriceData = generatePriceData(gpu.basePrice, gpu.sites.length);
      const newCurrentPrices = gpu.sites.map(() => gpu.basePrice * (0.8 + Math.random() * 0.4));
      
      setPriceData(newPriceData);
      setCurrentPrices(newCurrentPrices);
    }, 5000);

    return () => clearInterval(interval);
  }, [gpu.basePrice, gpu.sites.length]);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={getCompanyLogo(gpu.company)} 
            alt={gpu.company}
            className="w-10 h-10 object-contain"
          />
          <div>
            <h3 className="font-semibold text-lg">{gpu.company}</h3>
            <p className="text-sm text-muted-foreground">{gpu.model}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gpu.sites.map((site, index) => (
            <div key={`${site}-${index}`} className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {site}
                </Badge>
                <span className="font-medium text-sm">
                  ${currentPrices[index]?.toFixed(2)}/hr
                </span>
              </div>
              <div className="h-16 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData[index]?.data || []}>
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketplaceDeal;
