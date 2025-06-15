
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
    <div className="space-y-6">
      {/* Title Section */}
      <div className="space-y-2 mt-8">
        <h1 className="tracking-tight text-left font-thin text-3xl py-[17px]">
          Marketplace
        </h1>
        <p className="text-muted-foreground my-[8px] py-0">
          {selectedPurpose ? `${matchCount} GPUs optimized for ${selectedPurpose.toLowerCase()}` : "Discover and rent high-performance GPUs from trusted providers"}
        </p>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
