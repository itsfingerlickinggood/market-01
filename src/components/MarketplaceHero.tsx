
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Zap, Cpu, Monitor, Coins } from "lucide-react";

const MarketplaceHero = () => {
  const quickFilters = [
    { label: "Gaming", icon: Monitor, color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    { label: "AI/ML", icon: Cpu, color: "bg-green-100 text-green-800 hover:bg-green-200" },
    { label: "Rendering", icon: Zap, color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
    { label: "Mining", icon: Coins, color: "bg-orange-100 text-orange-800 hover:bg-orange-200" }
  ];

  return (
    <div className="bg-gradient-to-br from-background via-secondary/20 to-background border-b border-border">
      <div className="container mx-auto px-4 py-16 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Find Your Perfect GPU Rental
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Smart recommendations based on your workload. Browse thousands of GPUs from top providers worldwide.
          </p>
          
          {/* Advanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search GPU models, specifications, or providers..."
                className="pl-12 pr-20 py-6 text-lg bg-card border-border focus:border-primary"
              />
              <Button className="absolute right-2 top-2 bottom-2">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {quickFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <Badge
                  key={filter.label}
                  className={`${filter.color} cursor-pointer transition-colors px-4 py-2 text-sm font-medium`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {filter.label}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHero;
