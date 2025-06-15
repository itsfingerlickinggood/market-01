
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, SortAsc } from "lucide-react";
import Header from "@/components/Header";
import WorkloadMarketplaceHero from "@/components/WorkloadMarketplaceHero";
import PurposeFilterTags, { purposeTags } from "@/components/PurposeFilterTags";
import SimpleFilterTags from "@/components/SimpleFilterTags";
import MarketplaceGpuGrid from "@/components/MarketplaceGpuGrid";
import CompactGpuHoverDialog from "@/components/CompactGpuHoverDialog";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";
import { useWorkload } from "@/contexts/WorkloadContext";
import { calculateWorkloadScore } from "@/utils/workloadRecommendations";
import { enhanceProviderWithTrust } from "@/utils/trustScore";

const Marketplace = () => {
  const { selectedWorkload } = useWorkload();
  const [hoveredGpu, setHoveredGpu] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sortBy, setSortBy] = useState("workload-match");
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  
  // Simple filter states
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedVrams, setSelectedVrams] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);

  const { data: offers, isLoading } = useVastAiOffers();

  // Add workload scores to offers
  const enhancedOffers = useMemo(() => {
    if (!offers || !selectedWorkload) return offers || [];
    
    return offers.map(offer => ({
      ...offer,
      workloadScore: calculateWorkloadScore(offer, selectedWorkload.id)
    }));
  }, [offers, selectedWorkload]);

  const handleModelToggle = (model: string) => {
    setSelectedModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  const handleVramToggle = (vram: string) => {
    setSelectedVrams(prev => 
      prev.includes(vram) 
        ? prev.filter(v => v !== vram)
        : [...prev, vram]
    );
  };

  const handleRegionToggle = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const handleCompanyToggle = (company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const handleTierToggle = (tier: string) => {
    setSelectedTiers(prev => 
      prev.includes(tier) 
        ? prev.filter(t => t !== tier)
        : [...prev, tier]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedModels([]);
    setSelectedVrams([]);
    setSelectedRegions([]);
    setSelectedCompanies([]);
    setSelectedTiers([]);
  };

  // Filter offers based on selected tags
  const filteredOffers = (enhancedOffers || []).filter(offer => {
    // Model filter
    if (selectedModels.length > 0) {
      const matchesModel = selectedModels.some(model =>
        offer.gpu_name?.toLowerCase().includes(model.toLowerCase())
      );
      if (!matchesModel) return false;
    }

    // VRAM filter
    if (selectedVrams.length > 0) {
      const offerVram = offer.gpu_ram || 0;
      const matchesVram = selectedVrams.some(vram => {
        const vramNum = parseInt(vram);
        return offerVram >= vramNum && offerVram < (vramNum + 8);
      });
      if (!matchesVram) return false;
    }

    // Company filter
    if (selectedCompanies.length > 0) {
      const matchesCompany = selectedCompanies.some(company =>
        offer.gpu_name?.toLowerCase().includes(company.toLowerCase())
      );
      if (!matchesCompany) return false;
    }

    // Region filter (using datacenter as proxy for region)
    if (selectedRegions.length > 0) {
      const matchesRegion = selectedRegions.some(region => {
        const datacenter = offer.datacenter?.toLowerCase() || '';
        if (region === 'US East') return datacenter.includes('us') || datacenter.includes('east');
        if (region === 'US West') return datacenter.includes('us') || datacenter.includes('west');
        if (region === 'Europe') return datacenter.includes('eu') || datacenter.includes('europe');
        if (region === 'Asia Pacific') return datacenter.includes('asia') || datacenter.includes('ap');
        return datacenter.includes(region.toLowerCase());
      });
      if (!matchesRegion) return false;
    }

    // Trust tier filter
    if (selectedTiers.length > 0) {
      const reliability = offer.reliability2 || offer.reliability || 0;
      const tier = reliability > 0.9 ? 'verified' : 
                   reliability > 0.8 ? 'premium' : 'community';
      
      if (!selectedTiers.includes(tier)) return false;
    }

    return true;
  });

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case 'workload-match':
        return (b.workloadScore || 0) - (a.workloadScore || 0);
      case 'price':
        return (a.dph_total || a.pricing?.onDemand || 0) - (b.dph_total || b.pricing?.onDemand || 0);
      case 'performance':
        return (b.reliability2 || b.reliability || 0) - (a.reliability2 || a.reliability || 0);
      case 'availability':
        const orderMap = { 'available': 0, 'limited': 1, 'unavailable': 2 };
        return (orderMap[a.availability] || 2) - (orderMap[b.availability] || 2);
      case 'trust':
        const aTrust = enhanceProviderWithTrust({
          name: a.datacenter || 'Unknown',
          type: 'specialist' as const,
          tier: (a.reliability2 || a.reliability || 0) > 0.9 ? 'verified' : 
                (a.reliability2 || a.reliability || 0) > 0.8 ? 'premium' : 'community',
          globalScale: 8,
          slaGuarantee: 99.9,
          securityCertifications: [],
          egressPolicy: 'free' as const,
          specializations: []
        }).trustScore || 0;
        const bTrust = enhanceProviderWithTrust({
          name: b.datacenter || 'Unknown',
          type: 'specialist' as const,
          tier: (b.reliability2 || b.reliability || 0) > 0.9 ? 'verified' : 
                (b.reliability2 || b.reliability || 0) > 0.8 ? 'premium' : 'community',
          globalScale: 8,
          slaGuarantee: 99.9,
          securityCertifications: [],
          egressPolicy: 'free' as const,
          specializations: []
        }).trustScore || 0;
        return bTrust - aTrust;
      default:
        return 0;
    }
  });

  const getSortLabel = (value: string) => {
    switch (value) {
      case 'workload-match': return 'Best Match for ' + (selectedWorkload?.title || 'Workload');
      case 'price': return 'Price (Low to High)';
      case 'performance': return 'Reliability Score';
      case 'availability': return 'Availability Status';
      case 'trust': return 'Trust Score';
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
      <WorkloadMarketplaceHero />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <SimpleFilterTags
            selectedModels={selectedModels}
            selectedVrams={selectedVrams}
            selectedRegions={selectedRegions}
            selectedCompanies={selectedCompanies}
            selectedTiers={selectedTiers}
            onModelToggle={handleModelToggle}
            onVramToggle={handleVramToggle}
            onRegionToggle={handleRegionToggle}
            onCompanyToggle={handleCompanyToggle}
            onTierToggle={handleTierToggle}
            onClearAll={handleClearAllFilters}
          />

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Purpose Filter Tags */}
            <PurposeFilterTags 
              selectedPurpose={selectedPurpose}
              onPurposeChange={setSelectedPurpose}
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">
                  {selectedWorkload ? 
                    `${selectedWorkload.title} GPUs` : 
                    'All GPUs'
                  }
                </h2>
                <Badge variant="outline" className="text-sm">
                  {sortedOffers.length} available
                </Badge>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-w-[200px] justify-between">
                    <div className="flex items-center">
                      <SortAsc className="h-3 w-3 mr-1.5" />
                      <span className="truncate">{getSortLabel(sortBy)}</span>
                    </div>
                    <ChevronDown className="h-3 w-3 ml-1.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-background/95 backdrop-blur-md">
                  {selectedWorkload && (
                    <DropdownMenuItem onClick={() => setSortBy('workload-match')}>
                      Best Match for {selectedWorkload.title}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => setSortBy('trust')}>
                    Trust Score
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
