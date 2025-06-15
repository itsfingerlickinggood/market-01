
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Filter, Grid3X3, List, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import UltraMinimalGpuCard from "@/components/UltraMinimalGpuCard";
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
    // Intelligent hover delay
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

  const availableCount = sortedOffers.filter(offer => offer.rentable !== false).length;
  const matchCount = sortedOffers.filter(offer => offer.isPurposeMatch).length;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      
      {/* Zen Header - Pure Canvas */}
      <div className="border-b border-border transition-colors duration-300">
        <div className="container mx-auto px-6 py-8">
          {/* Ultra-Minimal Title */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <h1 className="text-3xl font-light text-foreground tracking-tight transition-colors duration-300">Marketplace</h1>
              {selectedPurpose && matchCount > 0 && (
                <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 transition-colors duration-300">
                  <Sparkles className="h-3 w-3 mr-1.5" />
                  {matchCount} Perfect Matches
                </Badge>
              )}
            </div>
            
            {/* Ghost View Controls */}
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 transition-colors duration-300">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 px-3 text-xs transition-all duration-300"
              >
                <Grid3X3 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 px-3 text-xs transition-all duration-300"
              >
                <List className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          {/* Invisible Grid Controls */}
          <div className="flex items-center gap-6 mb-6">
            {/* Purpose Tags */}
            <div className="flex-1">
              <PurposeFilterTags 
                selectedPurpose={selectedPurpose}
                onPurposeChange={handlePurposeChange}
              />
            </div>
            
            {/* Ghost Controls */}
            <div className="flex items-center gap-4">
              {/* Ultra-Minimal Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300" />
                <Input 
                  placeholder="Search..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="pl-10 h-9 w-56 border-border/60 focus:border-border bg-background transition-all duration-300" 
                />
              </div>

              {/* Ghost Filters */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 text-muted-foreground hover:text-foreground transition-colors duration-300">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-background/95 backdrop-blur-md border border-border/60 transition-colors duration-300">
                  <div className="p-3 border-b border-border/60">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Price Range</div>
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
                  <div className="p-3">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Sort By</div>
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
            </div>
          </div>

          {/* Breathing Status Dots */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground transition-colors duration-300">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              {sortedOffers.length} GPUs
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              {availableCount} Available
            </span>
            {selectedPurpose && matchCount > 0 && (
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                {matchCount} Perfect Matches
              </span>
            )}
            {searchTerm && <span>• "{searchTerm}"</span>}
          </div>
        </div>
      </div>

      {/* Invisible Grid Content */}
      <main className="container mx-auto px-6 py-8">
        {isLoading ? (
          <div className={viewMode === "grid" 
            ? "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6" 
            : "space-y-2"
          }>
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted/60 rounded-lg p-4 space-y-3 transition-colors duration-300">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-5 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6" 
            : "space-y-1"
          }>
            {sortedOffers.map((offer) => (
              <UltraMinimalGpuCard
                key={offer.id}
                offer={offer}
                onHover={handleGpuHover}
                onLeave={handleGpuLeave}
                onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                showPurposeMatch={selectedPurpose && offer.isPurposeMatch}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Zen Empty State */}
        {!isLoading && sortedOffers.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-xl font-light text-foreground mb-3 transition-colors duration-300">Nothing found</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed transition-colors duration-300">
              Try adjusting your search or filters to discover more GPU options
            </p>
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
                setSelectedPurpose(null);
              }}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
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
