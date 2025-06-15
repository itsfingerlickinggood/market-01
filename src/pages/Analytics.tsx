import Header from "@/components/Header";
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import InteractiveStatsGrid from "@/components/analytics/InteractiveStatsGrid";
import AdvancedChartGrid from "@/components/analytics/AdvancedChartGrid";
import SmartInsightsPanel from "@/components/analytics/SmartInsightsPanel";
import QuickInsights from "@/components/QuickInsights";

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

          {/* Advanced Chart Visualizations */}
          <AdvancedChartGrid />

          {/* AI-Powered Insights Panel */}
          <SmartInsightsPanel />

          {/* Quick Insights for additional market data */}
          <QuickInsights />
        </div>
      </main>
    </div>
  );
};

export default Analytics;
