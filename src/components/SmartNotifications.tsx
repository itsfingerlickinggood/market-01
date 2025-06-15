
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bell, 
  X, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Heart,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'celebration';
  title: string;
  message: string;
  timestamp: Date;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const SmartNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Simulate smart notifications based on user behavior
  useEffect(() => {
    const demoNotifications: Notification[] = [
      {
        id: '1',
        type: 'celebration',
        title: '🎉 First GPU deployed!',
        message: 'Welcome to the GPU computing world! Your H100 is running smoothly.',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      },
      {
        id: '2',
        type: 'info',
        title: '💡 Price drop alert!',
        message: 'RTX 4090 prices dropped 15% in your region. Perfect for your 3D rendering workload!',
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
        action: {
          label: 'View Deals',
          onClick: () => toast({ title: "Navigating to deals...", description: "🔍 Finding the best RTX 4090 offers" })
        }
      },
      {
        id: '3',
        type: 'warning',
        title: '⚡ Spot instance ending soon',
        message: 'Your training job will finish in 30 minutes, but your spot instance might be reclaimed.',
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        action: {
          label: 'Extend',
          onClick: () => toast({ title: "Instance extended!", description: "✅ Added 2 more hours to your session" })
        }
      }
    ];

    setNotifications(demoNotifications);
  }, [toast]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'celebration':
        return <Sparkles className="h-4 w-4 text-purple-600" />;
      default:
        return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-muted/50 transition-all duration-200"
      >
        <Bell className="h-4 w-4" />
        {notifications.length > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary animate-pulse"
          >
            {notifications.length}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-80 z-50 shadow-lg border animate-fade-in">
          <CardContent className="p-0">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Smart Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Heart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">All caught up! 🎉</p>
                  <p className="text-xs mt-1">We'll notify you of important updates</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 hover:bg-muted/30 transition-colors duration-150 border-b border-border/30 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {getRelativeTime(notification.timestamp)}
                            </span>
                            <div className="flex items-center gap-2">
                              {notification.action && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={notification.action.onClick}
                                  className="h-6 text-xs px-2 hover:scale-105 transition-transform"
                                >
                                  {notification.action.label}
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeNotification(notification.id)}
                                className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartNotifications;
