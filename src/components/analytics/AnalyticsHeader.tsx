
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Download, 
  RefreshCcw, 
  Calendar, 
  Share, 
  Fullscreen,
  Zap
} from "lucide-react";

const AnalyticsHeader = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timePeriod, setTimePeriod] = useState("30d");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-border/50 rounded-xl p-8 mb-8">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-8 -left-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-4 right-1/3 w-16 h-16 bg-primary/8 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                <Zap className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">
              Advanced insights into your GPU research patterns and market trends
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live data • Last updated 2 minutes ago
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Time Period Selector */}
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-40 bg-background/50 backdrop-blur-sm border-border/60">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>

            {/* Action Buttons */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-background/50 backdrop-blur-sm border-border/60 hover:bg-primary/5"
            >
              <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>

            <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm border-border/60 hover:bg-primary/5">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>

            <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm border-border/60 hover:bg-primary/5">
              <Fullscreen className="h-4 w-4 mr-2" />
              Full Screen
            </Button>

            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
