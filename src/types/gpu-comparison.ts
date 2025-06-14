
export interface GPU {
  id: string;
  name: string;
  brand: 'NVIDIA' | 'AMD' | 'Intel';
  model: string;
  vram: string;
  memoryType: string;
  cudaCores?: number;
  basePrice: number;
  performanceScore: number;
  power: string;
  tags: string[];
  specifications: {
    architecture: string;
    memoryBandwidth: string;
    rtCores?: number;
    tensorCores?: number;
  };
  image?: string;
}

export interface Provider {
  id: string;
  name: string;
  color: string;
  website: string;
  logo?: string;
  features: string[];
  pros: string[];
  cons: string[];
  pricing: {
    hourly: number;
    monthly: number;
    spot?: number;
  };
  setupTime: string;
  support: string;
  locations: string[];
  rating: number;
  availability: 'available' | 'limited' | 'unavailable';
}

export interface PriceHistory {
  date: string;
  provider: string;
  price: number;
}

export interface FilterState {
  brands: string[];
  vramSizes: string[];
  useCases: string[];
  priceTiers: string[];
  features: string[];
  priceRange: [number, number];
}

export interface SortOption {
  value: string;
  label: string;
}
