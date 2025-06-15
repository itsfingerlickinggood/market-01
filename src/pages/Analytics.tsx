
import Header from "@/components/Header";
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import InteractiveStatsGrid from "@/components/analytics/InteractiveStatsGrid";
import GpuRentalAnalyticsGrid from "@/components/analytics/GpuRentalAnalyticsGrid";
import AdvancedChartGrid from "@/components/analytics/AdvancedChartGrid";
import SmartInsightsPanel from "@/components/analytics/SmartInsightsPanel";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-8">
          {/* Modern Analytics Header */}
          <AnalyticsHeader />

          {/* Interactive Stats Grid */}
          <InteractiveStatsGrid />

          {/* GPU Rental Analytics Grid */}
          <GpuRentalAnalyticsGrid />

          {/* Advanced Chart Visualizations */}
          <AdvancedChartGrid />

          {/* AI-Powered Insights Panel */}
          <SmartInsightsPanel />
        </div>
      </main>
    </div>
  );
};

export default Analytics;
