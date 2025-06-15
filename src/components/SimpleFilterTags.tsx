
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Filter } from "lucide-react";

interface SimpleFilterTagsProps {
  selectedModels: string[];
  selectedVrams: string[];
  selectedRegions: string[];
  selectedCompanies: string[];
  onModelToggle: (model: string) => void;
  onVramToggle: (vram: string) => void;
  onRegionToggle: (region: string) => void;
  onCompanyToggle: (company: string) => void;
  onClearAll: () => void;
}

const SimpleFilterTags = ({
  selectedModels,
  selectedVrams,
  selectedRegions,
  selectedCompanies,
  onModelToggle,
  onVramToggle,
  onRegionToggle,
  onCompanyToggle,
  onClearAll
}: SimpleFilterTagsProps) => {
  const models = [
    "RTX 4090", "RTX 4080", "RTX 4070", "RTX 3090", "RTX 3080", "RTX 3070",
    "A100 80GB", "A100 40GB", "H100", "V100", "MI210", "MI250X"
  ];

  const vrams = ["8GB", "12GB", "16GB", "24GB", "40GB", "48GB", "80GB"];

  const regions = [
    "US East", "US West", "Europe", "Asia Pacific", "Canada", "Australia"
  ];

  const companies = ["NVIDIA", "AMD", "Intel"];

  const getTotalActiveFilters = () => {
    return selectedModels.length + selectedVrams.length + selectedRegions.length + selectedCompanies.length;
  };

  const activeFiltersCount = getTotalActiveFilters();

  return (
    <Card className="w-80">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearAll}
              className="text-destructive hover:text-destructive"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* GPU Models */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">GPU Models</h4>
          <div className="flex flex-wrap gap-2">
            {models.map((model) => (
              <Badge
                key={model}
                variant={selectedModels.includes(model) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onModelToggle(model)}
              >
                {model}
                {selectedModels.includes(model) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* VRAM */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">VRAM</h4>
          <div className="flex flex-wrap gap-2">
            {vrams.map((vram) => (
              <Badge
                key={vram}
                variant={selectedVrams.includes(vram) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onVramToggle(vram)}
              >
                {vram}
                {selectedVrams.includes(vram) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Regions</h4>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Badge
                key={region}
                variant={selectedRegions.includes(region) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onRegionToggle(region)}
              >
                {region}
                {selectedRegions.includes(region) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Companies</h4>
          <div className="flex flex-wrap gap-2">
            {companies.map((company) => (
              <Badge
                key={company}
                variant={selectedCompanies.includes(company) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onCompanyToggle(company)}
              >
                {company}
                {selectedCompanies.includes(company) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleFilterTags;
