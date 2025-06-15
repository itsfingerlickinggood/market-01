
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div className={`bg-white rounded-lg border p-5 hover:border-gray-300 transition-all duration-200 ${
      highlight ? 'ring-2 ring-blue-100 border-blue-200' : 'border-gray-200'
    }`}>
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2 rounded-md ${highlight ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <Icon className={`h-5 w-5 ${highlight ? 'text-blue-600' : 'text-gray-600'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
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
