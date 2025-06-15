
export interface GPUOffer {
  id: number;
  gpu_name: string;
  num_gpus: number;
  gpu_ram: number;
  dph_total: number;
  datacenter: string;
  cpu_cores: number;
  cpu_ram: number;
  disk_space: number;
  reliability2: number;
  rentable: boolean;
  specs: GPUSpecs;
  pricing: PricingTiers;
  provider: ProviderInfo;
  availability: 'available' | 'limited' | 'unavailable';
  location: string;
  reliability: number;
  recommendationScore?: number;
  matchReason?: string[];
  workloadScore?: number;
  marketData?: {
    trend: 'up' | 'down' | 'stable';
    demandLevel: 'low' | 'medium' | 'high';
    reasoningFactors: string[];
  };
}

export interface GPUSpecs {
  vramCapacity: number;
  memoryBandwidth: number;
  memoryType: string;
  cudaCores?: number;
  rtCores?: number;
  fp64Performance: number;
  fp32Performance: number;
  fp16Performance: number;
  nvlinkSupport: boolean;
  interconnectBandwidth?: number;
}

export interface PricingTiers {
  onDemand: number;
  reserved: number;
  spot: number;
  dataEgressFee: number;
  storageCost: number;
}

export type ProviderTier = 'verified' | 'community' | 'premium';

export interface ProviderInfo {
  name: string;
  type: 'hyperscaler' | 'specialist' | 'decentralized';
  tier: ProviderTier;
  globalScale: number;
  slaGuarantee: number;
  securityCertifications: string[];
  egressPolicy: 'free' | 'paid';
  specializations: WorkloadType[];
  verificationBadges?: VerificationBadge[];
  trustScore?: number;
  uptimeGuarantee?: number;
}

export interface VerificationBadge {
  type: 'iso27001' | 'soc2' | 'hipaa' | 'gdpr' | 'enterprise' | 'performance' | 'uptime';
  verified: boolean;
  verifiedDate?: string;
  description: string;
}

export type WorkloadType = 'ai-training' | 'ai-inference' | 'gaming' | 'creative' | 'hpc' | 'general';

export interface UserProfile {
  organization: 'startup' | 'enterprise' | 'academic' | 'individual';
  workloadType: WorkloadType;
  budgetRange: 'low' | 'medium' | 'high' | 'enterprise';
  dataCompliance: 'none' | 'gdpr' | 'hipaa' | 'soc2';
  geographicRequirements: string[];
  scalabilityNeeds: 'fixed' | 'dynamic' | 'burst';
}

export interface RecommendationScore {
  overall: number;
  performance: number;
  pricing: number;
  availability: number;
  compliance: number;
  location: number;
}

export interface SmartRecommendation {
  id: number;
  gpu_name: string;
  num_gpus: number;
  gpu_ram: number;
  dph_total: number;
  datacenter: string;
  cpu_cores: number;
  cpu_ram: number;
  disk_space: number;
  reliability2: number;
  rentable: boolean;
  specs: GPUSpecs;
  pricing: PricingTiers;
  provider: ProviderInfo;
  availability: 'available' | 'limited' | 'unavailable';
  location: string;
  reliability: number;
  recommendationScore: RecommendationScore;
  matchReasons: string[];
  alternatives: number[];
  marketData?: {
    trend: 'up' | 'down' | 'stable';
    demandLevel: 'low' | 'medium' | 'high';
    reasoningFactors: string[];
  };
}

export interface RecommendationEngine {
  calculateScore(offer: GPUOffer, profile: UserProfile): number;
  getMatchReasons(offer: GPUOffer, profile: UserProfile): string[];
  filterByWorkload(offers: GPUOffer[], workload: WorkloadType): GPUOffer[];
}
