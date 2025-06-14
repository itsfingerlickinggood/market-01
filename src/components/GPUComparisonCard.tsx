
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, MemoryStick, DollarSign, Activity } from "lucide-react";
import { GPU } from "@/types/gpu-comparison";
import { Link } from "react-router-dom";

interface GPUComparisonCardProps {
  gpu: GPU;
  onCompare?: (gpu: GPU) => void;
  isSelected?: boolean;
}

const getTagColor = (tag: string) => {
  const tagColors: Record<string, string> = {
    'gaming': 'bg-blue-100 text-blue-800',
    'ai': 'bg-green-100 text-green-800',
    'datacenter': 'bg-purple-100 text-purple-800',
    'rendering': 'bg-orange-100 text-orange-800',
    'budget': 'bg-gray-100 text-gray-800',
    'mid-range': 'bg-yellow-100 text-yellow-800',
    'high-end': 'bg-red-100 text-red-800',
    'enterprise': 'bg-indigo-100 text-indigo-800',
    'cuda': 'bg-emerald-100 text-emerald-800',
    'ray-tracing': 'bg-pink-100 text-pink-800',
    'tensor-cores': 'bg-violet-100 text-violet-800'
  };
  return tagColors[tag] || 'bg-gray-100 text-gray-800';
};

const GPUComparisonCard = ({ gpu, onCompare, isSelected }: GPUComparisonCardProps) => {
  return (
    <Card className={`hover:shadow-lg transition-all cursor-pointer border-2 ${
      isSelected ? 'border-primary' : 'border-transparent hover:border-primary/20'
    }`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{gpu.name}</h3>
            <p className="text-sm text-muted-foreground">{gpu.brand} • {gpu.model}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">${gpu.basePrice}/hr</div>
            <div className="text-xs text-muted-foreground">starting from</div>
          </div>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <MemoryStick className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{gpu.vram} {gpu.memoryType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-purple-500" />
            <span className="text-sm">Score: {gpu.performanceScore}</span>
          </div>
          {gpu.cudaCores && (
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">{gpu.cudaCores.toLocaleString()} CUDA</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm">{gpu.power}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {gpu.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} className={`text-xs ${getTagColor(tag)}`}>
              {tag}
            </Badge>
          ))}
          {gpu.tags.length > 4 && (
            <Badge className="text-xs bg-gray-100 text-gray-600">
              +{gpu.tags.length - 4} more
            </Badge>
          )}
        </div>

        {/* Detailed Specs */}
        <div className="text-xs text-muted-foreground space-y-1 mb-4">
          <div>Architecture: {gpu.specifications.architecture}</div>
          <div>Memory Bandwidth: {gpu.specifications.memoryBandwidth}</div>
          {gpu.specifications.rtCores && (
            <div>RT Cores: {gpu.specifications.rtCores}</div>
          )}
          {gpu.specifications.tensorCores && (
            <div>Tensor Cores: {gpu.specifications.tensorCores}</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/gpu/${gpu.id}/compare`} className="flex-1">
            <Button className="w-full">
              Compare Prices
            </Button>
          </Link>
          {onCompare && (
            <Button 
              variant="outline" 
              onClick={() => onCompare(gpu)}
              className={isSelected ? "bg-primary text-primary-foreground" : ""}
            >
              {isSelected ? "Selected" : "Select"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GPUComparisonCard;
