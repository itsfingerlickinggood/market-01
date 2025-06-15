
import SupabaseGpuCard from "../SupabaseGpuCard";
import { GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ComparisonCard = () => {
  const content = (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground mb-2">Similar GPUs available:</div>
      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 bg-muted rounded">
          <div>
            <div className="font-medium text-sm text-foreground">RTX 4090</div>
            <div className="text-xs text-muted-foreground">24GB VRAM</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-sm text-foreground">$0.599/hr</div>
            <Badge variant="outline" className="text-xs">Available</Badge>
          </div>
        </div>
        <div className="flex justify-between items-center p-2 bg-muted rounded">
          <div>
            <div className="font-medium text-sm text-foreground">A100 40GB</div>
            <div className="text-xs text-muted-foreground">40GB HBM2e</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-sm text-foreground">$1.230/hr</div>
            <Badge variant="outline" className="text-xs">Limited</Badge>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SupabaseGpuCard
      title="Compare Alternatives"
      description="See how this GPU compares to similar options"
      icon={GitBranch}
      content={content}
      action="Compare GPUs"
    />
  );
};

export default ComparisonCard;
