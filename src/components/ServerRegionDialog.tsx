
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe } from "lucide-react";
import InteractiveGlobe from "./InteractiveGlobe";

interface ServerRegionDialogProps {
  selectedRegion?: string;
  onRegionSelect: (region: string) => void;
}

const ServerRegionDialog: React.FC<ServerRegionDialogProps> = ({ 
  selectedRegion, 
  onRegionSelect 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState<string | undefined>(selectedRegion);

  const handleLocationSelect = (location: string) => {
    setTempSelection(location);
  };

  const handleConfirm = () => {
    if (tempSelection) {
      onRegionSelect(tempSelection);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTempSelection(selectedRegion);
    setIsOpen(false);
  };

  const regionInfo = {
    'US East': { count: 34, latency: '12ms', description: 'Virginia, New York' },
    'US West': { count: 29, latency: '8ms', description: 'California, Oregon' },
    'Europe': { count: 21, latency: '45ms', description: 'Frankfurt, London' },
    'Asia Pacific': { count: 18, latency: '89ms', description: 'Tokyo, Singapore' }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{selectedRegion || 'Select Server Region'}</span>
          </div>
          <Globe className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Select Server Region
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-1 gap-6">
          {/* Globe Container */}
          <div className="flex-1 bg-slate-950 rounded-lg overflow-hidden">
            <InteractiveGlobe 
              onLocationSelect={handleLocationSelect}
              selectedLocation={tempSelection}
            />
          </div>
          
          {/* Region Info Panel */}
          <div className="w-80 space-y-4">
            <div className="text-sm text-muted-foreground">
              Click on a region marker to select it
            </div>
            
            {tempSelection && regionInfo[tempSelection as keyof typeof regionInfo] && (
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{tempSelection}</h3>
                  <Badge variant="secondary">Selected</Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available GPUs:</span>
                    <span className="font-medium">
                      {regionInfo[tempSelection as keyof typeof regionInfo].count}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Latency:</span>
                    <span className="font-medium">
                      {regionInfo[tempSelection as keyof typeof regionInfo].latency}
                    </span>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-muted-foreground text-xs">
                      {regionInfo[tempSelection as keyof typeof regionInfo].description}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* All Regions List */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">All Regions</h4>
              {Object.entries(regionInfo).map(([region, info]) => (
                <div 
                  key={region}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    tempSelection === region 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleLocationSelect(region)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{region}</div>
                      <div className="text-xs text-muted-foreground">{info.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">{info.count} GPUs</div>
                      <div className="text-xs text-muted-foreground">{info.latency}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!tempSelection}
          >
            Select {tempSelection || 'Region'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServerRegionDialog;
