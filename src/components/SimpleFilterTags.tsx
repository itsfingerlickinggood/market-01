
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import TrustFilterSection from "./TrustFilterSection";

interface SimpleFilterTagsProps {
  selectedModels: string[];
  selectedVrams: string[];
  selectedRegions: string[];
  selectedCompanies: string[];
  selectedTiers?: string[];
  onModelToggle: (model: string) => void;
  onVramToggle: (vram: string) => void;
  onRegionToggle: (region: string) => void;
  onCompanyToggle: (company: string) => void;
  onTierToggle?: (tier: string) => void;
  onClearAll: () => void;
}

const gpuModels = ["RTX 4090", "RTX 4080", "RTX 3090", "H100", "A100", "V100"];
const vramOptions = ["8", "16", "24", "32", "48", "80"];
const regions = ["US East", "US West", "Europe", "Asia Pacific"];
const companies = ["NVIDIA", "AMD", "Intel"];

const SimpleFilterTags = ({
  selectedModels,
  selectedVrams,
  selectedRegions,
  selectedCompanies,
  selectedTiers = [],
  onModelToggle,
  onVramToggle,
  onRegionToggle,
  onCompanyToggle,
  onTierToggle = () => {},
  onClearAll
}: SimpleFilterTagsProps) => {
  const totalSelected = selectedModels.length + selectedVrams.length + selectedRegions.length + selectedCompanies.length + selectedTiers.length;

  const handleClearAllFilters = () => {
    onClearAll();
    // Clear trust filters too
    selectedTiers.forEach(tier => onTierToggle(tier));
  };

  return (
    <div className="w-80 space-y-4">
      {/* Trust Filter Section */}
      <TrustFilterSection
        selectedTiers={selectedTiers}
        onTierToggle={onTierToggle}
        onClearFilters={() => selectedTiers.forEach(tier => onTierToggle(tier))}
      />

      {/* GPU Models */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">GPU Models</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {gpuModels.map((model) => (
              <Badge
                key={model}
                variant={selectedModels.includes(model) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onModelToggle(model)}
              >
                {model}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* VRAM */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">VRAM (GB)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {vramOptions.map((vram) => (
              <Badge
                key={vram}
                variant={selectedVrams.includes(vram) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onVramToggle(vram)}
              >
                {vram}GB+
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Companies */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Companies</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {companies.map((company) => (
              <Badge
                key={company}
                variant={selectedCompanies.includes(company) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onCompanyToggle(company)}
              >
                {company}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Regions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Badge
                key={region}
                variant={selectedRegions.includes(region) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onRegionToggle(region)}
              >
                {region}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clear All */}
      {totalSelected > 0 && (
        <Button 
          variant="outline" 
          onClick={handleClearAllFilters}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters ({totalSelected})
        </Button>
      )}
    </div>
  );
};

export default SimpleFilterTags;
