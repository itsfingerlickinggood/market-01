
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Heart, AlertCircle } from "lucide-react";
import { ProviderInfo } from "@/data/providerCatalog";
import HardwareSpecsSection from "@/components/provider-details/HardwareSpecsSection";
import SoftwareEnvironmentSection from "@/components/provider-details/SoftwareEnvironmentSection";
import ProviderNetworkSection from "@/components/provider-details/ProviderNetworkSection";

interface ProviderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: ProviderInfo | null;
  gpuModel?: string;
}

const ProviderDetailsModal = ({ 
  isOpen, 
  onClose, 
  provider, 
  gpuModel 
}: ProviderDetailsModalProps) => {
  if (!provider) return null;

  const currentPrice = gpuModel ? provider.pricing[gpuModel.toLowerCase() as keyof typeof provider.pricing] : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${provider.color}20` }}
              >
                {provider.logo}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">{provider.name}</DialogTitle>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{provider.hostRating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({provider.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>
                  <Badge 
                    className={
                      provider.availability === 'available' ? 'bg-green-100 text-green-800' :
                      provider.availability === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {provider.availability}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {provider.type.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
            
            {currentPrice && (
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  ${currentPrice.toFixed(2)}/hr
                </div>
                <div className="text-sm text-muted-foreground">
                  for {gpuModel?.toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Three main sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hardware Specs Section */}
            <div className="lg:col-span-1">
              <HardwareSpecsSection 
                specs={provider.specs} 
                gpuModel={gpuModel}
              />
            </div>

            {/* Software & Environment Section */}
            <div className="lg:col-span-1">
              <SoftwareEnvironmentSection 
                software={provider.software}
              />
            </div>

            {/* Provider & Network Section */}
            <div className="lg:col-span-1">
              <ProviderNetworkSection 
                provider={provider}
              />
            </div>
          </div>

          {/* Features & Pros/Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Strengths</h4>
              <ul className="space-y-2">
                {provider.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-amber-600">Considerations</h4>
              <ul className="space-y-2">
                {provider.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save to Favorites
              </Button>
              <Button variant="outline" size="sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                Set Price Alert
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => window.open(provider.website, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Provider
              </Button>
              <Button 
                disabled={provider.availability === 'unavailable'}
                style={{ backgroundColor: provider.color }}
                className="text-white hover:opacity-90"
              >
                {provider.availability === 'unavailable' ? 'Unavailable' : 'Rent Now'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProviderDetailsModal;
