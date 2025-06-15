
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";
import { Alert } from "@/types/alerts";
import { alertTypes, notificationMethods } from "@/constants/alertConstants";

interface ActiveAlertsCardProps {
  alerts: Alert[];
  onToggleAlert: (id: number) => void;
}

const ActiveAlertsCard = ({ alerts, onToggleAlert }: ActiveAlertsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const alertType = alertTypes.find(t => t.id === alert.type);
            const method = notificationMethods.find(m => m.id === alert.method);
            
            return (
              <div key={alert.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <Switch 
                    checked={alert.enabled}
                    onCheckedChange={() => onToggleAlert(alert.id)}
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {alertType && <alertType.icon className={`h-4 w-4 ${alertType.color}`} />}
                      <span className="font-medium">
                        {alertType?.name || 'Price Alert'}
                      </span>
                      <Badge variant={alert.enabled ? "default" : "secondary"}>
                        {alert.enabled ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {alert.type === 'availability' 
                        ? 'Notify when GPU becomes available'
                        : `Trigger when price ${alert.type === 'price_drop' ? 'drops below' : 'rises above'} $${alert.threshold}/hr`
                      }
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {method && <method.icon className="h-3 w-3" />}
                    <span>{method?.name}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}

          {alerts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No active alerts</p>
              <p className="text-sm">Create your first alert above to get notified of price changes</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveAlertsCard;
