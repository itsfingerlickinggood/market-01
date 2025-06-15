
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useWorkload } from "@/contexts/WorkloadContext";
import { Settings, ChevronDown } from "lucide-react";

const WorkloadIndicator = () => {
  const { selectedWorkload, setSelectedWorkload } = useWorkload();

  if (!selectedWorkload) return null;

  const handleChangeWorkload = () => {
    setSelectedWorkload(null);
    localStorage.removeItem('userWorkload');
    localStorage.removeItem('isOnboarded');
    window.location.href = '/';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-10 px-3">
          <Badge variant="secondary" className="text-xs">
            {selectedWorkload.title}
          </Badge>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-64 bg-background/95 backdrop-blur-xl border border-border/40 shadow-2xl rounded-2xl p-2">
        <div className="p-3 border-b border-border/20">
          <p className="font-medium text-sm">Current Workload</p>
          <p className="text-xs text-muted-foreground mt-1">{selectedWorkload.description}</p>
        </div>
        <DropdownMenuItem 
          onClick={handleChangeWorkload}
          className="h-12 rounded-xl hover:bg-muted/80 transition-all duration-200"
        >
          <Settings className="h-4 w-4 mr-3" />
          Change Workload
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkloadIndicator;
