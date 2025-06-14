
import { GPU, Provider } from '@/types/gpu-comparison';

export const gpuCatalog: GPU[] = [
  {
    id: 'rtx-4090',
    name: 'NVIDIA RTX 4090',
    brand: 'NVIDIA',
    model: 'RTX 4090',
    vram: '24GB',
    memoryType: 'GDDR6X',
    cudaCores: 16384,
    basePrice: 2.89,
    performanceScore: 95,
    power: '450W',
    tags: ['gaming', 'ai', 'high-end', 'cuda', '24gb-vram', 'nvidia', 'ray-tracing'],
    specifications: {
      architecture: 'Ada Lovelace',
      memoryBandwidth: '1008 GB/s',
      rtCores: 128,
      tensorCores: 512
    }
  },
  {
    id: 'rtx-4080',
    name: 'NVIDIA RTX 4080',
    brand: 'NVIDIA',
    model: 'RTX 4080',
    vram: '16GB',
    memoryType: 'GDDR6X',
    cudaCores: 9728,
    basePrice: 1.89,
    performanceScore: 87,
    power: '320W',
    tags: ['gaming', 'ai', 'mid-range', 'cuda', '16gb-vram', 'nvidia', 'ray-tracing'],
    specifications: {
      architecture: 'Ada Lovelace',
      memoryBandwidth: '717 GB/s',
      rtCores: 76,
      tensorCores: 304
    }
  },
  {
    id: 'rtx-4070',
    name: 'NVIDIA RTX 4070',
    brand: 'NVIDIA',
    model: 'RTX 4070',
    vram: '12GB',
    memoryType: 'GDDR6X',
    cudaCores: 5888,
    basePrice: 1.29,
    performanceScore: 78,
    power: '200W',
    tags: ['gaming', 'budget', 'cuda', '12gb-vram', 'nvidia', 'ray-tracing'],
    specifications: {
      architecture: 'Ada Lovelace',
      memoryBandwidth: '504 GB/s',
      rtCores: 46,
      tensorCores: 184
    }
  },
  {
    id: 'a100-80gb',
    name: 'NVIDIA A100 80GB',
    brand: 'NVIDIA',
    model: 'A100',
    vram: '80GB',
    memoryType: 'HBM2e',
    cudaCores: 6912,
    basePrice: 4.99,
    performanceScore: 100,
    power: '400W',
    tags: ['ai', 'datacenter', 'enterprise', 'cuda', '80gb-vram', 'nvidia', 'tensor-cores'],
    specifications: {
      architecture: 'Ampere',
      memoryBandwidth: '2039 GB/s',
      tensorCores: 432
    }
  },
  {
    id: 'h100-80gb',
    name: 'NVIDIA H100 80GB',
    brand: 'NVIDIA',
    model: 'H100',
    vram: '80GB',
    memoryType: 'HBM3',
    cudaCores: 14592,
    basePrice: 8.99,
    performanceScore: 100,
    power: '700W',
    tags: ['ai', 'datacenter', 'enterprise', 'cuda', '80gb-vram', 'nvidia', 'tensor-cores'],
    specifications: {
      architecture: 'Hopper',
      memoryBandwidth: '3350 GB/s',
      tensorCores: 456
    }
  },
  {
    id: 'v100-32gb',
    name: 'NVIDIA Tesla V100 32GB',
    brand: 'NVIDIA',
    model: 'V100',
    vram: '32GB',
    memoryType: 'HBM2',
    cudaCores: 5120,
    basePrice: 2.49,
    performanceScore: 82,
    power: '300W',
    tags: ['ai', 'datacenter', 'cuda', '32gb-vram', 'nvidia', 'tensor-cores'],
    specifications: {
      architecture: 'Volta',
      memoryBandwidth: '900 GB/s',
      tensorCores: 640
    }
  },
  {
    id: 'rtx-3090',
    name: 'NVIDIA RTX 3090',
    brand: 'NVIDIA',
    model: 'RTX 3090',
    vram: '24GB',
    memoryType: 'GDDR6X',
    cudaCores: 10496,
    basePrice: 1.69,
    performanceScore: 85,
    power: '350W',
    tags: ['gaming', 'ai', 'mid-range', 'cuda', '24gb-vram', 'nvidia', 'ray-tracing'],
    specifications: {
      architecture: 'Ampere',
      memoryBandwidth: '936 GB/s',
      rtCores: 82,
      tensorCores: 328
    }
  },
  {
    id: 'rtx-3080',
    name: 'NVIDIA RTX 3080',
    brand: 'NVIDIA',
    model: 'RTX 3080',
    vram: '10GB',
    memoryType: 'GDDR6X',
    cudaCores: 8704,
    basePrice: 1.19,
    performanceScore: 80,
    power: '320W',
    tags: ['gaming', 'budget', 'cuda', '10gb-vram', 'nvidia', 'ray-tracing'],
    specifications: {
      architecture: 'Ampere',
      memoryBandwidth: '760 GB/s',
      rtCores: 68,
      tensorCores: 272
    }
  }
];

