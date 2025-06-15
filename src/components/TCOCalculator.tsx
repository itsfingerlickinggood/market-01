
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, DollarSign, Clock, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TCOCalculatorProps {
  hourlyRate: number;
  gpuName: string;
  provider: string;
  hasZeroEgress?: boolean;
}

const TCOCalculator = ({ hourlyRate, gpuName, provider, hasZeroEgress = true }: TCOCalculatorProps) => {
  const [hours, setHours] = useState(24);
  const [dataTransfer, setDataTransfer] = useState(100);
  const [storage, setStorage] = useState(100);
  
  const [totalCost, setTotalCost] = useState(0);
  const [breakdown, setBreakdown] = useState({
    compute: 0,
    egress: 0,
    storage: 0
  });

  useEffect(() => {
    const compute = hourlyRate * hours;
    const egress = hasZeroEgress ? 0 : dataTransfer * 0.09; // AWS-like pricing
    const storageeCost = storage * 0.05 * (hours / 24); // Daily storage rate
    
    setBreakdown({ compute, egress, storage: storageeCost });
    setTotalCost(compute + egress + storageeCost);
  }, [hours, dataTransfer, storage, hourlyRate, hasZeroEgress]);

  const awsEquivalent = hourlyRate * 3.2 + (dataTransfer * 0.09) + (storage * 0.23 * (hours / 24));
  const savings = awsEquivalent - totalCost;
  const savingsPercent = ((savings / awsEquivalent) * 100).toFixed(0);

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Total Cost Calculator
          </CardTitle>
          {hasZeroEgress && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Zero Egress Fees
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="hours" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Runtime Hours
            </Label>
            <Input
              id="hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              min="1"
              max="720"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="data" className="flex items-center gap-1">
              Data Transfer (GB)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Data downloaded from your instance.<br/>Our Zero Egress policy means this is FREE!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="data"
              type="number"
              value={dataTransfer}
              onChange={(e) => setDataTransfer(Number(e.target.value))}
              min="0"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="storage">Storage (GB)</Label>
            <Input
              id="storage"
              type="number"
              value={storage}
              onChange={(e) => setStorage(Number(e.target.value))}
              min="0"
              className="mt-1"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Compute ({gpuName})</span>
            <span className="font-medium">${breakdown.compute.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              Data Egress
              {hasZeroEgress && <Badge variant="outline" className="text-xs">FREE</Badge>}
            </span>
            <span className={`font-medium ${hasZeroEgress ? 'text-green-600 line-through' : ''}`}>
              ${breakdown.egress.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Storage</span>
            <span className="font-medium">${breakdown.storage.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Cost</span>
            <span className="text-primary">${totalCost.toFixed(2)}</span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            vs AWS equivalent: <span className="line-through">${awsEquivalent.toFixed(2)}</span>
          </div>
          
          <div className="text-center">
            <Badge variant="default" className="bg-green-100 text-green-800 text-sm">
              Save {savingsPercent}% (${savings.toFixed(2)})
            </Badge>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
          <div className="font-medium mb-1">💡 Transparent Pricing Promise:</div>
          <ul className="space-y-0.5">
            <li>• No hidden fees or surprise charges</li>
            <li>• Zero data egress costs (unlike cloud giants)</li>
            <li>• What you see is what you pay</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TCOCalculator;
