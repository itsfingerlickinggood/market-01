
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid2X2, List, Sparkles, Info } from "lucide-react";

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
    <div className="space-y-6">
      {/* Title Section */}
      <div className="space-y-2 mt-8">
        <div className="flex items-center">
          <h1 className="tracking-tight text-left font-thin text-3xl py-[17px]">
            Marketplace
          </h1>
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 border-amber-300 dark:border-amber-800 py-0.5 px-2 text-[10px] ml-2">
            <Info className="h-2.5 w-2.5 mr-1" />
            The data displayed is simulated for demonstration purposes
          </Badge>
        </div>
        <p className="text-muted-foreground my-[8px] py-0">
          {selectedPurpose ? `${matchCount} GPUs optimized for ${selectedPurpose.toLowerCase()}` : "Discover and rent high-performance GPUs from trusted providers"}
        </p>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
