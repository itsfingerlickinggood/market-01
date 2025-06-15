
import { Button } from "@/components/ui/button";

interface MarketplaceEmptyStateProps {
  onClearFilters: () => void;
}

const MarketplaceEmptyState = ({ onClearFilters }: MarketplaceEmptyStateProps) => {
  return (
    <div className="text-center py-24">
      <div className="text-6xl mb-6">🔍</div>
      <h3 className="text-xl font-light text-foreground mb-3 transition-colors duration-300">
        Nothing found
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed transition-colors duration-300">
        Try adjusting your search or filters to discover more GPU options
      </p>
      <Button 
        variant="ghost" 
        onClick={onClearFilters}
        className="text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        Clear all filters
      </Button>
    </div>
  );
};

export default MarketplaceEmptyState;
