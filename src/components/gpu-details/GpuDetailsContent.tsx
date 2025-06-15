
import ModernSpecsSection from "@/components/ModernSpecsSection";
import ModernProviderComparison from "@/components/ModernProviderComparison";
import ModernDeploymentWizard from "@/components/ModernDeploymentWizard";
import ModernPriceAlerts from "@/components/ModernPriceAlerts";
import EnhancedHardwareSection from "./EnhancedHardwareSection";
import SoftwareEnvironmentSection from "./SoftwareEnvironmentSection";
import ProviderNetworkSection from "./ProviderNetworkSection";

interface PlatformProvider {
  name: string;
  price: number;
  status: 'available' | 'limited' | 'unavailable';
  url: string;
  logo: string;
  setupTime: string;
  reliability: number;
  features: string[];
}

interface GpuDetailsContentProps {
  activeSection: string;
  gpu: any;
  providerData: PlatformProvider[];
}

const GpuDetailsContent = ({ activeSection, gpu, providerData }: GpuDetailsContentProps) => {
  return (
    <main className="lg:col-span-9">
      <div className="space-y-8">
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <EnhancedHardwareSection gpu={gpu} />
            <ModernProviderComparison providers={providerData.slice(0, 3)} />
          </div>
        )}
        
        {activeSection === 'specs' && (
          <div className="space-y-8">
            <EnhancedHardwareSection gpu={gpu} detailed />
            <SoftwareEnvironmentSection gpu={gpu} />
          </div>
        )}
        
        {activeSection === 'providers' && (
          <div className="space-y-8">
            <ProviderNetworkSection gpu={gpu} />
            <ModernProviderComparison providers={providerData} />
          </div>
        )}
        
        {activeSection === 'deployment' && (
          <ModernDeploymentWizard gpu={gpu} />
        )}
        
        {activeSection === 'alerts' && (
          <ModernPriceAlerts gpu={gpu} />
        )}
      </div>
    </main>
  );
};

export default GpuDetailsContent;
