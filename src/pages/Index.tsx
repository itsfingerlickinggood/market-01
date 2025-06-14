
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Zap, Target } from "lucide-react";
import VastAiGrid from "@/components/VastAiGrid";
import UserProfileSelector from "@/components/UserProfileSelector";
import SmartRecommendations from "@/components/SmartRecommendations";
import { UserProfile, GPUOffer } from "@/types/gpu-recommendation";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { recommendationEngine } from "@/utils/recommendationEngine";
import { useMemo } from "react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    organization: 'startup',
    workloadType: 'ai-training',
    budgetRange: 'medium',
    dataCompliance: 'none',
    geographicRequirements: [],
    scalabilityNeeds: 'dynamic'
  });

  const { data: offers, isLoading } = useVastAiOffers();

  // Generate smart recommendations with scores
  const smartOffers = useMemo(() => {
    if (!offers) return [];
    
    return offers.map(offer => {
      // Enhance offer with mock specs and provider data for demonstration
      const enhancedOffer: GPUOffer = {
        ...offer,
        specs: {
          vramCapacity: offer.gpu_name?.includes('H100') ? 80 : 
                       offer.gpu_name?.includes('4090') ? 24 :
                       offer.gpu_name?.includes('4080') ? 16 :
                       offer.gpu_name?.includes('3090') ? 24 : 12,
          memoryBandwidth: offer.gpu_name?.includes('H100') ? 3350 : 
                          offer.gpu_name?.includes('4090') ? 1008 : 936,
          memoryType: offer.gpu_name?.includes('H100') ? 'HBM3' : 'GDDR6X' as const,
          fp64Performance: offer.gpu_name?.includes('MI300X') ? 163 : 
                          offer.gpu_name?.includes('H100') ? 67 : 19,
          fp32Performance: offer.gpu_name?.includes('H100') ? 989 : 
                          offer.gpu_name?.includes('4090') ? 166 : 84,
          fp16Performance: offer.gpu_name?.includes('H100') ? 1979 : 
                          offer.gpu_name?.includes('4090') ? 332 : 168,
          nvlinkSupport: offer.gpu_name?.includes('H100') || offer.gpu_name?.includes('4090'),
          rtCores: offer.gpu_name?.includes('RTX') ? 128 : 0,
          cudaCores: offer.gpu_name?.includes('4090') ? 16384 : 10496
        },
        pricing: {
          onDemand: offer.dph_total || 1.0,
          spot: offer.dph_total ? offer.dph_total * 0.3 : 0.3,
          reserved: offer.dph_total ? offer.dph_total * 0.7 : 0.7,
          dataEgressFee: 0.09,
          storageCost: 0.1
        },
        provider: {
          name: 'Vast.ai',
          type: 'specialist' as const,
          globalScale: 7,
          slaGuarantee: 99.5,
          securityCertifications: ['SOC2'],
          egressPolicy: 'paid' as const,
          specializations: ['ai-training', 'ai-inference'] as const
        },
        availability: 'available' as const,
        location: offer.geolocation || 'Unknown',
        reliability: offer.reliability_2 || 0.95
      };

      const score = recommendationEngine.calculateScore(enhancedOffer, userProfile);
      const matchReason = recommendationEngine.getMatchReasons(enhancedOffer, userProfile);
      
      return {
        ...enhancedOffer,
        recommendationScore: score,
        matchReason
      };
    });
  }, [offers, userProfile]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/placeholder.svg" 
                  alt="GPUTrade Logo" 
                  className="h-10 w-10 object-contain"
                />
                <Zap className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">GPUTrade</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Analytics</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <UserProfileSelector 
          onProfileUpdate={setUserProfile}
          currentProfile={userProfile}
        />

        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Smart Recommendations
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse All
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6">
            {!isLoading && smartOffers && (
              <SmartRecommendations 
                offers={smartOffers}
                userProfile={userProfile}
              />
            )}
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search GPU models, hosts, or datacenters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md text-sm"
                >
                  <option value="price">Sort by Price</option>
                  <option value="performance">Sort by Reliability</option>
                  <option value="availability">Sort by Availability</option>
                  <option value="recommendation">Sort by Match Score</option>
                </select>
              </div>
            </div>

            {/* GPU Grid */}
            <VastAiGrid searchTerm={searchTerm} sortBy={sortBy} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
