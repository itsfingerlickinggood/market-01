
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { alertTypes, notificationMethods } from "@/constants/alertConstants";

interface CreateAlertCardProps {
  gpu: any;
  onCreateAlert: () => void;
}

const CreateAlertCard = ({ gpu, onCreateAlert }: CreateAlertCardProps) => {
  return (
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

            <Button onClick={onCreateAlert} className="w-full">
              Create Alert
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateAlertCard;
