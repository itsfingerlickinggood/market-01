
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Brain, 
  Camera, 
  BarChart3, 
  Gamepad2, 
  Coins,
  ArrowRight,
  Clock,
  Users
} from "lucide-react";

const UseCasesSection = () => {
  const useCases = [
    {
      id: 'ml-training',
      title: 'ML Training',
      subtitle: 'Large Model Development',
      description: 'Train large language models, computer vision networks, and deep learning architectures with enterprise-grade GPUs.',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      users: '2.1k',
      avgTime: '4.2h',
      popularGpus: ['H100', 'A100', 'V100']
    },
    {
      id: 'ai-research',
      title: 'AI Research',
      subtitle: 'Academic & Commercial',
      description: 'Accelerate research with cutting-edge hardware for experiments, model fine-tuning, and prototype development.',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      users: '890',
      avgTime: '2.8h',
      popularGpus: ['RTX 4090', 'A100', 'RTX 3090']
    },
    {
      id: 'rendering',
      title: 'Rendering',
      subtitle: '3D Graphics & Video',
      description: 'Render complex 3D scenes, animations, and video processing with professional-grade graphics cards.',
      icon: Camera,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      users: '1.5k',
      avgTime: '1.9h',
      popularGpus: ['RTX 4090', 'RTX 4080', 'RTX 3090']
    },
    {
      id: 'data-science',
      title: 'Data Science',
      subtitle: 'Big Data Processing',
      description: 'Process massive datasets, run complex analytics, and build predictive models with GPU acceleration.',
      icon: BarChart3,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
      users: '980',
      avgTime: '3.1h',
      popularGpus: ['A100', 'V100', 'RTX 4090']
    },
    {
      id: 'game-dev',
      title: 'Game Development',
      subtitle: 'Real-time Rendering',
      description: 'Develop and test games with real-time ray tracing, physics simulations, and advanced lighting effects.',
      icon: Gamepad2,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      users: '650',
      avgTime: '2.4h',
      popularGpus: ['RTX 4090', 'RTX 4080', 'RTX 3080']
    },
    {
      id: 'crypto-mining',
      title: 'Crypto Mining',
      subtitle: 'Mining Operations',
      description: 'Mine cryptocurrencies efficiently with optimized mining rigs and real-time profitability tracking.',
      icon: Coins,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      users: '1.2k',
      avgTime: '8.7h',
      popularGpus: ['RTX 3090', 'RTX 3080', 'RX 6800']
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Built for Every Use Case
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            From AI research to game development, our platform serves diverse computing needs with specialized GPU configurations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <Card 
                key={useCase.id} 
                className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${useCase.bgColor} ${useCase.borderColor} border-2 overflow-hidden relative`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${useCase.color} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {useCase.users}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {useCase.avgTime}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">
                      {useCase.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Popular GPUs:</p>
                    <div className="flex gap-1 flex-wrap">
                      {useCase.popularGpus.map((gpu) => (
                        <Badge key={gpu} variant="secondary" className="text-xs">
                          {gpu}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200"
                  >
                    Explore {useCase.title}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Not sure which configuration is right for you?
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Personalized Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UseCasesSection;
