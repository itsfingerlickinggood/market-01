
import { faker } from '@faker-js/faker';

interface Gpu {
  model: string;
  vram: number;
  basePrice: number;
}

interface Provider {
  name: string;
  logo: string;
  gpus: Gpu[];
  verification: 'verified' | 'unverified';
}

interface Datacenter {
  name: string;
  country: string;
}

const providers: Provider[] = [
  {
    name: 'Lambda Labs',
    logo: 'https://lambdalabs.com/logo.png',
    gpus: [
      { model: 'H100', vram: 80, basePrice: 2.49 },
      { model: 'A100', vram: 40, basePrice: 1.29 },
      { model: 'RTX A6000', vram: 48, basePrice: 0.50 },
    ],
    verification: 'verified',
  },
  {
    name: 'CoreWeave',
    logo: 'https://coreweave.com/logo.png',
    gpus: [
      { model: 'H100', vram: 80, basePrice: 2.65 },
      { model: 'A100', vram: 40, basePrice: 1.28 },
      { model: 'A40', vram: 48, basePrice: 0.57 },
      { model: 'RTX 4090', vram: 24, basePrice: 0.80 },
    ],
    verification: 'verified',
  },
  {
    name: 'RunPod',
    logo: 'https://runpod.io/logo.png',
    gpus: [
      { model: 'H100', vram: 80, basePrice: 2.39 },
      { model: 'A100', vram: 40, basePrice: 1.69 },
      { model: 'RTX 4090', vram: 24, basePrice: 0.69 },
      { model: 'RTX 3090', vram: 24, basePrice: 0.44 },
    ],
    verification: 'verified',
  },
  {
    name: 'Vast.ai',
    logo: 'https://vast.ai/logo.png',
    gpus: [
      { model: 'H100', vram: 80, basePrice: 2.00 },
      { model: 'A100', vram: 40, basePrice: 0.65 },
      { model: 'RTX 4090', vram: 24, basePrice: 0.35 },
      { model: 'RTX 3090', vram: 24, basePrice: 0.25 },
    ],
    verification: 'unverified',
  },
  {
    name: 'Paperspace',
    logo: 'https://paperspace.com/logo.png',
    gpus: [
      { model: 'H100', vram: 80, basePrice: 3.18 },
      { model: 'A100', vram: 40, basePrice: 1.10 },
      { model: 'A6000', vram: 48, basePrice: 0.76 },
      { model: 'A4000', vram: 16, basePrice: 0.23 },
    ],
    verification: 'verified',
  },
  {
    name: 'AWS',
    logo: 'https://aws.amazon.com/logo.png',
    gpus: [
      { model: 'H100', vram: 80, basePrice: 4.10 },
      { model: 'A100', vram: 40, basePrice: 2.05 },
      { model: 'V100', vram: 32, basePrice: 1.25 },
      { model: 'T4', vram: 16, basePrice: 0.35 },
    ],
    verification: 'verified',
  },
  {
    name: 'Google Cloud',
    logo: 'https://cloud.google.com/logo.png',
    gpus: [
      { model: 'H100', vram: 80, basePrice: 3.22 },
      { model: 'A100', vram: 40, basePrice: 1.31 },
      { model: 'V100', vram: 32, basePrice: 1.35 },
      { model: 'T4', vram: 16, basePrice: 0.35 },
      { model: 'L4', vram: 24, basePrice: 0.45 },
    ],
    verification: 'verified',
  },
  {
    name: 'Microsoft Azure',
    logo: 'https://azure.microsoft.com/logo.png',
    gpus: [
      { model: 'H100', vram: 80, basePrice: 3.65 },
      { model: 'A100', vram: 40, basePrice: 1.82 },
      { model: 'V100', vram: 32, basePrice: 1.20 },
      { model: 'T4', vram: 16, basePrice: 0.34 },
    ],
    verification: 'verified',
  },
];

