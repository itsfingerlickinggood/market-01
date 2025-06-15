
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Palette, 
  Gamepad2, 
  Server, 
  Video, 
  Cpu,
  ArrowRight,
  Zap
} from "lucide-react";

interface Workload {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  examples: string[];
  recommendedSpecs: string;
  userType: 'enterprise' | 'startup' | 'creative';
  color: string;
}

const workloads: Workload[] = [
  {
    id: 'ai-training',
    title: 'AI Training & Research',
    description: 'Train large language models, computer vision, and deep learning networks',
    icon: Brain,
    examples: ['LLM Training', 'Computer Vision', 'Research'],
    recommendedSpecs: 'H100, A100 80GB+',
    userType: 'enterprise',
    color: 'bg-blue-500'
  },
  {
    id: 'ai-inference',
    title: 'AI Inference & Development',
    description: 'Run inference, fine-tuning, and prototype AI applications',
    icon: Zap,
    examples: ['Model Serving', 'Fine-tuning', 'Prototyping'],
    recommendedSpecs: 'RTX 4090, A100 40GB',
    userType: 'startup',
    color: 'bg-green-500'
  },
  {
    id: '3d-rendering',
    title: '3D Rendering & Animation',
    description: 'Create stunning 3D visuals, animations, and architectural renders',
    icon: Palette,
    examples: ['Blender', 'Cinema 4D', 'Maya'],
    recommendedSpecs: 'RTX 4090, RTX 4080',
    userType: 'creative',
    color: 'bg-purple-500'
  },
  {
    id: 'video-editing',
    title: 'Video Production',
    description: 'Edit 4K/8K video, motion graphics, and post-production work',
    icon: Video,
    examples: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    recommendedSpecs: 'RTX 4090, RTX 4070',
    userType: 'creative',
    color: 'bg-orange-500'
  },
  {
    id: 'gaming',
    title: 'Cloud Gaming',
    description: 'Stream high-end games and run gaming applications',
    icon: Gamepad2,
    examples: ['AAA Gaming', 'Game Development', 'Streaming'],
    recommendedSpecs: 'RTX 4080, RTX 4070',
    userType: 'creative',
    color: 'bg-red-500'
  },
  {
    id: 'hpc-compute',
    title: 'HPC & Scientific Computing',
    description: 'Run complex simulations, scientific workloads, and parallel computing',
    icon: Server,
    examples: ['Simulations', 'Parallel Computing', 'Research'],
    recommendedSpecs: 'A100, V100, Multi-GPU',
    userType: 'enterprise',
    color: 'bg-cyan-500'
  }
];

interface WorkloadSelectorProps {
  onWorkloadSelect: (workload: Workload) => void;
  onSkip: () => void;
}

const WorkloadSelector = ({ onWorkloadSelect, onSkip }: WorkloadSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            What brings you to our marketplace?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us your primary use case and we'll customize your experience with the right GPUs, filters, and recommendations for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {workloads.map((workload) => {
            const IconComponent = workload.icon;
            return (
              <Card 
                key={workload.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50"
                onClick={() => onWorkloadSelect(workload)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${workload.color} flex items-center justify-center mb-3`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{workload.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {workload.userType}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {workload.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Common Uses:</p>
                      <div className="flex flex-wrap gap-1">
                        {workload.examples.map((example) => (
                          <Badge key={example} variant="secondary" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Recommended GPUs:</p>
                      <p className="text-sm text-muted-foreground">{workload.recommendedSpecs}</p>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 group">
                    Select This Workload
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={onSkip} className="text-muted-foreground">
            Skip for now - Browse all GPUs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkloadSelector;
export type { Workload };
