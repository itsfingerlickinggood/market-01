import { GPUOffer } from '@/types/gpu-recommendation';
import { generateEnhancedGPUData } from './enhancedGpuDataGenerator';

interface GPUModel {
  name: string;
  brand: string;
  vram: number;
  cudaCores?: number;
  rtCores?: number;
  baseClock: string;
  memoryType: 'HBM3' | 'HBM2E' | 'GDDR6X' | 'GDDR6';
  memoryBandwidth: number;
  fp32Performance: number;
  fp16Performance: number;
  fp64Performance: number;
  basePrice: number;
  category: 'Entry' | 'Mid-Range' | 'High-End' | 'Professional' | 'Data Center';
}

interface MarketData {
  currentPrice: number;
  priceMultiplier: number;
  availabilityStatus: 'available' | 'limited' | 'unavailable';
  reliabilityScore: number;
  marketTrend: 'up' | 'down' | 'stable';
  demandLevel: 'low' | 'medium' | 'high';
  reasoningFactors: string[];
}

const gpuModels: GPUModel[] = [
  // NVIDIA RTX 40 Series
  { name: "NVIDIA RTX 4090", brand: "NVIDIA", vram: 24, cudaCores: 16384, rtCores: 128, baseClock: "2.23 GHz", memoryType: "GDDR6X", memoryBandwidth: 1008, fp32Performance: 166, fp16Performance: 332, fp64Performance: 5.2, basePrice: 3.2, category: "High-End" },
  { name: "NVIDIA RTX 4080 SUPER", brand: "NVIDIA", vram: 16, cudaCores: 10240, rtCores: 80, baseClock: "2.21 GHz", memoryType: "GDDR6X", memoryBandwidth: 736, fp32Performance: 125, fp16Performance: 250, fp64Performance: 3.9, basePrice: 2.4, category: "High-End" },
  { name: "NVIDIA RTX 4080", brand: "NVIDIA", vram: 16, cudaCores: 9728, rtCores: 76, baseClock: "2.20 GHz", memoryType: "GDDR6X", memoryBandwidth: 717, fp32Performance: 121, fp16Performance: 242, fp64Performance: 3.8, basePrice: 2.2, category: "High-End" },
  { name: "NVIDIA RTX 4070 Ti SUPER", brand: "NVIDIA", vram: 16, cudaCores: 8448, rtCores: 66, baseClock: "2.34 GHz", memoryType: "GDDR6X", memoryBandwidth: 672, fp32Performance: 108, fp16Performance: 216, fp64Performance: 3.4, basePrice: 1.8, category: "Mid-Range" },
  { name: "NVIDIA RTX 4070 Ti", brand: "NVIDIA", vram: 12, cudaCores: 7680, rtCores: 60, baseClock: "2.31 GHz", memoryType: "GDDR6X", memoryBandwidth: 504, fp32Performance: 95, fp16Performance: 190, fp64Performance: 3.0, basePrice: 1.6, category: "Mid-Range" },
  { name: "NVIDIA RTX 4070 SUPER", brand: "NVIDIA", vram: 12, cudaCores: 7168, rtCores: 56, baseClock: "1.98 GHz", memoryType: "GDDR6X", memoryBandwidth: 504, fp32Performance: 89, fp16Performance: 178, fp64Performance: 2.8, basePrice: 1.4, category: "Mid-Range" },
  { name: "NVIDIA RTX 4070", brand: "NVIDIA", vram: 12, cudaCores: 5888, rtCores: 46, baseClock: "1.92 GHz", memoryType: "GDDR6X", memoryBandwidth: 504, fp32Performance: 79, fp16Performance: 158, fp64Performance: 2.5, basePrice: 1.2, category: "Mid-Range" },
  { name: "NVIDIA RTX 4060 Ti", brand: "NVIDIA", vram: 16, cudaCores: 4352, rtCores: 34, baseClock: "2.31 GHz", memoryType: "GDDR6", memoryBandwidth: 288, fp32Performance: 65, fp16Performance: 130, fp64Performance: 2.0, basePrice: 0.9, category: "Entry" },
  { name: "NVIDIA RTX 4060", brand: "NVIDIA", vram: 8, cudaCores: 3072, rtCores: 24, baseClock: "1.83 GHz", memoryType: "GDDR6", memoryBandwidth: 272, fp32Performance: 52, fp16Performance: 104, fp64Performance: 1.6, basePrice: 0.7, category: "Entry" },

  // NVIDIA RTX 30 Series
  { name: "NVIDIA RTX 3090 Ti", brand: "NVIDIA", vram: 24, cudaCores: 10752, rtCores: 84, baseClock: "1.67 GHz", memoryType: "GDDR6X", memoryBandwidth: 1008, fp32Performance: 142, fp16Performance: 284, fp64Performance: 4.4, basePrice: 2.8, category: "High-End" },
  { name: "NVIDIA RTX 3090", brand: "NVIDIA", vram: 24, cudaCores: 10496, rtCores: 82, baseClock: "1.70 GHz", memoryType: "GDDR6X", memoryBandwidth: 936, fp32Performance: 136, fp16Performance: 272, fp64Performance: 4.2, basePrice: 2.5, category: "High-End" },
  { name: "NVIDIA RTX 3080 Ti", brand: "NVIDIA", vram: 12, cudaCores: 10240, rtCores: 80, baseClock: "1.67 GHz", memoryType: "GDDR6X", memoryBandwidth: 912, fp32Performance: 128, fp16Performance: 256, fp64Performance: 4.0, basePrice: 2.0, category: "High-End" },
  { name: "NVIDIA RTX 3080", brand: "NVIDIA", vram: 10, cudaCores: 8704, rtCores: 68, baseClock: "1.71 GHz", memoryType: "GDDR6X", memoryBandwidth: 760, fp32Performance: 115, fp16Performance: 230, fp64Performance: 3.6, basePrice: 1.7, category: "Mid-Range" },
  { name: "NVIDIA RTX 3070 Ti", brand: "NVIDIA", vram: 8, cudaCores: 6144, rtCores: 48, baseClock: "1.58 GHz", memoryType: "GDDR6X", memoryBandwidth: 608, fp32Performance: 92, fp16Performance: 184, fp64Performance: 2.9, basePrice: 1.3, category: "Mid-Range" },
  { name: "NVIDIA RTX 3070", brand: "NVIDIA", vram: 8, cudaCores: 5888, rtCores: 46, baseClock: "1.50 GHz", memoryType: "GDDR6", memoryBandwidth: 448, fp32Performance: 85, fp16Performance: 170, fp64Performance: 2.7, basePrice: 1.1, category: "Mid-Range" },
  { name: "NVIDIA RTX 3060 Ti", brand: "NVIDIA", vram: 8, cudaCores: 4864, rtCores: 38, baseClock: "1.41 GHz", memoryType: "GDDR6", memoryBandwidth: 448, fp32Performance: 72, fp16Performance: 144, fp64Performance: 2.2, basePrice: 0.8, category: "Entry" },
  { name: "NVIDIA RTX 3060", brand: "NVIDIA", vram: 12, cudaCores: 3584, rtCores: 28, baseClock: "1.32 GHz", memoryType: "GDDR6", memoryBandwidth: 360, fp32Performance: 58, fp16Performance: 116, fp64Performance: 1.8, basePrice: 0.6, category: "Entry" },

  // NVIDIA Professional/Data Center
  { name: "NVIDIA H100 SXM", brand: "NVIDIA", vram: 80, cudaCores: 0, rtCores: 0, baseClock: "1.83 GHz", memoryType: "HBM3", memoryBandwidth: 3350, fp32Performance: 989, fp16Performance: 1979, fp64Performance: 67, basePrice: 8.5, category: "Data Center" },
  { name: "NVIDIA A100 SXM4", brand: "NVIDIA", vram: 80, cudaCores: 6912, rtCores: 0, baseClock: "1.41 GHz", memoryType: "HBM2E", memoryBandwidth: 2039, fp32Performance: 624, fp16Performance: 1248, fp64Performance: 312, basePrice: 6.2, category: "Data Center" },
  { name: "NVIDIA A100 PCIe", brand: "NVIDIA", vram: 40, cudaCores: 6912, rtCores: 0, baseClock: "1.41 GHz", memoryType: "HBM2E", memoryBandwidth: 1555, fp32Performance: 489, fp16Performance: 978, fp64Performance: 244, basePrice: 4.8, category: "Professional" },
  { name: "NVIDIA A6000", brand: "NVIDIA", vram: 48, cudaCores: 10752, rtCores: 84, baseClock: "1.41 GHz", memoryType: "GDDR6", memoryBandwidth: 768, fp32Performance: 142, fp16Performance: 284, fp64Performance: 4.4, basePrice: 3.5, category: "Professional" },
  { name: "NVIDIA A5000", brand: "NVIDIA", vram: 24, cudaCores: 8192, rtCores: 64, baseClock: "1.17 GHz", memoryType: "GDDR6", memoryBandwidth: 768, fp32Performance: 108, fp16Performance: 216, fp64Performance: 3.4, basePrice: 2.7, category: "Professional" },
  { name: "NVIDIA A4000", brand: "NVIDIA", vram: 16, cudaCores: 6144, rtCores: 48, baseClock: "0.93 GHz", memoryType: "GDDR6", memoryBandwidth: 448, fp32Performance: 81, fp16Performance: 162, fp64Performance: 2.5, basePrice: 2.0, category: "Professional" },

  // AMD RX 7000 Series
  { name: "AMD RX 7900 XTX", brand: "AMD", vram: 24, cudaCores: 6144, rtCores: 96, baseClock: "2.23 GHz", memoryType: "GDDR6", memoryBandwidth: 960, fp32Performance: 123, fp16Performance: 246, fp64Performance: 3.8, basePrice: 2.1, category: "High-End" },
  { name: "AMD RX 7900 XT", brand: "AMD", vram: 20, cudaCores: 5376, rtCores: 84, baseClock: "2.00 GHz", memoryType: "GDDR6", memoryBandwidth: 800, fp32Performance: 108, fp16Performance: 216, fp64Performance: 3.4, basePrice: 1.8, category: "High-End" },
  { name: "AMD RX 7800 XT", brand: "AMD", vram: 16, cudaCores: 3840, rtCores: 60, baseClock: "2.12 GHz", memoryType: "GDDR6", memoryBandwidth: 624, fp32Performance: 87, fp16Performance: 174, fp64Performance: 2.7, basePrice: 1.4, category: "Mid-Range" },
  { name: "AMD RX 7700 XT", brand: "AMD", vram: 12, cudaCores: 3456, rtCores: 54, baseClock: "2.17 GHz", memoryType: "GDDR6", memoryBandwidth: 432, fp32Performance: 76, fp16Performance: 152, fp64Performance: 2.4, basePrice: 1.1, category: "Mid-Range" },
  { name: "AMD RX 7600", brand: "AMD", vram: 8, cudaCores: 2048, rtCores: 32, baseClock: "2.25 GHz", memoryType: "GDDR6", memoryBandwidth: 288, fp32Performance: 52, fp16Performance: 104, fp64Performance: 1.6, basePrice: 0.7, category: "Entry" },

  // AMD RX 6000 Series
  { name: "AMD RX 6950 XT", brand: "AMD", vram: 16, cudaCores: 5120, rtCores: 80, baseClock: "2.10 GHz", memoryType: "GDDR6", memoryBandwidth: 576, fp32Performance: 98, fp16Performance: 196, fp64Performance: 3.1, basePrice: 1.6, category: "High-End" },
  { name: "AMD RX 6900 XT", brand: "AMD", vram: 16, cudaCores: 5120, rtCores: 80, baseClock: "2.01 GHz", memoryType: "GDDR6", memoryBandwidth: 512, fp32Performance: 92, fp16Performance: 184, fp64Performance: 2.9, basePrice: 1.5, category: "High-End" },
  { name: "AMD RX 6800 XT", brand: "AMD", vram: 16, cudaCores: 4608, rtCores: 72, baseClock: "2.01 GHz", memoryType: "GDDR6", memoryBandwidth: 512, fp32Performance: 84, fp16Performance: 168, fp64Performance: 2.6, basePrice: 1.3, category: "Mid-Range" },
  { name: "AMD RX 6700 XT", brand: "AMD", vram: 12, cudaCores: 2560, rtCores: 40, baseClock: "2.42 GHz", memoryType: "GDDR6", memoryBandwidth: 384, fp32Performance: 68, fp16Performance: 136, fp64Performance: 2.1, basePrice: 1.0, category: "Mid-Range" },

  // AMD Professional
  { name: "AMD MI300X", brand: "AMD", vram: 192, cudaCores: 19456, rtCores: 0, baseClock: "2.10 GHz", memoryType: "HBM3", memoryBandwidth: 5300, fp32Performance: 1307, fp16Performance: 2614, fp64Performance: 163, basePrice: 12.0, category: "Data Center" },
  { name: "AMD MI250X", brand: "AMD", vram: 128, cudaCores: 14080, rtCores: 0, baseClock: "1.70 GHz", memoryType: "HBM2E", memoryBandwidth: 3277, fp32Performance: 383, fp16Performance: 766, fp64Performance: 95, basePrice: 7.5, category: "Data Center" },
  { name: "AMD W6800", brand: "AMD", vram: 32, cudaCores: 3840, rtCores: 60, baseClock: "1.81 GHz", memoryType: "GDDR6", memoryBandwidth: 512, fp32Performance: 79, fp16Performance: 158, fp64Performance: 2.5, basePrice: 2.5, category: "Professional" },
];

