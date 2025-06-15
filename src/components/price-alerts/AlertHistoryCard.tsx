
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { alertTypes } from "@/constants/alertConstants";

const AlertHistoryCard = () => {
  const activities = [
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
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alert Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => {
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
  );
};

export default AlertHistoryCard;
