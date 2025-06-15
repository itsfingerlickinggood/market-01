
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import PurposeSelector, { Purpose, purposes } from "./PurposeSelector";
import SmartRecommendationEngine, { SmartRecommendation } from "./SmartRecommendationEngine";
import { useVastAiOffers } from "@/hooks/useVastAiOffers";

const PurposeDrivenMarketplace = () => {
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose | null>(null);
  const { data: offers } = useVastAiOffers();

  // Generate smart recommendations based on purpose and offers
  const smartRecommendations = useMemo((): SmartRecommendation[] => {
    if (!selectedPurpose || !offers) return [];

    return offers.slice(0, 8).map((offer, index) => {
      const baseScore = 60 + Math.random() * 30;
      const performanceScore = Math.min(100, baseScore + (offer.reliability2 || 0.8) * 20);
      const valueScore = Math.max(20, 100 - (offer.dph_total || 1) * 15);
      const reliabilityScore = (offer.reliability2 || offer.reliability || 0.8) * 100;
      const specializationScore = Math.random() * 40 + 60;
      
      const badges = [];
      if (index < 3) badges.push('specialist');
      if (reliabilityScore > 90) badges.push('trusted');
      if (index % 3 === 0) badges.push('fast-setup');
      if (valueScore > 80) badges.push('best-value');

      const reasons = [
        `Optimized for ${selectedPurpose.title.toLowerCase()} workloads`,
        `${Math.round(reliabilityScore)}% uptime guarantee`,
        `Specialized ${offer.gpu_name} configuration`,
        'Pre-configured environment available'
      ];

      const pricingTier = offer.dph_total < 1 ? 'budget' : 
                         offer.dph_total < 3 ? 'value' : 'premium';

      return {
        id: offer.id.toString(),
        gpu_name: offer.gpu_name,
        provider: offer.datacenter?.split('(')[0] || 'Provider',
        dph_total: offer.dph_total || 1,
        reliability: reliabilityScore,
        specialization_score: specializationScore,
        setup_time: index % 2 === 0 ? '< 5 min' : '< 2 min',
        support_quality: Math.random() * 20 + 80,
        trust_score: reliabilityScore,
        scores: {
          performance: Math.round(performanceScore),
          value: Math.round(valueScore),
          reliability: Math.round(reliabilityScore),
          specialization: Math.round(specializationScore),
          overall: Math.round((performanceScore + valueScore + reliabilityScore + specializationScore) / 4)
        },
        badges,
        reasons: reasons.slice(0, Math.floor(Math.random() * 2) + 2),
        pricing_tier: pricingTier as 'budget' | 'value' | 'premium'
      };
    }).sort((a, b) => b.scores.overall - a.scores.overall);
  }, [selectedPurpose, offers]);

  const handlePurposeSelect = (purpose: Purpose) => {
    setSelectedPurpose(purpose);
  };

  const handleBack = () => {
    setSelectedPurpose(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {selectedPurpose ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Purposes
              </Button>
              <div className="flex-1" />
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Refine Preferences
              </Button>
            </div>
            
            <SmartRecommendationEngine 
              purpose={selectedPurpose}
              recommendations={smartRecommendations}
            />
          </div>
        ) : (
          <PurposeSelector 
            selectedPurpose={null}
            onPurposeSelect={handlePurposeSelect}
          />
        )}
      </div>
    </div>
  );
};

export default PurposeDrivenMarketplace;
