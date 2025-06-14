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
  rank: number;
  company: string;
  model_type: string;
  interface: string;
  power_connector: string;
  primary_use_case: string;
  performance_level: string;
  cost_implication: string;
}

const gpuMarketData = {
  "last_updated": "2025-06-15",
  "data_source": "Synthesized from industry reports and market analysis.",
  "gpus": [
    {
      "rank": 1,
      "company": "NVIDIA",
      "model": "GeForce RTX 4090",
      "model_type": "Consumer",
      "vram": "24GB GDDR6X",
      "cuda_cores": 16384,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 16-pin",
      "renting_considerations": {
        "primary_use_case": "High-end gaming, 4K/8K video editing, demanding 3D rendering, and AI/ML development.",
        "performance_level": "Exceptional performance, currently one of the most powerful consumer GPUs available.",
        "cost_implication": "High rental cost due to high demand and performance.",
        "power_and_cooling": "Requires a high-wattage power supply and adequate cooling, which should be confirmed with the rental provider.",
        "alternatives": "RTX 3090 Ti, AMD Radeon RX 7900 XTX."
      }
    },
    {
      "rank": 2,
      "company": "NVIDIA",
      "model": "GeForce RTX 4080 Super",
      "model_type": "Consumer",
      "vram": "16GB GDDR6X",
      "cuda_cores": 10240,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 16-pin",
      "renting_considerations": {
        "primary_use_case": "Excellent for 1440p and 4K gaming, streaming, and professional content creation.",
        "performance_level": "High-end performance, offering a slight improvement over the original RTX 4080.",
        "cost_implication": "Premium rental price, but generally more affordable than the RTX 4090.",
        "power_and_cooling": "Significant power draw, ensure your system or the provided rental rig can handle it.",
        "alternatives": "GeForce RTX 4080, Radeon RX 7900 XT."
      }
    },
    {
      "rank": 3,
      "company": "AMD",
      "model": "Radeon RX 7900 XTX",
      "model_type": "Consumer",
      "vram": "24GB GDDR6",
      "stream_processors": 6144,
      "ray_accelerators": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "High-performance 4K gaming, content creation, and workloads that benefit from a large VRAM buffer.",
        "performance_level": "Competitive with NVIDIA's high-end offerings, particularly in rasterization performance.",
        "cost_implication": "Often a more cost-effective rental option compared to the RTX 4090 for similar VRAM.",
        "power_and_cooling": "High power consumption, verify compatibility with the rental setup.",
        "alternatives": "NVIDIA GeForce RTX 4090, GeForce RTX 4080 Super."
      }
    },
    {
      "rank": 4,
      "company": "NVIDIA",
      "model": "GeForce RTX 4070 Ti Super",
      "model_type": "Consumer",
      "vram": "16GB GDDR6X",
      "cuda_cores": 8448,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 16-pin",
      "renting_considerations": {
        "primary_use_case": "Ideal for high-refresh-rate 1440p gaming and demanding creative applications.",
        "performance_level": "Excellent performance for its price point, bridging the gap between the RTX 4070 Ti and RTX 4080.",
        "cost_implication": "Mid-to-high rental cost, offering a good balance of price and performance.",
        "power_and_cooling": "More manageable power requirements than the top-tier cards, but still requires a capable system.",
        "alternatives": "Radeon RX 7900 XT, GeForce RTX 4070 Ti."
      }
    },
    {
      "rank": 5,
      "company": "NVIDIA",
      "model": "GeForce RTX 3090 Ti",
      "model_type": "Consumer",
      "vram": "24GB GDDR6X",
      "cuda_cores": 10752,
      "tensor_cores": "3rd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 16-pin or 3x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Still a powerhouse for 4K gaming, professional visualization, and large dataset AI training.",
        "performance_level": "Very high, was the flagship of the previous generation and remains highly capable.",
        "cost_implication": "Rental prices may have become more competitive with the release of the 40-series.",
        "power_and_cooling": "Notoriously power-hungry, ensure the rental provider has an adequate setup.",
        "alternatives": "GeForce RTX 4090, Radeon RX 7900 XTX."
      }
    },
    {
      "rank": 6,
      "company": "AMD",
      "model": "Radeon RX 7900 XT",
      "model_type": "Consumer",
      "vram": "20GB GDDR6",
      "stream_processors": 5376,
      "ray_accelerators": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Strong performance in 1440p and 4K gaming, and a good choice for creators who need ample VRAM.",
        "performance_level": "High-end performance, offering a compelling alternative to NVIDIA's offerings.",
        "cost_implication": "Competitive rental pricing, often providing better value than its direct NVIDIA competitors.",
        "power_and_cooling": "Requires a robust power supply and good case airflow.",
        "alternatives": "NVIDIA GeForce RTX 4070 Ti Super, GeForce RTX 4070 Ti."
      }
    },
    {
      "rank": 7,
      "company": "NVIDIA",
      "model": "GeForce RTX 4070 Super",
      "model_type": "Consumer",
      "vram": "12GB GDDR6X",
      "cuda_cores": 7168,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 16-pin or 2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "A sweet spot for high-framerate 1440p gaming and many content creation tasks.",
        "performance_level": "Significant performance uplift from the base RTX 4070.",
        "cost_implication": "Mid-range rental cost with excellent performance for the price.",
        "power_and_cooling": "More power-efficient than higher-end cards, making it suitable for a wider range of systems.",
        "alternatives": "Radeon RX 7800 XT, GeForce RTX 4070."
      }
    },
    {
      "rank": 8,
      "company": "NVIDIA",
      "model": "GeForce RTX 3080 Ti",
      "model_type": "Consumer",
      "vram": "12GB GDDR6X",
      "cuda_cores": 10240,
      "tensor_cores": "3rd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin or 1x 12-pin",
      "renting_considerations": {
        "primary_use_case": "Excellent for 1440p and 4K gaming, still a very capable card for most modern titles.",
        "performance_level": "High-end performance from the previous generation, comparable to the RTX 4070 in some scenarios.",
        "cost_implication": "Rental prices should be more affordable than the latest generation for similar performance.",
        "power_and_cooling": "High power draw, so a capable system is a must.",
        "alternatives": "GeForce RTX 4070 Super, Radeon RX 7800 XT."
      }
    },
    {
      "rank": 9,
      "company": "AMD",
      "model": "Radeon RX 7800 XT",
      "model_type": "Consumer",
      "vram": "16GB GDDR6",
      "stream_processors": 3840,
      "ray_accelerators": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "A top contender for 1440p gaming, offering great rasterization performance and generous VRAM.",
        "performance_level": "Strong mid-to-high range performance, often outperforming the RTX 4070 in non-ray-traced games.",
        "cost_implication": "Very competitive rental pricing, offering excellent value.",
        "power_and_cooling": "Moderate power consumption, making it compatible with a good range of rental systems.",
        "alternatives": "NVIDIA GeForce RTX 4070 Super, GeForce RTX 4070."
      }
    },
    {
      "rank": 10,
      "company": "NVIDIA",
      "model": "GeForce RTX 4070",
      "model_type": "Consumer",
      "vram": "12GB GDDR6X",
      "cuda_cores": 5888,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 16-pin or 2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Solid 1440p gaming performance and capable for content creation.",
        "performance_level": "Good mid-range performance, benefiting from DLSS 3 technology.",
        "cost_implication": "Affordable mid-range rental option.",
        "power_and_cooling": "Relatively power-efficient, making it easy to accommodate in most rental rigs.",
        "alternatives": "Radeon RX 7800 XT, GeForce RTX 3080."
      }
    },
    {
      "rank": 11,
      "company": "NVIDIA",
      "model": "GeForce RTX 3080",
      "model_type": "Consumer",
      "vram": "10GB or 12GB GDDR6X",
      "cuda_cores": 8704,
      "tensor_cores": "3rd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin or 1x 12-pin",
      "renting_considerations": {
        "primary_use_case": "A classic choice for 1440p and entry-level 4K gaming, still highly relevant.",
        "performance_level": "Strong performance that holds up well against newer mid-range cards.",
        "cost_implication": "Likely to be a very cost-effective rental for the performance it offers.",
        "power_and_cooling": "High power consumption is a key consideration.",
        "alternatives": "GeForce RTX 4070, Radeon RX 7700 XT."
      }
    },
    {
      "rank": 12,
      "company": "AMD",
      "model": "Radeon RX 7700 XT",
      "model_type": "Consumer",
      "vram": "12GB GDDR6",
      "stream_processors": 3456,
      "ray_accelerators": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Excellent for 1080p and solid 1440p gaming.",
        "performance_level": "Good mid-range performance, competitive with the RTX 4060 Ti.",
        "cost_implication": "Affordable and provides good value for gamers.",
        "power_and_cooling": "Moderate power draw, easy to accommodate.",
        "alternatives": "NVIDIA GeForce RTX 4060 Ti, GeForce RTX 3070."
      }
    },
    {
      "rank": 13,
      "company": "NVIDIA",
      "model": "GeForce RTX 4060 Ti",
      "model_type": "Consumer",
      "vram": "8GB or 16GB GDDR6",
      "cuda_cores": 4352,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0 x8",
      "power_connector": "1x 16-pin or 1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Aimed at high-framerate 1080p gaming and capable 1440p gaming, especially with DLSS.",
        "performance_level": "Solid mid-range performance. The 16GB version is better for future-proofing.",
        "cost_implication": "Affordable rental option for mainstream gamers.",
        "power_and_cooling": "Very power-efficient, making it suitable for a wide variety of systems.",
        "alternatives": "Radeon RX 7700 XT, GeForce RTX 3060 Ti."
      }
    },
    {
      "rank": 14,
      "company": "NVIDIA",
      "model": "GeForce RTX 3070 Ti",
      "model_type": "Consumer",
      "vram": "8GB GDDR6X",
      "cuda_cores": 6144,
      "tensor_cores": "3rd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin or 1x 12-pin",
      "renting_considerations": {
        "primary_use_case": "Strong 1440p gaming performance.",
        "performance_level": "A solid performer from the previous generation.",
        "cost_implication": "Should be an affordable rental option.",
        "power_and_cooling": "Consumes a fair amount of power.",
        "alternatives": "GeForce RTX 4060 Ti, Radeon RX 6800."
      }
    },
    {
      "rank": 15,
      "company": "NVIDIA",
      "model": "GeForce RTX 3070",
      "model_type": "Consumer",
      "vram": "8GB GDDR6",
      "cuda_cores": 5888,
      "tensor_cores": "3rd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 12-pin or 1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "A stalwart for 1440p gaming.",
        "performance_level": "Remains a very capable GPU for most games.",
        "cost_implication": "Cost-effective rental choice.",
        "power_and_cooling": "More power-efficient than the Ti variant.",
        "alternatives": "GeForce RTX 4060, Radeon RX 6700 XT."
      }
    },
    {
      "rank": 16,
      "company": "AMD",
      "model": "Radeon RX 6800 XT",
      "model_type": "Consumer",
      "vram": "16GB GDDR6",
      "stream_processors": 4608,
      "ray_accelerators": "1st Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Excellent for 1440p and capable 4K gaming, with a generous VRAM buffer.",
        "performance_level": "Strong rasterization performance, though ray tracing is a generation behind.",
        "cost_implication": "Likely an attractive rental price for the performance.",
        "power_and_cooling": "High power draw, similar to other high-end cards of its generation.",
        "alternatives": "GeForce RTX 3080, Radeon RX 7700 XT."
      }
    },
    {
      "rank": 17,
      "company": "NVIDIA",
      "model": "GeForce RTX 4060",
      "model_type": "Consumer",
      "vram": "8GB GDDR6",
      "cuda_cores": 3072,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0 x8",
      "power_connector": "1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Primarily for 1080p gaming, where it excels with high frame rates and DLSS 3.",
        "performance_level": "Good entry-level performance for the 40-series.",
        "cost_implication": "One of the most affordable rental options for current-generation technology.",
        "power_and_cooling": "Extremely power-efficient.",
        "alternatives": "Radeon RX 7600, GeForce RTX 3060."
      }
    },
    {
      "rank": 18,
      "company": "AMD",
      "model": "Radeon RX 6800",
      "model_type": "Consumer",
      "vram": "16GB GDDR6",
      "stream_processors": 3840,
      "ray_accelerators": "1st Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "A great card for 1440p gaming, especially for titles that are VRAM-intensive.",
        "performance_level": "Solid performance that competes well with the RTX 3070.",
        "cost_implication": "Should be a good value rental.",
        "power_and_cooling": "More power-efficient than the XT version.",
        "alternatives": "GeForce RTX 3070, GeForce RTX 4060."
      }
    },
    {
      "rank": 19,
      "company": "AMD",
      "model": "Radeon RX 7600",
      "model_type": "Consumer",
      "vram": "8GB GDDR6",
      "stream_processors": 2048,
      "ray_accelerators": "2nd Gen",
      "interface": "PCIe 4.0 x8",
      "power_connector": "1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Designed for excellent 1080p gaming performance.",
        "performance_level": "A strong competitor in the entry-level market.",
        "cost_implication": "Very affordable rental option.",
        "power_and_cooling": "Low power consumption.",
        "alternatives": "NVIDIA GeForce RTX 4060, GeForce RTX 3060."
      }
    },
    {
      "rank": 20,
      "company": "NVIDIA",
      "model": "GeForce RTX 3060 Ti",
      "model_type": "Consumer",
      "vram": "8GB GDDR6",
      "cuda_cores": 4864,
      "tensor_cores": "2nd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin or 1x 12-pin",
      "renting_considerations": {
        "primary_use_case": "A long-standing favorite for 1080p and capable 1440p gaming.",
        "performance_level": "Excellent performance for its class.",
        "cost_implication": "Should be a very budget-friendly rental.",
        "power_and_cooling": "Moderate power draw.",
        "alternatives": "GeForce RTX 4060, Radeon RX 6700 XT."
      }
    },
    {
      "rank": 21,
      "company": "AMD",
      "model": "Radeon RX 6700 XT",
      "model_type": "Consumer",
      "vram": "12GB GDDR6",
      "stream_processors": 2560,
      "ray_accelerators": "1st Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin + 1x 6-pin",
      "renting_considerations": {
        "primary_use_case": "Excellent for 1080p and strong 1440p gaming, with a healthy amount of VRAM.",
        "performance_level": "A very capable mid-range card.",
        "cost_implication": "Cost-effective rental for its performance.",
        "power_and_cooling": "Moderate power consumption.",
        "alternatives": "GeForce RTX 3060 Ti, GeForce RTX 4060."
      }
    },
    {
      "rank": 22,
      "company": "NVIDIA",
      "model": "GeForce RTX 3060",
      "model_type": "Consumer",
      "vram": "12GB GDDR6",
      "cuda_cores": 3584,
      "tensor_cores": "2nd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "A very popular choice for 1080p gaming, with its 12GB of VRAM being a key selling point.",
        "performance_level": "Solid entry-level to mid-range performance.",
        "cost_implication": "One of the most affordable and widely available rental options.",
        "power_and_cooling": "Low power draw.",
        "alternatives": "Radeon RX 7600, Radeon RX 6600 XT."
      }
    },
    {
      "rank": 23,
      "company": "Intel",
      "model": "Arc A770",
      "model_type": "Consumer",
      "vram": "8GB or 16GB GDDR6",
      "xe_cores": 32,
      "ray_tracing_units": 32,
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin + 1x 6-pin",
      "renting_considerations": {
        "primary_use_case": "Aimed at 1080p gaming and content creation, with strong performance in applications that support its architecture.",
        "performance_level": "Competitive with the RTX 3060, with driver improvements continuously enhancing performance.",
        "cost_implication": "Affordable rental, offering a new alternative in the market.",
        "power_and_cooling": "Moderate power consumption.",
        "alternatives": "NVIDIA GeForce RTX 3060, AMD Radeon RX 6600 XT."
      }
    },
    {
      "rank": 24,
      "company": "Intel",
      "model": "Arc A750",
      "model_type": "Consumer",
      "vram": "8GB GDDR6",
      "xe_cores": 28,
      "ray_tracing_units": 28,
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "A solid choice for 1080p gaming.",
        "performance_level": "Slightly behind the A770 but offers great value.",
        "cost_implication": "Very budget-friendly rental option.",
        "power_and_cooling": "Similar power requirements to the A770.",
        "alternatives": "NVIDIA GeForce RTX 3050, AMD Radeon RX 6600."
      }
    },
    {
      "rank": 25,
      "company": "AMD",
      "model": "Radeon RX 6600 XT",
      "model_type": "Consumer",
      "vram": "8GB GDDR6",
      "stream_processors": 2048,
      "ray_accelerators": "1st Gen",
      "interface": "PCIe 4.0 x8",
      "power_connector": "1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Excellent for high-framerate 1080p gaming.",
        "performance_level": "A strong performer in its class.",
        "cost_implication": "Very affordable to rent.",
        "power_and_cooling": "Very power-efficient.",
        "alternatives": "NVIDIA GeForce RTX 3060, Intel Arc A750."
      }
    },
    {
      "rank": 26,
      "company": "NVIDIA",
      "model": "A100",
      "model_type": "Datacenter",
      "vram": "40GB or 80GB HBM2e",
      "cuda_cores": 6912,
      "tensor_cores": "3rd Gen",
      "rt_cores": null,
      "interface": "SXM4 or PCIe 4.0",
      "power_connector": "Varies by form factor",
      "renting_considerations": {
        "primary_use_case": "AI/ML training and inference, high-performance computing (HPC), and data analytics.",
        "performance_level": "Exceptional performance for professional workloads, a standard in many data centers.",
        "cost_implication": "Very high rental cost due to its specialized nature and high demand in the AI sector.",
        "power_and_cooling": "Requires a server environment with appropriate power and cooling infrastructure.",
        "alternatives": "NVIDIA H100, AMD Instinct MI250X."
      }
    },
    {
      "rank": 27,
      "company": "NVIDIA",
      "model": "H100",
      "model_type": "Datacenter",
      "vram": "80GB HBM3",
      "cuda_cores": 16896,
      "tensor_cores": "4th Gen",
      "rt_cores": null,
      "interface": "SXM5 or PCIe 5.0",
      "power_connector": "Varies by form factor",
      "renting_considerations": {
        "primary_use_case": "Cutting-edge AI and HPC workloads, especially large language models (LLMs).",
        "performance_level": "The current flagship for AI and HPC from NVIDIA, offering unparalleled performance.",
        "cost_implication": "Extremely high rental cost, intended for enterprise and research institutions.",
        "power_and_cooling": "Demands a state-of-the-art server environment.",
        "alternatives": "NVIDIA A100, AMD Instinct MI300X."
      }
    },
    {
      "rank": 28,
      "company": "AMD",
      "model": "Instinct MI250X",
      "model_type": "Datacenter",
      "vram": "128GB HBM2e",
      "stream_processors": 14080,
      "ray_accelerators": null,
      "interface": "OAM",
      "power_connector": "Varies",
      "renting_considerations": {
        "primary_use_case": "Large-scale HPC and AI applications.",
        "performance_level": "A powerful competitor to NVIDIA's data center offerings, excelling in certain HPC workloads.",
        "cost_implication": "High rental cost, though potentially more competitive than NVIDIA's top-tier options.",
        "power_and_cooling": "Requires specialized server infrastructure.",
        "alternatives": "NVIDIA A100, NVIDIA H100."
      }
    },
    {
      "rank": 29,
      "company": "NVIDIA",
      "model": "RTX A6000",
      "model_type": "Professional",
      "vram": "48GB GDDR6 with ECC",
      "cuda_cores": 10752,
      "tensor_cores": "3rd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin CPU",
      "renting_considerations": {
        "primary_use_case": "Professional visualization, complex 3D rendering, and AI development with large datasets.",
        "performance_level": "Excellent performance for professional applications, with certified drivers for stability.",
        "cost_implication": "High rental cost, but essential for certain professional workflows.",
        "power_and_cooling": "Designed for workstation environments with adequate cooling.",
        "alternatives": "NVIDIA RTX 6000 Ada Generation, AMD Radeon Pro W7900."
      }
    },
    {
      "rank": 30,
      "company": "AMD",
      "model": "Radeon Pro W7900",
      "model_type": "Professional",
      "vram": "48GB GDDR6 with ECC",
      "stream_processors": 6144,
      "ray_accelerators": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Demanding professional workloads, including real-time rendering, video editing, and simulation.",
        "performance_level": "A strong competitor to NVIDIA's professional GPUs, particularly in applications that favor AMD's architecture.",
        "cost_implication": "Competitive rental pricing for a high-end professional card.",
        "power_and_cooling": "Requires a workstation with a robust power supply.",
        "alternatives": "NVIDIA RTX A6000, NVIDIA RTX 6000 Ada Generation."
      }
    },
    {
      "rank": 31,
      "company": "NVIDIA",
      "model": "RTX 6000 Ada Generation",
      "model_type": "Professional",
      "vram": "48GB GDDR6 with ECC",
      "cuda_cores": 18176,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 16-pin",
      "renting_considerations": {
        "primary_use_case": "The most demanding professional visualization, virtual production, and AI workloads.",
        "performance_level": "The pinnacle of professional GPU performance from NVIDIA.",
        "cost_implication": "Very high rental cost, for users who need the absolute best performance and features.",
        "power_and_cooling": "Designed for high-performance workstations.",
        "alternatives": "NVIDIA RTX A6000, AMD Radeon Pro W7900."
      }
    },
    {
      "rank": 32,
      "company": "NVIDIA",
      "model": "GeForce RTX 3050",
      "model_type": "Consumer",
      "vram": "8GB GDDR6",
      "cuda_cores": 2560,
      "tensor_cores": "2nd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0 x8",
      "power_connector": "1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Entry-level 1080p gaming.",
        "performance_level": "Sufficient for playing most modern games at 1080p with medium to high settings.",
        "cost_implication": "Very budget-friendly rental option.",
        "power_and_cooling": "Low power consumption.",
        "alternatives": "AMD Radeon RX 6600, Intel Arc A580."
      }
    },
    {
      "rank": 33,
      "company": "AMD",
      "model": "Radeon RX 6600",
      "model_type": "Consumer",
      "vram": "8GB GDDR6",
      "stream_processors": 1792,
      "ray_accelerators": "1st Gen",
      "interface": "PCIe 4.0 x8",
      "power_connector": "1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "A solid choice for 1080p gaming on a budget.",
        "performance_level": "Good performance for its class, very power-efficient.",
        "cost_implication": "Extremely affordable to rent.",
        "power_and_cooling": "Minimal power and cooling requirements.",
        "alternatives": "NVIDIA GeForce RTX 3050, Intel Arc A580."
      }
    },
    {
      "rank": 34,
      "company": "AMD",
      "model": "Radeon RX 6700",
      "model_type": "Consumer",
      "vram": "10GB GDDR6",
      "stream_processors": 2304,
      "ray_accelerators": "1st Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "A good middle ground for 1080p and some 1440p gaming.",
        "performance_level": "A capable mid-range card from the previous generation.",
        "cost_implication": "Cost-effective rental.",
        "power_and_cooling": "Moderate power draw.",
        "alternatives": "NVIDIA GeForce RTX 3060, AMD Radeon RX 6650 XT."
      }
    },
    {
      "rank": 35,
      "company": "AMD",
      "model": "Radeon RX 6650 XT",
      "model_type": "Consumer",
      "vram": "8GB GDDR6",
      "stream_processors": 2048,
      "ray_accelerators": "1st Gen",
      "interface": "PCIe 4.0 x8",
      "power_connector": "1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "A slightly faster version of the RX 6600 XT, great for 1080p.",
        "performance_level": "A solid refresh offering a bit more performance.",
        "cost_implication": "Affordable rental, likely priced similarly to the 6600 XT.",
        "power_and_cooling": "Slightly higher power consumption than the 6600 XT.",
        "alternatives": "NVIDIA GeForce RTX 3060, AMD Radeon RX 7600."
      }
    },
    {
      "rank": 36,
      "company": "NVIDIA",
      "model": "RTX A5000",
      "model_type": "Professional",
      "vram": "24GB GDDR6 with ECC",
      "cuda_cores": 8192,
      "tensor_cores": "3rd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin CPU",
      "renting_considerations": {
        "primary_use_case": "High-end professional design, rendering, and AI workloads.",
        "performance_level": "A powerful professional GPU, a step down from the A6000 but still very capable.",
        "cost_implication": "High rental cost, for professional users with demanding needs.",
        "power_and_cooling": "Designed for workstation use.",
        "alternatives": "AMD Radeon Pro W7800, NVIDIA RTX 5000 Ada Generation."
      }
    },
    {
      "rank": 37,
      "company": "AMD",
      "model": "Radeon Pro W7800",
      "model_type": "Professional",
      "vram": "32GB GDDR6 with ECC",
      "stream_processors": 4608,
      "ray_accelerators": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Professional applications requiring a large VRAM buffer and strong performance.",
        "performance_level": "A strong competitor in the high-end professional space.",
        "cost_implication": "Competitive rental pricing for its class.",
        "power_and_cooling": "Requires a capable workstation.",
        "alternatives": "NVIDIA RTX A5000, NVIDIA RTX 5000 Ada Generation."
      }
    },
    {
      "rank": 38,
      "company": "NVIDIA",
      "model": "RTX 5000 Ada Generation",
      "model_type": "Professional",
      "vram": "32GB GDDR6 with ECC",
      "cuda_cores": 12800,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 16-pin",
      "renting_considerations": {
        "primary_use_case": "Advanced professional workflows, including real-time ray tracing, VR, and AI.",
        "performance_level": "Exceptional performance, leveraging the Ada Lovelace architecture.",
        "cost_implication": "Very high rental cost.",
        "power_and_cooling": "Designed for modern workstations.",
        "alternatives": "NVIDIA RTX A5000, AMD Radeon Pro W7800."
      }
    },
    {
      "rank": 39,
      "company": "NVIDIA",
      "model": "L40",
      "model_type": "Datacenter",
      "vram": "48GB GDDR6 with ECC",
      "cuda_cores": 18176,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 16-pin",
      "renting_considerations": {
        "primary_use_case": "Graphics-intensive data center workloads, including virtual workstations, rendering, and streaming.",
        "performance_level": "A powerful GPU for data center graphics and compute.",
        "cost_implication": "High rental cost, for enterprise use.",
        "power_and_cooling": "Server-grade power and cooling required.",
        "alternatives": "NVIDIA A40."
      }
    },
    {
      "rank": 40,
      "company": "NVIDIA",
      "model": "A40",
      "model_type": "Datacenter",
      "vram": "48GB GDDR6 with ECC",
      "cuda_cores": 10752,
      "tensor_cores": "3rd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin CPU",
      "renting_considerations": {
        "primary_use_case": "A versatile data center GPU for graphics and compute workloads.",
        "performance_level": "Strong performance for a wide range of professional applications in a data center environment.",
        "cost_implication": "High rental cost.",
        "power_and_cooling": "Requires a server chassis.",
        "alternatives": "NVIDIA L40."
      }
    },
    {
      "rank": 41,
      "company": "AMD",
      "model": "Instinct MI300X",
      "model_type": "Datacenter",
      "vram": "192GB HBM3",
      "stream_processors": 19456,
      "ray_accelerators": null,
      "interface": "OAM",
      "power_connector": "Varies",
      "renting_considerations": {
        "primary_use_case": "The most demanding HPC and AI workloads, particularly those requiring massive memory capacity.",
        "performance_level": "AMD's flagship data center GPU, designed to compete at the highest level.",
        "cost_implication": "Extremely high rental cost.",
        "power_and_cooling": "Requires a cutting-edge server platform.",
        "alternatives": "NVIDIA H100."
      }
    },
    {
      "rank": 42,
      "company": "Intel",
      "model": "Data Center GPU Max 1550",
      "model_type": "Datacenter",
      "vram": "128GB HBM2e",
      "xe_cores": 128,
      "ray_tracing_units": null,
      "interface": "OAM",
      "power_connector": "Varies",
      "renting_considerations": {
        "primary_use_case": "HPC and AI applications, representing Intel's push into the high-performance data center market.",
        "performance_level": "A strong contender for various HPC workloads.",
        "cost_implication": "Rental pricing will be competitive to gain market share.",
        "power_and_cooling": "Designed for high-density server environments.",
        "alternatives": "NVIDIA A100, AMD Instinct MI250X."
      }
    },
    {
      "rank": 43,
      "company": "NVIDIA",
      "model": "RTX A4000",
      "model_type": "Professional",
      "vram": "16GB GDDR6 with ECC",
      "cuda_cores": 6144,
      "tensor_cores": "2nd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 6-pin",
      "renting_considerations": {
        "primary_use_case": "A wide range of professional applications, including design, engineering, and content creation.",
        "performance_level": "A solid mid-range professional GPU.",
        "cost_implication": "A more affordable professional rental option.",
        "power_and_cooling": "Single-slot design and lower power consumption make it versatile.",
        "alternatives": "AMD Radeon Pro W7700, NVIDIA RTX 4000 SFF Ada Generation."
      }
    },
    {
      "rank": 44,
      "company": "AMD",
      "model": "Radeon Pro W7700",
      "model_type": "Professional",
      "vram": "16GB GDDR6 with ECC",
      "stream_processors": 3072,
      "ray_accelerators": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Mainstream professional workloads.",
        "performance_level": "A capable professional card for a variety of tasks.",
        "cost_implication": "Competitive rental pricing.",
        "power_and_cooling": "Moderate power draw.",
        "alternatives": "NVIDIA RTX A4000, NVIDIA RTX 4000 SFF Ada Generation."
      }
    },
    {
      "rank": 45,
      "company": "NVIDIA",
      "model": "RTX 4000 SFF Ada Generation",
      "model_type": "Professional",
      "vram": "20GB GDDR6 with ECC",
      "cuda_cores": 6144,
      "tensor_cores": "4th Gen",
      "rt_cores": "3rd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "None (powered by PCIe slot)",
      "renting_considerations": {
        "primary_use_case": "Professional applications in small form factor (SFF) workstations.",
        "performance_level": "Excellent performance in a compact form factor.",
        "cost_implication": "A premium rental for specialized SFF builds.",
        "power_and_cooling": "Very low power consumption and designed for compact spaces.",
        "alternatives": "NVIDIA RTX A4000, AMD Radeon Pro W7700."
      }
    },
    {
      "rank": 46,
      "company": "NVIDIA",
      "model": "A10",
      "model_type": "Datacenter",
      "vram": "24GB GDDR6 with ECC",
      "cuda_cores": 9216,
      "tensor_cores": "3rd Gen",
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin CPU",
      "renting_considerations": {
        "primary_use_case": "Mainstream graphics and AI inference in the data center.",
        "performance_level": "A versatile and widely adopted data center GPU.",
        "cost_implication": "A more cost-effective data center rental compared to the top-tier options.",
        "power_and_cooling": "Designed for server deployment.",
        "alternatives": "NVIDIA A16."
      }
    },
    {
      "rank": 47,
      "company": "NVIDIA",
      "model": "A16",
      "model_type": "Datacenter",
      "vram": "64GB (4x 16GB) GDDR6",
      "cuda_cores": 8192,
      "tensor_cores": null,
      "rt_cores": "2nd Gen",
      "interface": "PCIe 4.0",
      "power_connector": "1x 8-pin CPU",
      "renting_considerations": {
        "primary_use_case": "High-density virtual desktop infrastructure (VDI).",
        "performance_level": "Four GPUs on a single board, optimized for multi-user environments.",
        "cost_implication": "Cost-effective per user in a VDI rental scenario.",
        "power_and_cooling": "Designed for high-density server deployments.",
        "alternatives": "NVIDIA A10."
      }
    },
    {
      "rank": 48,
      "company": "AMD",
      "model": "Radeon RX 6950 XT",
      "model_type": "Consumer",
      "vram": "16GB GDDR6",
      "stream_processors": 5120,
      "ray_accelerators": "1st Gen",
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "High-end 1440p and 4K gaming from the previous generation.",
        "performance_level": "Was the flagship of the RX 6000 series, still very powerful.",
        "cost_implication": "Likely a good value rental for its performance level.",
        "power_and_cooling": "High power consumption.",
        "alternatives": "NVIDIA GeForce RTX 3080 Ti, AMD Radeon RX 7800 XT."
      }
    },
    {
      "rank": 49,
      "company": "NVIDIA",
      "model": "GeForce RTX 2080 Ti",
      "model_type": "Consumer",
      "vram": "11GB GDDR6",
      "cuda_cores": 4352,
      "tensor_cores": "1st Gen",
      "rt_cores": "1st Gen",
      "interface": "PCIe 3.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Still capable for 1080p and 1440p gaming.",
        "performance_level": "A former flagship that has aged well, but is several generations old.",
        "cost_implication": "A very budget-friendly rental option.",
        "power_and_cooling": "High power draw for its performance by modern standards.",
        "alternatives": "NVIDIA GeForce RTX 3060 Ti, AMD Radeon RX 6700 XT."
      }
    },
    {
      "rank": 50,
      "company": "Intel",
      "model": "Arc A580",
      "model_type": "Consumer",
      "vram": "8GB GDDR6",
      "xe_cores": 24,
      "ray_tracing_units": 24,
      "interface": "PCIe 4.0",
      "power_connector": "2x 8-pin",
      "renting_considerations": {
        "primary_use_case": "Budget 1080p gaming.",
        "performance_level": "An entry-level offering from Intel.",
        "cost_implication": "Extremely affordable rental.",
        "power_and_cooling": "Moderate power draw.",
        "alternatives": "NVIDIA GeForce RTX 3050, AMD Radeon RX 6600."
      }
    }
  ]
};

