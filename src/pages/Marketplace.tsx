
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, SortAsc } from "lucide-react";
import Header from "@/components/Header";
import MarketplaceHero from "@/components/MarketplaceHero";
import PurposeFilterTags, { purposeTags } from "@/components/PurposeFilterTags";
import MarketplaceFilters from "@/components/MarketplaceFilters";
import MarketplaceGpuGrid from "@/components/MarketplaceGpuGrid";
import CompactGpuHoverDialog from "@/components/CompactGpuHoverDialog";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { useMarketplaceFilters } from "@/hooks/useMarketplaceFilters";

const Marketplace = () => {
  const [hoveredGpu, setHoveredGpu] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { data: offers, isLoading } = useVastAiOffers();
  
  const {
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    selectedBrands,
    setSelectedBrands,
    selectedPurpose,
    setSelectedPurpose,
    sortedOffers
  } = useMarketplaceFilters(offers || []);

  const getSortLabel = (value: string) => {
    switch (value) {
      case 'price': return 'Price (Low to High)';
      case 'performance': return 'Reliability Score';
      case 'availability': return 'Availability Status';
      case 'recommendation': return 'Match Score';
      default: return 'Sort by';
    }
  };

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
      <MarketplaceHero />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <MarketplaceFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Purpose Filter Tags */}
            <PurposeFilterTags 
              selectedPurpose={selectedPurpose}
              onPurposeChange={setSelectedPurpose}
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">
                  {selectedPurpose ? 
                    `GPUs for ${purposeTags.find(t => t.id === selectedPurpose)?.label}` : 
                    'All GPUs'
                  }
                </h2>
                <Badge variant="outline" className="text-sm">
                  {sortedOffers.length} available
                </Badge>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-w-[160px] justify-between">
                    <div className="flex items-center">
                      <SortAsc className="h-3 w-3 mr-1.5" />
                      <span>{getSortLabel(sortBy)}</span>
                    </div>
                    <ChevronDown className="h-3 w-3 ml-1.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-md">
                  <DropdownMenuItem onClick={() => setSortBy('recommendation')}>
                    Match Score
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price')}>
                    Price (Low to High)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('performance')}>
                    Reliability Score
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('availability')}>
                    Availability Status
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* GPU Grid */}
            <MarketplaceGpuGrid
              offers={sortedOffers}
              isLoading={isLoading}
              selectedPurpose={selectedPurpose}
              onGpuHover={handleGpuHover}
              onGpuLeave={handleGpuLeave}
              onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
            />
          </div>
        </div>
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
