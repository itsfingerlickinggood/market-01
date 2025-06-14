
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";

interface MarketplaceFiltersProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
}

const MarketplaceFilters = ({
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands
}: MarketplaceFiltersProps) => {
  const brands = ['NVIDIA', 'AMD', 'Intel'];
  const locations = ['US East', 'US West', 'Europe', 'Asia'];

  return (
    <div className="w-80 space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </h3>
        
        {/* Price Range */}
        <div className="space-y-3 mb-6">
          <label className="text-sm font-medium">Price Range ($/hour)</label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={15}
            min={0}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* GPU Brand */}
        <div className="space-y-3 mb-6">
          <label className="text-sm font-medium">GPU Brand</label>
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="rounded"
                  checked={selectedBrands.includes(brand)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedBrands([...selectedBrands, brand]);
                    } else {
                      setSelectedBrands(selectedBrands.filter(b => b !== brand));
                    }
                  }}
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Performance Tier */}
        <div className="space-y-3 mb-6">
          <label className="text-sm font-medium">Performance Tier</label>
          <div className="space-y-2">
            {['Entry', 'Mid-Range', 'High-End', 'Professional', 'Data Center'].map(tier => (
              <label key={tier} className="flex items-center space-x-2">
                <input type="radio" name="performance" className="rounded" />
                <span className="text-sm">{tier}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Server Location */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Server Location</label>
          <div className="space-y-2">
            {locations.map(location => (
              <label key={location} className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">{location}</span>
              </label>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MarketplaceFilters;