const generateOffersFromGpuData = (): VastAiOffer[] => {
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

  return gpuMarketData.gpus.slice(0, 30).map((gpu, i) => {
    // Extract VRAM number from string like "24GB GDDR6X"
    const vramMatch = gpu.vram?.match(/(\d+)GB/);
    const vramGB = vramMatch ? parseInt(vramMatch[1]) : 8;
    
    // Base price calculation based on GPU tier and market positioning
    let basePrice = 1.0;
    if (gpu.model.includes('4090')) basePrice = 2.5;
    else if (gpu.model.includes('4080')) basePrice = 1.8;
    else if (gpu.model.includes('4070')) basePrice = 1.2;
    else if (gpu.model.includes('4060')) basePrice = 0.8;
    else if (gpu.model.includes('3090')) basePrice = 1.5;
    else if (gpu.model.includes('3080')) basePrice = 1.0;
    else if (gpu.model.includes('3070')) basePrice = 0.7;
    else if (gpu.model.includes('3060')) basePrice = 0.5;
    else if (gpu.model.includes('7900')) basePrice = 2.0;
    else if (gpu.model.includes('7800')) basePrice = 1.3;
    else if (gpu.model.includes('7700')) basePrice = 0.9;
    else if (gpu.model.includes('6800')) basePrice = 1.1;
    else if (gpu.model.includes('6700')) basePrice = 0.8;
    else if (gpu.model.includes('6600')) basePrice = 0.4;
    else if (gpu.model.includes('A100')) basePrice = 8.0;
    else if (gpu.model.includes('H100')) basePrice = 12.0;
    else if (gpu.model.includes('A6000')) basePrice = 4.0;
    else if (gpu.model.includes('A5000')) basePrice = 3.0;
    else if (gpu.model.includes('A4000')) basePrice = 2.0;
    
    // Add some price variation
    const priceVariation = (Math.random() - 0.5) * 0.3;
    const finalPrice = basePrice * (1 + priceVariation);

    return {
      id: i + 1,
      machine_id: 1000 + i,
      hostname: hostnames[Math.floor(Math.random() * hostnames.length)] + `-${i + 1}`,
      gpu_name: gpu.model,
      gpu_ram: vramGB,
      num_gpus: [1, 2, 4][Math.floor(Math.random() * 3)],
      cpu_cores: [8, 16, 32, 64][Math.floor(Math.random() * 4)],
      cpu_ram: [32, 64, 128, 256][Math.floor(Math.random() * 4)],
      disk_space: [250, 500, 1000, 2000][Math.floor(Math.random() * 4)],
      dph_total: parseFloat(finalPrice.toFixed(3)),
      reliability2: Math.random() * 0.3 + 0.7, // 70% to 100% reliability
      datacenter: datacenters[Math.floor(Math.random() * datacenters.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      verified: Math.random() > 0.2, // 80% chance of being verified
      rentable: Math.random() > 0.1, // 90% chance of being rentable
      rented: Math.random() > 0.8, // 20% chance of being rented
      status: 'available',
      inet_down: Math.floor(Math.random() * 1000) + 100,
      inet_up: Math.floor(Math.random() * 500) + 50,
      storage_cost: Math.random() * 0.1 + 0.01,
      direct_port_count: Math.floor(Math.random() * 10) + 1,
      rank: gpu.rank,
      company: gpu.company,
      model_type: gpu.model_type,
      interface: gpu.interface,
      power_connector: gpu.power_connector,
      primary_use_case: gpu.renting_considerations.primary_use_case,
      performance_level: gpu.renting_considerations.performance_level,
      cost_implication: gpu.renting_considerations.cost_implication
    };
  });
};

const fetchVastAiOffers = async (): Promise<VastAiOffer[]> => {
  console.log('Generating GPU offers from market data...');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const offers = generateOffersFromGpuData();
  console.log('Generated GPU offers:', offers);
  
  return offers;
};

export const useVastAiOffers = () => {
  return useQuery({
    queryKey: ['vastAiOffers'],
    queryFn: fetchVastAiOffers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
