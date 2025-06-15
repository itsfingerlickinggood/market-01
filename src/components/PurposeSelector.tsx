
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Palette, 
  Gamepad2, 
  Server, 
  Video, 
  Zap,
  Target,
  TrendingUp,
  Clock,
  Shield
} from "lucide-react";

interface Purpose {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  examples: string[];
  budgetRange: string;
  performanceRequirements: string;
  specializations: string[];
  avgHourlyRate: string;
  reliability: number;
  color: string;
}

const purposes: Purpose[] = [
  {
    id: 'ai-training',
    title: 'AI Training & Research',
    description: 'Train large language models, computer vision, and deep learning networks',
    icon: Brain,
    examples: ['LLM Training', 'Computer Vision', 'Research'],
    budgetRange: '$2-8/hour',
    performanceRequirements: 'High VRAM (80GB+), Multi-GPU',
    specializations: ['H100', 'A100', 'Multi-GPU setups'],
    avgHourlyRate: '$3.50',
    reliability: 99.5,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'ai-inference',
    title: 'AI Inference & Development',
    description: 'Run inference, fine-tuning, and prototype AI applications',
    icon: Zap,
    examples: ['Model Serving', 'Fine-tuning', 'API Development'],
    budgetRange: '$0.5-3/hour',
    performanceRequirements: 'Medium VRAM (24GB+), Low Latency',
    specializations: ['RTX 4090', 'A100 40GB', 'Optimized inference'],
    avgHourlyRate: '$1.20',
    reliability: 99.2,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: '3d-rendering',
    title: '3D Rendering & Animation',
    description: 'Create stunning 3D visuals, animations, and architectural renders',
    icon: Palette,
    examples: ['Blender', 'Cinema 4D', 'Maya'],
    budgetRange: '$1-4/hour',
    performanceRequirements: 'RT Cores, High Memory Bandwidth',
    specializations: ['RTX 4090', 'RTX 4080', 'Rendering farms'],
    avgHourlyRate: '$2.10',
    reliability: 98.8,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'video-editing',
    title: 'Video Production',
    description: 'Edit 4K/8K video, motion graphics, and post-production work',
    icon: Video,
    examples: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    budgetRange: '$0.8-3/hour',
    performanceRequirements: 'NVENC, High VRAM, Fast Storage',
    specializations: ['RTX 4090', 'RTX 4070', 'Video editing optimized'],
    avgHourlyRate: '$1.80',
    reliability: 99.0,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'gaming',
    title: 'Cloud Gaming & Streaming',
    description: 'Stream high-end games and run gaming applications',
    icon: Gamepad2,
    examples: ['AAA Gaming', 'Game Development', 'Streaming'],
    budgetRange: '$0.5-2/hour',
    performanceRequirements: 'Low Latency, High FPS, RT Cores',
    specializations: ['RTX 4080', 'RTX 4070', 'Gaming optimized'],
    avgHourlyRate: '$1.40',
    reliability: 98.5,
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 'hpc-compute',
    title: 'HPC & Scientific Computing',
    description: 'Run complex simulations, scientific workloads, and parallel computing',
    icon: Server,
    examples: ['Simulations', 'Parallel Computing', 'Research'],
    budgetRange: '$2-10/hour',
    performanceRequirements: 'FP64, Multi-GPU, High Bandwidth',
    specializations: ['A100', 'V100', 'HPC clusters'],
    avgHourlyRate: '$4.20',
    reliability: 99.8,
    color: 'from-cyan-500 to-blue-600'
  }
];

interface PurposeSelectorProps {
  selectedPurpose: string | null;
  onPurposeSelect: (purpose: Purpose) => void;
  showStats?: boolean;
}

const PurposeSelector = ({ selectedPurpose, onPurposeSelect, showStats = true }: PurposeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">What's your use case?</h2>
        <p className="text-muted-foreground">
          Get personalized GPU recommendations and provider insights for your specific needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {purposes.map((purpose) => {
          const IconComponent = purpose.icon;
          const isSelected = selectedPurpose === purpose.id;
          
          return (
            <Card 
              key={purpose.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                isSelected ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => onPurposeSelect(purpose)}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${purpose.color} flex items-center justify-center mb-3`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{purpose.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {purpose.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {purpose.examples.map((example) => (
                    <Badge key={example} variant="secondary" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
                
                {showStats && (
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span>Avg Rate:</span>
                      </div>
                      <span className="font-medium">{purpose.avgHourlyRate}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-blue-500" />
                        <span>Reliability:</span>
                      </div>
                      <span className="font-medium">{purpose.reliability}%</span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <strong>Budget:</strong> {purpose.budgetRange}
                    </div>
                  </div>
                )}
                
                {isSelected && (
                  <Button className="w-full mt-3" size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    View Recommendations
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PurposeSelector;
export type { Purpose };
export { purposes };
