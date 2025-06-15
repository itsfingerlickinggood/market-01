
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Filter, 
  DollarSign, 
  Cpu, 
  MapPin, 
  Zap,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";

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
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    performance: false,
    location: false
  });

  const brands = [
    { name: 'NVIDIA', count: 47, color: 'bg-green-500' },
    { name: 'AMD', count: 23, color: 'bg-red-500' },
    { name: 'Intel', count: 12, color: 'bg-blue-500' }
  ];

  const performanceTiers = [
    { name: 'Entry Level', range: '< 8GB VRAM', count: 15 },
    { name: 'Mid-Range', range: '8-16GB VRAM', count: 28 },
    { name: 'High-End', range: '16-24GB VRAM', count: 19 },
    { name: 'Professional', range: '24-48GB VRAM', count: 12 },
    { name: 'Data Center', range: '48GB+ VRAM', count: 8 }
  ];

  const locations = [
    { name: 'US East', count: 34, latency: '12ms' },
    { name: 'US West', count: 29, latency: '8ms' },
    { name: 'Europe', count: 21, latency: '45ms' },
    { name: 'Asia Pacific', count: 18, latency: '89ms' }
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 15]);
    setSelectedBrands([]);
  };

  const activeFiltersCount = selectedBrands.length + (priceRange[0] > 0 || priceRange[1] < 15 ? 1 : 0);

  return (
    <div className="w-80 space-y-4">
      <Card className="border-2 border-border/20 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5 text-primary" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                  {activeFiltersCount}
                </Badge>
              )}
            </CardTitle>
            {activeFiltersCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-medium">Price Range</span>
              </div>
              {expandedSections.price ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.price && (
              <div className="space-y-4 pl-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">$/hour</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      ${priceRange[0]}
                    </Badge>
                    <span className="text-muted-foreground">-</span>
                    <Badge variant="outline" className="text-xs">
                      ${priceRange[1]}
                    </Badge>
                  </div>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={15}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <Separator />

          {/* GPU Brands */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('brands')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-600" />
                <span className="font-medium">GPU Brands</span>
              </div>
              {expandedSections.brands ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.brands && (
              <div className="space-y-3 pl-6">
                {brands.map(brand => (
                  <div key={brand.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={brand.name}
                        checked={selectedBrands.includes(brand.name)}
                        onCheckedChange={() => handleBrandToggle(brand.name)}
                      />
                      <label 
                        htmlFor={brand.name}
                        className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                      >
                        <div className={`w-2 h-2 rounded-full ${brand.color}`} />
                        {brand.name}
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {brand.count}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Performance Tier */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('performance')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">Performance Tier</span>
              </div>
              {expandedSections.performance ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.performance && (
              <div className="space-y-3 pl-6">
                {performanceTiers.map(tier => (
                  <div key={tier.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="performance" 
                        className="w-4 h-4 text-primary"
                        id={tier.name}
                      />
                      <label htmlFor={tier.name} className="text-sm cursor-pointer">
                        <div className="font-medium">{tier.name}</div>
                        <div className="text-xs text-muted-foreground">{tier.range}</div>
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tier.count}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Server Location */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('location')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Server Location</span>
              </div>
              {expandedSections.location ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.location && (
              <div className="space-y-3 pl-6">
                {locations.map(location => (
                  <div key={location.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox id={location.name} />
                      <label htmlFor={location.name} className="text-sm cursor-pointer">
                        <div className="font-medium">{location.name}</div>
                        <div className="text-xs text-muted-foreground">~{location.latency} avg latency</div>
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {location.count}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Filter Tags */}
      <Card className="border border-border/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-muted-foreground">Quick Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Budget Friendly
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              High Performance
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              AI Training Ready
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Gaming Optimized
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketplaceFilters;
