
import { GPUOffer } from '@/types/gpu-recommendation';

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
];

export const generateGPUData = (): GPUOffer[] => {
  const offers: GPUOffer[] = [];
  let id = 1;

  // Generate multiple instances of each GPU model across different providers and datacenters
  gpuModels.forEach((model) => {
    const instancesPerModel = Math.floor(Math.random() * 8) + 3; // 3-10 instances per model
    
    for (let i = 0; i < instancesPerModel; i++) {
      const datacenter = datacenters[Math.floor(Math.random() * datacenters.length)];
      const provider = providers[Math.floor(Math.random() * providers.length)];
      
      // Add price variation based on demand, location, and provider
      const demandMultiplier = 0.8 + Math.random() * 0.6; // 0.8x to 1.4x
      const locationMultiplier = datacenter.region === "North America" ? 1.0 : 
                                datacenter.region === "Europe" ? 1.1 : 
                                datacenter.region === "Asia Pacific" ? 0.9 : 1.0;
      const providerMultiplier = provider.type === "hyperscaler" ? 1.2 : 
                                provider.type === "specialist" ? 1.0 : 0.8;
      
      const finalPrice = model.basePrice * demandMultiplier * locationMultiplier * providerMultiplier;
      
      const offer: GPUOffer = {
        id: id++,
        gpu_name: model.name,
        num_gpus: Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 2 : 1, // Mostly single GPU, some multi-GPU
        gpu_ram: model.vram,
        dph_total: Number(finalPrice.toFixed(3)),
        datacenter: `${datacenter.name} (${datacenter.city})`,
        cpu_cores: Math.floor(Math.random() * 32) + 8,
        cpu_ram: Math.floor(Math.random() * 128) + 32,
        disk_space: [100, 250, 500, 1000, 2000][Math.floor(Math.random() * 5)],
        reliability2: 0.85 + Math.random() * 0.14, // 85-99% reliability
        rentable: Math.random() > 0.1, // 90% availability
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
          reserved: finalPrice * 0.7,
          spot: finalPrice * 0.3,
          dataEgressFee: 0.09,
          storageCost: 0.1
        },
        provider: {
          name: provider.name,
          type: provider.type,
          globalScale: provider.type === "hyperscaler" ? 9 : provider.type === "specialist" ? 7 : 5,
          slaGuarantee: provider.type === "hyperscaler" ? 99.9 : 99.5,
          securityCertifications: provider.type === "hyperscaler" ? ['SOC2', 'ISO27001', 'HIPAA'] : ['SOC2'],
          egressPolicy: Math.random() > 0.5 ? 'free' as const : 'paid' as const,
          specializations: [...provider.specializations]
        },
        availability: offer.rentable ? (Math.random() > 0.8 ? 'limited' as const : 'available' as const) : 'unavailable' as const,
        location: `${datacenter.city}, ${datacenter.country}`,
        reliability: offer.reliability2
      };
      
      offers.push(offer);
    }
  });
  
  return offers.sort((a, b) => b.specs.fp32Performance - a.specs.fp32Performance);
};
