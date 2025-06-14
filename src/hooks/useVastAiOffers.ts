
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

const generateDummyOffers = (): VastAiOffer[] => {
  const gpuModels = [
    'NVIDIA RTX 4090', 'NVIDIA RTX 4080', 'NVIDIA RTX 4070 Ti', 'NVIDIA RTX 4070',
    'NVIDIA RTX 3090 Ti', 'NVIDIA RTX 3090', 'NVIDIA RTX 3080 Ti', 'NVIDIA RTX 3080',
    'NVIDIA RTX 3070 Ti', 'NVIDIA RTX 3070', 'NVIDIA RTX 3060 Ti', 'NVIDIA RTX 3060',
    'NVIDIA RTX A6000', 'NVIDIA RTX A5000', 'NVIDIA RTX A4000', 'NVIDIA Tesla V100',
    'NVIDIA Tesla P100', 'NVIDIA Tesla K80', 'AMD RX 7900 XTX', 'AMD RX 7900 XT',
    'AMD RX 6950 XT', 'AMD RX 6900 XT', 'AMD RX 6800 XT', 'AMD RX 6700 XT',
    'NVIDIA GTX 1080 Ti', 'NVIDIA GTX 1070', 'NVIDIA Titan RTX', 'NVIDIA Quadro RTX 8000',
    'Intel Arc A770', 'Intel Arc A750'
  ];

  const hostnames = [
    'gpu-server-01', 'cloud-gpu-pro', 'vast-node-42', 'render-farm-05', 'ml-cluster-18',
    'gpu-beast-33', 'cuda-power-07', 'tensor-host-91', 'ai-workstation-15', 'compute-node-66'
  ];

  const datacenters = [
    'US West (Oregon)', 'US East (Virginia)', 'EU Central (Frankfurt)', 'Asia Pacific (Tokyo)',
    'US Central (Texas)', 'EU West (Ireland)', 'Canada Central', 'Australia East',
    'UK South', 'Singapore'
  ];

  const countries = ['US', 'Germany', 'Japan', 'Canada', 'Ireland', 'Australia', 'UK', 'Singapore'];

  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    machine_id: 1000 + i,
    hostname: hostnames[Math.floor(Math.random() * hostnames.length)] + `-${i + 1}`,
    gpu_name: gpuModels[i],
    gpu_ram: [8, 10, 12, 16, 24, 32, 48][Math.floor(Math.random() * 7)],
    num_gpus: [1, 2, 4, 8][Math.floor(Math.random() * 4)],
    cpu_cores: [4, 8, 16, 32, 64][Math.floor(Math.random() * 5)],
    cpu_ram: [16, 32, 64, 128, 256][Math.floor(Math.random() * 5)],
    disk_space: [100, 250, 500, 1000, 2000][Math.floor(Math.random() * 5)],
    dph_total: Math.random() * 5 + 0.1, // $0.10 to $5.10 per hour
    reliability2: Math.random() * 0.4 + 0.6, // 60% to 100% reliability
    datacenter: datacenters[Math.floor(Math.random() * datacenters.length)],
    country: countries[Math.floor(Math.random() * countries.length)],
    verified: Math.random() > 0.3, // 70% chance of being verified
    rentable: Math.random() > 0.1, // 90% chance of being rentable
    rented: Math.random() > 0.7, // 30% chance of being rented
    status: 'available',
    inet_down: Math.floor(Math.random() * 1000) + 100, // 100-1100 Mbps
    inet_up: Math.floor(Math.random() * 500) + 50, // 50-550 Mbps
    storage_cost: Math.random() * 0.1 + 0.01, // $0.01 to $0.11 per GB
    direct_port_count: Math.floor(Math.random() * 10) + 1 // 1-10 ports
  }));
};

const fetchVastAiOffers = async (): Promise<VastAiOffer[]> => {
  console.log('Generating dummy GPU offers...');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const dummyOffers = generateDummyOffers();
  console.log('Generated dummy offers:', dummyOffers);
  
  return dummyOffers;
};

export const useVastAiOffers = () => {
  return useQuery({
    queryKey: ['vastAiOffers'],
    queryFn: fetchVastAiOffers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
