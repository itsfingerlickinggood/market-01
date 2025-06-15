
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Brain, 
  Palette, 
  Code, 
  Database, 
  Terminal,
  Play,
  Clock,
  Star
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'ai' | 'creative' | 'development' | 'research';
  setupTime: string;
  popularity: number;
  tags: string[];
  requirements: {
    minVram: number;
    suggestedGpu: string[];
  };
}

const templates: Template[] = [
  {
    id: 'jupyter-ai',
    name: 'Jupyter + PyTorch/TensorFlow',
    description: 'Pre-configured Jupyter notebook with popular AI libraries',
    icon: Brain,
    category: 'ai',
    setupTime: '2 minutes',
    popularity: 95,
    tags: ['Python', 'PyTorch', 'TensorFlow', 'CUDA'],
    requirements: {
      minVram: 8,
      suggestedGpu: ['RTX 4090', 'A100']
    }
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion WebUI',
    description: 'Automatic1111 WebUI with popular models pre-installed',
    icon: Palette,
    category: 'ai',
    setupTime: '3 minutes',
    popularity: 88,
    tags: ['Stable Diffusion', 'WebUI', 'SDXL'],
    requirements: {
      minVram: 12,
      suggestedGpu: ['RTX 4090', 'RTX 4080']
    }
  },
  {
    id: 'blender-render',
    name: 'Blender Render Farm',
    description: 'Blender with Cycles and OptiX ready for professional rendering',
    icon: Palette,
    category: 'creative',
    setupTime: '90 seconds',
    popularity: 76,
    tags: ['Blender', 'Cycles', 'OptiX', 'Rendering'],
    requirements: {
      minVram: 8,
      suggestedGpu: ['RTX 4090', 'RTX 4070']
    }
  },
  {
    id: 'vscode-remote',
    name: 'VS Code Remote Development',
    description: 'Full development environment with GPU access',
    icon: Code,
    category: 'development',
    setupTime: '2 minutes',
    popularity: 82,
    tags: ['VS Code', 'Development', 'CUDA'],
    requirements: {
      minVram: 4,
      suggestedGpu: ['RTX 4070', 'RTX 3080']
    }
  },
  {
    id: 'llm-inference',
    name: 'LLM Inference Server',
    description: 'Optimized environment for running large language models',
    icon: Terminal,
    category: 'ai',
    setupTime: '4 minutes',
    popularity: 91,
    tags: ['LLM', 'vLLM', 'Text Generation', 'API'],
    requirements: {
      minVram: 24,
      suggestedGpu: ['A100', 'H100']
    }
  },
  {
    id: 'data-science',
    name: 'Data Science Stack',
    description: 'Complete data science environment with GPU acceleration',
    icon: Database,
    category: 'research',
    setupTime: '3 minutes',
    popularity: 73,
    tags: ['Pandas', 'CuDF', 'Rapids', 'Jupyter'],
    requirements: {
      minVram: 16,
      suggestedGpu: ['RTX 4090', 'A100']
    }
  }
];

interface DeploymentTemplatesProps {
  gpuVram: number;
  gpuName: string;
  onDeploy: (template: Template) => void;
}

const DeploymentTemplates = ({ gpuVram, gpuName, onDeploy }: DeploymentTemplatesProps) => {
  const getIconColor = (category: string) => {
    switch (category) {
      case 'ai': return 'text-blue-600';
      case 'creative': return 'text-purple-600';
      case 'development': return 'text-green-600';
      case 'research': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      ai: 'bg-blue-100 text-blue-800',
      creative: 'bg-purple-100 text-purple-800',
      development: 'bg-green-100 text-green-800',
      research: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const isCompatible = (template: Template) => {
    return gpuVram >= template.requirements.minVram;
  };

  const isRecommended = (template: Template) => {
    return template.requirements.suggestedGpu.some(gpu => 
      gpuName.toLowerCase().includes(gpu.toLowerCase())
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          One-Click Templates
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Deploy pre-configured environments in minutes, not hours
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => {
            const Icon = template.icon;
            const compatible = isCompatible(template);
            const recommended = isRecommended(template);
            
            return (
              <div
                key={template.id}
                className={`p-4 border rounded-lg transition-all ${
                  compatible 
                    ? 'border-border hover:border-primary/50 bg-background' 
                    : 'border-red-200 bg-red-50/30'
                } ${recommended ? 'ring-2 ring-green-200' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${getIconColor(template.category)}`} />
                    <Badge className={getCategoryBadge(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs">{template.popularity}%</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="font-semibold text-sm">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{template.setupTime}</span>
                    {recommended && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                        Recommended
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {!compatible && (
                    <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                      Requires {template.requirements.minVram}GB+ VRAM
                    </div>
                  )}
                  
                  <Button
                    size="sm"
                    className="w-full"
                    disabled={!compatible}
                    onClick={() => onDeploy(template)}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Deploy Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium mb-2">🚀 Deploy in Seconds</div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• All templates include CUDA drivers and optimization</li>
            <li>• SSH access enabled with your public key</li>
            <li>• Pre-configured with best practices for your workload</li>
            <li>• Automatic scaling and monitoring included</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentTemplates;