const datacenters = [
  { name: "US-East-1", city: "Ashburn", country: "USA", region: "North America" },
  { name: "US-West-1", city: "San Francisco", country: "USA", region: "North America" },
  { name: "US-Central-1", city: "Chicago", country: "USA", region: "North America" },
  { name: "EU-West-1", city: "Dublin", country: "Ireland", region: "Europe" },
  { name: "EU-Central-1", city: "Frankfurt", country: "Germany", region: "Europe" },
  { name: "AP-Southeast-1", city: "Singapore", country: "Singapore", region: "Asia Pacific" },
  { name: "AP-Northeast-1", city: "Tokyo", country: "Japan", region: "Asia Pacific" },
  { name: "AP-South-1", city: "Mumbai", country: "India", region: "Asia Pacific" },
  { name: "CA-Central-1", city: "Toronto", country: "Canada", region: "North America" },
  { name: "SA-East-1", city: "São Paulo", country: "Brazil", region: "South America" },
  { name: "ME-South-1", city: "Bahrain", country: "Bahrain", region: "Middle East" },
  { name: "AF-South-1", city: "Cape Town", country: "South Africa", region: "Africa" },
  { name: "EU-North-1", city: "Stockholm", country: "Sweden", region: "Europe" },
  { name: "EU-South-1", city: "Milan", country: "Italy", region: "Europe" },
  { name: "US-West-2", city: "Oregon", country: "USA", region: "North America" },
  { name: "AP-Northeast-2", city: "Seoul", country: "South Korea", region: "Asia Pacific" },
  { name: "AP-Northeast-3", city: "Osaka", country: "Japan", region: "Asia Pacific" },
  { name: "AP-Southeast-2", city: "Sydney", country: "Australia", region: "Asia Pacific" },
  { name: "AP-Southeast-3", city: "Jakarta", country: "Indonesia", region: "Asia Pacific" },
  { name: "CA-Central-2", city: "Calgary", country: "Canada", region: "North America" },
];

