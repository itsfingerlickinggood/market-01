
import { Workload } from '@/components/WorkloadSelector';

export interface WorkloadRequirements {
  minVram: number;
  preferredGpu: string[];
  budgetTier: 'budget' | 'mid' | 'premium';
  performanceWeight: number;
  priceWeight: number;
  features: string[];
}

export const workloadRequirements: Record<string, WorkloadRequirements> = {
  'ai-training': {
    minVram: 16,
    preferredGpu: ['H100', 'A100', 'RTX 4090'],
    budgetTier: 'premium',
    performanceWeight: 0.8,
    priceWeight: 0.2,
    features: ['tensor-cores', 'nvlink']
  },
  'ai-inference': {
    minVram: 8,
    preferredGpu: ['RTX 4090', 'RTX 4080', 'A100'],
    budgetTier: 'mid',
    performanceWeight: 0.6,
    priceWeight: 0.4,
    features: ['tensor-cores']
  },
  '3d-rendering': {
    minVram: 12,
    preferredGpu: ['RTX 4090', 'RTX 4080', 'RTX 3090'],
    budgetTier: 'premium',
    performanceWeight: 0.7,
    priceWeight: 0.3,
    features: ['ray-tracing', 'cuda-cores']
  },
  'video-editing': {
    minVram: 8,
    preferredGpu: ['RTX 4090', 'RTX 4070', 'RTX 3080'],
    budgetTier: 'mid',
    performanceWeight: 0.6,
    priceWeight: 0.4,
    features: ['nvenc', 'cuda-cores']
  },
  'gaming': {
    minVram: 8,
    preferredGpu: ['RTX 4080', 'RTX 4070', 'RTX 3080'],
    budgetTier: 'mid',
    performanceWeight: 0.5,
    priceWeight: 0.5,
    features: ['ray-tracing', 'dlss']
  },
  'hpc-compute': {
    minVram: 32,
    preferredGpu: ['H100', 'A100', 'V100'],
    budgetTier: 'premium',
    performanceWeight: 0.9,
    priceWeight: 0.1,
    features: ['nvlink', 'ecc-memory']
  }
};

export const calculateWorkloadScore = (gpu: any, workloadId: string): number => {
  const requirements = workloadRequirements[workloadId];
  if (!requirements) return 0;

  let score = 0;
  const gpuName = gpu.gpu_name?.toLowerCase() || '';
  const vram = gpu.gpu_ram || 0;
  const price = gpu.dph_total || gpu.pricing?.onDemand || 0;

  // VRAM requirement (0-30 points)
  if (vram >= requirements.minVram) {
    score += 30;
  } else {
    score += (vram / requirements.minVram) * 30;
  }

  // Preferred GPU match (0-40 points)
  const hasPreferredGpu = requirements.preferredGpu.some(preferred =>
    gpuName.includes(preferred.toLowerCase())
  );
  if (hasPreferredGpu) {
    score += 40;
  }

  // Price efficiency (0-20 points)
  const priceScore = Math.max(0, 20 - (price * 5));
  score += priceScore * requirements.priceWeight;

  // Reliability (0-10 points)
  const reliability = gpu.reliability2 || gpu.reliability || 0;
  score += reliability * 10;

  return Math.min(100, Math.max(0, score));
};

export const getWorkloadSpecificFilters = (workloadId: string) => {
  const requirements = workloadRequirements[workloadId];
  if (!requirements) return {};

  return {
    minVram: requirements.minVram,
    preferredModels: requirements.preferredGpu,
    budgetTier: requirements.budgetTier,
    features: requirements.features
  };
};
