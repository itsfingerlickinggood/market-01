
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Filter } from "lucide-react";
import PurposeFilterTags from "@/components/PurposeFilterTags";

interface MarketplaceFiltersProps {
  selectedPurpose: string | null;
  onPurposeChange: (purpose: string | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  priceFilter: string;
  onPriceFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const MarketplaceFilters = ({
  selectedPurpose,
  onPurposeChange,
  searchTerm,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
  sortBy,
  onSortChange
}: MarketplaceFiltersProps) => {
  return (
    <div className="flex items-center gap-6 mb-6">
      <div className="flex-1">
        <PurposeFilterTags 
          selectedPurpose={selectedPurpose}
          onPurposeChange={onPurposeChange}
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300" />
          <Input 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={(e) => onSearchChange(e.target.value)} 
            className="pl-10 h-9 w-56 border-border/60 focus:border-border bg-background transition-all duration-300" 
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 text-muted-foreground hover:text-foreground transition-colors duration-300">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-background/95 backdrop-blur-md border border-border/60 transition-colors duration-300">
            <div className="p-3 border-b border-border/60">
              <div className="text-xs font-medium text-muted-foreground mb-2">Price Range</div>
              <div className="space-y-1">
                <DropdownMenuItem onClick={() => onPriceFilterChange("all")} className="text-sm">
                  All Prices
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPriceFilterChange("budget")} className="text-sm">
                  Budget (&lt;$0.50/hr)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPriceFilterChange("value")} className="text-sm">
                  Value ($0.50-2/hr)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPriceFilterChange("premium")} className="text-sm">
                  Premium (&gt;$2/hr)
                </DropdownMenuItem>
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-medium text-muted-foreground mb-2">Sort By</div>
              <div className="space-y-1">
                <DropdownMenuItem onClick={() => onSortChange("best-deals")} className="text-sm">
                  Best Deals
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortChange("lowest-price")} className="text-sm">
                  Lowest Price
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortChange("highest-performance")} className="text-sm">
                  Best Performance
                </DropdownMenuItem>
                {selectedPurpose && (
                  <DropdownMenuItem onClick={() => onSortChange("purpose-match")} className="text-sm">
                    Perfect Match
                  </DropdownMenuItem>
                )}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
