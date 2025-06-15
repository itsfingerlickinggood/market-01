
import { useState } from 'react';
import ExpandableGpuCard from '@/components/cards/ExpandableGpuCard';
import { Card, CardContent } from "@/components/ui/card";

interface MarketplaceEnhancedGridProps {
  offers: any[];
  isLoading: boolean;
  className?: string;
}

const MarketplaceEnhancedGrid = ({ 
  offers, 
  isLoading, 
  className = "" 
}: MarketplaceEnhancedGridProps) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-full"></div>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No GPUs found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {offers.map((offer) => (
        <ExpandableGpuCard
          key={offer.id}
          gpu={offer}
          onExpansionChange={(state) => {
            if (state.isExpanded) {
              setExpandedCard(offer.id);
            } else if (expandedCard === offer.id) {
              setExpandedCard(null);
            }
          }}
          className={expandedCard === offer.id ? 'col-span-2 row-span-2' : ''}
        />
      ))}
    </div>
  );
};

export default MarketplaceEnhancedGrid;
