
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import MinimalMarketplaceCard from "@/components/MinimalMarketplaceCard";
import EnhancedGpuHoverCard from "@/components/EnhancedGpuHoverCard";
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
  const { data: offers, isLoading } = useVastAiOffers();

  // Add workload scores and deal rankings to offers
  const enhancedOffers = useMemo(() => {
    if (!offers) return [];
    return offers.map(offer => {
      const workloadScore = selectedWorkload ? calculateWorkloadScore(offer, selectedWorkload.id) : 0;
      const price = offer.dph_total || 0;
      const reliability = offer.reliability2 || offer.reliability || 0;
      const dealScore = reliability > 0 ? reliability * 100 / Math.max(price, 0.1) : 0;
      return {
        ...offer,
        workloadScore,
        dealScore,
        isBestDeal: dealScore > 30,
        isHotDeal: price < 1 && reliability > 0.8
      };
    });
  }, [offers, selectedWorkload]);

  // Filter offers
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

  // Sort offers
  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case 'best-deals': return (b.dealScore || 0) - (a.dealScore || 0);
      case 'lowest-price': return (a.dph_total || 0) - (b.dph_total || 0);
      case 'highest-performance': return (b.reliability2 || b.reliability || 0) - (a.reliability2 || a.reliability || 0);
      case 'workload-match': return (b.workloadScore || 0) - (a.workloadScore || 0);
      default: return 0;
    }
  });

  const handleGpuHover = (offer: any, e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setHoveredGpu(offer);
  };

  const handleGpuLeave = () => {
    setHoveredGpu(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Header />
      
      {/* Clean Minimal Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              GPU Marketplace
            </h1>
            <p className="text-lg text-gray-600">
              Rent high-performance GPUs from verified providers worldwide
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Simplified Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search GPU models..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-9 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>

            <div className="flex gap-3">
              {/* Price Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 min-w-[140px] justify-between border-gray-300">
                    <Filter className="h-4 w-4 mr-2" />
                    {priceFilter === "all" ? "All Prices" : 
                     priceFilter === "budget" ? "Budget" : 
                     priceFilter === "value" ? "Value" : "Premium"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuItem onClick={() => setPriceFilter("all")}>
                    All Prices
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("budget")}>
                    Budget (Under $0.50/hr)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("value")}>
                    Value ($0.50-2/hr)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("premium")}>
                    Premium (Over $2/hr)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 min-w-[160px] justify-between border-gray-300">
                    Sort: {sortBy === "best-deals" ? "Best Deals" : 
                           sortBy === "lowest-price" ? "Lowest Price" : 
                           sortBy === "highest-performance" ? "Performance" : "Best Match"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuItem onClick={() => setSortBy("best-deals")}>
                    Best Deals
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("lowest-price")}>
                    Lowest Price
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("highest-performance")}>
                    Best Performance
                  </DropdownMenuItem>
                  {selectedWorkload && (
                    <DropdownMenuItem onClick={() => setSortBy("workload-match")}>
                      Best Match
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="text-sm px-3 py-1 border-gray-300">
              {sortedOffers.length} GPUs found
            </Badge>
            {searchTerm && (
              <Badge variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-700">
                "{searchTerm}"
              </Badge>
            )}
            {priceFilter !== "all" && (
              <Badge variant="secondary" className="px-3 py-1 bg-green-50 text-green-700">
                {priceFilter === "budget" ? "Budget" : 
                 priceFilter === "value" ? "Value" : "Premium"} range
              </Badge>
            )}
          </div>
        </div>

        {/* Clean GPU Grid */}
        <div className="mb-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedOffers.map((offer) => (
                <MinimalMarketplaceCard
                  key={offer.id}
                  offer={offer}
                  onHover={handleGpuHover}
                  onLeave={handleGpuLeave}
                  onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                />
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {!isLoading && sortedOffers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No GPUs found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or browse all available options
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
              }} 
              className="px-6"
            >
              Show all GPUs
            </Button>
          </div>
        )}
      </main>

      {/* Enhanced Hover Card */}
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
