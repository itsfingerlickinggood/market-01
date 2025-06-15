
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Heart, 
  Shield, 
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

const VoiceAndTone = () => {
  const voicePrinciples = [
    {
      icon: <Heart className="h-5 w-5 text-red-500" />,
      title: "Empathetic Expert",
      description: "We understand the frustration of complex GPU setups and hidden costs. We speak to users as trusted advisors, not salespeople.",
      example: "We know how frustrating surprise egress fees can be. That's why we made them zero - forever."
    },
    {
      icon: <Shield className="h-5 w-5 text-blue-500" />,
      title: "Clear & Direct",
      description: "No jargon, no marketing speak. We tell users exactly what they're getting and what it costs.",
      example: "Total cost: $2.40/hour. No hidden fees. No surprises."
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
      title: "Enthusiastic & Supportive",
      description: "We celebrate user success and provide encouragement throughout their journey.",
      example: "Great choice! This GPU will handle your training workload perfectly."
    }
  ];

  const microcopyExamples = [
    {
      context: "Data Egress Tooltip",
      tone: "Educational & Reassuring",
      copy: "💡 Data egress = downloading files from your instance. Unlike AWS ($0.09/GB), we charge $0.00. Download all you want!",
      reasoning: "Explains technical term simply, shows competitive advantage, gives permission to use freely"
    },
    {
      context: "Deployment Success",
      tone: "Celebratory & Helpful",
      copy: "🎉 Your GPU is ready! SSH in with the command below, or jump straight to your Jupyter notebook.",
      reasoning: "Celebrates achievement, provides immediate next steps, offers multiple pathways"
    },
    {
      context: "Spot Instance Interruption",
      tone: "Apologetic & Solution-Focused",
      copy: "⚠️ Your spot instance was interrupted (this saves you 70% vs on-demand). We're automatically finding you a replacement.",
      reasoning: "Acknowledges inconvenience, reminds of benefit, shows proactive help"
    },
    {
      context: "High Workload Match",
      tone: "Confident & Specific",
      copy: "Perfect Match: This GPU excels at your workload (95% compatibility). Expect 2.3x faster training than a V100.",
      reasoning: "Uses specific metrics, sets clear expectations, provides comparative context"
    },
    {
      context: "Provider Trust Badge",
      tone: "Trustworthy & Transparent",
      copy: "Verified Provider: Hardware tested ✓ SOC 2 certified ✓ 99.8% uptime ✓",
      reasoning: "Shows concrete validations, uses checkmarks for quick scanning, specific metrics"
    },
    {
      context: "First-time User Welcome",
      tone: "Warm & Guiding",
      copy: "Welcome! Let's find the perfect GPU for your project. What are you building today?",
      reasoning: "Personal greeting, focuses on user's goal, open-ended invitation to share"
    }
  ];

  const toneGuidelines = [
    {
      do: "Use specific metrics and comparisons",
      dont: "Make vague claims",
      example: "2.3x faster than V100" vs "Much faster"
    },
    {
      do: "Acknowledge user expertise levels",
      dont: "Assume technical knowledge",
      example: "GPU memory (VRAM)" vs "VRAM"
    },
    {
      do: "Show, don't just tell",
      dont: "Use empty marketing phrases",
      example: "Zero egress fees (save $45 on 500GB)" vs "Cost-effective solution"
    },
    {
      do: "Celebrate user wins",
      dont: "Be purely transactional",
      example: "Great choice! This setup is perfect for your workload" vs "Order confirmed"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Voice & Tone Guide
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Our communication principles for creating lovable user experiences
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voicePrinciples.map((principle, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  {principle.icon}
                  <h3 className="font-semibold">{principle.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {principle.description}
                </p>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm italic">"{principle.example}"</p>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Microcopy Examples</CardTitle>
          <p className="text-sm text-muted-foreground">
            Real examples of how we communicate in key user moments
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {microcopyExamples.map((example, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{example.context}</Badge>
                  <Badge className="bg-blue-100 text-blue-800">{example.tone}</Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg mb-3">
                  <p className="font-medium">{example.copy}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Why this works:</strong> {example.reasoning}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tone Guidelines</CardTitle>
          <p className="text-sm text-muted-foreground">
            Do's and don'ts for consistent communication
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {toneGuidelines.map((guideline, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Do: {guideline.do}</p>
                    <p className="text-sm text-green-700 mt-1">"{guideline.example.split(' vs ')[0]}"</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">Don't: {guideline.dont}</p>
                    <p className="text-sm text-red-700 mt-1">"{guideline.example.split(' vs ')[1]}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                The Lovable Test
              </h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                Before writing any copy, ask: "Would a frustrated developer at 2 AM find this helpful, 
                clear, and reassuring?" If not, rewrite it.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAndTone;
