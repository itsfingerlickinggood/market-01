
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { filterOffers, sortOffers } from "@/utils/gpuFilters";
import GpuCard from "./GpuCard";
import GpuGridSkeleton from "./GpuGridSkeleton";

interface VastAiGridProps {
  searchTerm: string;
  sortBy: string;
}

const VastAiGrid = ({ searchTerm, sortBy }: VastAiGridProps) => {
  const { data: offers, isLoading, error } = useVastAiOffers();

  if (isLoading) {
    return <GpuGridSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading offers: {error.message}</p>
        <p className="text-sm text-gray-500 mt-2">Please check the console for more details.</p>
      </div>
    );
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No offers available at the moment.</p>
      </div>
    );
  }

  const filteredOffers = sortOffers(filterOffers(offers, searchTerm), sortBy);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredOffers.map((offer) => (
        <GpuCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
};

export default VastAiGrid;
