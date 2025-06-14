import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Target, 
  ChevronDown, 
  SortAsc, 
  Settings,
  Star,
  MapPin,
  Zap
} from "lucide-react";
import Header from "@/components/Header";
import MarketplaceHero from "@/components/MarketplaceHero";
import VastAiGrid from "@/components/VastAiGrid";
import SmartRecommendations from "@/components/SmartRecommendations";
import GpuHoverDialog from "@/components/GpuHoverDialog";
import { UserProfile, GPUOffer } from "@/types/gpu-recommendation";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { recommendationEngine } from "@/utils/recommendationEngine";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredGpu, setHoveredGpu] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    organization: 'startup',
    workloadType: 'ai-training',
    budgetRange: 'medium',
    dataCompliance: 'none',
    geographicRequirements: [],
    scalabilityNeeds: 'dynamic'
  });

  const { data: offers, isLoading } = useVastAiOffers();

  const smartOffers = useMemo(() => {
    if (!offers) return [];
    
    return offers.map(offer => {
      const score = recommendationEngine.calculateScore(offer, userProfile);
      const matchReason = recommendationEngine.getMatchReasons(offer, userProfile);
      
      return {
        ...offer,
        recommendationScore: score,
        matchReason
      };
    });
  }, [offers, userProfile]);

  const brands = ['NVIDIA', 'AMD', 'Intel'];
  const locations = ['US East', 'US West', 'Europe', 'Asia'];

  const handleGpuHover = (gpu: any, event: React.MouseEvent) => {
    setHoveredGpu(gpu);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleGpuLeave = () => {
    setHoveredGpu(null);
  };

  const getSortLabel = (value: string) => {
    switch (value) {
      case 'price': return 'Price (Low to High)';
      case 'performance': return 'Reliability Score';
      case 'availability': return 'Availability Status';
      case 'recommendation': return 'Match Score';
      default: return 'Sort by';
    }
  };

  const topRecommendations = [...smartOffers]
    .sort((a, b) => (b.recommendationScore || 0) - (a.recommendationScore || 0))
    .slice(0, 6);

  const filteredOffers = smartOffers.filter(offer => {
    // Apply search filter
    if (searchTerm && !offer.gpu_name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply price filter
    const price = offer.dph_total || offer.pricing.onDemand;
    if (price < priceRange[0] || price > priceRange[1]) {
      return false;
    }
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      const matchesBrand = selectedBrands.some(brand => 
        offer.gpu_name.toLowerCase().includes(brand.toLowerCase())
      );
      if (!matchesBrand) return false;
    }
    
    return true;
  });

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return (a.dph_total || a.pricing.onDemand) - (b.dph_total || b.pricing.onDemand);
      case 'performance':
        return (b.reliability2 || b.reliability || 0) - (a.reliability2 || a.reliability || 0);
      case 'recommendation':
        return (b.recommendationScore || 0) - (a.recommendationScore || 0);
      case 'availability':
        const orderMap = { 'available': 0, 'limited': 1, 'unavailable': 2 };
        return orderMap[a.availability] - orderMap[b.availability];
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      <MarketplaceHero />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="w-80 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h3>
              
              {/* Price Range */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Price Range ($/hour)</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={15}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* GPU Brand */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">GPU Brand</label>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        className="rounded"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(selectedBrands.filter(b => b !== brand));
                          }
                        }}
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Performance Tier */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Performance Tier</label>
                <div className="space-y-2">
                  {['Entry', 'Mid-Range', 'High-End', 'Professional', 'Data Center'].map(tier => (
                    <label key={tier} className="flex items-center space-x-2">
                      <input type="radio" name="performance" className="rounded" />
                      <span className="text-sm">{tier}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Server Location */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Server Location</label>
                <div className="space-y-2">
                  {locations.map(location => (
                    <label key={location} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <Tabs defaultValue="recommendations" className="space-y-6">
              <div className="flex justify-between items-center">
                <TabsList className="grid w-fit grid-cols-2 bg-secondary">
                  <TabsTrigger value="recommendations" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Recommended for You
                  </TabsTrigger>
                  <TabsTrigger value="browse" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Browse All ({sortedOffers.length})
                  </TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
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
                      <DropdownMenuItem onClick={() => setSortBy('price')}>
                        Price (Low to High)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('performance')}>
                        Reliability Score
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('availability')}>
                        Availability Status
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('recommendation')}>
                        Match Score
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <TabsContent value="recommendations" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topRecommendations.map((offer) => (
                    <Card 
                      key={offer.id} 
                      className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/20"
                      onMouseEnter={(e) => handleGpuHover(offer, e)}
                      onMouseLeave={handleGpuLeave}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{offer.gpu_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {offer.num_gpus || 1}x GPU • {offer.gpu_ram || offer.specs.vramCapacity}GB VRAM
                            </p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {Math.round(offer.recommendationScore || 0)}% Match
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-bold">${(offer.dph_total || offer.pricing.onDemand).toFixed(3)}/hour</span>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {offer.datacenter || offer.location}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm">
                          <Zap className="h-3 w-3 text-yellow-500" />
                          {Math.round((offer.reliability2 || offer.reliability || 0) * 100)}% reliability
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {!isLoading && smartOffers && (
                  <SmartRecommendations 
                    offers={smartOffers}
                    userProfile={userProfile}
                  />
                )}
              </TabsContent>

              <TabsContent value="browse" className="space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search GPU models, hosts, or datacenters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* GPU Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {isLoading ? (
                    Array.from({ length: 12 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                            <div className="h-6 bg-muted rounded w-1/3"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    sortedOffers.map((offer) => (
                      <Card 
                        key={offer.id} 
                        className="hover:shadow-lg transition-all cursor-pointer"
                        onMouseEnter={(e) => handleGpuHover(offer, e)}
                        onMouseLeave={handleGpuLeave}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">{offer.gpu_name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {offer.num_gpus || 1}x GPU • {offer.gpu_ram || offer.specs.vramCapacity}GB VRAM
                              </p>
                            </div>
                            <Badge className={
                              offer.availability === 'available' ? "bg-green-100 text-green-800" :
                              offer.availability === 'limited' ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }>
                              {offer.availability}
                            </Badge>
                          </div>
                          
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-bold">${(offer.dph_total || offer.pricing.onDemand).toFixed(3)}/hour</span>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {(offer.datacenter || offer.location || "Unknown").split('(')[0].trim()}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 text-sm">
                            <Zap className="h-3 w-3 text-yellow-500" />
                            {Math.round((offer.reliability2 || offer.reliability || 0) * 100)}% reliability
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-border">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>CPU: {offer.cpu_cores || 8} cores</span>
                              <span>RAM: {offer.cpu_ram || 32}GB</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Hover Dialog */}
      {hoveredGpu && (
        <GpuHoverDialog
          gpu={hoveredGpu}
          position={mousePosition}
          onClose={() => setHoveredGpu(null)}
        />
      )}
    </div>
  );
};

export default Marketplace;
