
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap, TrendingUp, Target, Clock, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-background"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm">
                <Zap className="h-4 w-4 mr-2" />
                Next-Gen GPU Cloud Platform
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Unleash the Power of Cloud GPUs
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Access enterprise-grade GPUs instantly. Scale your AI workloads, render your vision, and accelerate your innovation with our intelligent cloud platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/marketplace">
                  <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Explore Marketplace
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose GPUCloud?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built for developers, researchers, and enterprises who demand performance and reliability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Real-Time Pricing</h3>
                  <p className="text-muted-foreground">
                    Live price tracking across multiple providers ensures you always get the best deals for your compute needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
                  <p className="text-muted-foreground">
                    AI-powered recommendations match you with the perfect GPU configuration for your specific use case.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Instant Deployment</h3>
                  <p className="text-muted-foreground">
                    Deploy your workloads in seconds with one-click access to verified, high-performance GPU instances.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
                  <p className="text-muted-foreground">
                    Bank-grade security with encrypted connections, isolated environments, and compliance certifications.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Global Network</h3>
                  <p className="text-muted-foreground">
                    Access GPUs from data centers worldwide with low-latency connections and regional availability.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Pay-as-you-Scale</h3>
                  <p className="text-muted-foreground">
                    Flexible pricing models that scale with your needs, from development to production workloads.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of developers and researchers already using GPUCloud to accelerate their projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/marketplace">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100">
                    Start Free Trial
                  </Button>
                </Link>
                <Button size="lg" variant="ghost" className="text-lg px-8 py-6 text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
