
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, X, Filter, Search } from "lucide-react";
import { FilterState } from "@/types/gpu-comparison";
import { filterOptions } from "@/data/gpuCatalog";

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  resultCount: number;
}

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  searchTerm, 
  onSearchChange, 
  resultCount 
}: FilterPanelProps) => {
  const [openSections, setOpenSections] = useState({
    brands: true,
    vram: true,
    useCases: true,
    priceTiers: false,
    features: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleArrayFilter = (category: keyof FilterState, value: string) => {
    const currentArray = filters[category] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    onFiltersChange({ ...filters, [category]: newArray });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      brands: [],
      vramSizes: [],
      useCases: [],
      priceTiers: [],
      features: [],
      priceRange: [0, 10]
    });
    onSearchChange('');
  };

  const getActiveFilterCount = () => {
    const { brands, vramSizes, useCases, priceTiers, features } = filters;
    return brands.length + vramSizes.length + useCases.length + priceTiers.length + features.length;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card className="w-80">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>
          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-destructive hover:text-destructive"
            >
              Clear All
            </Button>
          )}
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search GPUs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="text-sm text-muted-foreground">
          {resultCount} GPU{resultCount !== 1 ? 's' : ''} found
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range ($/hour)</Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
            max={10}
            min={0}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}+</span>
          </div>
        </div>

        {/* GPU Brands */}
        <Collapsible open={openSections.brands} onOpenChange={() => toggleSection('brands')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">GPU Brand</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.brands ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {filterOptions.brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleArrayFilter('brands', brand)}
                  className="rounded"
                />
                <span className="text-sm">{brand}</span>
                {filters.brands.includes(brand) && (
                  <Badge variant="secondary" className="ml-auto text-xs">✓</Badge>
                )}
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* VRAM Size */}
        <Collapsible open={openSections.vram} onOpenChange={() => toggleSection('vram')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">VRAM Size</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.vram ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {filterOptions.vramSizes.map((size) => (
              <label key={size} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.vramSizes.includes(size)}
                  onChange={() => handleArrayFilter('vramSizes', size)}
                  className="rounded"
                />
                <span className="text-sm">{size}</span>
                {filters.vramSizes.includes(size) && (
                  <Badge variant="secondary" className="ml-auto text-xs">✓</Badge>
                )}
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Use Cases */}
        <Collapsible open={openSections.useCases} onOpenChange={() => toggleSection('useCases')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Use Cases</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.useCases ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {filterOptions.useCases.map((useCase) => (
              <label key={useCase} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.useCases.includes(useCase)}
                  onChange={() => handleArrayFilter('useCases', useCase)}
                  className="rounded"
                />
                <span className="text-sm capitalize">{useCase}</span>
                {filters.useCases.includes(useCase) && (
                  <Badge variant="secondary" className="ml-auto text-xs">✓</Badge>
                )}
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Price Tiers */}
        <Collapsible open={openSections.priceTiers} onOpenChange={() => toggleSection('priceTiers')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Price Tiers</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.priceTiers ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {filterOptions.priceTiers.map((tier) => (
              <label key={tier} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.priceTiers.includes(tier)}
                  onChange={() => handleArrayFilter('priceTiers', tier)}
                  className="rounded"
                />
                <span className="text-sm capitalize">{tier}</span>
                {filters.priceTiers.includes(tier) && (
                  <Badge variant="secondary" className="ml-auto text-xs">✓</Badge>
                )}
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Features */}
        <Collapsible open={openSections.features} onOpenChange={() => toggleSection('features')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Features</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.features ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {filterOptions.features.map((feature) => (
              <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.features.includes(feature)}
                  onChange={() => handleArrayFilter('features', feature)}
                  className="rounded"
                />
                <span className="text-sm capitalize">{feature.replace('-', ' ')}</span>
                {filters.features.includes(feature) && (
                  <Badge variant="secondary" className="ml-auto text-xs">✓</Badge>
                )}
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Quick Presets */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Quick Presets</Label>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onFiltersChange({ 
                ...filters, 
                useCases: ['gaming'], 
                features: ['ray-tracing'] 
              })}
            >
              Best for Gaming
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onFiltersChange({ 
                ...filters, 
                useCases: ['ai'], 
                features: ['tensor-cores'] 
              })}
            >
              AI/ML Optimized
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onFiltersChange({ 
                ...filters, 
                priceTiers: ['budget'], 
                priceRange: [0, 2] 
              })}
            >
              Budget Options
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
