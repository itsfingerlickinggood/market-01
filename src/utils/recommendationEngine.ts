
import { GPUOffer, UserProfile, WorkloadType, RecommendationEngine } from '@/types/gpu-recommendation';

export class SmartRecommendationEngine implements RecommendationEngine {
  private workloadRequirements = {
    'ai-training': {
      minVRAM: 80, // GB for large models
      fp16Performance: 100, // Minimum TFLOPS
      nvlinkRequired: true,
      memoryBandwidth: 2000, // GB/s
      rtCoresRequired: false
    },
    'ai-inference': {
      minVRAM: 24,
      fp16Performance: 50,
      nvlinkRequired: false,
      memoryBandwidth: 1000,
      rtCoresRequired: false
    },
    'hpc': {
      minVRAM: 32,
      fp64Performance: 50, // Critical for scientific computing
      nvlinkRequired: false,
      memoryBandwidth: 1500,
      rtCoresRequired: false
    },
    'creative': {
      minVRAM: 24, // For 8K editing
      rtCoresRequired: true,
      fp32Performance: 30,
      nvlinkRequired: false,
      memoryBandwidth: 1000
    },
    'gaming': {
      minVRAM: 16,
      rtCoresRequired: true,
      fp32Performance: 20,
      nvlinkRequired: false,
      memoryBandwidth: 800
    },
    'general': {
      minVRAM: 8,
      fp32Performance: 10,
      nvlinkRequired: false,
      memoryBandwidth: 500,
      rtCoresRequired: false
    }
  };

  calculateScore(offer: GPUOffer, profile: UserProfile): number {
    let score = 0;
    const requirements = this.workloadRequirements[profile.workloadType];
    
    // Performance scoring (40% weight)
    const performanceScore = this.calculatePerformanceScore(offer.specs, requirements);
    score += performanceScore * 0.4;
    
    // Cost efficiency (30% weight)
    const costScore = this.calculateCostScore(offer.pricing, profile.budgetRange);
    score += costScore * 0.3;
    
    // Provider fit (20% weight)
    const providerScore = this.calculateProviderScore(offer.provider, profile);
    score += providerScore * 0.2;
    
    // Availability and reliability (10% weight)
    const reliabilityScore = this.calculateReliabilityScore(offer);
    score += reliabilityScore * 0.1;
    
    return Math.min(100, Math.max(0, score));
  }

  private calculatePerformanceScore(specs: any, requirements: any): number {
    let score = 0;
    
    // VRAM adequacy
    if (specs.vramCapacity >= requirements.minVRAM) {
      score += 30;
    } else {
      score += (specs.vramCapacity / requirements.minVRAM) * 30;
    }
    
    // Compute performance based on workload
    if (requirements.fp64Performance && specs.fp64Performance) {
      score += Math.min(30, (specs.fp64Performance / requirements.fp64Performance) * 30);
    } else if (requirements.fp16Performance && specs.fp16Performance) {
      score += Math.min(30, (specs.fp16Performance / requirements.fp16Performance) * 30);
    } else {
      score += Math.min(30, (specs.fp32Performance / requirements.fp32Performance) * 30);
    }
    
    // Memory bandwidth
    if (specs.memoryBandwidth >= requirements.memoryBandwidth) {
      score += 20;
    } else {
      score += (specs.memoryBandwidth / requirements.memoryBandwidth) * 20;
    }
    
    // Special requirements
    if (requirements.nvlinkRequired && specs.nvlinkSupport) score += 10;
    if (requirements.rtCoresRequired && specs.rtCores) score += 10;
    
    return score;
  }

  private calculateCostScore(pricing: any, budgetRange: string): number {
    const costWeight = {
      'low': { spot: 0.6, onDemand: 0.3, reserved: 0.1 },
      'medium': { spot: 0.3, onDemand: 0.4, reserved: 0.3 },
      'high': { spot: 0.1, onDemand: 0.3, reserved: 0.6 }
    };
    
    const weights = costWeight[budgetRange as keyof typeof costWeight];
    let score = 50; // Base score
    
    // Penalize expensive options for budget-conscious users
    if (budgetRange === 'low' && pricing.onDemand > 2.0) {
      score -= 20;
    }
    
    // Reward cost-effective options
    if (pricing.spot && pricing.spot < pricing.onDemand * 0.3) {
      score += 20;
    }
    
    return Math.min(100, Math.max(0, score));
  }

  private calculateProviderScore(provider: any, profile: UserProfile): number {
    let score = 50; // Base score
    
    // Organization type alignment
    if (profile.organization === 'enterprise' && provider.type === 'hyperscaler') {
      score += 20;
    } else if (profile.organization === 'startup' && provider.type === 'specialist') {
      score += 15;
    } else if (profile.organization === 'individual' && provider.type === 'decentralized') {
      score += 10;
    }
    
    // Data compliance
    if (profile.dataCompliance !== 'none' && provider.securityCertifications?.length > 0) {
      score += 15;
    }
    
    // Specialization match
    if (provider.specializations?.includes(profile.workloadType)) {
      score += 15;
    }
    
    return Math.min(100, Math.max(0, score));
  }

  private calculateReliabilityScore(offer: GPUOffer): number {
    let score = offer.reliability * 50; // Base reliability score
    
    if (offer.availability === 'available') {
      score += 30;
    } else if (offer.availability === 'limited') {
      score += 15;
    }
    
    return Math.min(100, Math.max(0, score));
  }

  getMatchReasons(offer: GPUOffer, profile: UserProfile): string[] {
    const reasons: string[] = [];
    const requirements = this.workloadRequirements[profile.workloadType];
    
    if (offer.specs.vramCapacity >= requirements.minVRAM) {
      reasons.push(`Sufficient VRAM (${offer.specs.vramCapacity}GB) for ${profile.workloadType}`);
    }
    
    if (profile.workloadType === 'hpc' && offer.specs.fp64Performance > 50) {
      reasons.push(`Excellent FP64 performance (${offer.specs.fp64Performance} TFLOPS) for scientific computing`);
    }
    
    if (profile.workloadType === 'ai-training' && offer.specs.nvlinkSupport) {
      reasons.push('NVLink support for multi-GPU scaling');
    }
    
    if (profile.workloadType === 'creative' && offer.specs.rtCores) {
      reasons.push('RT Cores for real-time ray tracing');
    }
    
    if (profile.budgetRange === 'low' && offer.pricing.spot) {
      reasons.push(`Spot pricing available at $${offer.pricing.spot.toFixed(3)}/hour`);
    }
    
    if (offer.provider.egressPolicy === 'free') {
      reasons.push('Free data egress - no hidden transfer costs');
    }
    
    if (offer.provider.specializations?.includes(profile.workloadType)) {
      reasons.push(`${offer.provider.name} specializes in ${profile.workloadType} workloads`);
    }
    
    return reasons;
  }

  filterByWorkload(offers: GPUOffer[], workload: WorkloadType): GPUOffer[] {
    const requirements = this.workloadRequirements[workload];
    
    return offers.filter(offer => {
      // Basic requirements check
      if (offer.specs.vramCapacity < requirements.minVRAM) return false;
      if (requirements.nvlinkRequired && !offer.specs.nvlinkSupport) return false;
      if (requirements.rtCoresRequired && !offer.specs.rtCores) return false;
      
      return true;
    });
  }
}

export const recommendationEngine = new SmartRecommendationEngine();
