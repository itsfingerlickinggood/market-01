
import { Button } from "@/components/ui/button";
import { Grid2X2, List, Sparkles } from "lucide-react";

interface MarketplaceHeaderProps {
  selectedPurpose: string | null;
  matchCount: number;
  viewMode: "grid" | "list" | "enhanced";
  onViewModeChange: (mode: "grid" | "list" | "enhanced") => void;
}

const MarketplaceHeader = ({
  selectedPurpose,
  matchCount,
  viewMode,
  onViewModeChange
}: MarketplaceHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div className="space-y-2 mt-8">
        <h1 className="tracking-tight text-left font-thin text-3xl py-[17px]">
          Marketplace
        </h1>
        <p className="text-muted-foreground my-[8px] py-0">
          {selectedPurpose ? `${matchCount} GPUs optimized for ${selectedPurpose.toLowerCase()}` : "Discover and rent high-performance GPUs from trusted providers"}
        </p>
      </div>

      <div className="flex items-center gap-4 lg:mb-6">
        <div className="flex items-center bg-background border border-border rounded-lg p-1 shadow-sm h-10">
          <Button 
            variant={viewMode === "enhanced" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => onViewModeChange("enhanced")} 
            className="px-3 h-8"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Enhanced
          </Button>
          <Button 
            variant={viewMode === "grid" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => onViewModeChange("grid")} 
            className="px-3 h-8"
          >
            <Grid2X2 className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => onViewModeChange("list")} 
            className="px-3 h-8"
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
