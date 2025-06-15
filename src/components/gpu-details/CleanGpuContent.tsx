
import CleanSpecsSection from "./CleanSpecsSection";
import CleanPricingSection from "./CleanPricingSection";
import CleanProviderSection from "./CleanProviderSection";
import CleanDeploySection from "./CleanDeploySection";
import CleanOverviewSection from "./CleanOverviewSection";

interface CleanGpuContentProps {
  activeSection: string;
  gpu: any;
  enhancedData: any;
  providerData: any[];
}

const CleanGpuContent = ({ 
  activeSection, 
  gpu, 
  enhancedData, 
  providerData 
}: CleanGpuContentProps) => {
  return (
    <div className="container mx-auto px-4 py-4">
      {activeSection === 'overview' && (
        <CleanOverviewSection gpu={gpu} enhancedData={enhancedData} />
      )}
      
      {activeSection === 'specs' && (
        <CleanSpecsSection gpu={gpu} enhancedData={enhancedData} />
      )}
      
      {activeSection === 'pricing' && (
        <CleanPricingSection gpu={gpu} enhancedData={enhancedData} />
      )}
      
      {activeSection === 'provider' && (
        <CleanProviderSection gpu={gpu} enhancedData={enhancedData} />
      )}
      
      {activeSection === 'deploy' && (
        <CleanDeploySection gpu={gpu} enhancedData={enhancedData} />
      )}
    </div>
  );
};

export default CleanGpuContent;
