
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import MarketplaceGpuGrid from "@/components/MarketplaceGpuGrid";
import CompactGpuHoverDialog from "@/components/CompactGpuHoverDialog";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { useWorkload } from "@/contexts/WorkloadContext";
import { calculateWorkloadScore } from "@/utils/workloadRecommendations";

const Marketplace = () => {
  const { selectedWorkload } = useWorkload();
  const [hoveredGpu, setHoveredGpu] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sortBy, setSortBy] = useState("price");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const { data: offers, isLoading } = useVastAiOffers();

  // Add workload scores to offers
  const enhancedOffers = useMemo(() => {
    if (!offers || !selectedWorkload) return offers || [];
    
    return offers.map(offer => ({
      ...offer,
      workloadScore: calculateWorkloadScore(offer, selectedWorkload.id)
    }));
  }, [offers, selectedWorkload]);

  // Simple filtering
  const filteredOffers = useMemo(() => {
    let filtered = enhancedOffers || [];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(offer =>
        offer.gpu_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter(offer => {
        const price = offer.dph_total || 0;
        switch (priceFilter) {
          case "low": return price < 1;
          case "medium": return price >= 1 && price < 3;
          case "high": return price >= 3;
          default: return true;
        }
      });
    }

    return filtered;
  }, [enhancedOffers, searchTerm, priceFilter]);

  // Simple sorting
  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return (a.dph_total || 0) - (b.dph_total || 0);
      case 'performance':
        return (b.reliability2 || b.reliability || 0) - (a.reliability2 || a.reliability || 0);
      case 'workload-match':
        return (b.workloadScore || 0) - (a.workloadScore || 0);
      default:
        return 0;
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
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      {/* Simple Hero */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">GPU Marketplace</h1>
            <p className="text-muted-foreground">Find the perfect GPU for your needs</p>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-6">
        {/* Simple Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search GPUs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Price Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px] justify-between">
                  <Filter className="h-4 w-4 mr-2" />
                  Price: {priceFilter === "all" ? "All" : priceFilter === "low" ? "< $1/hr" : priceFilter === "medium" ? "$1-3/hr" : "> $3/hr"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setPriceFilter("all")}>
                  All Prices
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceFilter("low")}>
                  Under $1/hour
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceFilter("medium")}>
                  $1-3/hour
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceFilter("high")}>
                  Over $3/hour
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[140px] justify-between">
                  Sort: {sortBy === "price" ? "Price" : sortBy === "performance" ? "Performance" : "Best Match"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("price")}>
                  Price (Low to High)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("performance")}>
                  Performance
                </DropdownMenuItem>
                {selectedWorkload && (
                  <DropdownMenuItem onClick={() => setSortBy("workload-match")}>
                    Best Match
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {sortedOffers.length} GPUs available
            </Badge>
            {searchTerm && (
              <Badge variant="secondary">
                Filtered by: "{searchTerm}"
              </Badge>
            )}
            {priceFilter !== "all" && (
              <Badge variant="secondary">
                Price: {priceFilter === "low" ? "< $1/hr" : priceFilter === "medium" ? "$1-3/hr" : "> $3/hr"}
              </Badge>
            )}
          </div>
        </div>

        {/* GPU Grid */}
        <MarketplaceGpuGrid
          offers={sortedOffers}
          isLoading={isLoading}
          selectedPurpose={null}
          onGpuHover={handleGpuHover}
          onGpuLeave={handleGpuLeave}
          onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
        />

        {/* Empty state */}
        {!isLoading && sortedOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No GPUs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </main>

      {/* Hover Dialog */}
      {hoveredGpu && (
        <CompactGpuHoverDialog
          gpu={hoveredGpu}
          position={mousePosition}
          onClose={() => setHoveredGpu(null)}
        />
      )}
    </div>
  );
};

export default Marketplace;
