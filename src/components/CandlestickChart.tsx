
import { useState, useEffect } from 'react';
import { ComposedChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface CandlestickDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandlestickChartProps {
  gpuModel: string;
  className?: string;
}

// Generate realistic candlestick data based on GPU model and market conditions
const generateCandlestickData = (gpuModel: string): CandlestickDataPoint[] => {
  const data: CandlestickDataPoint[] = [];
  const basePrice = getBasePriceForModel(gpuModel);
  let currentPrice = basePrice;
  
  // Generate 30 days of data
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Simulate market volatility
    const volatility = 0.05; // 5% daily volatility
    const trend = getTrendForModel(gpuModel, i);
    
    const open = currentPrice;
    const priceChange = (Math.random() - 0.5) * volatility * basePrice + trend;
    const close = Math.max(0.1, open + priceChange);
    
    // High and low based on intraday volatility
    const intraVol = 0.02;
    const high = Math.max(open, close) + Math.random() * intraVol * basePrice;
    const low = Math.min(open, close) - Math.random() * intraVol * basePrice;
    
    const volume = Math.floor(Math.random() * 1000) + 100;
    
    data.push({
      time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      open: parseFloat(open.toFixed(3)),
      high: parseFloat(high.toFixed(3)),
      low: parseFloat(Math.max(0.1, low).toFixed(3)),
      close: parseFloat(close.toFixed(3)),
      volume
    });
    
    currentPrice = close;
  }
  
  return data;
};

const getBasePriceForModel = (model: string): number => {
  // Set base prices based on GPU tier
  if (model.includes('4090')) return 2.5;
  if (model.includes('4080')) return 1.8;
  if (model.includes('4070')) return 1.2;
  if (model.includes('4060')) return 0.8;
  if (model.includes('3090')) return 1.5;
  if (model.includes('3080')) return 1.0;
  if (model.includes('3070')) return 0.7;
  if (model.includes('3060')) return 0.5;
  if (model.includes('7900')) return 2.0;
  if (model.includes('7800')) return 1.3;
  if (model.includes('7700')) return 0.9;
  if (model.includes('7600')) return 0.6;
  if (model.includes('6800')) return 1.1;
  if (model.includes('6700')) return 0.8;
  if (model.includes('6600')) return 0.4;
  if (model.includes('A100')) return 8.0;
  if (model.includes('H100')) return 12.0;
  if (model.includes('A6000')) return 4.0;
  return 1.0; // Default price
};

const getTrendForModel = (model: string, daysAgo: number): number => {
  // Simulate different trends for different GPU categories
  const trendFactor = 0.001;
  
  if (model.includes('4090') || model.includes('H100')) {
    // High-end cards trending up due to AI demand
    return trendFactor * (30 - daysAgo) * 0.5;
  }
  if (model.includes('3060') || model.includes('6600')) {
    // Budget cards stable or slightly down
    return -trendFactor * (30 - daysAgo) * 0.2;
  }
  // Mid-range cards mixed trends
  return trendFactor * Math.sin(daysAgo * 0.2) * 0.3;
};

const CustomCandlestick = ({ data }: { data: CandlestickDataPoint[] }) => {
  return (
    <g>
      {data.map((point, index) => {
        const isGreen = point.close >= point.open;
        const color = isGreen ? '#10b981' : '#ef4444';
        const x = (index / (data.length - 1)) * 100;
        
        return (
          <g key={index}>
            {/* Candlestick body */}
            <rect
              x={`${x - 1}%`}
              y={`${100 - ((Math.max(point.open, point.close) / Math.max(...data.map(d => d.high))) * 80 + 10)}%`}
              width="2%"
              height={`${(Math.abs(point.close - point.open) / Math.max(...data.map(d => d.high))) * 80}%`}
              fill={color}
              opacity={0.8}
            />
            {/* High-low line */}
            <line
              x1={`${x}%`}
              y1={`${100 - ((point.high / Math.max(...data.map(d => d.high))) * 80 + 10)}%`}
              x2={`${x}%`}
              y2={`${100 - ((point.low / Math.max(...data.map(d => d.high))) * 80 + 10)}%`}
              stroke={color}
              strokeWidth="1"
            />
          </g>
        );
      })}
    </g>
  );
};

const CandlestickTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isGreen = data.close >= data.open;
    const change = ((data.close - data.open) / data.open * 100).toFixed(2);
    
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg text-xs">
        <p className="font-semibold">{label}</p>
        <div className="space-y-1">
          <p>Open: <span className="font-mono">${data.open}</span></p>
          <p>High: <span className="font-mono">${data.high}</span></p>
          <p>Low: <span className="font-mono">${data.low}</span></p>
          <p>Close: <span className="font-mono">${data.close}</span></p>
          <p className={`${isGreen ? 'text-green-600' : 'text-red-600'}`}>
            Change: {isGreen ? '+' : ''}{change}%
          </p>
          <p>Volume: {data.volume}</p>
        </div>
      </div>
    );
  }
  return null;
};

const CandlestickChart = ({ gpuModel, className = "" }: CandlestickChartProps) => {
  const [chartData, setChartData] = useState<CandlestickDataPoint[]>([]);

  useEffect(() => {
    const data = generateCandlestickData(gpuModel);
    setChartData(data);
  }, [gpuModel]);

  if (chartData.length === 0) {
    return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
  }

  const latestData = chartData[chartData.length - 1];
  const previousData = chartData[chartData.length - 2];
  const isGreen = latestData.close >= latestData.open;
  const overallChange = previousData ? ((latestData.close - previousData.close) / previousData.close * 100) : 0;

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-600">30D Price Trend</div>
        <div className={`text-xs font-semibold ${overallChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {overallChange >= 0 ? '+' : ''}{overallChange.toFixed(2)}%
        </div>
      </div>
      
      <div className="h-24 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis 
              dataKey="time" 
              hide 
            />
            <YAxis 
              domain={['dataMin - 0.1', 'dataMax + 0.1']} 
              hide 
            />
            <Tooltip content={<CandlestickTooltip />} />
            
            {/* Simple line representation of price movement */}
            <Line
              type="monotone"
              dataKey="close"
              stroke={isGreen ? "#10b981" : "#ef4444"}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, fill: isGreen ? "#10b981" : "#ef4444" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* SVG overlay for candlestick visualization */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" className="opacity-60">
            <CustomCandlestick data={chartData} />
          </svg>
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>O: ${latestData.open}</span>
        <span>H: ${latestData.high}</span>
        <span>L: ${latestData.low}</span>
        <span>C: ${latestData.close}</span>
      </div>
    </div>
  );
};

export default CandlestickChart;
