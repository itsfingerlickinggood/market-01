
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Eye, Building, Cpu, DollarSign, Rocket, BarChart3,
  LucideIcon
} from "lucide-react";

interface ModernGpuDetailsSidebarProps {
  activeSection: string;
  navigationSections: Array<{ id: string; label: string; icon?: string }>;
  onSectionChange: (section: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  'Eye': Eye,
  'Building': Building,
  'Cpu': Cpu,
  'DollarSign': DollarSign,
  'Rocket': Rocket,
  'BarChart3': BarChart3,
};

const ModernGpuDetailsSidebar = ({
  activeSection,
  navigationSections,
  onSectionChange
}: ModernGpuDetailsSidebarProps) => {
  return (
    <aside className="lg:col-span-3 hidden lg:block">
      <Card className="p-4 sticky top-24">
        <nav className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-3">
            Navigation
          </h3>
          {navigationSections.map((section) => {
            const IconComponent = section.icon ? iconMap[section.icon] : Eye;
            const isActive = activeSection === section.id;
            
            return (
              <Button
                key={section.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-11 transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 text-primary border-l-2 border-primary shadow-sm' 
                    : 'hover:bg-accent/50 hover:translate-x-1'
                }`}
                onClick={() => onSectionChange(section.id)}
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                <span className="font-medium">{section.label}</span>
              </Button>
            );
          })}
        </nav>
      </Card>
    </aside>
  );
};

export default ModernGpuDetailsSidebar;