const datacenters: Datacenter[] = [
  { name: 'US-East-1 (Virginia)', country: 'US' },
  { name: 'US-West-1 (California)', country: 'US' },
  { name: 'US-Central-1 (Chicago)', country: 'US' },
  { name: 'EU-West-1 (Ireland)', country: 'EU' },
  { name: 'EU-Central-1 (Frankfurt)', country: 'EU' },
  { name: 'Asia-Pacific-1 (Tokyo)', country: 'JP' },
  { name: 'Asia-Pacific-2 (Singapore)', country: 'SG' },
  { name: 'Canada-Central-1 (Toronto)', country: 'CA' },
];

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Enhanced market-based pricing using real provider data
const marketBasedPricing = {
  'H100': { min: 2.00, max: 4.10, average: 3.05 },
  'A100': { min: 0.65, max: 2.25, average: 1.45 },
  'V100': { min: 1.20, max: 1.45, average: 1.32 },
  'T4': { min: 0.34, max: 0.39, average: 0.36 },
  'RTX 4090': { min: 0.35, max: 0.80, average: 0.58 },
  'RTX 3090': { min: 0.25, max: 0.44, average: 0.35 },
  'L4': { min: 0.45, max: 0.90, average: 0.67 },
  'RTX A6000': { min: 0.50, max: 1.50, average: 0.76 },
  'A40': { min: 0.57, max: 1.20, average: 0.88 },
  'A4000': { min: 0.23, max: 0.50, average: 0.36 }
};

const getRealisticPrice = async (gpu: any): Promise<number> => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      // Fallback to market-based pricing if Supabase not configured
      const gpuModel = gpu.gpu_name || 'A100';
      const marketData = marketBasedPricing[gpuModel] || marketBasedPricing['A100'];
      return marketData.min + Math.random() * (marketData.max - marketData.min);
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/generate-gpu-market-data`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gpuModel: gpu.gpu_name || 'A100',
        basePrice: gpu.dph_total || 1.0,
        datacenter: gpu.datacenter || 'US',
        provider: gpu.host_id || 'Unknown'
      }),
    });

    if (response.ok) {
      const marketData = await response.json();
      return marketData.currentPrice || gpu.dph_total || 1.0;
    } else {
      // Fallback to market-based pricing
      const gpuModel = gpu.gpu_name || 'A100';
      const marketData = marketBasedPricing[gpuModel] || marketBasedPricing['A100'];
      return marketData.min + Math.random() * (marketData.max - marketData.min);
    }
  } catch (error) {
    console.warn('Failed to get Gemini price prediction, using market-based fallback:', error);
    const gpuModel = gpu.gpu_name || 'A100';
    const marketData = marketBasedPricing[gpuModel] || marketBasedPricing['A100'];
    return marketData.min + Math.random() * (marketData.max - marketData.min);
  }
};

export const generateGPUData = async (): Promise<any[]> => {
  const gpus = [];
  const totalOffers = 300;

  console.log('Generating GPU data with enhanced market-based pricing...');

  for (let i = 0; i < totalOffers; i++) {
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const gpu = provider.gpus[Math.floor(Math.random() * provider.gpus.length)];
    const datacenter = datacenters[Math.floor(Math.random() * datacenters.length)];

    // Get realistic pricing using enhanced market data
    const basePrice = await getRealisticPrice({
      gpu_name: gpu.model,
      dph_total: gpu.basePrice,
      datacenter: datacenter.name
    });

    const offer = {
      id: i + 1,
      gpu_name: gpu.model,
      gpu_ram: gpu.vram,
      cpu_cores: 8 + Math.floor(Math.random() * 56), // 8-64 cores
      cpu_ram: Math.floor(32 + Math.random() * 480), // 32-512 GB RAM
      disk_space: Math.floor(500 + Math.random() * 7500), // 500GB-8TB storage
      dph_total: Number(basePrice.toFixed(3)),
      inet_down: `${Math.floor(100 + Math.random() * 900)} Mbps`,
      datacenter: datacenter.name,
      country: datacenter.country,
      reliability: 0.85 + Math.random() * 0.14,
      reliability2: 0.80 + Math.random() * 0.19,
      rentable: Math.random() > 0.12, // 88% availability
      verification: provider.verification,
      host_id: Math.floor(1000 + Math.random() * 9000),
      provider_name: provider.name,
      provider_logo: provider.logo,
      market_position: basePrice < (marketBasedPricing[gpu.model]?.average || 2.0) ? 'below_market' : 'premium',
      last_price_update: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      availability: Math.random() > 0.9 ? 'limited' : 'available',
      location: datacenter.country.toLowerCase()
    };

    gpus.push(offer);
  }

  console.log(`Generated ${gpus.length} realistic GPU offers based on market data from ${providers.length} providers`);
  return gpus;
};
