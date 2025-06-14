
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  TrendingUp, 
  Shield, 
  Zap, 
  DollarSign, 
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { GPUOffer, UserProfile } from '@/types/gpu-recommendation';
import { Link } from 'react-router-dom';

interface SmartRecommendationsProps {
  offers: GPUOffer[];
  userProfile: UserProfile;
}

const SmartRecommendations = ({ offers, userProfile }: SmartRecommendationsProps) => {
  // Sort offers by recommendation score
  const sortedOffers = [...offers].sort((a, b) => (b.recommendationScore || 0) - (a.recommendationScore || 0));
  const topRecommendations = sortedOffers.slice(0, 3);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProviderTypeColor = (type: string) => {
    switch (type) {
      case 'hyperscaler': return 'bg-blue-100 text-blue-800';
      case 'specialist': return 'bg-green-100 text-green-800';
      case 'decentralized': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderWorkloadInsight = () => {
    const insights = {
      'ai-training': {
        icon: AlertTriangle,
        title: 'AI Training Optimization',
        content: 'For large model training, prioritize VRAM capacity (80GB+) and NVLink connectivity. Consider reserved instances for long training runs.'
      },
      'ai-inference': {
        icon: Zap,
        title: 'Inference Optimization',
        content: 'Focus on low latency and cost efficiency. Mixed precision (FP16) can significantly reduce VRAM requirements while maintaining accuracy.'
      },
      'hpc': {
        icon: Info,
        title: 'HPC Requirements',
        content: 'FP64 performance is critical for scientific computing. AMD MI300X currently leads in double-precision performance.'
      },
      'creative': {
        icon: CheckCircle,
        title: 'Creative Workload Tips',
        content: 'RT Cores accelerate ray tracing in Blender/Unreal. For 8K video editing, ensure at least 24GB VRAM.'
      },
      'gaming': {
        icon: Zap,
        title: 'Cloud Gaming Setup',
        content: 'Latency is crucial. Choose providers with edge locations near your users. RT Cores improve visual quality.'
      },
      'general': {
        icon: Info,
        title: 'General Purpose',
        content: 'Balance cost and performance. Consider workstation GPUs for consistent performance across various tasks.'
      }
    };

    const insight = insights[userProfile.workloadType];
    const Icon = insight.icon;

    return (
      <Card className="mb-6 border-l-4 border-l-blue-500">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
              <p className="text-sm text-muted-foreground">{insight.content}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {renderWorkloadInsight()}
      
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Top Recommendations for You
        </h3>
        
        <div className="space-y-4">
          {topRecommendations.map((offer, index) => (
            <Card key={offer.id} className={`${index === 0 ? 'ring-2 ring-yellow-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {index === 0 && <Badge className="bg-yellow-500 text-white">Best Match</Badge>}
                    <Badge className={getProviderTypeColor(offer.provider.type)}>
                      {offer.provider.type}
                    </Badge>
                    <h4 className="font-semibold">{offer.gpu_name}</h4>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getScoreColor(offer.recommendationScore || 0)}`}>
                      {Math.round(offer.recommendationScore || 0)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Match Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">VRAM:</span>
                      <span className="font-medium">{offer.specs?.vramCapacity || 'N/A'}GB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Memory:</span>
                      <span className="font-medium">{offer.specs?.memoryType || 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">On-Demand:</span>
                      <span className="font-medium">${offer.pricing?.onDemand?.toFixed(3) || 'N/A'}/hr</span>
                    </div>
                    {offer.pricing?.spot && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Spot:</span>
                        <span className="font-medium text-green-600">${offer.pricing.spot.toFixed(3)}/hr</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Provider:</span>
                      <span className="font-medium">{offer.provider.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Reliability:</span>
                      <span className="font-medium">{Math.round((offer.reliability || 0) * 100)}%</span>
                    </div>
                  </div>
                </div>

                <Progress 
                  value={offer.recommendationScore || 0} 
                  className="mb-3"
                />

                {offer.matchReason && offer.matchReason.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium mb-2">Why this matches your needs:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {offer.matchReason.slice(0, 3).map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link to={`/gpu/${offer.id}`} className="flex-1">
                    <Button className="w-full" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" asChild>
                    <a href={offer.provider.name.includes('Vast') ? 'https://vast.ai' : '#'} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {topRecommendations.length === 0 && (
          <Card className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">No recommendations found</h4>
            <p className="text-sm text-muted-foreground">
              Try adjusting your requirements or check back later for new GPU availability.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SmartRecommendations;
