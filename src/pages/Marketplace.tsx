import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Filter, Target, Sparkles, Grid3X3, List } from "lucide-react";
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
  const { data: offers, isLoading } = useVastAiOffers();

  // Add workload scores and deal rankings to offers
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

  const purposeMatchCount = sortedOffers.filter(offer => offer.isPurposeMatch).length;

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      {/* Compact Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">GPU Marketplace</h1>
              {selectedPurpose && purposeMatchCount > 0 && (
                <Badge className="bg-primary text-primary-foreground">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {purposeMatchCount} Matches
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Compact Controls */}
          <div className="flex flex-col lg:flex-row gap-3">
            <PurposeFilterTags 
              selectedPurpose={selectedPurpose}
              onPurposeChange={handlePurposeChange}
            />
            
            <div className="flex gap-2 lg:ml-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="pl-8 h-8 w-48 text-sm" 
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 text-sm">
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    {priceFilter === "all" ? "Price" : 
                     priceFilter === "budget" ? "Budget" : 
                     priceFilter === "value" ? "Value" : "Premium"}
                    <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setPriceFilter("all")}>All Prices</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("budget")}>Budget (&lt;$0.50/hr)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("value")}>Value ($0.50-2/hr)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("premium")}>Premium (&gt;$2/hr)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 text-sm">
                    Sort
                    <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("best-deals")}>Best Deals</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("lowest-price")}>Lowest Price</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("highest-performance")}>Best Performance</DropdownMenuItem>
                  {selectedPurpose && (
                    <DropdownMenuItem onClick={() => setSortBy("purpose-match")}>Perfect Match</DropdownMenuItem>
                  )}
                  {selectedWorkload && (
                    <DropdownMenuItem onClick={() => setSortBy("workload-match")}>Workload Match</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
            <span>{sortedOffers.length} GPUs</span>
            {searchTerm && <span>• "{searchTerm}"</span>}
            {priceFilter !== "all" && <span>• {priceFilter}</span>}
            {selectedPurpose && (
              <Badge variant="secondary" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                {selectedPurpose.replace('-', ' ')}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4">
        {/* GPU Grid/List */}
        {isLoading ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3" 
            : "space-y-2"
          }>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card border rounded-lg p-3 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-5 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3" 
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
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && sortedOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-medium mb-2">No GPUs found</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Try adjusting your search criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
                setSelectedPurpose(null);
              }}
            >
              Reset filters
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
