
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, DollarSign, Server } from "lucide-react";

interface GPU {
  id: string;
  model: string;
  memory: string;
  price: number;
  performance: number;
  availability: "available" | "limited" | "unavailable";
  provider: string;
  location: string;
  specs: {
    cores: number;
    clockSpeed: string;
    bandwidth: string;
  };
}

interface GPUGridProps {
  searchTerm: string;
  sortBy: string;
}

const GPUGrid = ({ searchTerm, sortBy }: GPUGridProps) => {
  const [gpus] = useState<GPU[]>([
    {
      id: "1",
      model: "NVIDIA RTX 4090",
      memory: "24GB GDDR6X",
      price: 2.5,
      performance: 95,
      availability: "available",
      provider: "CloudGPU Pro",
      location: "US West",
      specs: {
        cores: 16384,
        clockSpeed: "2.5 GHz",
        bandwidth: "1008 GB/s"
      }
    },
    {
      id: "2",
      model: "NVIDIA RTX 4080",
      memory: "16GB GDDR6X",
      price: 1.8,
      performance: 87,
      availability: "available",
      provider: "GPU Rental Hub",
      location: "US East",
      specs: {
        cores: 9728,
        clockSpeed: "2.2 GHz",
        bandwidth: "717 GB/s"
      }
    },
    {
      id: "3",
      model: "NVIDIA RTX 3090",
      memory: "24GB GDDR6X",
      price: 1.2,
      performance: 78,
      availability: "limited",
      provider: "FastGPU",
      location: "EU Central",
      specs: {
        cores: 10496,
        clockSpeed: "1.7 GHz",
        bandwidth: "936 GB/s"
      }
    },
    {
      id: "4",
      model: "NVIDIA RTX 3080",
      memory: "10GB GDDR6X",
      price: 0.9,
      performance: 72,
      availability: "available",
      provider: "GPU Cloud",
      location: "Asia Pacific",
      specs: {
        cores: 8704,
        clockSpeed: "1.7 GHz",
        bandwidth: "760 GB/s"
      }
    },
    {
      id: "5",
      model: "NVIDIA RTX 3070",
      memory: "8GB GDDR6",
      price: 0.7,
      performance: 65,
      availability: "available",
      provider: "RentGPU",
      location: "US Central",
      specs: {
        cores: 5888,
        clockSpeed: "1.5 GHz",
        bandwidth: "448 GB/s"
      }
    },
    {
      id: "6",
      model: "NVIDIA RTX 3060",
      memory: "12GB GDDR6",
      price: 0.5,
      performance: 58,
      availability: "unavailable",
      provider: "GPU Express",
      location: "EU West",
      specs: {
        cores: 3584,
        clockSpeed: "1.3 GHz",
        bandwidth: "360 GB/s"
      }
    }
  ]);

  const filteredGPUs = gpus
    .filter(gpu => 
      gpu.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gpu.provider.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "performance":
          return b.performance - a.performance;
        case "availability":
          const order = { "available": 0, "limited": 1, "unavailable": 2 };
          return order[a.availability] - order[b.availability];
        default:
          return 0;
      }
    });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800";
      case "limited":
        return "bg-yellow-100 text-yellow-800";
      case "unavailable":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredGPUs.map((gpu) => (
        <Card key={gpu.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{gpu.model}</CardTitle>
                <CardDescription>{gpu.memory}</CardDescription>
              </div>
              <Badge className={getAvailabilityColor(gpu.availability)}>
                {gpu.availability}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-semibold">${gpu.price}/hour</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{gpu.performance}% performance</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Provider:</span>
                <span>{gpu.provider}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Location:</span>
                <span>{gpu.location}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cores:</span>
                <span>{gpu.specs.cores.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button 
                className="w-full" 
                disabled={gpu.availability === "unavailable"}
              >
                {gpu.availability === "unavailable" ? "Unavailable" : "Rent Now"}
              </Button>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GPUGrid;
