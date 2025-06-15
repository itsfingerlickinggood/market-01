
import ProviderOverviewSection from "./ProviderOverviewSection";
import ProviderSpecsSection from "./ProviderSpecsSection";
import ProviderPricingSection from "./ProviderPricingSection";
import ProviderDeploymentSection from "./ProviderDeploymentSection";
import ProviderComparisonSection from "./ProviderComparisonSection";
import EnhancedHardwareSection from "./EnhancedHardwareSection";

interface ProviderCentricContentProps {
  activeSection: string;
  gpu: any;
  enhancedData: any;
  providerData: any[];
}

const ProviderCentricContent = ({ 
  activeSection, 
  gpu, 
  enhancedData, 
  providerData 
}: ProviderCentricContentProps) => {
  return (
    <main className="lg:col-span-9">
      <div className="space-y-8">
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <ProviderOverviewSection gpu={gpu} enhancedData={enhancedData} />
            <EnhancedHardwareSection gpu={gpu} />
          </div>
        )}
        
        {activeSection === 'provider' && (
          <ProviderOverviewSection gpu={gpu} enhancedData={enhancedData} detailed />
        )}
        
        {activeSection === 'specs' && (
          <div className="space-y-8">
            <EnhancedHardwareSection gpu={gpu} detailed />
            <ProviderSpecsSection gpu={gpu} enhancedData={enhancedData} />
          </div>
        )}
        
        {activeSection === 'pricing' && (
          <ProviderPricingSection gpu={gpu} enhancedData={enhancedData} />
        )}
        
        {activeSection === 'deployment' && (
          <ProviderDeploymentSection gpu={gpu} enhancedData={enhancedData} />
        )}
        
        {activeSection === 'compare' && (
          <ProviderComparisonSection gpu={gpu} enhancedData={enhancedData} providerData={providerData} />
        )}
      </div>
    </main>
  );
};

export default ProviderCentricContent;
