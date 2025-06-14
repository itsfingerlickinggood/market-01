
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerformanceMetrics from "./specs/PerformanceMetrics";
import SpecificationTables from "./specs/SpecificationTables";
import CompatibilitySection from "./specs/CompatibilitySection";
import SecurityNetworkSection from "./specs/SecurityNetworkSection";

interface EnhancedSpecsSectionProps {
  gpu: any;
}

const EnhancedSpecsSection = ({ gpu }: EnhancedSpecsSectionProps) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceMetrics gpu={gpu} />
        </TabsContent>

        <TabsContent value="specs" className="space-y-4">
          <SpecificationTables gpu={gpu} />
        </TabsContent>

        <TabsContent value="compatibility" className="space-y-4">
          <CompatibilitySection />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecurityNetworkSection gpu={gpu} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSpecsSection;
