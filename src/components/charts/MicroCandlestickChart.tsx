
import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MicroChartData } from '@/types/card-expansion';

interface MicroCandlestickChartProps {
  data?: MicroChartData;
  width?: number;
  height?: number;
  showTrend?: boolean;
  className?: string;
}

const MicroCandlestickChart = ({ 
  data, 
  width = 80, 
  height = 40, 
  showTrend = true,
  className = "" 
}: MicroCandlestickChartProps) => {
  const [chartData, setChartData] = useState<Array<{ time: string; price: number }>>([]);
  const [priceChange, setPriceChange] = useState(0);
  const [trend, setTrend] = useState<'up' | 'down' | 'neutral'>('neutral');

  useEffect(() => {
    // Generate mock price data if none provided
    const generateMockData = () => {
      const mockData = [];
      const basePrice = Math.random() * 2 + 0.5; // Random base price between 0.5-2.5
      let currentPrice = basePrice;
      
      for (let i = 6; i >= 0; i--) {
        const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
        currentPrice = basePrice * (1 + variation * 0.5);
        mockData.push({
          time: `D${7 - i}`,
          price: Number(currentPrice.toFixed(3))
        });
      }
      
      return mockData;
    };

    if (data?.ohlc) {
      const transformedData = data.ohlc.map(item => ({
        time: item.time,
        price: item.close
      }));
      setChartData(transformedData);
      setTrend(data.trend);
      
      // Calculate price change
      if (transformedData.length > 1) {
        const firstPrice = transformedData[0].price;
        const lastPrice = transformedData[transformedData.length - 1].price;
        const change = ((lastPrice - firstPrice) / firstPrice) * 100;
        setPriceChange(change);
      }
    } else {
      const mockData = generateMockData();
      setChartData(mockData);
      
      // Calculate trend from mock data
      if (mockData.length > 1) {
        const firstPrice = mockData[0].price;
        const lastPrice = mockData[mockData.length - 1].price;
        const change = ((lastPrice - firstPrice) / firstPrice) * 100;
        setPriceChange(change);
        
        if (change > 2) setTrend('up');
        else if (change < -2) setTrend('down');
        else setTrend('neutral');
      }
    }
  }, [data]);

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return '#10b981'; // green-500
      case 'down': return '#ef4444'; // red-500
      default: return '#6b7280'; // gray-500
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const TrendIcon = getTrendIcon();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div style={{ width, height }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={getTrendColor()} 
              strokeWidth={1.5}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {showTrend && (
        <div className="flex items-center gap-1">
          <TrendIcon 
            className="h-3 w-3" 
            style={{ color: getTrendColor() }}
          />
          <span 
            className="text-xs font-medium"
            style={{ color: getTrendColor() }}
          >
            {Math.abs(priceChange).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default MicroCandlestickChart;
