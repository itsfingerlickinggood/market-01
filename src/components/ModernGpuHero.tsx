
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Zap, Cpu, HardDrive, Wifi, TrendingUp, TrendingDown, Star, Users, Bell, Heart, Share2, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface ModernGpuHeroProps {
  gpu: any;
}

const ModernGpuHero = ({ gpu }: ModernGpuHeroProps) => {
  const [priceChange, setPriceChange] = useState(0);
  const [isAvailable, setIsAvailable] = useState(gpu.rentable !== false);

  useEffect(() => {
    setPriceChange((Math.random() - 0.5) * 10);
  }, []);

  // Use enhanced provider data from gpu object
  const providerColor = gpu.provider_color || "#3B82F6";
  const providerWebsite = gpu.website || "N/A";

  // Parse pricing format
  const priceString = gpu.price_range || `$${(gpu.dph_total || 0).toFixed(2)}`;

  // Key specs
  const keySpecs = [
    { label: "GPU Model", value: gpu.gpu_name, icon: Zap, color: "text-blue-500" },
    { label: "VRAM", value: `${gpu.gpu_ram}`, icon: HardDrive, color: "text-purple-500" },
    { label: "CPUs", value: `${gpu.cpu_cores || 16}`, icon: Cpu, color: "text-green-500" },
    { label: "RAM", value: `${gpu.cpu_ram || 64}GB`, icon: HardDrive, color: "text-pink-500" }
  ];

  const reliability = Math.round((gpu.reliability2 || gpu.reliability || 0.9) * 100);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Section */}
            <div className="space-y-4">

              {/* Company & Provider Branding */}
              <div className="flex items-center gap-4">
                <span className="text-3xl">{gpu.provider_logo}</span>
                <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  {gpu.company}
                </h2>
                <Badge className={`text-xs border-2`} style={{
                  borderColor: `${providerColor}`,
                  color: providerColor
                }}>
                  {gpu.provider_tier}
                </Badge>
              </div>

              {/* Model + Subinfo */}
              <div className="flex flex-wrap items-center gap-3 text-lg font-semibold text-muted-foreground">
                <span>{gpu.gpu_name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-1">
                  {gpu.gpu_variant}
                </span>
                <a href={`https://${providerWebsite}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary underline">
                  <ExternalLink className="h-3 w-3" /> {providerWebsite}
                </a>
              </div>

              {/* Pricing & Status */}
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 rounded px-3 py-1 text-primary font-semibold text-lg flex items-center gap-2" style={{ borderLeft: `4px solid ${providerColor}` }}>
                  {priceString}
                  <span className="text-xs text-gray-500 ml-1">/hour</span>
                </div>
                <Badge className={isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                  {isAvailable ? "Available" : "Rented"}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {reliability}% Uptime
                </span>
              </div>

              {/* Short Description */}
              <span className="block text-muted-foreground text-sm mt-1 font-medium">{gpu.provider_description}</span>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                  <Heart className="h-3 w-3 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                  <Bell className="h-3 w-3 mr-1" />
                  Alert
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Key Specs Card */}
            <Card className="p-4 border border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Key Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {keySpecs.map((spec) => (
                  <div key={spec.label} className="flex items-center gap-2 border rounded-lg p-3 border-border/30 bg-background/80">
                    <spec.icon className={`h-4 w-4 ${spec.color}`} />
                    <span className="text-xs">{spec.label}:</span>
                    <span className="font-medium text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-4">
            <Card className="p-6 border border-border/50 bg-card/80 backdrop-blur-md sticky top-6">
              <div className="space-y-6">
                {/* Price Header */}
                <div className="text-center space-y-2">
                  <div className="text-xs text-muted-foreground">Starting from</div>
                  <div className="text-3xl font-bold text-primary">
                    {priceString}
                  </div>
                  <div className="text-sm text-muted-foreground">per hour</div>
                  {/* Price Trend */}
                  <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                    priceChange >= 0
                      ? 'text-red-600 bg-red-50 dark:bg-red-950/20'
                      : 'text-green-600 bg-green-50 dark:bg-green-950/20'
                  }`}>
                    {priceChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(priceChange).toFixed(1)}% vs last week
                  </div>
                </div>
                {/* Pricing Breakdown */}
                <div className="space-y-2 py-4 border-y border-border/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily (~24h)</span>
                    <span className="font-semibold">
                      {/* Extract only the numeric value for calculation */}
                      ${((typeof gpu.dph_total === "number" ? gpu.dph_total : parseFloat((gpu.dph_total || "1"))) * 24).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Weekly (~168h)</span>
                    <span className="font-semibold">${((typeof gpu.dph_total === "number" ? gpu.dph_total : parseFloat((gpu.dph_total || "1"))) * 168).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly (~720h)</span>
                    <span className="font-semibold">${((typeof gpu.dph_total === "number" ? gpu.dph_total : parseFloat((gpu.dph_total || "1"))) * 720).toFixed(0)}</span>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full h-10 font-semibold" disabled={!isAvailable}>
                    {isAvailable ? "Compare Providers" : "Currently Unavailable"}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Add to Compare
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Price Alert
                    </Button>
                  </div>
                </div>
                {/* Benefits */}
                <div className="text-center space-y-2 pt-4 border-t border-border/30">
                  <div className="text-xs text-muted-foreground">
                    No setup fees • Pay per hour • Cancel anytime
                  </div>
                  <div className="text-xs font-medium text-primary">
                    Powered by {gpu.company}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernGpuHero;
