
import { ModernPriceAlertsProps } from "@/types/alerts";
import { useAlerts } from "@/hooks/useAlerts";
import PriceMonitoringCard from "@/components/price-alerts/PriceMonitoringCard";
import CreateAlertCard from "@/components/price-alerts/CreateAlertCard";
import ActiveAlertsCard from "@/components/price-alerts/ActiveAlertsCard";
import AlertHistoryCard from "@/components/price-alerts/AlertHistoryCard";

const ModernPriceAlerts = ({ gpu }: ModernPriceAlertsProps) => {
  const { alerts, handleCreateAlert, handleToggleAlert } = useAlerts(gpu);

  return (
    <div className="space-y-8">
      <PriceMonitoringCard gpu={gpu} />
      <CreateAlertCard gpu={gpu} onCreateAlert={handleCreateAlert} />
      <ActiveAlertsCard alerts={alerts} onToggleAlert={handleToggleAlert} />
      <AlertHistoryCard />
    </div>
  );
};

export default ModernPriceAlerts;
