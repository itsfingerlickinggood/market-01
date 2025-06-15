
import PriceHistoryChart from "@/components/charts/PriceHistoryChart";
import ProviderCard from "@/components/provider/ProviderCard";
import ComparisonTable from "@/components/provider/ComparisonTable";
import { providers } from "@/data/gpuCatalog";
import { combinePriceHistoryData } from "@/utils/priceHistoryGenerator";

interface ProviderComparisonChartProps {
  gpuId: string;
  className?: string;
}

const ProviderComparisonChart = ({ gpuId, className }: ProviderComparisonChartProps) => {
  // Combine price history from all providers
  const combinedData = combinePriceHistoryData(providers);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Price History Chart */}
      <PriceHistoryChart providers={providers} combinedData={combinedData} />

      {/* Provider Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

      {/* Comparison Table */}
      <ComparisonTable providers={providers} />
    </div>
  );
};

export default ProviderComparisonChart;