export const providers: Provider[] = [
  {
    id: 'aws-ec2',
    name: 'AWS EC2',
    color: '#FF9900',
    website: 'https://aws.amazon.com/ec2/',
    features: ['Global availability', 'Enterprise support', 'Scalable infrastructure'],
    pros: ['Reliable uptime', 'Extensive documentation', 'Wide global reach'],
    cons: ['Higher pricing', 'Complex billing', 'Steep learning curve'],
    pricing: { hourly: 3.06, monthly: 2200 },
    setupTime: '5-10 minutes',
    support: '24/7 Enterprise',
    locations: ['US East', 'US West', 'EU', 'Asia'],
    rating: 4.5,
    availability: 'available'
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    color: '#4285F4',
    website: 'https://cloud.google.com/compute/',
    features: ['AI/ML optimized', 'Preemptible instances', 'Custom machine types'],
    pros: ['AI/ML focus', 'Competitive pricing', 'Advanced networking'],
    cons: ['Limited regions', 'Newer platform', 'Less enterprise adoption'],
    pricing: { hourly: 2.89, monthly: 2080 },
    setupTime: '3-7 minutes',
    support: '24/7 Premium',
    locations: ['US Central', 'EU West', 'Asia East'],
    rating: 4.3,
    availability: 'available'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    color: '#0078D4',
    website: 'https://azure.microsoft.com/',
    features: ['Windows integration', 'Hybrid cloud', 'Active Directory'],
    pros: ['Enterprise integration', 'Hybrid capabilities', 'Microsoft ecosystem'],
    cons: ['Complex pricing', 'Performance variations', 'Limited GPU options'],
    pricing: { hourly: 3.21, monthly: 2310 },
    setupTime: '5-12 minutes',
    support: '24/7 Professional',
    locations: ['US East', 'EU North', 'Asia Southeast'],
    rating: 4.2,
    availability: 'limited'
  },
  {
    id: 'runpod',
    name: 'RunPod',
    color: '#6366F1',
    website: 'https://runpod.io/',
    features: ['GPU specialized', 'Spot pricing', 'Container ready'],
    pros: ['GPU focused', 'Competitive rates', 'Developer friendly'],
    cons: ['Smaller scale', 'Limited locations', 'Newer service'],
    pricing: { hourly: 1.89, monthly: 1360, spot: 0.89 },
    setupTime: '1-3 minutes',
    support: 'Community + Email',
    locations: ['US West', 'EU Central'],
    rating: 4.6,
    availability: 'available'
  },
  {
    id: 'vast-ai',
    name: 'Vast.ai',
    color: '#10B981',
    website: 'https://vast.ai/',
    features: ['Decentralized network', 'Lowest prices', 'Flexible terms'],
    pros: ['Cheapest rates', 'Flexible rental', 'Community driven'],
    cons: ['Variable reliability', 'Limited support', 'Quality varies'],
    pricing: { hourly: 0.99, monthly: 720, spot: 0.45 },
    setupTime: '2-5 minutes',
    support: 'Community',
    locations: ['Global network'],
    rating: 4.1,
    availability: 'available'
  },
  {
    id: 'lambda-labs',
    name: 'Lambda Labs',
    color: '#F59E0B',
    website: 'https://lambdalabs.com/',
    features: ['AI/ML optimized', 'Pre-configured', 'Research focused'],
    pros: ['AI specialized', 'Pre-setup environments', 'Research community'],
    cons: ['Limited availability', 'Higher costs', 'Waitlists common'],
    pricing: { hourly: 2.49, monthly: 1800 },
    setupTime: '1-2 minutes',
    support: 'Email + Slack',
    locations: ['US West', 'US East'],
    rating: 4.4,
    availability: 'limited'
  },
  {
    id: 'paperspace',
    name: 'Paperspace',
    color: '#8B5CF6',
    website: 'https://paperspace.com/',
    features: ['Gradient platform', 'Jupyter ready', 'Team collaboration'],
    pros: ['Easy to use', 'Great UI/UX', 'Collaboration tools'],
    cons: ['Limited customization', 'Pricing tiers', 'Resource limits'],
    pricing: { hourly: 2.29, monthly: 1650 },
    setupTime: '30 seconds',
    support: 'Email + Chat',
    locations: ['US East', 'EU West'],
    rating: 4.3,
    availability: 'available'
  },
  {
    id: 'coreweave',
    name: 'CoreWeave',
    color: '#EF4444',
    website: 'https://coreweave.com/',
    features: ['Kubernetes native', 'Enterprise grade', 'Custom configs'],
    pros: ['High performance', 'Kubernetes ready', 'Enterprise support'],
    cons: ['Complex setup', 'Higher minimum', 'Learning curve'],
    pricing: { hourly: 2.79, monthly: 2010 },
    setupTime: '3-8 minutes',
    support: '24/7 Enterprise',
    locations: ['US East', 'US West', 'EU'],
    rating: 4.5,
    availability: 'available'
  }
];

export const filterOptions = {
  brands: ['NVIDIA', 'AMD', 'Intel'],
  vramSizes: ['8GB', '10GB', '12GB', '16GB', '24GB', '32GB', '80GB'],
  useCases: ['gaming', 'ai', 'datacenter', 'rendering', 'hpc'],
  priceTiers: ['budget', 'mid-range', 'high-end', 'enterprise'],
  features: ['cuda', 'tensor-cores', 'ray-tracing', 'nvlink', 'hbm2']
};

export const sortOptions = [
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'performance', label: 'Performance Score' },
  { value: 'vram', label: 'VRAM Size' },
  { value: 'power-efficiency', label: 'Power Efficiency' },
  { value: 'name', label: 'Name A-Z' }
];
