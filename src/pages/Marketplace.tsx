
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Filter, Grid3X3, List, Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import Header from "@/components/Header";
import MinimalMarketplaceCard from "@/components/MinimalMarketplaceCard";
import EnhancedGpuHoverCard from "@/components/EnhancedGpuHoverCard";
import PurposeFilterTags from "@/components/PurposeFilterTags";
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
  const [density, setDensity] = useState<"compact" | "comfortable">("compact");
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
    setHoveredGpu(offer);
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

  const availableCount = sortedOffers.filter(offer => offer.rentable !== false).length;
  const matchCount = sortedOffers.filter(offer => offer.isPurposeMatch).length;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Ultra-Minimal Header */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          {/* Title Row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">Marketplace</h1>
              {selectedPurpose && matchCount > 0 && (
                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {matchCount} Perfect Matches
                </Badge>
              )}
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Controls Row */}
          <div className="flex items-center gap-4 mb-4">
            {/* Purpose Tags */}
            <div className="flex-1">
              <PurposeFilterTags 
                selectedPurpose={selectedPurpose}
                onPurposeChange={handlePurposeChange}
              />
            </div>
            
            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search GPUs..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="pl-10 h-9 w-64 border-gray-200 focus:border-gray-300 focus:ring-0" 
                />
              </div>

              {/* All Filters */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 border-gray-200 text-gray-600">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <div className="p-2 border-b border-gray-100">
                    <div className="text-xs font-medium text-gray-500 mb-2">Price Range</div>
                    <div className="space-y-1">
                      <DropdownMenuItem onClick={() => setPriceFilter("all")} className="text-sm">
                        All Prices
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setPriceFilter("budget")} className="text-sm">
                        Budget (&lt;$0.50/hr)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setPriceFilter("value")} className="text-sm">
                        Value ($0.50-2/hr)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setPriceFilter("premium")} className="text-sm">
                        Premium (&gt;$2/hr)
                      </DropdownMenuItem>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="text-xs font-medium text-gray-500 mb-2">Sort By</div>
                    <div className="space-y-1">
                      <DropdownMenuItem onClick={() => setSortBy("best-deals")} className="text-sm">
                        Best Deals
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("lowest-price")} className="text-sm">
                        Lowest Price
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("highest-performance")} className="text-sm">
                        Best Performance
                      </DropdownMenuItem>
                      {selectedPurpose && (
                        <DropdownMenuItem onClick={() => setSortBy("purpose-match")} className="text-sm">
                          Perfect Match
                        </DropdownMenuItem>
                      )}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Density Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDensity(density === "compact" ? "comfortable" : "compact")}
                className="h-9 text-gray-600"
              >
                {density === "compact" ? "Compact" : "Comfortable"}
              </Button>
            </div>
          </div>

          {/* Live Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              {sortedOffers.length} GPUs
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {availableCount} Available
            </span>
            {selectedPurpose && matchCount > 0 && (
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                {matchCount} Perfect Matches
              </span>
            )}
            {searchTerm && <span>• Filtered by "{searchTerm}"</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        {isLoading ? (
          <div className={viewMode === "grid" 
            ? `grid gap-3 ${density === "compact" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}` 
            : "space-y-2"
          }>
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? `grid gap-3 ${density === "compact" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}` 
            : "space-y-2"
          }>
            {sortedOffers.map((offer) => (
              <MinimalMarketplaceCard
                key={offer.id}
                offer={offer}
                onHover={handleGpuHover}
                onLeave={handleGpuLeave}
                onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                showPurposeMatch={selectedPurpose && offer.isPurposeMatch}
                density={density}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Enhanced Empty State */}
        {!isLoading && sortedOffers.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No GPUs match your criteria</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search terms to find more options
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
                setSelectedPurpose(null);
              }}
              className="border-gray-200"
            >
              Clear all filters
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
