
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  TrendingUp, 
  Users, 
  Zap,
  Quote,
  CheckCircle,
  Building,
  Award
} from "lucide-react";

const SocialProofSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      company: "Stanford AI Lab",
      avatar: "SC",
      rating: 5,
      content: "Market01 has revolutionized our research workflow. The instant GPU access and seamless scaling allowed us to complete our large language model training 3x faster than traditional cloud providers.",
      highlight: "3x faster training"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "CTO",
      company: "RenderTech Studios",
      avatar: "MR",
      rating: 5,
      content: "The real-time pricing and global GPU availability have saved us over $50k in compute costs this quarter. The platform is incredibly reliable for our 24/7 rendering pipeline.",
      highlight: "$50k saved"
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      role: "Senior Data Scientist",
      company: "BioMed Analytics",
      avatar: "PP",
      rating: 5,
      content: "Market01's diverse GPU selection and instant deployment capabilities have accelerated our drug discovery research. The platform scales perfectly with our varying computational needs.",
      highlight: "Instant deployment"
    }
  ];

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Developers",
      color: "text-blue-500"
    },
    {
      icon: Zap,
      value: "99.9%",
      label: "Uptime SLA",
      color: "text-green-500"
    },
    {
      icon: TrendingUp,
      value: "2.1M+",
      label: "GPU Hours Served",
      color: "text-purple-500"
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "Customer Rating",
      color: "text-yellow-500"
    }
  ];

  const trustedCompanies = [
    { name: "Stanford University", type: "Academic" },
    { name: "NVIDIA Research", type: "Enterprise" },
    { name: "OpenAI", type: "AI Company" },
    { name: "Pixar Animation", type: "Creative" },
    { name: "DeepMind", type: "Research" },
    { name: "Tesla AI", type: "Automotive" }
  ];

  const certifications = [
    { name: "SOC 2 Type II", icon: CheckCircle },
    { name: "ISO 27001", icon: CheckCircle },
    { name: "GDPR Compliant", icon: CheckCircle },
    { name: "HIPAA Ready", icon: CheckCircle }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-muted/30 via-background to-primary/5">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light mb-12">
            Join thousands of researchers, developers, and companies scaling their AI projects with Market01.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-light text-center text-foreground mb-8">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card/50 backdrop-blur-sm border-border/40 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-5 w-5 text-primary mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {testimonial.highlight}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="" alt={testimonial.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-primary">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trusted Companies */}
        <div className="mb-16">
          <h3 className="text-2xl font-light text-center text-foreground mb-8">
            Trusted by Leading Organizations
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {trustedCompanies.map((company, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <span className="text-sm font-medium text-foreground">
                    {company.name}
                  </span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {company.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="text-center">
          <h3 className="text-2xl font-light text-foreground mb-6">
            Enterprise Security & Compliance
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="flex items-center space-x-2 bg-card/30 backdrop-blur-sm border border-border/40 rounded-lg px-4 py-2">
                  <Icon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-foreground">{cert.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofSection;
