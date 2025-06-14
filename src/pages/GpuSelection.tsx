
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, DollarSign, Zap, Cpu, HardDrive, Activity, Filter, CheckCircle } from "lucide-react";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";

const GpuSelection = () => {
  const { id } = useParams<{ id: string }>();
  const { data: offers } = useVastAiOffers();
  const [gpu, setGpu] = useState<any>(null);
  
  // Selection criteria state
  const [criteria, setCriteria] = useState({
    useCase: '',
    budget: [0, 10],
    performance: '',
    memory: [8, 80],
    location: '',
    reliability: [70, 100]
  });

  useEffect(() => {
    if (offers && id) {
      const foundGpu = offers.find(offer => offer.id === parseInt(id));
      setGpu(foundGpu);
    }
  }, [offers, id]);

  if (!gpu) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-gray-600">GPU not found</p>
            <Link to="/marketplace">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const getStatusBadge = (offer: any) => {
    if (!offer.rentable) return { text: "unavailable", color: "bg-red-100 text-red-800" };
    if (offer.rented) return { text: "rented", color: "bg-yellow-100 text-yellow-800" };
    return { text: "available", color: "bg-green-100 text-green-800" };
  };

  const getModelTypeBadge = (modelType: string) => {
    const colors = {
      'Consumer': 'bg-blue-100 text-blue-800',
      'Professional': 'bg-purple-100 text-purple-800',
      'Datacenter': 'bg-orange-100 text-orange-800'
    };
    return colors[modelType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const status = getStatusBadge(gpu);

  const useCases = [
    { value: 'ai-training', label: 'AI Training', description: 'Large model training, high VRAM needed' },
    { value: 'ai-inference', label: 'AI Inference', description: 'Real-time predictions, low latency' },
    { value: 'gaming', label: 'Cloud Gaming', description: 'High FPS gaming, RT cores beneficial' },
    { value: 'rendering', label: '3D Rendering', description: 'Video/image rendering, CUDA cores' },
    { value: 'scientific', label: 'Scientific Computing', description: 'HPC workloads, FP64 performance' },
    { value: 'development', label: 'Development & Testing', description: 'General purpose, cost-effective' }
  ];

  const performanceTypes = [
    { value: 'entry', label: 'Entry Level', description: 'Basic tasks, budget-friendly' },
    { value: 'mid', label: 'Mid Range', description: 'Balanced performance and cost' },
    { value: 'high', label: 'High Performance', description: 'Demanding workloads' },
    { value: 'enterprise', label: 'Enterprise', description: 'Mission-critical applications' }
  ];

  const handleCriteriaMatch = () => {
    // This would typically trigger a search or filter based on criteria
    console.log('Searching with criteria:', criteria);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/marketplace">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">GPU Selection Criteria</h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Selection Criteria */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  Configure Your Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Use Case Selection */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Primary Use Case</label>
                  <Select value={criteria.useCase} onValueChange={(value) => setCriteria({...criteria, useCase: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary use case" />
                    </SelectTrigger>
                    <SelectContent>
                      {useCases.map((useCase) => (
                        <SelectItem key={useCase.value} value={useCase.value}>
                          <div>
                            <div className="font-medium">{useCase.label}</div>
                            <div className="text-xs text-muted-foreground">{useCase.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Budget Range: ${criteria.budget[0]} - ${criteria.budget[1]} per hour
                  </label>
                  <Slider
                    value={criteria.budget}
                    onValueChange={(value) => setCriteria({...criteria, budget: value})}
                    max={50}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$0/hr</span>
                    <span>$50/hr</span>
                  </div>
                </div>

                {/* Performance Level */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Performance Level</label>
                  <Select value={criteria.performance} onValueChange={(value) => setCriteria({...criteria, performance: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select performance level" />
                    </SelectTrigger>
                    <SelectContent>
                      {performanceTypes.map((perf) => (
                        <SelectItem key={perf.value} value={perf.value}>
                          <div>
                            <div className="font-medium">{perf.label}</div>
                            <div className="text-xs text-muted-foreground">{perf.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Memory Requirements */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    VRAM Requirements: {criteria.memory[0]}GB - {criteria.memory[1]}GB
                  </label>
                  <Slider
                    value={criteria.memory}
                    onValueChange={(value) => setCriteria({...criteria, memory: value})}
                    max={80}
                    min={4}
                    step={4}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>4GB</span>
                    <span>80GB</span>
                  </div>
                </div>

                {/* Geographic Location */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Preferred Location</label>
                  <Select value={criteria.location} onValueChange={(value) => setCriteria({...criteria, location: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-east">US East Coast</SelectItem>
                      <SelectItem value="us-west">US West Coast</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="asia">Asia Pacific</SelectItem>
                      <SelectItem value="any">Any Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reliability Requirements */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Minimum Reliability: {criteria.reliability[0]}% - {criteria.reliability[1]}%
                  </label>
                  <Slider
                    value={criteria.reliability}
                    onValueChange={(value) => setCriteria({...criteria, reliability: value})}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <Button onClick={handleCriteriaMatch} className="w-full" size="lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Find Matching GPUs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Selected GPU Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{gpu.gpu_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Currently Selected</p>
                  </div>
                  <Badge className={status.color}>
                    {status.text}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium">${gpu.dph_total?.toFixed(3)}/hr</div>
                      <div className="text-xs text-muted-foreground">Current Price</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium">{Math.round((gpu.reliability2 || 0) * 100)}%</div>
                      <div className="text-xs text-muted-foreground">Reliability</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-purple-600" />
                    <div>
                      <div className="font-medium">{gpu.cpu_cores}</div>
                      <div className="text-xs text-muted-foreground">CPU Cores</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-orange-600" />
                    <div>
                      <div className="font-medium">{gpu.gpu_ram}GB</div>
                      <div className="text-xs text-muted-foreground">GPU RAM</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Host:</span>
                    <span className="font-medium">{gpu.hostname || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{gpu.datacenter || gpu.country || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span className="font-medium">{gpu.cpu_ram}GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span className="font-medium">{gpu.disk_space}GB</span>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button 
                    className="w-full" 
                    disabled={!gpu.rentable || gpu.rented}
                  >
                    {!gpu.rentable ? "Unavailable" : gpu.rented ? "Rented" : "Rent This GPU"}
                  </Button>
                  <Link to={`/gpu/${gpu.id}`}>
                    <Button variant="outline" className="w-full">
                      View Full Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selection Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>AI Training: Choose 24GB+ VRAM for large models</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Gaming: RTX cards offer ray tracing support</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Budget: Consider spot instances for cost savings</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Location: Closer regions reduce latency</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GpuSelection;
