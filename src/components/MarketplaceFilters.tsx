
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MarketplaceFiltersProps {
  selectedPurpose: string | null;
  onPurposeChange: (purpose: string | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  priceFilter: string;
  onPriceFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  trendFilter?: string;
  onTrendFilterChange?: (trend: string) => void;
}

const MarketplaceFilters = ({
  selectedPurpose,
  onPurposeChange,
  searchTerm,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
  sortBy,
  onSortChange,
  trendFilter = "all",
  onTrendFilterChange = () => {}
}: MarketplaceFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const purposes = [
    { id: "gaming", label: "Gaming", icon: "🎮" },
    { id: "ai-training", label: "AI Training", icon: "🤖" },
    { id: "rendering", label: "3D Rendering", icon: "🎨" },
    { id: "mining", label: "Crypto Mining", icon: "⛏️" },
    { id: "research", label: "Research", icon: "🔬" },
    { id: "streaming", label: "Video Streaming", icon: "📹" }
  ];

  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "budget", label: "Budget ($0-0.5)" },
    { id: "value", label: "Value ($0.5-2)" },
    { id: "premium", label: "Premium ($2+)" }
  ];

  const sortOptions = [
    { id: "best-deals", label: "Best Deals" },
    { id: "lowest-price", label: "Lowest Price" },
    { id: "highest-performance", label: "Performance" },
    { id: "workload-match", label: "Workload Match" },
    { id: "purpose-match", label: "Purpose Match" },
    { id: "price-trend", label: "Price Trend" }
  ];

  const trendOptions = [
    { id: "all", label: "All Trends", icon: <Minus className="h-3 w-3" /> },
    { id: "up", label: "Trending Up", icon: <TrendingUp className="h-3 w-3 text-emerald-500" /> },
    { id: "down", label: "Trending Down", icon: <TrendingDown className="h-3 w-3 text-rose-500" /> },
    { id: "stable", label: "Stable", icon: <Minus className="h-3 w-3 text-blue-500" /> }
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Main Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search GPUs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background border-border/50 focus:border-primary/50 transition-colors duration-300"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange("")}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted/50"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Price Range Filter */}
        <Select value={priceFilter} onValueChange={onPriceFilterChange}>
          <SelectTrigger className="w-48 bg-background border-border/50 focus:border-primary/50 transition-colors duration-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border shadow-lg">
            {priceRanges.map((range) => (
              <SelectItem key={range.id} value={range.id}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Trend Filter */}
        <Select value={trendFilter} onValueChange={onTrendFilterChange}>
          <SelectTrigger className="w-44 bg-background border-border/50 focus:border-primary/50 transition-colors duration-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border shadow-lg">
            {trendOptions.map((trend) => (
              <SelectItem key={trend.id} value={trend.id}>
                <div className="flex items-center gap-2">
                  {trend.icon}
                  {trend.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48 bg-background border-border/50 focus:border-primary/50 transition-colors duration-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border shadow-lg">
            {sortOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Expand Button */}
        <Button 
          variant="outline" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="border-border/50 hover:border-primary/50 transition-colors duration-300"
        >
          {isExpanded ? "Less" : "More"} Filters
        </Button>
      </div>

      {/* Purpose Tags - Always Visible */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-2">Purpose:</span>
        {purposes.map((purpose) => (
          <Badge
            key={purpose.id}
            variant={selectedPurpose === purpose.id ? "default" : "secondary"}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedPurpose === purpose.id 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "hover:bg-primary/10 hover:text-primary"
            }`}
            onClick={() => onPurposeChange(selectedPurpose === purpose.id ? null : purpose.id)}
          >
            <span className="mr-1">{purpose.icon}</span>
            {purpose.label}
          </Badge>
        ))}
        {selectedPurpose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPurposeChange(null)}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Extended Filters - Expandable */}
      {isExpanded && (
        <div className="bg-muted/30 rounded-lg p-4 space-y-4 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                GPU Memory
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Memory</SelectItem>
                  <SelectItem value="8gb">8GB+</SelectItem>
                  <SelectItem value="16gb">16GB+</SelectItem>
                  <SelectItem value="24gb">24GB+</SelectItem>
                  <SelectItem value="48gb">48GB+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Reliability
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reliability</SelectItem>
                  <SelectItem value="high">95%+ Uptime</SelectItem>
                  <SelectItem value="premium">99%+ Uptime</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Location
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="asia">Asia Pacific</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceFilters;
