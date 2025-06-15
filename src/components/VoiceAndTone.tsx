
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Heart, 
  Zap, 
  CheckCircle,
  AlertTriangle,
  Info,
  Copy
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const VoiceAndTone = () => {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);
  const { toast } = useToast();

  const voiceAttributes = [
    {
      trait: "Empathetic Expert",
      description: "We understand your challenges and speak your language",
      example: "We know setting up GPU infrastructure can be overwhelming. Let us handle the complexity so you can focus on what matters most."
    },
    {
      trait: "Radically Transparent",
      description: "No hidden fees, no confusing jargon, just honest communication",
      example: "Total cost: $2.45/hour. That's it. No surprise egress fees, no hidden charges."
    },
    {
      trait: "Enthusiastic & Supportive",
      description: "We're genuinely excited about your success",
      example: "🎉 Your model finished training! Ready to deploy it to production? We've got templates to make it seamless."
    }
  ];

  const microcopyExamples = [
    {
      context: "Tooltip for egress fees",
      type: "info",
      text: "💡 Unlike cloud giants, we believe your data belongs to you. Download, upload, or move your data freely - always $0 egress fees."
    },
    {
      context: "Successful deployment",
      type: "success",
      text: "🚀 Your instance is live! SSH details sent to your email. Happy computing!"
    },
    {
      context: "Spot instance interruption",
      type: "warning",
      text: "⚡ Heads up! Your spot instance was reclaimed, but we've saved your work. Ready to spin up a new one?"
    },
    {
      context: "Loading state",
      type: "info",
      text: "🔍 Scanning the galaxy for the perfect GPU match..."
    },
    {
      context: "Error state",
      type: "error",
      text: "😅 Oops! Something went sideways. Our team has been notified and we'll fix this faster than you can say 'CUDA cores'."
    }
  ];

  const handleCopyExample = (text: string, context: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(context);
    setTimeout(() => setCopiedExample(null), 2000);
    
    toast({
      title: "Copied!",
      description: "Example copied to clipboard",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Voice & Tone Guide</h1>
        <p className="text-muted-foreground text-lg">
          Our communication style reflects our core values: transparency, empathy, and genuine excitement about GPU computing.
        </p>
      </div>

      {/* Voice Attributes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Our Voice Attributes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {voiceAttributes.map((attr, index) => (
            <div key={index} className="border-l-4 border-primary/30 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{attr.trait}</Badge>
              </div>
              <p className="text-muted-foreground mb-2">{attr.description}</p>
              <div className="bg-muted/50 p-3 rounded-md italic">
                "{attr.example}"
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Microcopy Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Microcopy Examples
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {microcopyExamples.map((example, index) => {
            const getIcon = () => {
              switch (example.type) {
                case "success":
                  return <CheckCircle className="h-4 w-4 text-green-600" />;
                case "warning":
                  return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
                case "error":
                  return <AlertTriangle className="h-4 w-4 text-red-600" />;
                default:
                  return <Info className="h-4 w-4 text-blue-600" />;
              }
            };

            return (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getIcon()}
                    <span className="font-medium text-sm">{example.context}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyExample(example.text, example.context)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedExample === example.context ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <p className="text-sm bg-muted/30 p-2 rounded">
                  {example.text}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Writing Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Writing Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-700 mb-3">✅ Do</h3>
              <ul className="space-y-2 text-sm">
                <li>• Use active voice and clear, direct language</li>
                <li>• Include relevant emojis to add personality</li>
                <li>• Acknowledge user emotions and frustrations</li>
                <li>• Celebrate user successes, big and small</li>
                <li>• Use technical terms when necessary, but explain them</li>
                <li>• Be human - admit mistakes and show we care</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 mb-3">❌ Don't</h3>
              <ul className="space-y-2 text-sm">
                <li>• Use corporate jargon or buzzwords</li>
                <li>• Hide problems behind vague language</li>
                <li>• Overwhelm users with technical details</li>
                <li>• Sound robotic or overly formal</li>
                <li>• Make promises we can't keep</li>
                <li>• Blame users for system issues</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAndTone;
