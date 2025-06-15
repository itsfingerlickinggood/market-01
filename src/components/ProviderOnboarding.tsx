
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Server, 
  Shield, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  Upload,
  FileText,
  Award,
  Clock,
  DollarSign
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const ProviderOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tier, setTier] = useState("community");
  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    hardwareDescription: "",
    certifications: [] as string[],
    pricingModel: "hourly"
  });
  const { toast } = useToast();

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome",
      description: "Choose your provider tier and get started",
      completed: false
    },
    {
      id: "company-info",
      title: "Company Information",
      description: "Tell us about your organization",
      completed: false
    },
    {
      id: "hardware-specs",
      title: "Hardware Specifications",
      description: "List your available GPU resources",
      completed: false
    },
    {
      id: "verification",
      title: "Verification Process",
      description: "Complete required validations",
      completed: false
    },
    {
      id: "pricing",
      title: "Pricing Setup",
      description: "Configure your pricing model",
      completed: false
    },
    {
      id: "review",
      title: "Review & Launch",
      description: "Final review before going live",
      completed: false
    }
  ];

  const tierOptions = [
    {
      id: "community",
      name: "Community Tier",
      price: "Free",
      features: [
        "Peer-to-peer marketplace access",
        "Basic hardware validation",
        "Community support",
        "5% platform fee"
      ],
      requirements: [
        "Hardware ownership verification",
        "Basic identity verification"
      ],
      badge: "bg-blue-100 text-blue-800"
    },
    {
      id: "verified",
      name: "Verified/Secure Tier",
      price: "$99/month",
      features: [
        "Enterprise customer access",
        "SOC 2 compliance validation",
        "24/7 priority support",
        "3% platform fee",
        "Trust badge display"
      ],
      requirements: [
        "SOC 2 Type II certification",
        "Hardware security validation",
        "Legal entity verification",
        "Insurance coverage proof"
      ],
      badge: "bg-green-100 text-green-800"
    }
  ];

  const certificationOptions = [
    "SOC 2 Type II",
    "ISO 27001",
    "HIPAA Compliance",
    "FedRAMP",
    "PCI DSS",
    "GDPR Compliance"
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you within 24 hours.",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to GPU Market</h2>
              <p className="text-muted-foreground">
                Join our trusted network of GPU providers and start earning from your hardware
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tierOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all ${
                    tier === option.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setTier(option.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{option.name}</CardTitle>
                      <Badge className={option.badge}>{option.price}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Features:</h4>
                      <ul className="space-y-1 text-sm">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-1 text-sm">
                        {option.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Shield className="h-3 w-3 text-blue-600" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 1: // Company Info
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Company Information</h2>
              <p className="text-muted-foreground">
                Provide details about your organization
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Your company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                  placeholder="contact@yourcompany.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Hardware Description</Label>
              <Textarea
                id="description"
                value={formData.hardwareDescription}
                onChange={(e) => setFormData({...formData, hardwareDescription: e.target.value})}
                placeholder="Describe your GPU infrastructure, data center location, and capabilities..."
                className="min-h-[100px]"
              />
            </div>

            {tier === "verified" && (
              <div className="space-y-4">
                <Label>Security Certifications</Label>
                <div className="grid grid-cols-2 gap-3">
                  {certificationOptions.map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={cert}
                        checked={formData.certifications.includes(cert)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              certifications: [...formData.certifications, cert]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              certifications: formData.certifications.filter(c => c !== cert)
                            });
                          }
                        }}
                      />
                      <Label htmlFor={cert} className="text-sm">{cert}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3: // Verification
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Verification Process</h2>
              <p className="text-muted-foreground">
                {tier === "verified" 
                  ? "Complete security and compliance validations" 
                  : "Basic verification steps"}
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Identity Verification</h4>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Hardware Validation</h4>
                    <p className="text-sm text-muted-foreground">Automated testing in progress</p>
                    <Progress value={65} className="mt-2 h-2" />
                  </div>
                </div>
              </Card>

              {tier === "verified" && (
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Upload className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Compliance Documentation</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload required certifications
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="h-3 w-3 mr-2" />
                        Upload Documents
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <h2 className="text-xl font-bold mb-2">Step {currentStep + 1}</h2>
            <p className="text-muted-foreground">Content for this step...</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Provider Onboarding
          </CardTitle>
          <div className="flex items-center gap-2">
            <Progress value={(currentStep + 1) / steps.length * 100} className="flex-1" />
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${
                    index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index < currentStep ? 'bg-primary text-white' :
                    index === currentStep ? 'bg-primary/20 text-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 ml-2 ${
                      index < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {renderStepContent()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            >
              {currentStep === steps.length - 1 ? 'Submit Application' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderOnboarding;
