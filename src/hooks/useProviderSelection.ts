
import { useState, useMemo } from "react";
import { providerCatalog, ProviderInfo, getProvidersByGpuModel } from "@/data/providerCatalog";

interface UseProviderSelectionProps {
  gpuModel?: string;
  filters?: {
    maxPrice?: number;
    minTrustScore?: number;
    availability?: 'available' | 'limited' | 'unavailable';
    providerType?: ProviderInfo['type'];
  };
}

export const useProviderSelection = ({ 
  gpuModel, 
  filters = {} 
}: UseProviderSelectionProps = {}) => {
  const [selectedProvider, setSelectedProvider] = useState<ProviderInfo | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'trust' | 'rating' | 'uptime'>('price');

  const availableProviders = useMemo(() => {
    let providers = gpuModel 
      ? getProvidersByGpuModel(gpuModel)
      : providerCatalog;

    // Apply filters
    if (filters.maxPrice && gpuModel) {
      providers = providers.filter(provider => {
        const price = provider.pricing[gpuModel.toLowerCase() as keyof typeof provider.pricing];
        return price ? price <= filters.maxPrice! : true;
      });
    }

    if (filters.minTrustScore) {
      providers = providers.filter(provider => 
        provider.trustScore >= filters.minTrustScore!
      );
    }

    if (filters.availability) {
      providers = providers.filter(provider => 
        provider.availability === filters.availability
      );
    }

    if (filters.providerType) {
      providers = providers.filter(provider => 
        provider.type === filters.providerType
      );
    }

    // Sort providers
    providers.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          if (!gpuModel) return 0;
          const priceA = a.pricing[gpuModel.toLowerCase() as keyof typeof a.pricing] || 999;
          const priceB = b.pricing[gpuModel.toLowerCase() as keyof typeof b.pricing] || 999;
          return priceA - priceB;
        case 'trust':
          return b.trustScore - a.trustScore;
        case 'rating':
          return b.hostRating - a.hostRating;
        case 'uptime':
          return b.uptime - a.uptime;
        default:
          return 0;
      }
    });

    return providers;
  }, [gpuModel, filters, sortBy]);

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev => 
      prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const isFavorite = (providerId: string) => favorites.includes(providerId);

  const getBestProvider = () => {
    return availableProviders.length > 0 ? availableProviders[0] : null;
  };

  const getProviderPrice = (provider: ProviderInfo) => {
    if (!gpuModel) return null;
    return provider.pricing[gpuModel.toLowerCase() as keyof typeof provider.pricing] || null;
  };

  return {
    availableProviders,
    selectedProvider,
    setSelectedProvider,
    favorites,
    toggleFavorite,
    isFavorite,
    sortBy,
    setSortBy,
    getBestProvider,
    getProviderPrice
  };
};
