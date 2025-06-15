
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface ServerRegionDialogProps {
  selectedRegion: string;
  onRegionSelect: (region: string) => void;
}

const ServerRegionDialog = ({ selectedRegion, onRegionSelect }: ServerRegionDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionSelect = (region: string) => {
    onRegionSelect(region);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Globe className="h-4 w-4 mr-2" />
          {selectedRegion || "Select Server Region"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full h-[600px]">
        <DialogHeader>
          <DialogTitle>Select Server Region</DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0">
          <React.Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading 3D Globe...</p>
              </div>
            </div>
          }>
            <React.ErrorBoundary
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">3D Globe unavailable</p>
                    <div className="space-y-2">
                      {['US East', 'US West', 'Europe', 'Asia Pacific'].map((region) => (
                        <Button
                          key={region}
                          variant={selectedRegion === region ? "default" : "outline"}
                          className="w-full"
                          onClick={() => handleRegionSelect(region)}
                        >
                          {region}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              }
            >
              <InteractiveGlobe
                onLocationSelect={handleRegionSelect}
                selectedLocation={selectedRegion}
              />
            </React.ErrorBoundary>
          </React.Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Lazy load the InteractiveGlobe to avoid SSR issues
const InteractiveGlobe = React.lazy(() => import('./InteractiveGlobe'));

export default ServerRegionDialog;
