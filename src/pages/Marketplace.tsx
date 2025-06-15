
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Filter, TrendingDown, Zap, Star, MapPin, ArrowDownToLine } from "lucide-react";
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
      
      // Calculate deal score based on price vs performance
      const dealScore = reliability > 0 ? (reliability * 100) / Math.max(price, 0.1) : 0;
      
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
      case 'best-deals':
        return (b.dealScore || 0) - (a.dealScore || 0);
      case 'lowest-price':
        return (a.dph_total || 0) - (b.dph_total || 0);
      case 'highest-performance':
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

  // Get top deals for highlights
  const hotDeals = sortedOffers.filter(offer => offer.isHotDeal).slice(0, 3);
  const bestDeals = sortedOffers.filter(offer => offer.isBestDeal).slice(0, 6);

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      {/* Hero Section - Deal Focused */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingDown className="h-8 w-8 text-green-600" />
              <h1 className="text-4xl font-bold">Market01</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-2">
              Find the Best GPU Rental Deals Across the Internet
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Compare prices from top providers • Zero egress fees • Instant deployment
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {offers?.length || 0}+ GPUs Available
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Starting at $0.10/hr
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <ArrowDownToLine className="h-3 w-3 mr-1" />
                  Zero Egress
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Hot Deals Section */}
        {hotDeals.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold">🔥 Hot Deals</h2>
              <Badge variant="destructive" className="animate-pulse">Limited Time</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {hotDeals.map((offer) => (
                <Card key={offer.id} className="border-2 border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{offer.gpu_name}</h4>
                      <Badge className="bg-orange-100 text-orange-800">Hot Deal</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        ${(offer.dph_total || 0).toFixed(3)}/hr
                      </span>
                      <div className="text-right text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {Math.round((offer.reliability2 || offer.reliability || 0) * 100)}%
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {(offer.datacenter || "Unknown").split('(')[0].trim()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for RTX 4090, A100, H100..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Price Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[140px] justify-between">
                  <Filter className="h-4 w-4 mr-2" />
                  {priceFilter === "all" ? "All Prices" : 
                   priceFilter === "budget" ? "Budget (<$0.50)" : 
                   priceFilter === "value" ? "Value ($0.50-2)" : "Premium (>$2)"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
                <Button variant="outline" className="min-w-[160px] justify-between">
                  Sort: {sortBy === "best-deals" ? "Best Deals" : 
                         sortBy === "lowest-price" ? "Lowest Price" : 
                         sortBy === "highest-performance" ? "Best Performance" : "Best Match"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("best-deals")}>
                  🏆 Best Deals (Price/Performance)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("lowest-price")}>
                  💰 Lowest Price First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("highest-performance")}>
                  ⚡ Highest Performance
                </DropdownMenuItem>
                {selectedWorkload && (
                  <DropdownMenuItem onClick={() => setSortBy("workload-match")}>
                    🎯 Best Match for Workload
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Results Summary */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {sortedOffers.length} deals found
            </Badge>
            {searchTerm && (
              <Badge variant="secondary">
                Search: "{searchTerm}"
              </Badge>
            )}
            {priceFilter !== "all" && (
              <Badge variant="secondary">
                {priceFilter === "budget" ? "Budget" : 
                 priceFilter === "value" ? "Value" : "Premium"} deals
              </Badge>
            )}
            <Badge className="bg-green-100 text-green-800 ml-auto">
              <ArrowDownToLine className="h-3 w-3 mr-1" />
              All deals include zero egress fees
            </Badge>
          </div>
        </div>

        {/* GPU Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Available GPU Deals</h2>
            <Button variant="outline" size="sm" onClick={() => {
              setSearchTerm("");
              setPriceFilter("all");
              setSortBy("best-deals");
            }}>
              Clear Filters
            </Button>
          </div>
          
          <MarketplaceGpuGrid
            offers={sortedOffers}
            isLoading={isLoading}
            selectedPurpose={null}
            onGpuHover={handleGpuHover}
            onGpuLeave={handleGpuLeave}
            onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
          />
        </div>

        {/* Empty State */}
        {!isLoading && sortedOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No deals found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all available deals
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
              }}
            >
              Show all deals
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
