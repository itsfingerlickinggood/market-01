
import { Shield } from "lucide-react";

interface GpuCardFooterProps {
  reliability: number;
  lastRented: string;
}

const GpuCardFooter = ({ reliability, lastRented }: GpuCardFooterProps) => {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border/30">
      <Shield className="h-3 w-3 text-green-500" />
      <span>{reliability}% uptime</span>
      <span>•</span>
      <span>Last rented {lastRented}</span>
    </div>
  );
};

export default GpuCardFooter;
