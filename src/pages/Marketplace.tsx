
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MapPin,
  Zap,
  Star,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CompactGpuHoverDialog from "@/components/CompactGpuHoverDialog";
import { UserProfile } from "@/types/gpu-recommendation";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { recommendationEngine } from "@/utils/recommendationEngine";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All GPUs");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
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

  const filterOptions = ['All GPUs', 'Gaming', 'AI/ML', 'Enterprise', 'Budget'];

  const getCompanyLogo = (gpuName: string) => {
    const name = gpuName.toLowerCase();
    if (name.includes('nvidia') || name.includes('rtx') || name.includes('gtx') || name.includes('tesla') || name.includes('quadro') || name.includes('geforce')) {
      return "/lovable-uploads/ea42f8a1-a209-460e-9282-59e2f86b0671.png";
    }
    if (name.includes('amd') || name.includes('radeon') || name.includes('rx ') || name.includes('vega')) {
      return "/lovable-uploads/41bc1768-42eb-4076-85a7-acf5a1380358.png";
    }
    if (name.includes('intel') || name.includes('arc') || name.includes('xe')) {
      return "/lovable-uploads/6b5e8159-3d79-49b1-a1df-9265f822064a.png";
    }
    return "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center";
  };

  const getGpuTags = (offer: any) => {
    const tags = [];
    const name = offer.gpu_name.toLowerCase();
    
    if (name.includes('rtx') || name.includes('tensor')) tags.push('AI Ready');
    if (name.includes('rtx') || name.includes('gtx')) tags.push('Gaming');
    if (name.includes('tesla') || name.includes('quadro')) tags.push('Enterprise');
    if ((offer.dph_total || 1.0) < 1.0) tags.push('Budget');
    if (offer.reliability2 > 0.9) tags.push('Reliable');
    
    return tags;
  };

  const filteredOffers = smartOffers.filter(offer => {
    if (searchTerm && !offer.gpu_name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (activeFilter !== "All GPUs") {
      const tags = getGpuTags(offer);
      const filterMap = {
        'Gaming': ['Gaming'],
        'AI/ML': ['AI Ready'],
        'Enterprise': ['Enterprise'],
        'Budget': ['Budget']
      };
      const requiredTags = filterMap[activeFilter] || [];
      if (!requiredTags.some(tag => tags.includes(tag))) {
        return false;
      }
    }
    
    return true;
  });

  const handleGpuHover = (offer: any, e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setHoveredGpu(offer);
  };

  const handleGpuLeave = () => {
    setHoveredGpu(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              Find Your Perfect GPU
            </h1>
            <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
              Compare prices across cloud providers. Rent powerful GPUs in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Floating Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all"
                placeholder="Search GPUs by model, brand, or use case..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full border transition-all duration-200 font-medium ${
                activeFilter === filter
                  ? 'border-green-300 bg-green-50 text-green-700'
                  : 'border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Advanced Filters Toggle */}
        <div className="text-center mb-12">
          <Button
            variant="ghost"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="text-slate-600 hover:text-slate-900"
          >
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-slate-600">
            Showing {filteredOffers.length} GPU{filteredOffers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* GPU Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-slate-200 rounded-3xl h-80"></div>
                <div className="mt-4 space-y-2">
                  <div className="bg-slate-200 h-4 rounded w-3/4"></div>
                  <div className="bg-slate-200 h-4 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No GPUs found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredOffers.map((offer) => {
              const tags = getGpuTags(offer);
              const logoSrc = getCompanyLogo(offer.gpu_name);
              
              return (
                <Link key={offer.id} to={`/gpu/${offer.id}`}>
                  <Card 
                    className="group relative bg-white rounded-3xl p-8 shadow-sm shadow-slate-200/50 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    onMouseEnter={(e) => handleGpuHover(offer, e)}
                    onMouseLeave={handleGpuLeave}
                    onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                  >
                    {/* Status Indicator */}
                    <div className="absolute top-6 right-6">
                      <div className={`w-3 h-3 rounded-full ${
                        offer.availability === 'available' ? 'bg-green-400 animate-pulse' :
                        offer.availability === 'limited' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}></div>
                    </div>
                    
                    <CardContent className="p-0">
                      {/* GPU Image */}
                      <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mb-6 flex items-center justify-center">
                        <img 
                          src={logoSrc}
                          alt={offer.gpu_name}
                          className="w-32 h-20 object-contain filter drop-shadow-lg"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900 truncate">
                            {offer.gpu_name}
                          </h3>
                          <p className="text-slate-500 mt-1">
                            {offer.gpu_ram || '24'}GB VRAM • {offer.num_gpus || 1}x GPU
                          </p>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {tags.slice(0, 2).map((tag) => (
                            <Badge 
                              key={tag}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                tag === 'AI Ready' ? 'bg-green-100 text-green-700' :
                                tag === 'Gaming' ? 'bg-blue-100 text-blue-700' :
                                tag === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                                tag === 'Budget' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Activity className="w-4 h-4" />
                            <span>{Math.round((offer.reliability2 || 0.75) * 100)}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{(offer.datacenter || offer.location || "Global").split('(')[0].trim()}</span>
                          </div>
                        </div>
                        
                        {/* Pricing */}
                        <div className="pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-slate-900">
                                ${(offer.dph_total || 1.0).toFixed(3)}
                              </span>
                              <span className="text-slate-500 ml-1">/hour</span>
                            </div>
                            <Button className="px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium">
                              Compare
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <Filter className="w-6 h-6" />
        </Button>
      </div>

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