const providers = [
  { name: "CloudGPU Pro", type: "hyperscaler" as const, specializations: ["ai-training", "hpc"] as const },
  { name: "GPU Rental Hub", type: "specialist" as const, specializations: ["gaming", "creative"] as const },
  { name: "FastGPU", type: "specialist" as const, specializations: ["ai-inference", "general"] as const },
  { name: "Vast.ai", type: "decentralized" as const, specializations: ["ai-training", "ai-inference"] as const },
  { name: "RunPod", type: "specialist" as const, specializations: ["ai-training", "creative"] as const },
  { name: "Lambda Labs", type: "specialist" as const, specializations: ["ai-training", "hpc"] as const },
  { name: "Genesis Cloud", type: "specialist" as const, specializations: ["ai-training", "general"] as const },
  { name: "CoreWeave", type: "hyperscaler" as const, specializations: ["ai-training", "gaming", "creative"] as const },
  { name: "TensorDock", type: "specialist" as const, specializations: ["ai-training", "ai-inference"] as const },
  { name: "JarvisLabs", type: "specialist" as const, specializations: ["ai-training", "hpc"] as const },
  { name: "PaperSpace", type: "specialist" as const, specializations: ["creative", "ai-training"] as const },
  { name: "FluidStack", type: "specialist" as const, specializations: ["ai-inference", "general"] as const },
];

