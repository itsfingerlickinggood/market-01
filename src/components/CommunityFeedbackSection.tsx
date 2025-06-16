import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Github } from "lucide-react";

const CommunityFeedbackSection = () => {
  const testimonials = [
    {
      id: 1,
      username: "@gpudev",
      avatar: "/placeholder.svg",
      text: "Found the perfect RTX 4090 for my ML training pipeline in minutes. The real-time pricing comparison saved me hundreds of dollars.",
      initials: "GD"
    },
    {
      id: 2,
      username: "@mlresearcher",
      avatar: "/placeholder.svg", 
      text: "The marketplace transparency is incredible. I can see actual availability and compare providers without any hidden fees.",
      initials: "MR"
    },
    {
      id: 3,
      username: "@renderking",
      avatar: "/placeholder.svg",
      text: "Deployed my rendering farm across multiple providers seamlessly. The unified interface makes GPU management so much easier.",
      initials: "RK"
    },
    {
      id: 4,
      username: "@aibuilder",
      avatar: "/placeholder.svg",
      text: "Community insights helped me choose the right GPU configuration for my specific workload. Amazing platform!",
      initials: "AB"
    }
  ];

  return (
    <div className="py-20 border-t border-border/40">
      <div className="text-center space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h3 className="text-4xl md:text-5xl font-bold text-foreground">
            Join the community
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover what our community has to say about their GPU marketplace experience
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
            <MessageSquare className="h-5 w-5 mr-2" />
            GitHub discussions
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </Button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-border/40 bg-card/30 backdrop-blur-sm text-left">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.username} />
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-muted-foreground">
                      {testimonial.username}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityFeedbackSection;