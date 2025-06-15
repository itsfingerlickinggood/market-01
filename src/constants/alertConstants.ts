
import { TrendingDown, TrendingUp, Target, Mail, Smartphone, Slack } from "lucide-react";
import { AlertType, NotificationMethod } from "@/types/alerts";

export const alertTypes: AlertType[] = [
  {
    id: 'price_drop',
    name: 'Price Drop Alert',
    description: 'Notify when price drops below threshold',
    icon: TrendingDown,
    color: 'text-green-500'
  },
  {
    id: 'price_increase',
    name: 'Price Increase Alert',
    description: 'Notify when price rises above threshold',
    icon: TrendingUp,
    color: 'text-red-500'
  },
  {
    id: 'availability',
    name: 'Availability Alert',
    description: 'Notify when GPU becomes available',
    icon: Target,
    color: 'text-blue-500'
  }
];

export const notificationMethods: NotificationMethod[] = [
  { id: 'email', name: 'Email', icon: Mail },
  { id: 'sms', name: 'SMS', icon: Smartphone },
  { id: 'slack', name: 'Slack', icon: Slack }
];
