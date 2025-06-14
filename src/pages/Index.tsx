
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Zap, Target, Database, Shield, Cpu, TrendingUp, Users, BarChart3 } from "lucide-react";
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
        location: offer.datacenter || 'Unknown',
        reliability: offer.reliability2 || 0.95
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            The Future of GPU Compute
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access the world's most powerful GPUs from NVIDIA, AMD, and Intel. 
            Optimized for AI training, HPC, creative workloads, and more.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="text-lg px-8">
              Start Computing
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* GPU Provider Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Powered by Leading GPU Manufacturers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* NVIDIA Card */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/skins/common/images/NVIDIA_logo.svg" 
                    alt="NVIDIA"
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.classList.remove('hidden');
                    }}
                  />
                  <Cpu className="w-12 h-12 text-green-600 hidden" />
                </div>
                <CardTitle className="text-xl">NVIDIA GPUs</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Industry-leading performance with CUDA acceleration, featuring H100, A100, and RTX series.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>✓ CUDA Cores</span>
                    <span>✓ Tensor Cores</span>
                  </div>
                  <div className="flex justify-between">
                    <span>✓ NVLink Support</span>
                    <span>✓ RT Cores</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AMD Card */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg" 
                    alt="AMD"
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.classList.remove('hidden');
                    }}
                  />
                  <Cpu className="w-12 h-12 text-red-600 hidden" />
                </div>
                <CardTitle className="text-xl">AMD GPUs</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Exceptional FP64 performance with MI300X and Radeon Pro series for HPC and AI workloads.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>✓ ROCm Support</span>
                    <span>✓ 192GB VRAM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>✓ HBM3 Memory</span>
                    <span>✓ Open Source</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intel Card */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" 
                    alt="Intel"
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.classList.remove('hidden');
                    }}
                  />
                  <Cpu className="w-12 h-12 text-blue-600 hidden" />
                </div>
                <CardTitle className="text-xl">Intel GPUs</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Emerging Arc and Xe architecture bringing competitive performance and innovation.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>✓ Arc Graphics</span>
                    <span>✓ oneAPI</span>
                  </div>
                  <div className="flex justify-between">
                    <span>✓ Ray Tracing</span>
                    <span>✓ AI Acceleration</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Smart Recommendations */}
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-3 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Smart Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  AI-powered matching based on your workload requirements and budget.
                </p>
              </CardContent>
            </Card>

            {/* Real-time Pricing */}
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-3 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Real-time Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Live market data with spot, on-demand, and reserved pricing options.
                </p>
              </CardContent>
            </Card>

            {/* Global Scale */}
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-3 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Global Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Access GPUs across multiple providers and regions worldwide.
                </p>
              </CardContent>
            </Card>

            {/* Enterprise Security */}
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-3 w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  SOC2, GDPR, and HIPAA compliance options for sensitive workloads.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
