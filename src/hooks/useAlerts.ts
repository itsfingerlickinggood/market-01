
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert } from "@/types/alerts";

export const useAlerts = (gpu: any) => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'price_drop',
      threshold: (gpu.dph_total * 0.9).toFixed(3),
      enabled: false,
      method: 'email'
    },
    {
      id: 2,
      type: 'availability',
      threshold: '',
      enabled: true,
      method: 'email'
    }
  ]);

  const handleCreateAlert = () => {
    toast({
      title: "Alert Created",
      description: "You'll be notified when your conditions are met.",
    });
  };

  const handleToggleAlert = (id: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  return {
    alerts,
    handleCreateAlert,
    handleToggleAlert
  };
};
