
import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Zap, 
  Shield, 
  TrendingUp,
  ExternalLink,
  Heart,
  Bell,
  Download,
  Calculator
} from "lucide-react";
import Header from "@/components/Header";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";

// Mock data - in real app this would come from API
const gpuData = {
  "rtx-4090": {
    id: "rtx-4090",
    name: "NVIDIA RTX 4090",
    brand: "NVIDIA",
    model: "RTX 4090",
    vram: "24GB",
    memoryType: "GDDR6X",
    cudaCores: 16384,
    performanceScore: 95,
    power: "450W",
    image: "/lovable-uploads/ea42f8a1-a209-460e-9282-59e2f86b0671.png",
    tags: ["gaming", "ai", "high-end", "cuda", "24gb-vram", "nvidia"],
    specifications: {
      architecture: "Ada Lovelace",
      memoryBandwidth: "1008 GB/s",
      rtCores: 128,
      tensorCores: 512,
      baseFrequency: "2230 MHz",
      boostFrequency: "2520 MHz",
      memorySpeed: "21 Gbps"
    },
    useCases: ["AI/ML Training", "3D Rendering", "Gaming", "Video Editing", "Cryptocurrency Mining"],
    benchmarks: {
      gaming: 98,
      aiTraining: 95,
      rendering: 92,
      videoEditing: 94
    }
  }
};

const providers = [
  {
    id: "aws",
    name: "AWS EC2",
    logo: "🟧",
    color: "#FF9900",
    website: "https://aws.amazon.com/ec2/",
    pricing: { hourly: 3.06, monthly: 2200, spot: 1.85 },
    features: ["Global availability", "Enterprise support", "Auto-scaling"],
    pros: ["Reliable infrastructure", "24/7 support", "Global data centers"],
    cons: ["Higher pricing", "Complex billing", "Setup complexity"],
    setupTime: "5-10 minutes",
    support: "24/7 Enterprise",
    locations: ["US East", "US West", "Europe", "Asia"],
    rating: 4.5,
    availability: "available"
  },
  {
    id: "gcp",
    name: "Google Cloud",
    logo: "🔵",
    color: "#4285F4",
    website: "https://cloud.google.com/compute/",
    pricing: { hourly: 2.89, monthly: 2080, spot: 1.45 },
    features: ["TPU integration", "AI/ML tools", "Preemptible instances"],
    pros: ["AI/ML focused", "Good pricing", "Easy integration"],
    cons: ["Limited regions", "Complex quotas", "Learning curve"],
    setupTime: "3-8 minutes",
    support: "Business hours",
    locations: ["US", "Europe", "Asia"],
    rating: 4.3,
    availability: "available"
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    logo: "🔷",
    color: "#0078D4",
    website: "https://azure.microsoft.com/",
    pricing: { hourly: 3.15, monthly: 2270, spot: 1.92 },
    features: ["Enterprise integration", "Hybrid cloud", "Security focus"],
    pros: ["Enterprise features", "Security", "Office integration"],
    cons: ["Higher costs", "Complex interface", "Slow provisioning"],
    setupTime: "8-15 minutes",
    support: "24/7 Premium",
    locations: ["Worldwide"],
    rating: 4.2,
    availability: "limited"
  },
  {
    id: "runpod",
    name: "RunPod",
    logo: "🟣",
    color: "#8B5CF6",
    website: "https://runpod.io/",
    pricing: { hourly: 1.89, monthly: 1360, spot: 0.89 },
    features: ["GPU focused", "Fast deployment", "Community templates"],
    pros: ["Best pricing", "GPU specialized", "Quick setup"],
    cons: ["Smaller network", "Limited support", "Beta features"],
    setupTime: "1-3 minutes",
    support: "Community + Email",
    locations: ["US", "Europe"],
    rating: 4.6,
    availability: "available"
  },
  {
    id: "vastai",
    name: "Vast.ai",
    logo: "🟢",
    color: "#10B981",
    website: "https://vast.ai/",
    pricing: { hourly: 1.25, monthly: 900, spot: 0.75 },
    features: ["P2P marketplace", "Flexible pricing", "Custom configs"],
    pros: ["Lowest prices", "Flexible terms", "Wide selection"],
    cons: ["Variable quality", "Limited support", "Setup complexity"],
    setupTime: "2-5 minutes",
    support: "Community",
    locations: ["Global P2P"],
    rating: 4.1,
    availability: "available"
  },
  {
    id: "lambda",
    name: "Lambda Labs",
    logo: "🟡",
    color: "#F59E0B",
    website: "https://lambdalabs.com/",
    pricing: { hourly: 2.20, monthly: 1584, spot: 1.10 },
    features: ["ML optimized", "Research focus", "Easy setup"],
    pros: ["ML focused", "Good performance", "Research friendly"],
    cons: ["Limited availability", "Queue times", "Pricing tiers"],
    setupTime: "2-4 minutes",
    support: "Email support",
    locations: ["US only"],
    rating: 4.4,
    availability: "limited"
  },
  {
    id: "paperspace",
    name: "Paperspace",
    logo: "🔴",
    color: "#EF4444",
    website: "https://paperspace.com/",
    pricing: { hourly: 2.30, monthly: 1656, spot: 1.15 },
    features: ["Jupyter integration", "Team collaboration", "Gradient platform"],
    pros: ["Easy to use", "Good UI", "Team features"],
    cons: ["Limited GPUs", "Higher pricing", "Resource limits"],
    setupTime: "1-2 minutes",
    support: "Email + Chat",
    locations: ["US", "Europe"],
    rating: 4.0,
    availability: "available"
  },
  {
    id: "coreweave",
    name: "CoreWeave",
    logo: "⚫",
    color: "#1F2937",
    website: "https://coreweave.com/",
    pricing: { hourly: 2.45, monthly: 1764, spot: 1.22 },
    features: ["Kubernetes native", "Enterprise grade", "Custom solutions"],
    pros: ["Enterprise ready", "Kubernetes", "Scalable"],
    cons: ["Complex setup", "Enterprise focused", "Higher minimum"],
    setupTime: "10-20 minutes",
    support: "Enterprise support",
    locations: ["US", "Europe"],
    rating: 4.3,
    availability: "available"
  }
];

