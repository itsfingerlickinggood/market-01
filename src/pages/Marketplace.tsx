
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Filter, 
  ChevronDown, 
  SortAsc, 
  MapPin,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import MarketplaceHero from "@/components/MarketplaceHero";
import PurposeFilterTags, { purposeTags } from "@/components/PurposeFilterTags";
import CompactGpuHoverDialog from "@/components/CompactGpuHoverDialog";
import { UserProfile, GPUOffer } from "@/types/gpu-recommendation";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { recommendationEngine } from "@/utils/recommendationEngine";

const Marketplace = () => {
  const [sortBy, setSortBy] = useState("recommendation");
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    organization: 'startup',
    workloadType: 'ai-training',
    budgetRange: 'medium',
    dataCompliance: 'none',
    geographicRequirements: [],
    scalabilityNeeds: 'dynamic'
  });

  const [hoveredGpu, setHoveredGpu] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { data: offers, isLoading } = useVastAiOffers();

  // Update user profile when purpose changes
  const updatedUserProfile = useMemo(() => {
    if (!selectedPurpose) return userProfile;
    
    const purposeTag = purposeTags.find(tag => tag.id === selectedPurpose);
    if (!purposeTag) return userProfile;
    
    return {
      ...userProfile,
      workloadType: purposeTag.requirements.workloadType as any
    };
  }, [userProfile, selectedPurpose]);

  const smartOffers = useMemo(() => {
    if (!offers) return [];
    
    return offers.map(offer => {
      const score = recommendationEngine.calculateScore(offer, updatedUserProfile);
      const matchReason = recommendationEngine.getMatchReasons(offer, updatedUserProfile);
      
      return {
        ...offer,
        recommendationScore: score,
        matchReason
      };
    });
  }, [offers, updatedUserProfile]);

  const brands = ['NVIDIA', 'AMD', 'Intel'];
  const locations = ['US East', 'US West', 'Europe', 'Asia'];

  const getSortLabel = (value: string) => {
    switch (value) {
      case 'price': return 'Price (Low to High)';
      case 'performance': return 'Reliability Score';
      case 'availability': return 'Availability Status';
      case 'recommendation': return 'Match Score';
      default: return 'Sort by';
    }
  };

  const filteredOffers = smartOffers.filter(offer => {
    // Apply purpose-based filtering
    if (selectedPurpose) {
      const purposeTag = purposeTags.find(tag => tag.id === selectedPurpose);
      if (purposeTag) {
        const vram = offer.gpu_ram || offer.specs?.vramCapacity || 0;
        if (vram < purposeTag.requirements.minVram) {
          return false;
        }
        
        // Check if GPU model matches preferred ones
        const hasPreferredGpu = purposeTag.requirements.preferredGpu.some(preferred =>
          offer.gpu_name.toLowerCase().includes(preferred.toLowerCase())
        );
        
        // If it's a high-requirement purpose, prioritize preferred GPUs
        if (purposeTag.requirements.minVram >= 16 && !hasPreferredGpu) {
          return offer.recommendationScore && offer.recommendationScore > 70;
        }
      }
    }
    
    // Apply price filter
    const price = offer.dph_total || offer.pricing?.onDemand || 0;
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
        return (a.dph_total || a.pricing?.onDemand || 0) - (b.dph_total || b.pricing?.onDemand || 0);
      case 'performance':
        return (b.reliability2 || b.reliability || 0) - (a.reliability2 || a.reliability || 0);
      case 'recommendation':
        return (b.recommendationScore || 0) - (a.recommendationScore || 0);
      case 'availability':
        const orderMap = { 'available': 0, 'limited': 1, 'unavailable': 2 };
        return (orderMap[a.availability] || 2) - (orderMap[b.availability] || 2);
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
                  <Link key={offer.id} to={`/gpu/${offer.id}`}>
                    <Card 
                      className={`hover:shadow-lg transition-all cursor-pointer ${
                        selectedPurpose && offer.recommendationScore && offer.recommendationScore > 80 ? 
                        'border-2 border-primary/30 bg-primary/5' : ''
                      }`}
                      onMouseEnter={(e) => handleGpuHover(offer, e)}
                      onMouseLeave={handleGpuLeave}
                      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{offer.gpu_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {offer.num_gpus || 1}x GPU • {offer.gpu_ram || offer.specs?.vramCapacity || 'N/A'}GB VRAM
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            {selectedPurpose && offer.recommendationScore && offer.recommendationScore > 80 && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Perfect Match
                              </Badge>
                            )}
                            <Badge className={
                              offer.availability === 'available' ? "bg-green-100 text-green-800" :
                              offer.availability === 'limited' ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }>
                              {offer.availability}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-bold">
                            ${(offer.dph_total || offer.pricing?.onDemand || 0).toFixed(3)}/hour
                          </span>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {(offer.datacenter || offer.location || "Unknown").split('(')[0].trim()}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm mb-3">
                          <Zap className="h-3 w-3 text-yellow-500" />
                          {Math.round((offer.reliability2 || offer.reliability || 0) * 100)}% reliability
                        </div>
                        
                        {selectedPurpose && offer.recommendationScore && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Match Score</span>
                              <span>{Math.round(offer.recommendationScore)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                                style={{ width: `${offer.recommendationScore}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="pt-3 border-t border-border">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>CPU: {offer.cpu_cores || 8} cores</span>
                            <span>RAM: {offer.cpu_ram || 32}GB</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
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
