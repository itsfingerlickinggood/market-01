
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, SortAsc, Grid3X3, List, Star } from "lucide-react";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import GPUComparisonCard from "@/components/GPUComparisonCard";
import { GPU, FilterState, SortOption } from "@/types/gpu-comparison";
import { gpuCatalog, sortOptions } from "@/data/gpuCatalog";

const GPUComparison = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-low");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedGPUs, setSelectedGPUs] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    vramSizes: [],
    useCases: [],
    priceTiers: [],
    features: [],
    priceRange: [0, 10]
  });

  // Filter and sort GPUs
  const filteredAndSortedGPUs = useMemo(() => {
    let filtered = gpuCatalog.filter((gpu) => {
      // Search filter
      if (searchTerm && !gpu.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !gpu.model.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !gpu.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(gpu.brand)) {
        return false;
      }

      // VRAM filter
      if (filters.vramSizes.length > 0 && !filters.vramSizes.includes(gpu.vram)) {
        return false;
      }

      // Use case filter
      if (filters.useCases.length > 0 && !filters.useCases.some(useCase => gpu.tags.includes(useCase))) {
        return false;
      }

      // Price tier filter
      if (filters.priceTiers.length > 0 && !filters.priceTiers.some(tier => gpu.tags.includes(tier))) {
        return false;
      }

      // Features filter
      if (filters.features.length > 0 && !filters.features.some(feature => gpu.tags.includes(feature))) {
        return false;
      }

      // Price range filter
      if (gpu.basePrice < filters.priceRange[0] || gpu.basePrice > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.basePrice - b.basePrice;
        case 'price-high':
          return b.basePrice - a.basePrice;
        case 'performance':
          return b.performanceScore - a.performanceScore;
        case 'vram':
          return parseInt(b.vram) - parseInt(a.vram);
        case 'power-efficiency':
          return (a.performanceScore / parseInt(a.power)) - (b.performanceScore / parseInt(b.power));
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [searchTerm, filters, sortBy]);

  const handleGPUSelect = (gpu: GPU) => {
    setSelectedGPUs(prev => 
      prev.includes(gpu.id) 
        ? prev.filter(id => id !== gpu.id)
        : [...prev, gpu.id]
    );
  };

  const getSortLabel = (value: string) => {
    return sortOptions.find(option => option.value === value)?.label || 'Sort by';
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">GPU Rental Comparison</h1>
          <p className="text-xl opacity-90 mb-6">
            Compare prices and specs across multiple providers
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge className="bg-white/20 text-white text-sm px-3 py-1">
              8+ Providers
            </Badge>
            <Badge className="bg-white/20 text-white text-sm px-3 py-1">
              Real-time Pricing
            </Badge>
            <Badge className="bg-white/20 text-white text-sm px-3 py-1">
              Advanced Filtering
            </Badge>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              resultCount={filteredAndSortedGPUs.length}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Top Controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">
                  GPU Catalog ({filteredAndSortedGPUs.length})
                </h2>
                {selectedGPUs.length > 0 && (
                  <Badge variant="secondary" className="px-3 py-1">
                    {selectedGPUs.length} selected
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="flex border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="px-3"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="min-w-[180px] justify-between">
                      <div className="flex items-center">
                        <SortAsc className="h-4 w-4 mr-2" />
                        <span>{getSortLabel(sortBy)}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem 
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {filteredAndSortedGPUs.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Available GPUs</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${Math.min(...filteredAndSortedGPUs.map(g => g.basePrice)).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Lowest Price/hr</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.max(...filteredAndSortedGPUs.map(g => g.performanceScore))}
                  </div>
                  <div className="text-sm text-muted-foreground">Top Performance</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.max(...filteredAndSortedGPUs.map(g => parseInt(g.vram)))}GB
                  </div>
                  <div className="text-sm text-muted-foreground">Max VRAM</div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for Featured/All */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-fit grid-cols-3">
                <TabsTrigger value="featured" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Featured
                </TabsTrigger>
                <TabsTrigger value="all">
                  All GPUs ({filteredAndSortedGPUs.length})
                </TabsTrigger>
                <TabsTrigger value="popular">
                  Popular
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {/* GPU Grid */}
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }>
                  {filteredAndSortedGPUs.map((gpu) => (
                    <GPUComparisonCard
                      key={gpu.id}
                      gpu={gpu}
                      onCompare={handleGPUSelect}
                      isSelected={selectedGPUs.includes(gpu.id)}
                    />
                  ))}
                </div>

                {filteredAndSortedGPUs.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <div className="text-muted-foreground">
                        No GPUs found matching your criteria. Try adjusting your filters.
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="featured">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedGPUs
                    .filter(gpu => gpu.tags.includes('high-end') || gpu.performanceScore > 90)
                    .slice(0, 6)
                    .map((gpu) => (
                      <GPUComparisonCard
                        key={gpu.id}
                        gpu={gpu}
                        onCompare={handleGPUSelect}
                        isSelected={selectedGPUs.includes(gpu.id)}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="popular">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedGPUs
                    .filter(gpu => gpu.tags.includes('gaming') || gpu.tags.includes('ai'))
                    .slice(0, 9)
                    .map((gpu) => (
                      <GPUComparisonCard
                        key={gpu.id}
                        gpu={gpu}
                        onCompare={handleGPUSelect}
                        isSelected={selectedGPUs.includes(gpu.id)}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Selected GPUs comparison */}
            {selectedGPUs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Comparison ({selectedGPUs.length} selected)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedGPUs.map(id => {
                      const gpu = gpuCatalog.find(g => g.id === id);
                      if (!gpu) return null;
                      return (
                        <div key={id} className="p-4 border rounded-lg">
                          <h4 className="font-semibold">{gpu.name}</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>VRAM: {gpu.vram}</div>
                            <div>Price: ${gpu.basePrice}/hr</div>
                            <div>Score: {gpu.performanceScore}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button>Compare Detailed</Button>
                    <Button variant="outline" onClick={() => setSelectedGPUs([])}>
                      Clear Selection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GPUComparison;
