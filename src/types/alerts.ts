
export interface Alert {
  id: number;
  type: string;
  threshold: string;
  enabled: boolean;
  method: string;
}

export interface AlertType {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

export interface NotificationMethod {
  id: string;
  name: string;
  icon: any;
}

export interface ModernPriceAlertsProps {
  gpu: any;
}
