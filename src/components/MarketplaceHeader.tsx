
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Grid3X3, List, Sparkles } from "lucide-react";

interface MarketplaceHeaderProps {
  selectedPurpose: string | null;
  matchCount: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const MarketplaceHeader = ({ 
  selectedPurpose, 
  matchCount, 
  viewMode, 
  onViewModeChange 
}: MarketplaceHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-light text-foreground tracking-tight transition-colors duration-300">
          Marketplace
        </h1>
        {selectedPurpose && matchCount > 0 && (
          <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 transition-colors duration-300">
            <Sparkles className="h-3 w-3 mr-1.5" />
            {matchCount} Perfect Matches
          </Badge>
        )}
      </div>
      
      <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 transition-colors duration-300">
        <Button
          variant={viewMode === "grid" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("grid")}
          className="h-8 px-3 text-xs transition-all duration-300"
        >
          <Grid3X3 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("list")}
          className="h-8 px-3 text-xs transition-all duration-300"
        >
          <List className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
