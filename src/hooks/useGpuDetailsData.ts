
import { useState, useEffect } from "react";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";

interface PlatformProvider {
  name: string;
  price: number;
  status: 'available' | 'limited' | 'unavailable';
  url: string;
  logo: string;
  setupTime: string;
  reliability: number;
  features: string[];
}

const generateProviderData = (basePrice: number): PlatformProvider[] => {
  const providers = [
    { name: 'Vast.ai', multiplier: 1.0, url: 'https://vast.ai', logo: '🟢', setupTime: '2-5 min', reliability: 85 },
    { name: 'RunPod', multiplier: 1.1, url: 'https://runpod.io', logo: '🟣', setupTime: '1-3 min', reliability: 92 },
    { name: 'Lambda Labs', multiplier: 1.2, url: 'https://lambdalabs.com', logo: '🟡', setupTime: '2-4 min', reliability: 88 },
    { name: 'Paperspace', multiplier: 1.15, url: 'https://paperspace.com', logo: '🔴', setupTime: '1-2 min', reliability: 80 },
    { name: 'CoreWeave', multiplier: 0.9, url: 'https://coreweave.com', logo: '⚫', setupTime: '10-20 min', reliability: 95 },
    { name: 'Genesis Cloud', multiplier: 0.95, url: 'https://genesiscloud.com', logo: '🔵', setupTime: '5-10 min', reliability: 87 }
  ];

  return providers.map((provider) => {
    const price = Number((basePrice * provider.multiplier * (0.85 + Math.random() * 0.3)).toFixed(3));
    const status = Math.random() > 0.7 ? 'unavailable' : Math.random() > 0.5 ? 'limited' : 'available';
    
    return {
      name: provider.name,
      price,
      status,
      url: provider.url,
      logo: provider.logo,
      setupTime: provider.setupTime,
      reliability: provider.reliability,
      features: ['GPU Optimization', 'Auto-scaling', 'API Access']
    };
  });
};

export const useGpuDetailsData = (id: string | undefined) => {
  const { data: offers } = useVastAiOffers();
  const [gpu, setGpu] = useState<any>(null);
  const [providerData, setProviderData] = useState<PlatformProvider[]>([]);

  useEffect(() => {
    if (offers && id) {
      const foundGpu = offers.find(offer => offer.id === parseInt(id));
      setGpu(foundGpu);
      
      if (foundGpu) {
        const providers = generateProviderData(foundGpu.dph_total || 1.0);
        setProviderData(providers);
      }
    }
  }, [offers, id]);

  return { gpu, providerData };
};
