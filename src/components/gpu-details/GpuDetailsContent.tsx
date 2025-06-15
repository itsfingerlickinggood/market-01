
import ModernSpecsSection from "@/components/ModernSpecsSection";
import ModernProviderComparison from "@/components/ModernProviderComparison";
import ModernDeploymentWizard from "@/components/ModernDeploymentWizard";
import ModernPriceAlerts from "@/components/ModernPriceAlerts";

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
            <ModernSpecsSection gpu={gpu} />
            <ModernProviderComparison providers={providerData.slice(0, 3)} />
          </div>
        )}
        
        {activeSection === 'specs' && (
          <ModernSpecsSection gpu={gpu} detailed />
        )}
        
        {activeSection === 'providers' && (
          <ModernProviderComparison providers={providerData} />
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