const generatePriceHistory = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => {
    const data = { month };
    providers.forEach(provider => {
      // Add some realistic price variation
      const basePrice = provider.pricing.hourly;
      const variation = (Math.random() - 0.5) * 0.4; // ±20% variation
      data[provider.id] = +(basePrice * (1 + variation)).toFixed(2);
    });
    return data;
  });
};

const GpuComparison = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<string[]>([]);
  
  const gpu = gpuData[id as keyof typeof gpuData];
  const priceHistory = useMemo(() => generatePriceHistory(), []);
  
  if (!gpu) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">GPU not found</h1>
          <Link to="/marketplace">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const sortedProviders = [...providers].sort((a, b) => a.pricing.hourly - b.pricing.hourly);
  const chartConfig = providers.reduce((acc, provider) => {
    acc[provider.id] = { label: provider.name, color: provider.color };
    return acc;
  }, {} as any);

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const togglePriceAlert = (providerId: string) => {
    setPriceAlerts(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-50 to-green-50 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/marketplace">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={gpu.image} alt={gpu.brand} className="w-12 h-12 object-contain" />
                <div>
                  <h1 className="text-4xl font-bold text-foreground">{gpu.name}</h1>
                  <p className="text-lg text-muted-foreground">{gpu.vram} {gpu.memoryType} • {gpu.cudaCores.toLocaleString()} CUDA Cores</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {gpu.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Performance Score:</span>
                  <div className="font-semibold text-lg">{gpu.performanceScore}/100</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Power Consumption:</span>
                  <div className="font-semibold text-lg">{gpu.power}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4">Price Range Across Providers</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lowest:</span>
                  <span className="font-bold text-green-600">${Math.min(...providers.map(p => p.pricing.hourly)).toFixed(2)}/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Highest:</span>
                  <span className="font-bold text-red-600">${Math.max(...providers.map(p => p.pricing.hourly)).toFixed(2)}/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average:</span>
                  <span className="font-bold">${(providers.reduce((sum, p) => sum + p.pricing.hourly, 0) / providers.length).toFixed(2)}/hour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Comparison</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Price History Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Price History (Last 12 Months)</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Alert
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistory}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      {providers.map(provider => (
                        <Line
                          key={provider.id}
                          type="monotone"
                          dataKey={provider.id}
                          stroke={provider.color}
                          strokeWidth={2}
                          dot={{ fill: provider.color, r: 4 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Best Value</span>
                  </div>
                  <div className="font-bold text-lg">{sortedProviders[0].name}</div>
                  <div className="text-sm">${sortedProviders[0].pricing.hourly}/hour</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">Performance</span>
                  </div>
                  <div className="font-bold text-lg">{gpu.performanceScore}/100</div>
                  <div className="text-sm">Benchmark Score</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Avg Setup</span>
                  </div>
                  <div className="font-bold text-lg">3-8 min</div>
                  <div className="text-sm">Across providers</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-muted-foreground">Availability</span>
                  </div>
                  <div className="font-bold text-lg">87%</div>
                  <div className="text-sm">Providers available</div>
                </CardContent>
              </Card>
            </div>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {gpu.useCases.map(useCase => (
                    <div key={useCase} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            {/* Provider Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Provider Pricing Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Provider</th>
                        <th className="text-left p-3">Hourly</th>
                        <th className="text-left p-3">Monthly</th>
                        <th className="text-left p-3">Spot/Preemptible</th>
                        <th className="text-left p-3">Setup Time</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedProviders.map((provider, index) => (
                        <tr key={provider.id} className="border-b hover:bg-muted/20">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{provider.logo}</span>
                              <div>
                                <div className="font-medium">{provider.name}</div>
                                {index === 0 && <Badge variant="secondary" className="text-xs">Best Value</Badge>}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 font-bold">${provider.pricing.hourly}</td>
                          <td className="p-3">${provider.pricing.monthly}</td>
                          <td className="p-3 text-green-600">${provider.pricing.spot}</td>
                          <td className="p-3">{provider.setupTime}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toggleFavorite(provider.id)}
                              >
                                <Heart className={`w-3 h-3 ${favorites.includes(provider.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => togglePriceAlert(provider.id)}
                              >
                                <Bell className={`w-3 h-3 ${priceAlerts.includes(provider.id) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Cost Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Usage Hours per Day</label>
                    <input 
                      type="number" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="8" 
                      defaultValue={8}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Days per Month</label>
                    <input 
                      type="number" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="30" 
                      defaultValue={30}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Costs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map(provider => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{provider.logo}</span>
                        <div>
                          <CardTitle className="text-lg">{provider.name}</CardTitle>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(provider.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="text-sm text-muted-foreground ml-1">{provider.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={
                        provider.availability === 'available' ? "bg-green-100 text-green-800" :
                        provider.availability === 'limited' ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {provider.availability}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-center border-b pb-4">
                      <div className="text-2xl font-bold">${provider.pricing.hourly}/hour</div>
                      <div className="text-sm text-muted-foreground">${provider.pricing.monthly}/month</div>
                      <div className="text-sm text-green-600">Spot: ${provider.pricing.spot}/hour</div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Features</h4>
                      <div className="space-y-1">
                        {provider.features.map(feature => (
                          <div key={feature} className="text-sm flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Setup:</span>
                        <div>{provider.setupTime}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Support:</span>
                        <div>{provider.support}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Locations:</div>
                      <div className="flex flex-wrap gap-1">
                        {provider.locations.map(location => (
                          <Badge key={location} variant="outline" className="text-xs">
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        disabled={provider.availability === 'unavailable'}
                        onClick={() => window.open(provider.website, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Rent Now on {provider.name}
                      </Button>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => toggleFavorite(provider.id)}
                        >
                          <Heart className={`w-3 h-3 ${favorites.includes(provider.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => togglePriceAlert(provider.id)}
                        >
                          <Bell className={`w-3 h-3 ${priceAlerts.includes(provider.id) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(gpu.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Benchmarks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(gpu.benchmarks).map(([category, score]) => (
                    <div key={category}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize">{category.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-medium">{score}/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GpuComparison;
