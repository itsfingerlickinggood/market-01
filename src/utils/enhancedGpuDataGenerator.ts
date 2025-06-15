
import { GPUOffer, ProviderTier } from "@/types/gpu-recommendation";

// Enhanced GPU data with Gemini API integration potential
export const generateEnhancedGPUData = async (): Promise<GPUOffer[]> => {
  // For now, we'll use sophisticated dummy data
  // TODO: Integrate with Gemini API for real market data
  
  const gpuModels = [
    // NVIDIA High-End
    { name: "NVIDIA RTX 4090", vram: 24, category: "flagship", basePrice: 2.5 },
    { name: "NVIDIA RTX 4080", vram: 16, category: "high-end", basePrice: 1.8 },
    { name: "NVIDIA RTX 4070 Ti", vram: 12, category: "mid-high", basePrice: 1.2 },
    { name: "NVIDIA RTX 4070", vram: 12, category: "mid-range", basePrice: 0.9 },
    { name: "NVIDIA RTX 4060 Ti", vram: 16, category: "mid-range", basePrice: 0.7 },
    
    // NVIDIA Professional
    { name: "NVIDIA RTX A6000", vram: 48, category: "professional", basePrice: 3.2 },
    { name: "NVIDIA RTX A5000", vram: 24, category: "professional", basePrice: 2.1 },
    { name: "NVIDIA RTX A4000", vram: 16, category: "professional", basePrice: 1.4 },
    
    // NVIDIA Data Center
    { name: "NVIDIA H100 SXM", vram: 80, category: "datacenter", basePrice: 8.5 },
    { name: "NVIDIA A100 SXM4", vram: 80, category: "datacenter", basePrice: 6.2 },
    { name: "NVIDIA A100 PCIe", vram: 40, category: "datacenter", basePrice: 4.8 },
    { name: "NVIDIA V100 SXM2", vram: 32, category: "datacenter", basePrice: 3.1 },
    
    // AMD GPUs
    { name: "AMD Radeon RX 7900 XTX", vram: 24, category: "high-end", basePrice: 1.6 },
    { name: "AMD Radeon RX 7900 XT", vram: 20, category: "high-end", basePrice: 1.3 },
    { name: "AMD Radeon RX 7800 XT", vram: 16, category: "mid-high", basePrice: 1.0 },
    { name: "AMD Radeon RX 7700 XT", vram: 12, category: "mid-range", basePrice: 0.8 },
    
    // Intel Arc
    { name: "Intel Arc A770", vram: 16, category: "mid-range", basePrice: 0.6 },
    { name: "Intel Arc A750", vram: 8, category: "entry", basePrice: 0.4 },
  ];

  const datacenters = [
    { name: "US-East-1 (Virginia)", region: "us-east", latency: 12, demandMultiplier: 1.1 },
    { name: "US-West-1 (California)", region: "us-west", latency: 15, demandMultiplier: 1.2 },
    { name: "US-Central-1 (Chicago)", region: "us-central", latency: 18, demandMultiplier: 1.0 },
    { name: "EU-West-1 (Ireland)", region: "eu-west", latency: 22, demandMultiplier: 1.15 },
    { name: "EU-Central-1 (Frankfurt)", region: "eu-central", latency: 25, demandMultiplier: 1.1 },
    { name: "Asia-Pacific-1 (Tokyo)", region: "ap-east", latency: 45, demandMultiplier: 1.3 },
    { name: "Asia-Pacific-2 (Singapore)", region: "ap-southeast", latency: 48, demandMultiplier: 1.25 },
    { name: "Canada-Central-1 (Toronto)", region: "ca-central", latency: 20, demandMultiplier: 1.05 },
  ];

  const providers = [
    { name: "VastAI", type: "decentralized", tier: "community", specializations: ["ai-training", "ai-inference"] },
    { name: "RunPod", type: "specialist", tier: "verified", specializations: ["ai-training", "gaming"] },
    { name: "Lambda Labs", type: "specialist", tier: "premium", specializations: ["ai-training", "hpc"] },
    { name: "Genesis Cloud", type: "hyperscaler", tier: "verified", specializations: ["general", "ai-training"] },
    { name: "CoreWeave", type: "hyperscaler", tier: "premium", specializations: ["gaming", "creative", "ai-training"] },
    { name: "Paperspace", type: "specialist", tier: "verified", specializations: ["creative", "ai-training"] },
  ];

  const generateMarketData = () => ({
    trend: Math.random() > 0.5 ? 'up' : 'down' as 'up' | 'down',
    demandLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
    reasoningFactors: [
      'High demand for AI training workloads',
      'New model releases driving demand',
      'Seasonal usage patterns',
      'Regional availability constraints'
    ]
  });

  // Generate 200+ GPU offers with realistic market variations
  const offers: GPUOffer[] = [];
  let offerId = 1;

  for (let i = 0; i < 250; i++) {
    const gpu = gpuModels[Math.floor(Math.random() * gpuModels.length)];
    const datacenter = datacenters[Math.floor(Math.random() * datacenters.length)];
    const provider = providers[Math.floor(Math.random() * providers.length)];
    
    // Apply market dynamics to pricing
    const timeOfDayMultiplier = 0.9 + Math.random() * 0.3; // 0.9x to 1.2x
    const regionalMultiplier = datacenter.demandMultiplier;
    const demandMultiplier = 0.8 + Math.random() * 0.6; // 0.8x to 1.4x
    
    const finalPrice = gpu.basePrice * timeOfDayMultiplier * regionalMultiplier * demandMultiplier;
    
    const offer: GPUOffer = {
      id: offerId++,
      gpu_name: gpu.name,
      num_gpus: Math.random() > 0.8 ? 2 : 1,
      gpu_ram: gpu.vram,
      dph_total: Number(finalPrice.toFixed(3)),
      datacenter: datacenter.name,
      cpu_cores: [8, 16, 24, 32, 48, 64][Math.floor(Math.random() * 6)],
      cpu_ram: [32, 64, 128, 256, 512][Math.floor(Math.random() * 5)],
      disk_space: [500, 1000, 2000, 4000][Math.floor(Math.random() * 4)],
      reliability2: 0.85 + Math.random() * 0.14, // 85-99% reliability
      rentable: Math.random() > 0.1, // 90% available
      location: datacenter.region,
      reliability: 0.85 + Math.random() * 0.14,
      availability: Math.random() > 0.8 ? 'limited' : Math.random() > 0.95 ? 'unavailable' : 'available',
      
      specs: {
        vramCapacity: gpu.vram,
        memoryBandwidth: gpu.vram * 10 + Math.random() * 200, // Realistic bandwidth
        memoryType: gpu.vram >= 20 ? "GDDR6X" : "GDDR6",
        cudaCores: gpu.name.includes('NVIDIA') ? gpu.vram * 400 + Math.random() * 1000 : undefined,
        rtCores: gpu.name.includes('RTX') ? Math.floor(gpu.vram * 3) : undefined,
        fp64Performance: Math.random() * 20,
        fp32Performance: Math.random() * 40 + 20,
        fp16Performance: Math.random() * 80 + 40,
        nvlinkSupport: gpu.category === 'datacenter',
        interconnectBandwidth: gpu.category === 'datacenter' ? 600 : undefined,
      },
      
      pricing: {
        onDemand: finalPrice,
        reserved: finalPrice * 0.7, // 30% discount for reserved
        spot: finalPrice * 0.4, // 60% discount for spot
        dataEgressFee: 0.08,
        storageCost: 0.05,
      },
      
      provider: {
        name: provider.name,
        type: provider.type as 'hyperscaler' | 'specialist' | 'decentralized',
        tier: provider.tier as ProviderTier,
        globalScale: Math.random() * 100,
        slaGuarantee: 95 + Math.random() * 4, // 95-99% SLA
        securityCertifications: ['SOC2', 'ISO27001', 'GDPR'],
        egressPolicy: Math.random() > 0.5 ? 'free' : 'paid',
        specializations: provider.specializations as any[],
      },
      
      marketData: generateMarketData(),
    };
    
    offers.push(offer);
  }

  return offers;
};

// Function to integrate with Gemini API (placeholder for future implementation)
export const fetchGeminiMarketData = async () => {
  // TODO: Implement Gemini API integration
  // This would fetch real-time market data and pricing from cloud providers
  console.log('Gemini API integration pending - using enhanced dummy data');
  return generateEnhancedGPUData();
};
