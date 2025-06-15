
export interface ComprehensiveProvider {
  id: string;
  name: string;
  category: 'major-cloud' | 'specialized' | 'decentralized' | 'european';
  logo: string;
  website: string;
  supportedGpus: string[];
  pricing: {
    gpuModel: string;
    hourly: number;
    monthly?: number;
    spot?: number;
  }[];
  features: string[];
  trustScore: number;
  reliability: {
    uptime: number;
    averageSetupTime: string;
    supportResponse: string;
  };
  locations: string[];
  operatingSystems: string[];
  cudaVersions: string[];
  templates: string[];
  networkSpecs: {
    downloadSpeed: string;
    uploadSpeed: string;
    latency: string;
  };
  certifications: string[];
}

export const comprehensiveProviders: ComprehensiveProvider[] = [
  // Major Cloud Providers
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'major-cloud',
    logo: '🟠',
    website: 'https://aws.amazon.com',
    supportedGpus: ['H100', 'A100', 'V100', 'T4'],
    pricing: [
      { gpuModel: 'H100', hourly: 4.10 },
      { gpuModel: 'A100', hourly: 2.05 },
      { gpuModel: 'V100', hourly: 1.25 },
      { gpuModel: 'T4', hourly: 0.526 }
    ],
    features: ['Auto-scaling', 'Spot instances', 'Reserved pricing', 'Global availability'],
    trustScore: 95,
    reliability: {
      uptime: 99.9,
      averageSetupTime: '2-5 minutes',
      supportResponse: '< 1 hour'
    },
    locations: ['US East', 'US West', 'Europe', 'Asia Pacific', 'Global'],
    operatingSystems: ['Ubuntu 22.04', 'Amazon Linux 2', 'Windows Server 2019'],
    cudaVersions: ['12.2', '11.8', '11.2'],
    templates: ['PyTorch', 'TensorFlow', 'Docker', 'Jupyter', 'CUDA Toolkit'],
    networkSpecs: {
      downloadSpeed: '100 Gbps',
      uploadSpeed: '100 Gbps',
      latency: '< 1ms'
    },
    certifications: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA']
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    category: 'major-cloud',
    logo: '🔵',
    website: 'https://cloud.google.com',
    supportedGpus: ['H100', 'A100', 'V100', 'T4', 'TPU'],
    pricing: [
      { gpuModel: 'H100', hourly: 4.20 },
      { gpuModel: 'A100', hourly: 2.15 },
      { gpuModel: 'V100', hourly: 1.35 },
      { gpuModel: 'T4', hourly: 0.45 }
    ],
    features: ['TPU support', 'Preemptible instances', 'Custom machine types', 'AI Platform'],
    trustScore: 93,
    reliability: {
      uptime: 99.8,
      averageSetupTime: '1-3 minutes',
      supportResponse: '< 2 hours'
    },
    locations: ['US', 'Europe', 'Asia', 'Australia', 'Global'],
    operatingSystems: ['Ubuntu 22.04', 'CentOS 8', 'Container-Optimized OS'],
    cudaVersions: ['12.2', '11.8', '11.4'],
    templates: ['TensorFlow', 'PyTorch', 'JAX', 'Vertex AI', 'Kubernetes'],
    networkSpecs: {
      downloadSpeed: '100 Gbps',
      uploadSpeed: '100 Gbps',
      latency: '< 1ms'
    },
    certifications: ['SOC 2', 'ISO 27001', 'GDPR', 'FedRAMP']
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'major-cloud',
    logo: '🔷',
    website: 'https://azure.microsoft.com',
    supportedGpus: ['H100', 'A100', 'V100', 'K80'],
    pricing: [
      { gpuModel: 'H100', hourly: 4.00 },
      { gpuModel: 'A100', hourly: 2.00 },
      { gpuModel: 'V100', hourly: 1.20 },
      { gpuModel: 'K80', hourly: 0.90 }
    ],
    features: ['Azure ML', 'Spot instances', 'Reserved capacity', 'Hybrid connectivity'],
    trustScore: 92,
    reliability: {
      uptime: 99.9,
      averageSetupTime: '2-4 minutes',
      supportResponse: '< 1 hour'
    },
    locations: ['North America', 'Europe', 'Asia Pacific', 'Global'],
    operatingSystems: ['Ubuntu 20.04', 'Windows Server 2022', 'CentOS 7'],
    cudaVersions: ['12.1', '11.8', '11.2'],
    templates: ['Azure ML', 'PyTorch', 'TensorFlow', 'ONNX', 'Docker'],
    networkSpecs: {
      downloadSpeed: '80 Gbps',
      uploadSpeed: '80 Gbps',
      latency: '< 2ms'
    },
    certifications: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA']
  },
  // Specialized Providers
  {
    id: 'lambda-labs',
    name: 'Lambda Labs',
    category: 'specialized',
    logo: '🟡',
    website: 'https://lambdalabs.com',
    supportedGpus: ['H100', 'A100', 'A6000', 'RTX 4090'],
    pricing: [
      { gpuModel: 'H100', hourly: 2.49 },
      { gpuModel: 'A100', hourly: 1.10 },
      { gpuModel: 'A6000', hourly: 0.50 },
      { gpuModel: 'RTX 4090', hourly: 0.75 }
    ],
    features: ['Pre-configured for ML', 'JupyterHub', 'Persistent storage', 'SSH access'],
    trustScore: 88,
    reliability: {
      uptime: 99.5,
      averageSetupTime: '30 seconds',
      supportResponse: '< 4 hours'
    },
    locations: ['US West', 'US East', 'US Central'],
    operatingSystems: ['Ubuntu 22.04', 'Lambda Stack'],
    cudaVersions: ['12.2', '11.8'],
    templates: ['PyTorch', 'TensorFlow', 'Jupyter', 'VS Code Server', 'Docker'],
    networkSpecs: {
      downloadSpeed: '1 Gbps',
      uploadSpeed: '1 Gbps',
      latency: '< 5ms'
    },
    certifications: ['SOC 2']
  },
  {
    id: 'coreweave',
    name: 'CoreWeave',
    category: 'specialized',
    logo: '⚫',
    website: 'https://coreweave.com',
    supportedGpus: ['H100', 'A100', 'A40', 'RTX A6000'],
    pricing: [
      { gpuModel: 'H100', hourly: 2.65 },
      { gpuModel: 'A100', hourly: 1.28 },
      { gpuModel: 'A40', hourly: 0.57 },
      { gpuModel: 'RTX A6000', hourly: 0.80 }
    ],
    features: ['Kubernetes native', 'InfiniBand networking', 'Spot pricing', 'API access'],
    trustScore: 90,
    reliability: {
      uptime: 99.7,
      averageSetupTime: '1-2 minutes',
      supportResponse: '< 2 hours'
    },
    locations: ['US East', 'US West', 'Europe'],
    operatingSystems: ['Ubuntu 22.04', 'Container Linux'],
    cudaVersions: ['12.2', '11.8', '11.4'],
    templates: ['PyTorch', 'TensorFlow', 'Kubernetes', 'Docker', 'Jupyter'],
    networkSpecs: {
      downloadSpeed: '25 Gbps',
      uploadSpeed: '25 Gbps',
      latency: '< 2ms'
    },
    certifications: ['SOC 2', 'ISO 27001']
  },
  {
    id: 'runpod',
    name: 'RunPod',
    category: 'specialized',
    logo: '🟣',
    website: 'https://runpod.io',
    supportedGpus: ['H100', 'A100', 'RTX 4090', 'RTX 3090'],
    pricing: [
      { gpuModel: 'H100', hourly: 3.89, spot: 1.69 },
      { gpuModel: 'A100', hourly: 1.69, spot: 0.79 },
      { gpuModel: 'RTX 4090', hourly: 0.69, spot: 0.34 },
      { gpuModel: 'RTX 3090', hourly: 0.44, spot: 0.22 }
    ],
    features: ['Spot pricing', 'Templates', 'Persistent storage', 'Community images'],
    trustScore: 85,
    reliability: {
      uptime: 98.5,
      averageSetupTime: '30-60 seconds',
      supportResponse: '< 6 hours'
    },
    locations: ['Global', 'Community hosted'],
    operatingSystems: ['Ubuntu 22.04', 'RunPod Linux'],
    cudaVersions: ['12.2', '11.8', '11.6'],
    templates: ['PyTorch', 'TensorFlow', 'Stable Diffusion', 'Jupyter', 'Custom'],
    networkSpecs: {
      downloadSpeed: '1-10 Gbps',
      uploadSpeed: '1-10 Gbps',
      latency: 'Variable'
    },
    certifications: ['In Progress']
  },
  // Decentralized Providers
  {
    id: 'vast-ai',
    name: 'Vast.ai',
    category: 'decentralized',
    logo: '🟢',
    website: 'https://vast.ai',
    supportedGpus: ['H100', 'A100', 'RTX 4090', 'RTX 3090', 'GTX 1080'],
    pricing: [
      { gpuModel: 'H100', hourly: 1.50, spot: 0.80 },
      { gpuModel: 'A100', hourly: 0.65, spot: 0.35 },
      { gpuModel: 'RTX 4090', hourly: 0.35, spot: 0.20 },
      { gpuModel: 'RTX 3090', hourly: 0.25, spot: 0.15 }
    ],
    features: ['P2P marketplace', 'Spot pricing', 'Custom images', 'SSH access'],
    trustScore: 75,
    reliability: {
      uptime: 95.0,
      averageSetupTime: '1-5 minutes',
      supportResponse: '< 24 hours'
    },
    locations: ['Global', 'Distributed'],
    operatingSystems: ['Ubuntu 22.04', 'Custom'],
    cudaVersions: ['12.2', '11.8', '11.6', '10.2'],
    templates: ['PyTorch', 'TensorFlow', 'Custom Docker', 'SSH'],
    networkSpecs: {
      downloadSpeed: '100 Mbps - 10 Gbps',
      uploadSpeed: '100 Mbps - 10 Gbps',
      latency: 'Variable'
    },
    certifications: ['Community driven']
  },
  {
    id: 'akash',
    name: 'Akash Network',
    category: 'decentralized',
    logo: '🔴',
    website: 'https://akash.network',
    supportedGpus: ['RTX 4090', 'RTX 3090', 'A100', 'GTX 1080'],
    pricing: [
      { gpuModel: 'A100', hourly: 0.80 },
      { gpuModel: 'RTX 4090', hourly: 0.40 },
      { gpuModel: 'RTX 3090', hourly: 0.30 },
      { gpuModel: 'GTX 1080', hourly: 0.15 }
    ],
    features: ['Blockchain-based', 'Pay with AKT', 'Decentralized', 'Open source'],
    trustScore: 72,
    reliability: {
      uptime: 94.0,
      averageSetupTime: '2-10 minutes',
      supportResponse: 'Community support'
    },
    locations: ['Global', 'Decentralized'],
    operatingSystems: ['Ubuntu 20.04', 'Custom'],
    cudaVersions: ['11.8', '11.2', '10.2'],
    templates: ['Docker', 'Custom deployments'],
    networkSpecs: {
      downloadSpeed: '100 Mbps - 1 Gbps',
      uploadSpeed: '100 Mbps - 1 Gbps',
      latency: 'Variable'
    },
    certifications: ['Open source']
  },
  // European Providers
  {
    id: 'ovhcloud',
    name: 'OVHcloud',
    category: 'european',
    logo: '🔵',
    website: 'https://ovhcloud.com',
    supportedGpus: ['A100', 'V100', 'T4'],
    pricing: [
      { gpuModel: 'A100', hourly: 1.85 },
      { gpuModel: 'V100', hourly: 1.15 },
      { gpuModel: 'T4', hourly: 0.48 }
    ],
    features: ['GDPR compliant', 'European data centers', 'AI training', 'Public cloud'],
    trustScore: 86,
    reliability: {
      uptime: 99.2,
      averageSetupTime: '3-7 minutes',
      supportResponse: '< 4 hours'
    },
    locations: ['France', 'Germany', 'UK', 'Poland'],
    operatingSystems: ['Ubuntu 22.04', 'CentOS 8', 'Debian 11'],
    cudaVersions: ['12.1', '11.8', '11.2'],
    templates: ['PyTorch', 'TensorFlow', 'Jupyter', 'Docker'],
    networkSpecs: {
      downloadSpeed: '10 Gbps',
      uploadSpeed: '10 Gbps',
      latency: '< 3ms'
    },
    certifications: ['GDPR', 'ISO 27001', 'SOC 2']
  }
];

export const getProvidersByGpu = (gpuModel: string): ComprehensiveProvider[] => {
  return comprehensiveProviders.filter(provider => 
    provider.supportedGpus.some(gpu => 
      gpu.toLowerCase().includes(gpuModel.toLowerCase())
    )
  );
};

export const getProviderPricing = (providerId: string, gpuModel: string): number | null => {
  const provider = comprehensiveProviders.find(p => p.id === providerId);
  if (!provider) return null;
  
  const pricing = provider.pricing.find(p => 
    p.gpuModel.toLowerCase().includes(gpuModel.toLowerCase())
  );
  
  return pricing ? pricing.hourly : null;
};
