
import UltraMinimalGpuCard from "@/components/UltraMinimalGpuCard";

interface MarketplaceGridProps {
  offers: any[];
  viewMode: "grid" | "list";
  isLoading: boolean;
  hoveredGpu: any;
  onHover: (offer: any, e: React.MouseEvent) => void;
  onLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  selectedPurpose: string | null;
}

const MarketplaceGrid = ({
  offers,
  viewMode,
  isLoading,
  hoveredGpu,
  onHover,
  onLeave,
  onMouseMove,
  selectedPurpose
}: MarketplaceGridProps) => {
  if (isLoading) {
    return (
      <div className={viewMode === "grid" 
        ? "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6" 
        : "space-y-2"
      }>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted/60 rounded-lg p-4 space-y-3 transition-colors duration-300">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-5 bg-muted rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={viewMode === "grid" 
      ? "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6" 
      : "space-y-1"
    }>
      {offers.map((offer) => (
        <UltraMinimalGpuCard
          key={offer.id}
          offer={offer}
          onHover={onHover}
          onLeave={onLeave}
          onMouseMove={onMouseMove}
          showPurposeMatch={selectedPurpose && offer.isPurposeMatch}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default MarketplaceGrid;
