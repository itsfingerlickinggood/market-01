
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Target, Github, Star, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MarketplaceDeal from "@/components/MarketplaceDeal";

const Index = () => {
  // Realistic top deals data based on actual market prices
  const topDeals = [
    {
      id: '1',
      company: 'NVIDIA',
      model: 'H100 SXM',
      basePrice: 2.37, // Silicon Data average
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
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">GPUTrade</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
              <Link to="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</Link>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Analytics</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</a>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Github className="h-4 w-4" />
                <Star className="h-4 w-4" />
                <span>2.3k</span>
              </div>
              <Button variant="outline" className="border-border hover:bg-accent hover:text-accent-foreground">
                Sign In
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 flex items-center justify-center gap-3">
            <TrendingUp className="h-12 w-12 text-primary" />
            Real-Time GPU Marketplace
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Track live GPU prices across multiple cloud providers. Compare deals, find the best rates, and make informed decisions for your compute needs.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/marketplace">
              <Button size="lg" className="text-lg px-8 py-6">
                <Target className="h-5 w-5 mr-2" />
                Explore Marketplace
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              View Analytics
            </Button>
          </div>
        </div>

        {/* Live Market Data Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-semibold mb-4">Live Market Data</h3>
            <p className="text-lg text-muted-foreground">
              Real-time pricing from leading cloud providers, updated every 5 seconds
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topDeals.map((deal) => (
              <MarketplaceDeal key={deal.id} gpu={deal} />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 border border-border rounded-lg bg-card">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Live Price Tracking</h4>
            <p className="text-muted-foreground">
              Monitor real-time price fluctuations across multiple providers and get the best deals.
            </p>
          </div>
          <div className="text-center p-6 border border-border rounded-lg bg-card">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Smart Recommendations</h4>
            <p className="text-muted-foreground">
              Get personalized GPU recommendations based on your specific use case and requirements.
            </p>
          </div>
          <div className="text-center p-6 border border-border rounded-lg bg-card">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Instant Deployment</h4>
            <p className="text-muted-foreground">
              Quick access to available GPUs with one-click deployment across trusted providers.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-secondary/30 rounded-lg p-12">
          <h3 className="text-3xl font-bold mb-4">Ready to Find Your Perfect GPU?</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers and researchers finding the best GPU deals.
          </p>
          <Link to="/marketplace">
            <Button size="lg" className="text-lg px-12 py-6">
              Start Exploring
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
