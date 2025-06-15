
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SupabaseStyleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  content: React.ReactNode;
  action: string;
}

const SupabaseStyleCard = ({ 
  title, 
  description, 
  icon: Icon, 
  content, 
  action 
}: SupabaseStyleCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-gray-50 rounded-md">
          <Icon className="h-4 w-4 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      
      <div className="mb-4">
        {content}
      </div>
      
      <Button variant="outline" size="sm" className="w-full h-7 text-xs">
        {action}
      </Button>
    </div>
  );
};

export default SupabaseStyleCard;
