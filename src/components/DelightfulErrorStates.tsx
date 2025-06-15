
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Home, 
  MessageCircle,
  Zap,
  Coffee,
  Heart,
  Lightbulb,
  ArrowLeft
} from "lucide-react";

interface ErrorStateProps {
  type: 'notFound' | 'serverError' | 'networkError' | 'unauthorized' | 'maintenance';
  onRetry?: () => void;
  onGoHome?: () => void;
  onContactSupport?: () => void;
}

const DelightfulErrorStates = ({ 
  type, 
  onRetry, 
  onGoHome, 
  onContactSupport 
}: ErrorStateProps) => {
  const errorConfigs = {
    notFound: {
      emoji: "🔍",
      title: "GPU Not Found in This Universe",
      subtitle: "Don't worry, there are plenty of fish in the sea... er, GPUs in the cloud!",
      description: "The GPU you're looking for seems to have vanished into the digital void. Maybe it got promoted to a better cluster?",
      suggestions: [
        "🎯 Try searching for a similar GPU model",
        "🔄 Check our latest GPU arrivals",
        "💡 Browse by your specific workload needs"
      ],
      primaryAction: "Explore GPUs",
      showRetry: false
    },
    serverError: {
      emoji: "🤖",
      title: "Our Servers Are Having a Coffee Break",
      subtitle: "Even the best machines need a moment to recharge!",
      description: "Something went sideways on our end. Our engineering team has been alerted and they're probably already fixing it with determination and caffeine.",
      suggestions: [
        "☕ Grab a coffee while we fix this",
        "🔄 Try refreshing in a few moments",
        "💬 Chat with our team if this persists"
      ],
      primaryAction: "Try Again",
      showRetry: true
    },
    networkError: {
      emoji: "🌐",
      title: "Network Hiccup Detected",
      subtitle: "Your internet seems to be playing hard to get!",
      description: "We're having trouble connecting to our servers. This usually resolves itself faster than you can say 'CUDA cores'.",
      suggestions: [
        "📡 Check your internet connection",
        "🔄 Refresh the page",
        "⏰ Wait a moment and try again"
      ],
      primaryAction: "Reconnect",
      showRetry: true
    },
    unauthorized: {
      emoji: "🔐",
      title: "Access Denied (But We Still Love You)",
      subtitle: "Looks like you need special clearance for this area!",
      description: "This content requires authentication. Don't take it personally - we're just being extra careful with our GPU treasures.",
      suggestions: [
        "🔑 Sign in to your account",
        "📝 Create a new account if you don't have one",
        "🔄 Refresh after signing in"
      ],
      primaryAction: "Sign In",
      showRetry: false
    },
    maintenance: {
      emoji: "🔧",
      title: "Upgrading Our GPU Powers",
      subtitle: "We're making things even more awesome!",
      description: "We're currently performing scheduled maintenance to bring you an even better GPU experience. Think of it as our platform doing some strength training.",
      suggestions: [
        "⏰ Check back in a few minutes",
        "📱 Follow us on social for updates",
        "☕ Perfect time for a coffee break"
      ],
      primaryAction: "Check Status",
      showRetry: true
    }
  };

  const config = errorConfigs[type];

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center animate-fade-in">
        <CardHeader className="pb-4">
          <div className="text-6xl mb-4 animate-bounce">
            {config.emoji}
          </div>
          <CardTitle className="text-2xl mb-2">
            {config.title}
          </CardTitle>
          <p className="text-lg text-muted-foreground">
            {config.subtitle}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {config.description}
          </p>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-yellow-600" />
              <span className="font-medium text-sm">Quick Suggestions:</span>
            </div>
            <ul className="text-sm text-left space-y-2">
              {config.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {config.showRetry && onRetry && (
              <Button 
                onClick={onRetry}
                className="hover:scale-105 transition-transform"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {config.primaryAction}
              </Button>
            )}
            
            {onGoHome && (
              <Button 
                variant="outline" 
                onClick={onGoHome}
                className="hover:scale-105 transition-transform"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            )}
            
            {onContactSupport && (
              <Button 
                variant="outline" 
                onClick={onContactSupport}
                className="hover:scale-105 transition-transform"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            )}
          </div>
          
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-3 w-3 text-red-500" />
              <span>Need help? Our support team is standing by with answers (and probably coffee)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DelightfulErrorStates;
