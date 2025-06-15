
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkload } from "@/contexts/WorkloadContext";
import { workloadRequirements } from "@/utils/workloadRecommendations";
import { Brain, Palette, Gamepad2, Server, Video, Zap } from "lucide-react";

const workloadIcons = {
  'ai-training': Brain,
  'ai-inference': Zap,
  '3d-rendering': Palette,
  'video-editing': Video,
  'gaming': Gamepad2,
  'hpc-compute': Server
};

const workloadColors = {
  'ai-training': 'from-blue-600 to-purple-600',
  'ai-inference': 'from-green-500 to-emerald-600',
  '3d-rendering': 'from-purple-500 to-pink-600',
  'video-editing': 'from-orange-500 to-red-600',
  'gaming': 'from-red-500 to-rose-600',
  'hpc-compute': 'from-cyan-500 to-blue-600'
};

const WorkloadMarketplaceHero = () => {
  const { selectedWorkload } = useWorkload();

  if (!selectedWorkload) {
    return (
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">GPU Marketplace</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect GPU for your computing needs
          </p>
        </div>
      </div>
    );
  }

  const Icon = workloadIcons[selectedWorkload.id as keyof typeof workloadIcons] || Brain;
  const colorClass = workloadColors[selectedWorkload.id as keyof typeof workloadColors] || 'from-primary to-primary/80';
  const requirements = workloadRequirements[selectedWorkload.id];

  return (
    <div className={`bg-gradient-to-r ${colorClass} py-16 text-white`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon className="h-6 w-6" />
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {selectedWorkload.userType}
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              GPUs for {selectedWorkload.title}
            </h1>
            
            <p className="text-xl mb-6 text-white/90">
              {selectedWorkload.description}
            </p>

            {requirements && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Minimum VRAM</h3>
                  <p className="text-2xl font-bold">{requirements.minVram}GB+</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Recommended GPUs</h3>
                  <p className="text-sm">{requirements.preferredGpu.join(', ')}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Budget Tier</h3>
                  <p className="text-lg font-semibold capitalize">{requirements.budgetTier}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedWorkload.examples.map((example) => (
                <Badge key={example} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {example}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkloadMarketplaceHero;
