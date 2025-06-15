
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SupabaseGpuCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  content: React.ReactNode;
  action?: string;
  highlight?: boolean;
}

const SupabaseGpuCard = ({ 
  title, 
  description, 
  icon: Icon, 
  content, 
  action,
  highlight = false
}: SupabaseGpuCardProps) => {
  return (
    <div className={`bg-card rounded-lg border border-border p-5 hover:border-muted-foreground transition-all duration-200 ${
      highlight ? 'ring-2 ring-primary/20 border-primary/30' : ''
    }`}>
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2 rounded-md ${highlight ? 'bg-primary/10' : 'bg-muted'}`}>
          <Icon className={`h-5 w-5 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-card-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="mb-4">
        {content}
      </div>
      
      {action && (
        <Button variant="outline" size="default" className="w-full text-sm">
          {action}
        </Button>
      )}
    </div>
  );
};

export default SupabaseGpuCard;
