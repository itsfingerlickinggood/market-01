
import { useState, useMemo } from "react";
import { UserProfile } from "@/types/gpu-recommendation";
import { purposeTags } from "@/components/PurposeFilterTags";
import { recommendationEngine } from "@/utils/recommendationEngine";

export const useMarketplaceFilters = (offers: any[]) => {
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

  return {
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    selectedBrands,
    setSelectedBrands,
    selectedPurpose,
    setSelectedPurpose,
    sortedOffers
  };
};
