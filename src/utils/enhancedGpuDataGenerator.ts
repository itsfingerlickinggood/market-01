
import { faker } from '@faker-js/faker';

export interface ProviderInfo {
  company: string;
  website: string;
  description: string;
  tier: 'marketplace' | 'specialist' | 'hyperscaler';
  color: string;
  logo: string;
}

export const GPU_PROVIDERS: ProviderInfo[] = [
  // Marketplace Providers
  {
    company: "Vast.ai",
    website: "vast.ai",
    description: "Marketplace model, prices vary by host. Often the lowest cost.",
    tier: "marketplace",
    color: "#3B82F6",
    logo: "🌐"
  },
  {
    company: "RunPod",
    website: "runpod.io",
    description: "Offers both Community Cloud and Secure Cloud with different pricing.",
    tier: "marketplace",
    color: "#8B5CF6",
    logo: "🚀"
  },
  {
    company: "Hyperstack",
    website: "hyperstack.cloud",
    description: "Focuses on providing a simple, developer-focused GPU cloud experience.",
    tier: "specialist",
    color: "#10B981",
    logo: "⚡"
  },
  {
    company: "CUDO Compute",
    website: "cudocompute.com",
    description: "Offers commitment pricing for lower rates.",
    tier: "specialist",
    color: "#F59E0B",
    logo: "🔧"
  },
  {
    company: "Genesis Cloud",
    website: "genesiscloud.com",
    description: "Minimum rental is a full node of 8 GPUs.",
    tier: "specialist",
    color: "#EF4444",
    logo: "🌟"
  },
  {
    company: "Jarvis Labs",
    website: "jarvislabs.ai",
    description: "Known for a user-friendly platform tailored to ML practitioners.",
    tier: "specialist",
    color: "#06B6D4",
    logo: "🤖"
  },
  {
    company: "Lambda Labs",
    website: "lambda.ai",
    description: "A very popular choice in the AI/ML research community.",
    tier: "specialist",
    color: "#8B5CF6",
    logo: "λ"
  },
  {
    company: "Paperspace",
    website: "paperspace.com",
    description: "Price varies based on commitment and instance type.",
    tier: "specialist",
    color: "#3B82F6",
    logo: "📄"
  },
  // Hyperscalers
  {
    company: "Amazon Web Services",
    website: "aws.amazon.com",
    description: "Known for reliability and ecosystem integration.",
    tier: "hyperscaler",
    color: "#FF9900",
    logo: "☁️"
  },
  {
    company: "Google Cloud Platform",
    website: "cloud.google.com",
    description: "Enterprise-grade AI and ML infrastructure.",
    tier: "hyperscaler",
    color: "#4285F4",
    logo: "🌤️"
  },
  {
    company: "Microsoft Azure",
    website: "azure.microsoft.com",
    description: "Offers single H100 VM instances for single-GPU jobs.",
    tier: "hyperscaler",
    color: "#0078D4",
    logo: "⚡"
  },
  {
    company: "Oracle Cloud",
    website: "oracle.com/cloud",
    description: "Highly competitive pricing, typically requires 8-GPU bare-metal nodes.",
    tier: "hyperscaler",
    color: "#F80000",
    logo: "🔴"
  },
  {
    company: "DigitalOcean",
    website: "digitalocean.com",
    description: "Newer entrant to high-end GPU space, developer-friendly platform.",
    tier: "hyperscaler",
    color: "#0080FF",
    logo: "🌊"
  }
];

export const GPU_MODELS = [
  { name: "H100 PCIe", vram: "80GB", variant: "PCIe" },
  { name: "H100 SXM", vram: "80GB", variant: "SXM" },
  { name: "H100 80GB PCIe", vram: "80GB", variant: "PCIe" },
  { name: "H100", vram: "80GB", variant: "Standard" },
  { name: "A100 80GB", vram: "80GB", variant: "SXM" },
  { name: "A100 40GB", vram: "40GB", variant: "PCIe" },
  { name: "RTX 4090", vram: "24GB", variant: "Consumer" },
  { name: "RTX 4080", vram: "16GB", variant: "Consumer" }
];

const PRICING_RANGES = {
  marketplace: { min: 1.53, max: 2.39 },
  specialist: { min: 1.90, max: 3.29 },
  hyperscaler: { min: 2.98, max: 12.29 }
};

export const generateEnhancedGpuOffers = (count: number = 50) => {
  return Array.from({ length: count }, (_, index) => {
    const provider = faker.helpers.arrayElement(GPU_PROVIDERS);
    const model = faker.helpers.arrayElement(GPU_MODELS);
    const priceRange = PRICING_RANGES[provider.tier];
    const basePrice = faker.number.float({ 
      min: priceRange.min, 
      max: priceRange.max, 
      multipleOf: 0.01 
    });
    
    // Add price variation for marketplace providers
    const priceVariation = provider.tier === 'marketplace' ? 
      `~$${basePrice.toFixed(2)}+` : 
      `~$${basePrice.toFixed(2)} - $${(basePrice * 1.2).toFixed(2)}`;

    return {
      id: `gpu-${index + 1}`,
      // Core provider info
      company: provider.company,
      website: provider.website,
      provider_description: provider.description,
      provider_tier: provider.tier,
      provider_color: provider.color,
      provider_logo: provider.logo,
      
      // GPU model info
      gpu_name: model.name,
      gpu_variant: model.variant,
      gpu_ram: model.vram,
      
      // Legacy compatibility fields
      datacenter: `${provider.company} (${faker.location.city()})`,
      
      // Pricing
      dph_total: basePrice,
      price_range: priceVariation,
      
      // Technical specs
      num_gpus: faker.helpers.arrayElement([1, 2, 4, 8]),
      cpu_cores: faker.number.int({ min: 8, max: 64 }),
      cpu_ram: faker.number.int({ min: 32, max: 512 }),
      storage: faker.number.int({ min: 100, max: 2000 }),
      
      // Availability and reliability
      rentable: faker.datatype.boolean(0.85),
      reliability: faker.number.float({ min: 0.85, max: 0.99, multipleOf: 0.01 }),
      reliability2: faker.number.float({ min: 0.85, max: 0.99, multipleOf: 0.01 }),
      
      // Additional provider-specific info
      setup_time: faker.helpers.arrayElement(['< 30s', '1-2 min', '2-5 min', '5-10 min']),
      location: faker.location.city(),
      support_quality: faker.number.float({ min: 3.5, max: 5.0, multipleOf: 0.1 }),
      
      // Enhanced fields for recommendations
      workloadScore: faker.number.int({ min: 60, max: 95 }),
      purposeScore: faker.number.int({ min: 65, max: 90 }),
      dealScore: faker.number.int({ min: 70, max: 100 }),
      isBestDeal: faker.datatype.boolean(0.15),
      isHotDeal: faker.datatype.boolean(0.10),
      isPurposeMatch: faker.datatype.boolean(0.25)
    };
  });
};
