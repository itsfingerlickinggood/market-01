
import React from 'react';

interface CandlestickData {
  open: number;
  high: number;
  low: number;
  close: number;
  day: number;
}

interface MicroCandlestickChartProps {
  data?: CandlestickData[];
  width?: number;
  height?: number;
  basePrice?: number;
}

const generateCandlestickData = (basePrice: number): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 7; i++) {
    const volatility = 0.15; // 15% volatility
    const dailyChange = (Math.random() - 0.5) * volatility;
    
    const open = currentPrice;
    const trend = Math.random() > 0.5 ? 1 : -1;
    const close = Math.max(0.001, Math.min(4, open * (1 + dailyChange * trend)));
    
    const high = Math.max(open, close) * (1 + Math.random() * 0.05);
    const low = Math.min(open, close) * (1 - Math.random() * 0.05);
    
    data.push({
      open: Number(open.toFixed(3)),
      high: Number(Math.min(4, high).toFixed(3)),
      low: Number(Math.max(0.001, low).toFixed(3)),
      close: Number(close.toFixed(3)),
      day: i
    });
    
    currentPrice = close;
  }
  
  return data;
};

const MicroCandlestickChart = ({ 
  data, 
  width = 84, 
  height = 32, 
  basePrice = 1.0 
}: MicroCandlestickChartProps) => {
  const chartData = data || generateCandlestickData(basePrice);
  const maxPrice = 4;
  const minPrice = 0;
  const priceRange = maxPrice - minPrice;
  
  const candleWidth = (width - 14) / chartData.length;
  const bodyWidth = Math.max(2, candleWidth * 0.6);
  const wickWidth = 1;
  
  const priceToY = (price: number) => {
    return height - 4 - ((price - minPrice) / priceRange) * (height - 8);
  };
  
  const firstPrice = chartData[0]?.open || basePrice;
  const lastPrice = chartData[chartData.length - 1]?.close || basePrice;
  const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  const isPositive = priceChange >= 0;

  return (
    <div className="relative">
      <svg 
        width={width} 
        height={height} 
        className="overflow-visible"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
      >
        <defs>
          <linearGradient id="bullishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#059669" stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id="bearishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#dc2626" stopOpacity={0.9} />
          </linearGradient>
        </defs>
        
        {chartData.map((candle, index) => {
          const x = 7 + index * candleWidth + candleWidth / 2;
          const isBullish = candle.close >= candle.open;
          
          const openY = priceToY(candle.open);
          const closeY = priceToY(candle.close);
          const highY = priceToY(candle.high);
          const lowY = priceToY(candle.low);
          
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY);
          
          return (
            <g key={index}>
              {/* Wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={isBullish ? "#10b981" : "#ef4444"}
                strokeWidth={wickWidth}
                opacity={0.8}
              />
              
              {/* Body */}
              <rect
                x={x - bodyWidth / 2}
                y={bodyTop}
                width={bodyWidth}
                height={Math.max(1, bodyHeight)}
                fill={isBullish ? "url(#bullishGradient)" : "url(#bearishGradient)"}
                stroke={isBullish ? "#059669" : "#dc2626"}
                strokeWidth={0.5}
                rx={0.5}
              />
            </g>
          );
        })}
      </svg>
      
      {/* Trend indicator */}
      <div className={`absolute -top-1 -right-1 text-xs font-medium ${
        isPositive ? 'text-emerald-600' : 'text-rose-600'
      }`}>
        {isPositive ? '↗' : '↘'}
      </div>
    </div>
  );
};

export default MicroCandlestickChart;
