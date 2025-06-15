
import HardwareSpecsCard from "./cards/HardwareSpecsCard";
import PricingCard from "./cards/PricingCard";
import ProviderCard from "./cards/ProviderCard";
import DeploymentCard from "./cards/DeploymentCard";
import PerformanceCard from "./cards/PerformanceCard";
import NetworkCard from "./cards/NetworkCard";
import SecurityCard from "./cards/SecurityCard";
import ComparisonCard from "./cards/ComparisonCard";

interface SupabaseGpuGridProps {
  gpu: any;
  enhancedData: any;
  providerData: any[];
}

const SupabaseGpuGrid = ({ gpu, enhancedData, providerData }: SupabaseGpuGridProps) => {
  const provider = enhancedData?.provider;
  const pricing = enhancedData?.pricing;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HardwareSpecsCard gpu={gpu} />
        <PricingCard pricing={pricing} />
        <ProviderCard provider={provider} />
        <DeploymentCard provider={provider} />
        <PerformanceCard gpu={gpu} />
        <NetworkCard gpu={gpu} enhancedData={enhancedData} />
        <SecurityCard enhancedData={enhancedData} />
        <ComparisonCard />
      </div>
    </div>
  );
};

export default SupabaseGpuGrid;