// Enhanced market factors for more realistic pricing
const marketFactors = [
  "High demand for AI/ML workloads",
  "Cryptocurrency mining affecting availability",
  "Gaming market surge increasing demand",
  "Cloud provider capacity constraints",
  "New GPU architecture release cycle",
  "Data center cooling limitations",
  "Power grid constraints",
  "Supply chain disruptions",
  "Seasonal compute demand patterns",
  "Regional regulatory changes",
  "Enterprise procurement cycles",
  "Academic research grant funding",
  "Startup funding boom increasing demand",
  "Economic uncertainty affecting pricing",
  "Energy cost fluctuations"
];

// Enhanced function to generate realistic market data
const generateMarketData = (gpuModel: string, basePrice: number, datacenter: string): MarketData => {
  // Create deterministic but varied pricing based on GPU and location
  const seed = gpuModel.split('').reduce((a, b) => a + b.charCodeAt(0), 0) + datacenter.length;
  const rng = () => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // More sophisticated pricing logic
  const isHighEnd = basePrice > 3.0;
  const isDataCenter = gpuModel.includes('H100') || gpuModel.includes('A100') || gpuModel.includes('MI300');
  const isAMD = gpuModel.includes('AMD');
  
  // Market conditions based on GPU type
  let demandMultiplier = 1.0;
  if (isDataCenter) demandMultiplier = 1.4 + rng() * 0.6; // High demand for data center GPUs
  else if (isHighEnd) demandMultiplier = 1.2 + rng() * 0.4;
  else demandMultiplier = 0.8 + rng() * 0.4;

  // AMD slightly cheaper due to market positioning
  if (isAMD) demandMultiplier *= 0.9;

  // Regional pricing adjustments
  let regionMultiplier = 1.0;
  if (datacenter.includes('Asia')) regionMultiplier = 0.85;
  else if (datacenter.includes('Europe')) regionMultiplier = 1.15;
  else if (datacenter.includes('US')) regionMultiplier = 1.0;

  const priceMultiplier = demandMultiplier * regionMultiplier;
  const currentPrice = basePrice * priceMultiplier;

  // Availability based on demand and pricing
  let availabilityStatus: 'available' | 'limited' | 'unavailable';
  const availabilityRng = rng();
  if (isDataCenter && availabilityRng < 0.3) availabilityStatus = 'limited';
  else if (isHighEnd && availabilityRng < 0.1) availabilityStatus = 'limited';
  else if (availabilityRng < 0.05) availabilityStatus = 'unavailable';
  else availabilityStatus = 'available';

  // Reliability varies by provider type and GPU tier
  const baseReliability = isDataCenter ? 0.95 : isHighEnd ? 0.92 : 0.88;
  const reliabilityScore = Math.max(0.8, baseReliability + (rng() - 0.5) * 0.1);

  // Market trends
  const trendRng = rng();
  const marketTrend: 'up' | 'down' | 'stable' = 
    trendRng < 0.3 ? 'up' : trendRng < 0.6 ? 'down' : 'stable';

  // Demand levels
  const demandLevel: 'low' | 'medium' | 'high' = 
    demandMultiplier > 1.3 ? 'high' : demandMultiplier > 1.0 ? 'medium' : 'low';

  // Select relevant reasoning factors
  const numFactors = Math.floor(rng() * 3) + 2; // 2-4 factors
  const selectedFactors = marketFactors
    .sort(() => rng() - 0.5)
    .slice(0, numFactors);

  return {
    currentPrice,
    priceMultiplier,
    availabilityStatus,
    reliabilityScore,
    marketTrend,
    demandLevel,
    reasoningFactors: selectedFactors
  };
};

