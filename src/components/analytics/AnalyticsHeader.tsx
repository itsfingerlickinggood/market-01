
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, RefreshCcw, Calendar, Share, Fullscreen } from "lucide-react";

const AnalyticsHeader = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timePeriod, setTimePeriod] = useState("30d");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-border/50 rounded-2xl p-8 mb-8">
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-12 -left-8 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-8 right-1/3 w-24 h-24 bg-primary/8 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/6 rounded-full blur-md animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground/70 bg-clip-text text-transparent">
                GPU Analytics Hub
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl font-light text-lg">
              Comprehensive insights into GPU rental markets, pricing trends, and provider performance across the ecosystem
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Real-time data</span>
              </div>
              <span>•</span>
              <span className="text-sm">24 providers monitored</span>
              <span>•</span>
              <span className="text-sm">247 GPU models tracked</span>
              <span>•</span>
              <span className="text-base">Last updated 47 seconds ago</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Enhanced Time Period Selector */}
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-44 bg-background/60 backdrop-blur-sm border-border/60 hover:bg-background/80 transition-colors">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-xl border-border/60">
                <SelectItem value="1h">Last hour</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>

            {/* Enhanced Action Buttons */}
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="bg-background/60 backdrop-blur-sm border-border/60 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300">
              <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>

            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur-sm border-border/60 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>

            <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur-sm border-border/60 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300">
              <Fullscreen className="h-4 w-4 mr-2" />
              Full Screen
            </Button>

            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
