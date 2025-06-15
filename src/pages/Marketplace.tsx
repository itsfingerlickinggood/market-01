
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Filter, Zap, Star, MapPin, TrendingUp } from "lucide-react";
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

  // Get featured deals
  const featuredDeals = sortedOffers.filter(offer => offer.isHotDeal).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      {/* Modern Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Best GPU Deals Updated Live</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GPU Marketplace
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Compare prices from leading cloud providers and find the perfect GPU for your workload at the best price.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Card className="border-0 bg-white/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{offers?.length || 0}+</div>
                  <div className="text-sm text-muted-foreground">Available GPUs</div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">$0.10+</div>
                  <div className="text-sm text-muted-foreground">Starting Price/hr</div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-muted-foreground">Instant Deploy</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Featured Deals */}
        {featuredDeals.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold">Featured Deals</h2>
              <Badge variant="destructive" className="animate-pulse">Hot</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredDeals.map((offer) => (
                <Card key={offer.id} className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{offer.gpu_name}</h4>
                        <p className="text-sm text-muted-foreground">{offer.num_gpus || 1}x GPU</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">🔥 Hot</Badge>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-3xl font-bold text-green-600">
                          ${(offer.dph_total || 0).toFixed(3)}
                        </div>
                        <div className="text-sm text-muted-foreground">per hour</div>
                      </div>
                      <div className="text-right text-xs">
                        <div className="flex items-center gap-1 mb-1">
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
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search RTX 4090, A100, H100..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            <div className="flex gap-3">
              {/* Price Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-12 min-w-[160px] justify-between">
                    <Filter className="h-4 w-4 mr-2" />
                    {priceFilter === "all" ? "All Prices" : 
                     priceFilter === "budget" ? "Budget" : 
                     priceFilter === "value" ? "Value" : "Premium"}
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
                  <Button variant="outline" className="h-12 min-w-[180px] justify-between">
                    Sort: {sortBy === "best-deals" ? "Best Deals" : 
                           sortBy === "lowest-price" ? "Lowest Price" : 
                           sortBy === "highest-performance" ? "Performance" : "Best Match"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("best-deals")}>
                    🏆 Best Deals
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("lowest-price")}>
                    💰 Lowest Price
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("highest-performance")}>
                    ⚡ Best Performance
                  </DropdownMenuItem>
                  {selectedWorkload && (
                    <DropdownMenuItem onClick={() => setSortBy("workload-match")}>
                      🎯 Best Match
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="text-sm px-3 py-1">
              {sortedOffers.length} deals found
            </Badge>
            {searchTerm && (
              <Badge variant="secondary" className="px-3 py-1">
                "{searchTerm}"
              </Badge>
            )}
            {priceFilter !== "all" && (
              <Badge variant="secondary" className="px-3 py-1">
                {priceFilter === "budget" ? "Budget" : 
                 priceFilter === "value" ? "Value" : "Premium"} range
              </Badge>
            )}
          </div>
        </div>

        {/* GPU Grid */}
        <div className="mb-8">
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
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold mb-4">No deals found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or browse all available deals
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
              }}
              className="px-8"
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
