
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CandlestickChart from "@/components/CandlestickChart";

const CandlestickSection = () => {
  const [gpuData] = useState([
    { id: '1', model: 'RTX 4090', site: 'VastAI', company: 'NVIDIA' },
    { id: '2', model: 'A100 80GB', site: 'AWS', company: 'NVIDIA' },
    { id: '3', model: 'RTX 3090', site: 'RunPod', company: 'NVIDIA' },
    { id: '4', model: 'RTX 4080', site: 'Lambda Labs', company: 'NVIDIA' },
    { id: '5', model: 'MI210', site: 'Oracle Cloud', company: 'AMD' },
    { id: '6', model: 'RTX 3080', site: 'Paperspace', company: 'NVIDIA' },
    { id: '7', model: 'H100', site: 'Google Cloud', company: 'NVIDIA' },
    { id: '8', model: 'RTX 4070', site: 'Azure', company: 'NVIDIA' }
  ]);

  const [currentGpuIndex, setCurrentGpuIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGpuIndex((prevIndex) => (prevIndex + 1) % gpuData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [gpuData.length]);

  const currentGpu = gpuData[currentGpuIndex];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-semibold mb-4">7-Day Average Price Trends</h3>
        <p className="text-lg text-muted-foreground">
          Japanese candlestick charts showing price movements across providers
        </p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-blue-600 font-medium">Auto-shuffling every 3s</span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Card className="hover:shadow-lg transition-all duration-500 transform hover:scale-105 w-full max-w-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>{currentGpu.model}</span>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                {currentGpu.site}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <CandlestickChart gpuModel={currentGpu.model} className="w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandlestickSection;