export const generateGPUData = async () => {
  try {
    // Use enhanced data generation with potential Gemini integration
    return await generateEnhancedGPUData();
  } catch (error) {
    console.error('Error generating GPU data:', error);
    // Fallback to existing dummy data
    return generateDummyGPUData();
  }
};

const generateDummyGPUData = () => {
  const offers: GPUOffer[] = [];
  let id = 1;

  console.log('Generating comprehensive GPU marketplace data...');

  // Generate 8-15 instances per GPU model for variety
  for (const model of gpuModels) {
    const instancesPerModel = Math.floor(Math.random() * 8) + 8; // 8-15 instances per model
    
    for (let i = 0; i < instancesPerModel; i++) {
      const datacenter = datacenters[Math.floor(Math.random() * datacenters.length)];
      const provider = providers[Math.floor(Math.random() * providers.length)];
      
      // Generate market data (fallback to local generation since Gemini might not be configured)
      const marketData = generateMarketData(
        model.name, 
        model.basePrice, 
        `${datacenter.name} (${datacenter.city})`
      );
      
      // Apply additional random variations for more diversity
      const instanceVariation = 0.9 + Math.random() * 0.2; // ±10% variation per instance
      const finalPrice = marketData.currentPrice * instanceVariation;
      
      const availability = marketData.availabilityStatus === 'unavailable' ? 'unavailable' as const :
                          marketData.availabilityStatus === 'limited' ? 'limited' as const : 'available' as const;
      
      // More varied system configurations
      const cpuConfigs = [8, 12, 16, 24, 32, 48, 64, 96, 128];
      const ramConfigs = [32, 64, 96, 128, 192, 256, 384, 512, 768, 1024];
      const storageConfigs = [100, 250, 500, 1000, 2000, 4000, 8000];
      
      const cpuCores = cpuConfigs[Math.floor(Math.random() * cpuConfigs.length)];
      const cpuRam = ramConfigs[Math.floor(Math.random() * ramConfigs.length)];
      const diskSpace = storageConfigs[Math.floor(Math.random() * storageConfigs.length)];
      
      // Ensure RAM scales appropriately with GPU tier
      const adjustedRam = model.category === 'Data Center' ? Math.max(cpuRam, 256) :
                         model.category === 'Professional' ? Math.max(cpuRam, 128) :
                         model.category === 'High-End' ? Math.max(cpuRam, 64) : cpuRam;

      const offer: GPUOffer = {
        id: id++,
        gpu_name: model.name,
        num_gpus: Math.random() > 0.75 ? Math.floor(Math.random() * 4) + 2 : 1, // More single GPU instances
        gpu_ram: model.vram,
        dph_total: Number(finalPrice.toFixed(3)),
        datacenter: `${datacenter.name} (${datacenter.city})`,
        cpu_cores: cpuCores,
        cpu_ram: adjustedRam,
        disk_space: diskSpace,
        reliability2: marketData.reliabilityScore,
        rentable: availability !== 'unavailable',
        specs: {
          vramCapacity: model.vram,
          memoryBandwidth: model.memoryBandwidth,
          memoryType: model.memoryType,
          cudaCores: model.cudaCores,
          rtCores: model.rtCores,
          fp64Performance: model.fp64Performance,
          fp32Performance: model.fp32Performance,
          fp16Performance: model.fp16Performance,
          nvlinkSupport: model.name.includes('H100') || model.name.includes('A100') || model.name.includes('MI300'),
          interconnectBandwidth: model.name.includes('H100') ? 900 : model.name.includes('A100') ? 600 : undefined
        },
        pricing: {
          onDemand: finalPrice,
          reserved: finalPrice * (0.65 + Math.random() * 0.1), // 65-75% of on-demand
          spot: finalPrice * (0.25 + Math.random() * 0.15), // 25-40% of on-demand
          dataEgressFee: 0.05 + Math.random() * 0.08, // $0.05-0.13 per GB
          storageCost: 0.08 + Math.random() * 0.04 // $0.08-0.12 per GB/month
        },
        provider: {
          name: provider.name,
          type: provider.type,
          globalScale: provider.type === "hyperscaler" ? 8 + Math.floor(Math.random() * 2) : 
                      provider.type === "specialist" ? 6 + Math.floor(Math.random() * 3) : 
                      4 + Math.floor(Math.random() * 3),
          slaGuarantee: provider.type === "hyperscaler" ? 99.9 : 
                       provider.type === "specialist" ? 99.5 : 99.0,
          securityCertifications: provider.type === "hyperscaler" ? 
            ['SOC2', 'ISO27001', 'HIPAA', 'FedRAMP'] : 
            provider.type === "specialist" ? ['SOC2', 'ISO27001'] : ['SOC2'],
          egressPolicy: Math.random() > 0.6 ? 'free' as const : 'paid' as const,
          specializations: [...provider.specializations]
        },
        availability,
        location: `${datacenter.city}, ${datacenter.country}`,
        reliability: marketData.reliabilityScore,
        marketData: {
          trend: marketData.marketTrend,
          demandLevel: marketData.demandLevel,
          reasoningFactors: marketData.reasoningFactors
        }
      };
      
      offers.push(offer);
    }
  }
  
  console.log(`Generated ${offers.length} GPU offers across ${gpuModels.length} models and ${datacenters.length} datacenters`);
  
  // Sort by performance for better browsing experience
  return offers.sort((a, b) => b.specs.fp32Performance - a.specs.fp32Performance);
};
