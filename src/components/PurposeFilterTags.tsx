
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  Gamepad2, 
  Video, 
  TrendingUp, 
  Cpu, 
  Code,
  Camera,
  Database,
  Zap,
  Monitor
} from "lucide-react";

interface PurposeTag {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  requirements: {
    minVram: number;
    preferredGpu: string[];
    workloadType: string;
  };
}

const purposeTags: PurposeTag[] = [
  {
    id: 'ai-training',
    label: 'AI Training',
    icon: Brain,
    color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    description: 'Large model training, deep learning',
    requirements: {
      minVram: 24,
      preferredGpu: ['H100', 'A100', 'V100'],
      workloadType: 'ai-training'
    }
  },
  {
    id: 'ai-inference',
    label: 'AI Inference',
    icon: Zap,
    color: 'bg-green-100 text-green-800 hover:bg-green-200',
    description: 'Real-time inference, serving models',
    requirements: {
      minVram: 8,
      preferredGpu: ['RTX 4090', 'RTX 3090', 'A40'],
      workloadType: 'ai-inference'
    }
  },
  {
    id: 'gaming',
    label: 'Cloud Gaming',
    icon: Gamepad2,
    color: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    description: 'Game streaming, remote gaming',
    requirements: {
      minVram: 8,
      preferredGpu: ['RTX 4080', 'RTX 3080', 'RTX 4070'],
      workloadType: 'gaming'
    }
  },
  {
    id: 'rendering',
    label: 'Video Rendering',
    icon: Video,
    color: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    description: '3D rendering, video production',
    requirements: {
      minVram: 12,
      preferredGpu: ['RTX 4090', 'RTX 3090', 'A6000'],
      workloadType: 'creative'
    }
  },
  {
    id: 'mining',
    label: 'Crypto Mining',
    icon: TrendingUp,
    color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    description: 'Cryptocurrency mining operations',
    requirements: {
      minVram: 6,
      preferredGpu: ['RTX 3080', 'RTX 3070', 'RX 6800'],
      workloadType: 'mining'
    }
  },
  {
    id: 'development',
    label: 'Development',
    icon: Code,
    color: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    description: 'CUDA development, testing',
    requirements: {
      minVram: 4,
      preferredGpu: ['RTX 4060', 'RTX 3060', 'GTX 1660'],
      workloadType: 'general'
    }
  },
  {
    id: 'streaming',
    label: 'Content Creation',
    icon: Camera,
    color: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
    description: 'Live streaming, content creation',
    requirements: {
      minVram: 6,
      preferredGpu: ['RTX 4070', 'RTX 3070', 'RTX 4060'],
      workloadType: 'creative'
    }
  },
  {
    id: 'research',
    label: 'Research',
    icon: Database,
    color: 'bg-teal-100 text-teal-800 hover:bg-teal-200',
    description: 'Scientific computing, research',
    requirements: {
      minVram: 16,
      preferredGpu: ['A100', 'V100', 'RTX 3090'],
      workloadType: 'hpc'
    }
  }
];

interface PurposeFilterTagsProps {
  selectedPurpose: string | null;
  onPurposeChange: (purpose: string | null) => void;
}

const PurposeFilterTags = ({ selectedPurpose, onPurposeChange }: PurposeFilterTagsProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            What's your purpose?
          </h3>
          <p className="text-sm text-muted-foreground">
            Select your use case to get personalized GPU recommendations
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {purposeTags.map((tag) => {
            const Icon = tag.icon;
            const isSelected = selectedPurpose === tag.id;
            
            return (
              <Badge
                key={tag.id}
                className={`${isSelected ? 'bg-primary text-primary-foreground' : tag.color} cursor-pointer transition-all px-4 py-2 text-sm font-medium border-2 ${isSelected ? 'border-primary' : 'border-transparent hover:border-primary/30'}`}
                onClick={() => onPurposeChange(isSelected ? null : tag.id)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tag.label}
              </Badge>
            );
          })}
        </div>

        {selectedPurpose && (
          <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
            {(() => {
              const selected = purposeTags.find(tag => tag.id === selectedPurpose);
              return selected ? (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    {selected.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>Min VRAM: {selected.requirements.minVram}GB</span>
                    <span>Recommended: {selected.requirements.preferredGpu.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}

        {selectedPurpose && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onPurposeChange(null)}
            className="mt-3"
          >
            Clear Filter
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PurposeFilterTags;
export { purposeTags };
export type { PurposeTag };
