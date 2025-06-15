
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Shield, 
  Clock,
  Award,
  Target,
  CheckCircle
} from "lucide-react";
import { Purpose } from "./PurposeSelector";

interface RecommendationScore {
  performance: number;
  value: number;
  reliability: number;
  specialization: number;
  overall: number;
}

interface SmartRecommendation {
  id: string;
  gpu_name: string;
  provider: string;
  dph_total: number;
  reliability: number;
  specialization_score: number;
  setup_time: string;
  support_quality: number;
  trust_score: number;
  scores: RecommendationScore;
  badges: string[];
  reasons: string[];
  pricing_tier: 'budget' | 'value' | 'premium';
}

interface SmartRecommendationEngineProps {
  purpose: Purpose;
  recommendations: SmartRecommendation[];
}

const SmartRecommendationEngine = ({ purpose, recommendations }: SmartRecommendationEngineProps) => {
  const topRecommendations = recommendations.slice(0, 3);
  
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'budget': return 'bg-green-100 text-green-800';
      case 'value': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'specialist': return Award;
      case 'trusted': return Shield;
      case 'fast-setup': return Zap;
      case 'best-value': return DollarSign;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      <Card className={`bg-gradient-to-r ${purpose.color} text-white`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Smart Recommendations for {purpose.title}
          </CardTitle>
          <p className="text-white/90">
            Powered by AI analysis of {purpose.title.toLowerCase()} workloads and provider performance
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-sm opacity-90">Average Market Rate</div>
              <div className="text-xl font-bold">{purpose.avgHourlyRate}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-sm opacity-90">Specialist Providers</div>
              <div className="text-xl font-bold">{recommendations.filter(r => r.badges.includes('specialist')).length}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-sm opacity-90">Available Now</div>
              <div className="text-xl font-bold">{recommendations.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Top Recommendations</h3>
        
        {topRecommendations.map((rec, index) => (
          <Card key={rec.id} className={`${index === 0 ? 'ring-2 ring-primary shadow-lg' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-semibold">{rec.gpu_name}</h4>
                    {index === 0 && (
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Best Match
                      </Badge>
                    )}
                    <Badge className={getTierColor(rec.pricing_tier)}>
                      {rec.pricing_tier}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {rec.provider} • {rec.setup_time} setup
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {rec.badges.map((badge) => {
                      const BadgeIcon = getBadgeIcon(badge);
                      return (
                        <Badge key={badge} variant="outline" className="text-xs">
                          <BadgeIcon className="h-3 w-3 mr-1" />
                          {badge.replace('-', ' ')}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold">${rec.dph_total.toFixed(3)}</div>
                  <div className="text-sm text-muted-foreground">/hour</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{rec.scores.overall}/100</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Performance</div>
                  <Progress value={rec.scores.performance} className="h-2" />
                  <div className="text-xs mt-1">{rec.scores.performance}/100</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Value</div>
                  <Progress value={rec.scores.value} className="h-2" />
                  <div className="text-xs mt-1">{rec.scores.value}/100</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Reliability</div>
                  <Progress value={rec.scores.reliability} className="h-2" />
                  <div className="text-xs mt-1">{rec.scores.reliability}/100</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Specialization</div>
                  <Progress value={rec.scores.specialization} className="h-2" />
                  <div className="text-xs mt-1">{rec.scores.specialization}/100</div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2">Why this is perfect for {purpose.title}:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {rec.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  Rent Now
                </Button>
                <Button variant="outline">
                  Compare
                </Button>
                <Button variant="outline">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmartRecommendationEngine;
export type { SmartRecommendation, RecommendationScore };
