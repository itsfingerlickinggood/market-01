
import MicroCandlestickChart from "@/components/charts/MicroCandlestickChart";

interface GpuCardPriceSectionProps {
  gpu: any;
}

const GpuCardPriceSection = ({ gpu }: GpuCardPriceSectionProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-lg font-bold text-primary">
          ${(gpu.dph_total || 1.0).toFixed(3)}
        </span>
        <span className="text-sm text-muted-foreground ml-1">/hr</span>
      </div>
      
      <MicroCandlestickChart 
        width={60} 
        height={30}
        showTrend={true}
        className="flex-shrink-0"
      />
    </div>
  );
};

export default GpuCardPriceSection;
