
export interface GPUSpecs {
  vramCapacity: number; // GB
  memoryBandwidth: number; // GB/s
  memoryType: 'HBM3' | 'HBM2E' | 'GDDR6X' | 'GDDR6';
  cudaCores?: number;
  tensorCores?: number;
  rtCores?: number;
  fp64Performance: number; // TFLOPS
  fp32Performance: number; // TFLOPS
  fp16Performance: number; // TFLOPS
  nvlinkSupport: boolean;
  interconnectBandwidth?: number; // GB/s
}

export interface PricingModel {
  onDemand: number; // $/hour
  reserved?: number; // $/hour with commitment
  spot?: number; // $/hour spot pricing
  dataEgressFee: number; // $/GB
  storageCost: number; // $/GB/month
}

export interface Provider {
  name: string;
  type: 'hyperscaler' | 'specialist' | 'decentralized';
  globalScale: number; // 1-10 rating
  slaGuarantee: number; // percentage
  securityCertifications: string[];
  egressPolicy: 'free' | 'paid';
  specializations: WorkloadType[];
}

export type WorkloadType = 'ai-training' | 'ai-inference' | 'hpc' | 'creative' | 'gaming' | 'general';

export interface UserProfile {
  organization: 'startup' | 'enterprise' | 'individual' | 'research';
  workloadType: WorkloadType;
  budgetRange: 'low' | 'medium' | 'high';
  dataCompliance: 'none' | 'gdpr' | 'hipaa' | 'sox';
  geographicRequirements: string[];
  scalabilityNeeds: 'static' | 'dynamic' | 'burst';
}

export interface GPUOffer {
  id: number;
  gpu_name: string;
  specs: GPUSpecs;
  pricing: PricingModel;
  provider: Provider;
  availability: 'available' | 'limited' | 'unavailable';
  location: string;
  reliability: number;
  recommendationScore?: number;
  matchReason?: string[];
}

export interface RecommendationEngine {
  calculateScore(offer: GPUOffer, profile: UserProfile): number;
  getMatchReasons(offer: GPUOffer, profile: UserProfile): string[];
  filterByWorkload(offers: GPUOffer[], workload: WorkloadType): GPUOffer[];
}
