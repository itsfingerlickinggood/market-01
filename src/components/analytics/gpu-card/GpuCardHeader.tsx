
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, BarChart3 } from "lucide-react";
import { getTierColor } from "@/utils/tierColors";

interface GpuCardHeaderProps {
  company: string;
  companyLogo: string;
  model: string;
  tier: string;
  provider: string;
  providerColor: string;
  providerIcon: string;
  availability: string;
}

const GpuCardHeader = ({
  company,
  companyLogo,
  model,
  tier,
  provider,
  providerColor,
  providerIcon,
  availability
}: GpuCardHeaderProps) => {
  return (
    <>
      {/* Company & Provider Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{companyLogo}</div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-foreground">{company}</h3>
              <Badge className={`text-xs px-2 py-0.5 border ${getTierColor(tier)}`}>
                {tier}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{model}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
            <Heart className="h-4 w-4 text-gray-400 hover:text-pink-500 transition-colors" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
            <BarChart3 className="h-4 w-4 text-gray-400 hover:text-blue-500 transition-colors" />
          </Button>
        </div>
      </div>

      {/* Provider Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-lg">{providerIcon}</div>
          <Badge 
            variant="outline" 
            className="font-semibold px-3 py-1 border-2"
            style={{ 
              borderColor: providerColor + '40', 
              backgroundColor: providerColor + '10',
              color: providerColor 
            }}
          >
            {provider}
          </Badge>
        </div>
        
        <div className={`w-3 h-3 rounded-full ${
          availability === 'available' ? "bg-green-500 animate-pulse shadow-lg shadow-green-500/50" : "bg-orange-400 shadow-lg shadow-orange-400/50"
        }`} />
      </div>
    </>
  );
};

export default GpuCardHeader;
