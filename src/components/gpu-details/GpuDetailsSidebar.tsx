
import { Button } from "@/components/ui/button";

interface GpuDetailsSidebarProps {
  activeSection: string;
  navigationSections: Array<{ id: string; label: string }>;
  onSectionChange: (section: string) => void;
}

const GpuDetailsSidebar = ({ 
  activeSection, 
  navigationSections, 
  onSectionChange 
}: GpuDetailsSidebarProps) => {
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-24 space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
          Navigation
        </h3>
        {navigationSections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSectionChange(section.id)}
          >
            {section.label}
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default GpuDetailsSidebar;
