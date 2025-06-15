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
      { gpuModel: 'H100', hourly: 4.10, monthly: 2952 },
      { gpuModel: 'A100', hourly: 2.05, monthly: 1476 },
      { gpuModel: 'V100', hourly: 1.25, monthly: 900 },
      { gpuModel: 'T4', hourly: 0.35, monthly: 252 }
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
    supportedGpus: ['H100', 'A100', 'V100', 'T4', 'L4'],
    pricing: [
      { gpuModel: 'H100', hourly: 3.22, monthly: 2318 },
      { gpuModel: 'A100', hourly: 1.31, monthly: 943 },
      { gpuModel: 'V100', hourly: 1.35, monthly: 972 },
      { gpuModel: 'T4', hourly: 0.35, monthly: 252 },
      { gpuModel: 'L4', hourly: 0.45, monthly: 324 }
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
    supportedGpus: ['H100', 'A100', 'V100', 'T4'],
    pricing: [
      { gpuModel: 'H100', hourly: 3.65, monthly: 2628 },
      { gpuModel: 'A100', hourly: 1.82, monthly: 1310 },
      { gpuModel: 'V100', hourly: 1.20, monthly: 864 },
      { gpuModel: 'T4', hourly: 0.34, monthly: 245 }
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
    supportedGpus: ['H100', 'A100', 'RTX A6000'],
    pricing: [
      { gpuModel: 'H100', hourly: 2.49, monthly: 1793 },
      { gpuModel: 'A100', hourly: 1.29, monthly: 929 },
      { gpuModel: 'RTX A6000', hourly: 0.50, monthly: 360 }
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
    supportedGpus: ['H100', 'A100', 'A40', 'RTX 4090'],
    pricing: [
      { gpuModel: 'H100', hourly: 2.65, monthly: 1908 },
      { gpuModel: 'A100', hourly: 1.28, monthly: 922 },
      { gpuModel: 'A40', hourly: 0.57, monthly: 410 },
      { gpuModel: 'RTX 4090', hourly: 0.80, monthly: 576 }
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
      { gpuModel: 'H100', hourly: 2.39, spot: 1.69, monthly: 1721 },
      { gpuModel: 'A100', hourly: 1.69, spot: 0.79, monthly: 1217 },
      { gpuModel: 'RTX 4090', hourly: 0.69, spot: 0.34, monthly: 497 },
      { gpuModel: 'RTX 3090', hourly: 0.44, spot: 0.22, monthly: 317 }
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
  {
    id: 'paperspace',
    name: 'Paperspace',
    category: 'specialized',
    logo: '🔴',
    website: 'https://paperspace.com',
    supportedGpus: ['H100', 'A100', 'A6000', 'A4000'],
    pricing: [
      { gpuModel: 'H100', hourly: 3.18, monthly: 2290 },
      { gpuModel: 'A100', hourly: 1.10, monthly: 792 },
      { gpuModel: 'A6000', hourly: 0.76, monthly: 547 },
      { gpuModel: 'A4000', hourly: 0.23, monthly: 166 }
    ],
    features: ['MLOps platform', 'Gradient workflows', 'Team collaboration', 'Auto-scaling'],
    trustScore: 82,
    reliability: {
      uptime: 98.8,
      averageSetupTime: '1-2 minutes',
      supportResponse: '< 4 hours'
    },
    locations: ['US East', 'US West', 'Europe'],
    operatingSystems: ['Ubuntu 20.04', 'Paperspace Linux'],
    cudaVersions: ['12.1', '11.8', '11.4'],
    templates: ['Gradient', 'PyTorch', 'TensorFlow', 'Jupyter', 'Docker'],
    networkSpecs: {
      downloadSpeed: '1 Gbps',
      uploadSpeed: '1 Gbps',
      latency: '< 5ms'
    },
    certifications: ['SOC 2', 'GDPR']
  },
  {
    id: 'vultr',
    name: 'Vultr',
    category: 'specialized',
    logo: '🌐',
    website: 'https://vultr.com',
    supportedGpus: ['H100', 'A100', 'A40', 'A16'],
    pricing: [
      { gpuModel: 'H100', hourly: 3.39, monthly: 2441 },
      { gpuModel: 'A100', hourly: 2.25, monthly: 1620 },
      { gpuModel: 'A40', hourly: 1.20, monthly: 864 },
      { gpuModel: 'A16', hourly: 0.60, monthly: 432 }
    ],
    features: ['Developer-friendly', 'Global presence', 'Simple pricing', 'API access'],
    trustScore: 84,
    reliability: {
      uptime: 99.0,
      averageSetupTime: '2-3 minutes',
      supportResponse: '< 3 hours'
    },
    locations: ['Global', 'Multiple regions'],
    operatingSystems: ['Ubuntu 22.04', 'CentOS 8', 'Debian'],
    cudaVersions: ['12.1', '11.8'],
    templates: ['PyTorch', 'TensorFlow', 'Docker', 'Custom'],
    networkSpecs: {
      downloadSpeed: '10 Gbps',
      uploadSpeed: '10 Gbps',
      latency: '< 10ms'
    },
    certifications: ['SOC 2']
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
      { gpuModel: 'H100', hourly: 2.00, spot: 0.80, monthly: 1440 },
      { gpuModel: 'A100', hourly: 0.65, spot: 0.35, monthly: 468 },
      { gpuModel: 'RTX 4090', hourly: 0.35, spot: 0.20, monthly: 252 },
      { gpuModel: 'RTX 3090', hourly: 0.25, spot: 0.15, monthly: 180 }
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
