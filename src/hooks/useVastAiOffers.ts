
import { useQuery } from '@tanstack/react-query';

interface VastAiOffer {
  id: number;
  machine_id: number;
  hostname: string;
  gpu_name: string;
  gpu_ram: number;
  num_gpus: number;
  cpu_cores: number;
  cpu_ram: number;
  disk_space: number;
  dph_total: number;
  reliability2: number;
  datacenter: string;
  country: string;
  verified: boolean;
  rentable: boolean;
  rented: boolean;
  status: string;
  inet_down: number;
  inet_up: number;
  storage_cost: number;
  direct_port_count: number;
}

const fetchVastAiOffers = async (): Promise<VastAiOffer[]> => {
  console.log('Fetching data from Vast.ai API via CORS proxy...');
  
  // Using a CORS proxy to bypass CORS restrictions
  const proxyUrl = 'https://api.allorigins.win/raw?url=';
  const targetUrl = encodeURIComponent('https://vast.ai/api/v0/offers');
  const fullUrl = proxyUrl + targetUrl;
  
  const response = await fetch(fullUrl);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log('Vast.ai API response:', data);
  
  // The API returns an object with 'offers' array
  return data.offers || data || [];
};

export const useVastAiOffers = () => {
  return useQuery({
    queryKey: ['vastAiOffers'],
    queryFn: fetchVastAiOffers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
  });
};
