
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveMarketSection from "@/components/LiveMarketSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  // Realistic top deals data based on actual market prices
  const topDeals = [
    {
      id: '1',
      company: 'NVIDIA',
      model: 'H100 SXM',
      basePrice: 2.37,
      sites: ['Thunder Compute', 'DigitalOcean', 'CoreWeave', 'RunPod']
    },
    {
      id: '2',
      company: 'NVIDIA',
      model: 'A100 80GB',
      basePrice: 0.78,
      sites: ['Thunder Compute', 'Build AI', 'Lambda Labs', 'Vast.ai']
    },
    {
      id: '3',
      company: 'NVIDIA',
      model: 'RTX 4090',
      basePrice: 0.756,
      sites: ['TensorDock', 'RunPod', 'Vast.ai', 'Paperspace']
    },
    {
      id: '4',
      company: 'NVIDIA',
      model: 'A100 40GB',
      basePrice: 0.57,
      sites: ['Thunder Compute', 'DataCrunch', 'OVH', 'Scaleway']
    },
    {
      id: '5',
      company: 'NVIDIA',
      model: 'V100',
      basePrice: 0.58,
      sites: ['DataCrunch', 'OVH', 'Alibaba Cloud', 'Vast.ai']
    },
    {
      id: '6',
      company: 'NVIDIA',
      model: 'RTX 3090',
      basePrice: 0.576,
      sites: ['RunPod', 'TensorDock', 'Vast.ai', 'Oblivus']
    },
    {
      id: '7',
      company: 'AMD',
      model: 'MI300X',
      basePrice: 6.00,
      sites: ['Oracle Cloud', 'CoreWeave', 'Lambda Labs', 'RunPod']
    },
    {
      id: '8',
      company: 'NVIDIA',
      model: 'T4',
      basePrice: 0.73,
      sites: ['Thunder Compute', 'Alibaba Cloud', 'GCP', 'AWS']
    },
    {
      id: '9',
      company: 'NVIDIA',
      model: 'L4',
      basePrice: 0.81,
      sites: ['GCP', 'Scaleway', 'AWS', 'CoreWeave']
    },
    {
      id: '10',
      company: 'NVIDIA',
      model: 'A6000',
      basePrice: 0.58,
      sites: ['Oblivus', 'Fal.ai', 'RunPod', 'Paperspace']
    },
    {
      id: '11',
      company: 'NVIDIA',
      model: 'H200',
      basePrice: 8.46,
      sites: ['CoreWeave', 'AWS', 'Green AI Cloud', 'Lambda Labs']
    },
    {
      id: '12',
      company: 'NVIDIA',
      model: 'B200',
      basePrice: 31.60,
      sites: ['Green AI Cloud', 'CoreWeave', 'AWS', 'Lambda Labs']
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <LiveMarketSection deals={topDeals} />
        <FeaturesSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;
