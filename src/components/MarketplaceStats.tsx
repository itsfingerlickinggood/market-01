
interface MarketplaceStatsProps {
  totalOffers: number;
  availableCount: number;
  selectedPurpose: string | null;
  matchCount: number;
  searchTerm: string;
}

const MarketplaceStats = ({
  totalOffers,
  availableCount,
  selectedPurpose,
  matchCount,
  searchTerm
}: MarketplaceStatsProps) => {
  return (
    <div className="flex items-center gap-6 text-sm text-muted-foreground transition-colors duration-300">
      <span className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
        {totalOffers} GPUs
      </span>
      <span className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
        {availableCount} Available
      </span>
      {selectedPurpose && matchCount > 0 && (
        <span className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
          {matchCount} Perfect Matches
        </span>
      )}
      {searchTerm && <span>• "{searchTerm}"</span>}
    </div>
  );
};

export default MarketplaceStats;
