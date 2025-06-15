
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import UltraMinimalGpuCard from "@/components/UltraMinimalGpuCard";
import EnhancedGpuHoverCard from "@/components/EnhancedGpuHoverCard";
import MarketplaceHeader from "@/components/MarketplaceHeader";
import MarketplaceFilters from "@/components/MarketplaceFilters";
import MarketplaceStats from "@/components/MarketplaceStats";
import MarketplaceGrid from "@/components/MarketplaceGrid";
import MarketplaceEmptyState from "@/components/MarketplaceEmptyState";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { useWorkload } from "@/contexts/WorkloadContext";
import { calculateWorkloadScore } from "@/utils/workloadRecommendations";

const Marketplace = () => {
  const { selectedWorkload } = useWorkload();
  const [hoveredGpu, setHoveredGpu] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sortBy, setSortBy] = useState("best-deals");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { data: offers, isLoading } = useVastAiOffers();

  // Enhanced offers with scores and metrics
  const enhancedOffers = useMemo(() => {
    if (!offers) return [];
    return offers.map(offer => {
      const workloadScore = selectedWorkload ? calculateWorkloadScore(offer, selectedWorkload.id) : 0;
      const purposeScore = selectedPurpose ? calculateWorkloadScore(offer, selectedPurpose) : 0;
      const price = offer.dph_total || 0;
      const reliability = offer.reliability2 || offer.reliability || 0;
      const dealScore = reliability > 0 ? reliability * 100 / Math.max(price, 0.1) : 0;
      
      return {
        ...offer,
        workloadScore,
        purposeScore,
        dealScore,
        isBestDeal: dealScore > 30,
        isHotDeal: price < 1 && reliability > 0.8,
        isPurposeMatch: selectedPurpose && purposeScore > 70
      };
    });
  }, [offers, selectedWorkload, selectedPurpose]);

  const filteredOffers = useMemo(() => {
    let filtered = enhancedOffers || [];
    if (searchTerm) {
      filtered = filtered.filter(offer => 
        offer.gpu_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (priceFilter !== "all") {
      filtered = filtered.filter(offer => {
        const price = offer.dph_total || 0;
        switch (priceFilter) {
          case "budget": return price < 0.5;
          case "value": return price >= 0.5 && price < 2;
          case "premium": return price >= 2;
          default: return true;
        }
      });
    }
    return filtered;
  }, [enhancedOffers, searchTerm, priceFilter]);

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case 'best-deals': return (b.dealScore || 0) - (a.dealScore || 0);
      case 'lowest-price': return (a.dph_total || 0) - (b.dph_total || 0);
      case 'highest-performance': return (b.reliability2 || b.reliability || 0) - (a.reliability2 || a.reliability || 0);
      case 'workload-match': return (b.workloadScore || 0) - (a.workloadScore || 0);
      case 'purpose-match': return (b.purposeScore || 0) - (a.purposeScore || 0);
      default: return 0;
    }
  });

  const handleGpuHover = (offer: any, e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setTimeout(() => setHoveredGpu(offer), 300);
  };

  const handleGpuLeave = () => {
    setHoveredGpu(null);
  };

  const handlePurposeChange = (purpose: string | null) => {
    setSelectedPurpose(purpose);
    if (purpose) {
      setSortBy("purpose-match");
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setPriceFilter("all");
    setSelectedPurpose(null);
  };

  const availableCount = sortedOffers.filter(offer => offer.rentable !== false).length;
  const matchCount = sortedOffers.filter(offer => offer.isPurposeMatch).length;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      
      <div className="border-b border-border transition-colors duration-300">
        <div className="container mx-auto px-6 py-8">
          <MarketplaceHeader
            selectedPurpose={selectedPurpose}
            matchCount={matchCount}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          
          <MarketplaceFilters
            selectedPurpose={selectedPurpose}
            onPurposeChange={handlePurposeChange}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <MarketplaceStats
            totalOffers={sortedOffers.length}
            availableCount={availableCount}
            selectedPurpose={selectedPurpose}
            matchCount={matchCount}
            searchTerm={searchTerm}
          />
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        {!isLoading && sortedOffers.length === 0 ? (
          <MarketplaceEmptyState onClearFilters={handleClearFilters} />
        ) : (
          <MarketplaceGrid
            offers={sortedOffers}
            viewMode={viewMode}
            isLoading={isLoading}
            hoveredGpu={hoveredGpu}
            onHover={handleGpuHover}
            onLeave={handleGpuLeave}
            onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
            selectedPurpose={selectedPurpose}
          />
        )}
      </main>

      {hoveredGpu && (
        <EnhancedGpuHoverCard
          gpu={hoveredGpu}
          position={mousePosition}
          onClose={() => setHoveredGpu(null)}
        />
      )}
    </div>
  );
};

export default Marketplace;
