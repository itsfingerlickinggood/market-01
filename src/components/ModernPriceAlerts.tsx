
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, TrendingDown, TrendingUp, Target, Mail, Smartphone, Slack } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ModernPriceAlertsProps {
  gpu: any;
}

const ModernPriceAlerts = ({ gpu }: ModernPriceAlertsProps) => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState([
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

  const alertTypes = [
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

  const notificationMethods = [
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'sms', name: 'SMS', icon: Smartphone },
    { id: 'slack', name: 'Slack', icon: Slack }
  ];

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

  return (
    <div className="space-y-8">
      {/* Current Price Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            Price Monitoring for {gpu.gpu_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                ${(gpu.dph_total || 1.0).toFixed(3)}
              </div>
              <div className="text-sm text-muted-foreground">Current Price/Hour</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-500">
                ${((gpu.dph_total || 1.0) * 0.85).toFixed(3)}
              </div>
              <div className="text-sm text-muted-foreground">7-Day Low</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-red-500">
                ${((gpu.dph_total || 1.0) * 1.15).toFixed(3)}
              </div>
              <div className="text-sm text-muted-foreground">7-Day High</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create New Alert */}
      <Card>
        <CardHeader>
          <CardTitle>Create Price Alert</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Alert Type</Label>
                <Select defaultValue="price_drop">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {alertTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-2">
                          <type.icon className={`h-4 w-4 ${type.color}`} />
                          {type.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold">Price Threshold ($/hour)</Label>
                <Input 
                  id="threshold" 
                  type="number" 
                  step="0.001"
                  placeholder="0.500"
                  defaultValue={(gpu.dph_total * 0.9).toFixed(3)}
                />
              </div>

              <div className="space-y-2">
                <Label>Notification Method</Label>
                <Select defaultValue="email">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center gap-2">
                          <method.icon className="h-4 w-4" />
                          {method.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                <h4 className="font-medium">Alert Preview</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GPU:</span>
                    <span>{gpu.gpu_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Price:</span>
                    <span>${(gpu.dph_total || 1.0).toFixed(3)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alert Threshold:</span>
                    <span className="text-green-600">${(gpu.dph_total * 0.9).toFixed(3)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Potential Savings:</span>
                    <span className="text-green-600">~${((gpu.dph_total * 0.1) * 24 * 30).toFixed(0)}/month</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleCreateAlert} className="w-full">
                Create Alert
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => {
              const alertType = alertTypes.find(t => t.type === alert.type);
              const method = notificationMethods.find(m => m.id === alert.method);
              
              return (
                <div key={alert.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={alert.enabled}
                      onCheckedChange={() => handleToggleAlert(alert.id)}
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

      {/* Alert History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alert Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                type: 'price_drop',
                message: 'Price dropped to $0.420/hr',
                time: '2 hours ago',
                savings: '$12.60/day'
              },
              {
                type: 'availability',
                message: 'GPU became available',
                time: '1 day ago',
                savings: null
              },
              {
                type: 'price_increase',
                message: 'Price increased to $0.580/hr',
                time: '3 days ago',
                savings: null
              }
            ].map((activity, index) => {
              const alertType = alertTypes.find(t => t.id === activity.type);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {alertType && <alertType.icon className={`h-4 w-4 ${alertType.color}`} />}
                    <div>
                      <div className="font-medium text-sm">{activity.message}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                  {activity.savings && (
                    <Badge variant="outline" className="text-green-600">
                      Save {activity.savings}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernPriceAlerts;
