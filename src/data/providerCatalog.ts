
export interface ProviderSpecs {
  gpuModels: string[];
  cudaCores?: number;
  tensorCores?: number;
  vram: string;
  cpu: string;
  systemRam: string;
  storage: string;
  networkSpeed: {
    download: string;
    upload: string;
  };
}

export interface SoftwareEnvironment {
  os: string[];
  cudaVersions: string[];
  preConfiguredTemplates: string[];
  developmentTools: string[];
  containerSupport: boolean;
}

export interface ProviderInfo {
  id: string;
  name: string;
  type: 'major-cloud' | 'specialized' | 'decentralized' | 'other';
  logo: string;
  color: string;
  trustScore: number;
  hostRating: number;
  reviewCount: number;
  uptime: number;
  pricing: {
    h100?: number;
    a100?: number;
    v100?: number;
    t4?: number;
    rtx4090?: number;
    rtx3090?: number;
  };
  specs: ProviderSpecs;
  software: SoftwareEnvironment;
  features: string[];
  pros: string[];
  cons: string[];
  website: string;
  availability: 'available' | 'limited' | 'unavailable';
  dataCenterLocations: string[];
  setupTime: string;
}

export const providerCatalog: ProviderInfo[] = [
  {
    id: 'aws',
    name: 'Amazon Web Services (AWS)',
    type: 'major-cloud',
    logo: '🟠',
    color: '#FF9900',
    trustScore: 0.95,
    hostRating: 4.7,
    reviewCount: 12450,
    uptime: 99.9,
    pricing: {
      h100: 4.10,
      a100: 2.05,
      v100: 1.45,
      t4: 0.35
    },
    specs: {
      gpuModels: ['H100', 'A100', 'V100', 'T4'],
      cudaCores: 16896,
      tensorCores: 528,
      vram: '80 GB HBM3',
      cpu: '64 vCPUs (AMD EPYC)',
      systemRam: '512 GB DDR4',
      storage: '8 TB NVMe SSD',
      networkSpeed: {
        download: '100 Gbps',
        upload: '100 Gbps'
      }
    },
    software: {
      os: ['Amazon Linux 2', 'Ubuntu 20.04/22.04', 'Windows Server'],
      cudaVersions: ['12.2', '11.8', '11.7'],
      preConfiguredTemplates: ['Deep Learning AMI', 'PyTorch', 'TensorFlow', 'SageMaker'],
      developmentTools: ['Jupyter', 'VSCode Server', 'Docker', 'Kubernetes'],
      containerSupport: true
    },
    features: ['Extensive ecosystem', 'Multiple pricing models', 'Enterprise support'],
    pros: ['Global infrastructure', 'Comprehensive ML services', 'High reliability'],
    cons: ['Complex pricing', 'Steep learning curve'],
    website: 'https://aws.amazon.com',
    availability: 'available',
    dataCenterLocations: ['US East', 'US West', 'EU Central', 'Asia Pacific'],
    setupTime: '5-15 minutes'
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform (GCP)',
    type: 'major-cloud',
    logo: '🔵',
    color: '#4285F4',
    trustScore: 0.93,
    hostRating: 4.6,
    reviewCount: 8920,
    uptime: 99.8,
    pricing: {
      h100: 3.22,
      a100: 1.31,
      v100: 1.25,
      t4: 0.35
    },
    specs: {
      gpuModels: ['H100', 'A100', 'V100', 'T4', 'L4'],
      cudaCores: 16896,
      tensorCores: 528,
      vram: '80 GB HBM3',
      cpu: '96 vCPUs (Intel Cascade Lake)',
      systemRam: '672 GB DDR4',
      storage: '6 TB Local SSD',
      networkSpeed: {
        download: '100 Gbps',
        upload: '100 Gbps'
      }
    },
    software: {
      os: ['Ubuntu 20.04/22.04', 'Debian 11', 'CentOS 8'],
      cudaVersions: ['12.2', '11.8'],
      preConfiguredTemplates: ['AI Platform', 'PyTorch', 'TensorFlow', 'JAX'],
      developmentTools: ['Vertex AI', 'Colab', 'Docker', 'Kubernetes'],
      containerSupport: true
    },
    features: ['TPU alternative', 'Generous free credits', 'AI-first platform'],
    pros: ['Advanced AI services', 'TPU integration', 'Developer-friendly'],
    cons: ['Limited GPU availability', 'Complex billing'],
    website: 'https://cloud.google.com',
    availability: 'available',
    dataCenterLocations: ['US Central', 'US East', 'Europe West', 'Asia'],
    setupTime: '3-10 minutes'
  },
  {
    id: 'lambda-labs',
    name: 'Lambda Labs',
    type: 'specialized',
    logo: '🟡',
    color: '#FFD700',
    trustScore: 0.91,
    hostRating: 4.8,
    reviewCount: 3420,
    uptime: 99.7,
    pricing: {
      h100: 2.49,
      a100: 1.29,
      rtx4090: 0.89
    },
    specs: {
      gpuModels: ['H100', 'A100', 'RTX A6000'],
      cudaCores: 16896,
      tensorCores: 528,
      vram: '80 GB HBM3',
      cpu: '30 cores (Intel Xeon)',
      systemRam: '200 GB DDR4',
      storage: '1.4 TB NVMe',
      networkSpeed: {
        download: '10 Gbps',
        upload: '10 Gbps'
      }
    },
    software: {
      os: ['Ubuntu 20.04', 'Lambda Stack'],
      cudaVersions: ['12.1', '11.8'],
      preConfiguredTemplates: ['PyTorch', 'TensorFlow', 'JAX', 'Transformers'],
      developmentTools: ['JupyterLab', 'VSCode', 'Docker'],
      containerSupport: true
    },
    features: ['AI/ML researcher focused', 'Reserved capacity options', 'Pre-configured for ML'],
    pros: ['ML-optimized environment', 'Great for researchers', 'Excellent support'],
    cons: ['Limited availability', 'Higher demand than supply'],
    website: 'https://lambdalabs.com',
    availability: 'limited',
    dataCenterLocations: ['US West', 'US East'],
    setupTime: '1-3 minutes'
  },
  {
    id: 'vast-ai',
    name: 'Vast.ai',
    type: 'decentralized',
    logo: '🟢',
    color: '#00FF88',
    trustScore: 0.78,
    hostRating: 4.2,
    reviewCount: 5680,
    uptime: 96.5,
    pricing: {
      h100: 2.20,
      a100: 0.89,
      rtx4090: 0.45,
      rtx3090: 0.25
    },
    specs: {
      gpuModels: ['H100', 'A100', 'RTX 4090', 'RTX 3090'],
      cudaCores: 16384,
      tensorCores: 512,
      vram: '24 GB GDDR6X',
      cpu: '16-32 cores (Various)',
      systemRam: '64-128 GB',
      storage: '500 GB - 2 TB',
      networkSpeed: {
        download: '1-10 Gbps',
        upload: '1-10 Gbps'
      }
    },
    software: {
      os: ['Ubuntu 18.04/20.04/22.04', 'Custom images'],
      cudaVersions: ['12.1', '11.8', '11.4'],
      preConfiguredTemplates: ['PyTorch', 'TensorFlow', 'Jupyter', 'SSH'],
      developmentTools: ['Custom Docker images', 'Jupyter', 'VSCode'],
      containerSupport: true
    },
    features: ['Marketplace model', 'Lowest prices', 'Wide variety of hardware'],
    pros: ['Very competitive pricing', 'Large selection', 'Flexible'],
    cons: ['Variable reliability', 'No SLA guarantees', 'Quality varies'],
    website: 'https://vast.ai',
    availability: 'available',
    dataCenterLocations: ['Global P2P Network'],
    setupTime: '30 seconds - 5 minutes'
  },
  {
    id: 'runpod',
    name: 'RunPod',
    type: 'specialized',
    logo: '🟣',
    color: '#8B5CF6',
    trustScore: 0.89,
    hostRating: 4.5,
    reviewCount: 2840,
    uptime: 98.9,
    pricing: {
      h100: 2.39,
      a100: 1.19,
      rtx4090: 0.69,
      rtx3090: 0.39
    },
    specs: {
      gpuModels: ['H100', 'A100', 'RTX 4090', 'RTX 3090'],
      cudaCores: 10496,
      tensorCores: 328,
      vram: '24 GB GDDR6X',
      cpu: '16 vCPUs',
      systemRam: '64 GB DDR4',
      storage: '500 GB NVMe',
      networkSpeed: {
        download: '1 Gbps',
        upload: '1 Gbps'
      }
    },
    software: {
      os: ['Ubuntu 22.04', 'RunPod Stack'],
      cudaVersions: ['12.1', '11.8'],
      preConfiguredTemplates: ['PyTorch', 'TensorFlow', 'Stable Diffusion', 'ComfyUI'],
      developmentTools: ['JupyterLab', 'VSCode', 'Web Terminal'],
      containerSupport: true
    },
    features: ['Secure Cloud + Community Cloud', 'Serverless GPUs', 'AI-focused'],
    pros: ['User-friendly interface', 'Good pricing', 'AI community'],
    cons: ['Limited enterprise features', 'Smaller scale'],
    website: 'https://runpod.io',
    availability: 'available',
    dataCenterLocations: ['US', 'EU', 'Asia'],
    setupTime: '30 seconds - 2 minutes'
  },
  {
    id: 'coreweave',
    name: 'CoreWeave',
    type: 'specialized',
    logo: '⚫',
    color: '#1F2937',
    trustScore: 0.94,
    hostRating: 4.7,
    reviewCount: 1920,
    uptime: 99.8,
    pricing: {
      h100: 3.15,
      a100: 1.75,
      rtx4090: 0.79
    },
    specs: {
      gpuModels: ['H100', 'A100', 'A40', 'RTX 4090'],
      cudaCores: 16896,
      tensorCores: 528,
      vram: '80 GB HBM3',
      cpu: '78 vCPUs',
      systemRam: '200 GB',
      storage: '2 TB NVMe',
      networkSpeed: {
        download: '25 Gbps',
        upload: '25 Gbps'
      }
    },
    software: {
      os: ['Ubuntu 20.04/22.04', 'CentOS 8'],
      cudaVersions: ['12.2', '11.8'],
      preConfiguredTemplates: ['PyTorch', 'TensorFlow', 'RAPIDS', 'Kubernetes'],
      developmentTools: ['Jupyter', 'Kubernetes', 'Docker'],
      containerSupport: true
    },
    features: ['Large-scale AI workloads', 'Enterprise-grade', 'Kubernetes native'],
    pros: ['High performance', 'Enterprise support', 'Kubernetes integration'],
    cons: ['Requires quotes for large deployments', 'Higher minimum spend'],
    website: 'https://coreweave.com',
    availability: 'available',
    dataCenterLocations: ['US East', 'US West', 'Europe'],
    setupTime: '10-30 minutes'
  }
];

export const getProviderById = (id: string): ProviderInfo | undefined => {
  return providerCatalog.find(provider => provider.id === id);
};

export const getProvidersByType = (type: ProviderInfo['type']): ProviderInfo[] => {
  return providerCatalog.filter(provider => provider.type === type);
};

export const getProvidersByGpuModel = (gpuModel: string): ProviderInfo[] => {
  return providerCatalog.filter(provider => 
    provider.specs.gpuModels.some(model => 
      model.toLowerCase().includes(gpuModel.toLowerCase())
    )
  );
};
