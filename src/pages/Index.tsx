
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Database, 
  Shield, 
  Code, 
  FolderOpen, 
  Zap, 
  Network,
  Brain,
  GitBranch,
  Star,
  Github,
  ChevronDown,
  Check
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <Zap className="h-8 w-8 text-green-400" />
                <h1 className="text-2xl font-bold text-white">GPUTrade</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <span>Product</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <span>Developers</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Enterprise</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Github className="h-4 w-4" />
                <Star className="h-4 w-4" />
                <span className="text-sm">12.5k</span>
              </div>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
                Dashboard
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            The Open Source<br />GPU Trading Platform
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Build your next GPU-powered application with our comprehensive backend platform. 
            From database to deployment, we've got you covered.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3">
              Start Building
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white px-8 py-3">
              View Documentation
            </Button>
          </div>
        </div>

        {/* 4-Card Grid Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Database Card */}
          <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 group">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                  <Database className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">GPU Database</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Every project connects to our comprehensive GPU database, the world's most trusted hardware marketplace.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">100% verified hardware</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">Real-time availability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">Easy to integrate</span>
                </div>
              </div>
              {/* PostgreSQL Logo Placeholder */}
              <div className="mt-8 opacity-20">
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Database className="h-8 w-8 text-gray-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication Card */}
          <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 group">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                  <Shield className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">Authentication</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Add user sign ups and logins, securing your data with enterprise-grade security.
              </p>
              {/* Mock Login Form */}
              <div className="space-y-3 bg-black/30 p-4 rounded-lg border border-gray-800">
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="bg-gray-800 rounded px-3 py-2 text-sm text-gray-400">user@example.com</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Password</div>
                  <div className="bg-gray-800 rounded px-3 py-2 text-sm text-gray-400">••••••••</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edge Functions Card */}
          <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 group">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                  <Code className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">Edge Functions</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Easily write custom code without deploying or scaling servers.
              </p>
              {/* Terminal Example */}
              <div className="bg-black/50 p-4 rounded-lg border border-gray-800 font-mono">
                <div className="text-green-400 text-sm mb-2">$ gputrade functions deploy</div>
                <div className="text-gray-500 text-xs space-y-1">
                  <div>✓ Deploying function...</div>
                  <div>✓ Function deployed successfully</div>
                  <div className="text-green-400">→ https://api.gputrade.dev/gpu-optimizer</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Storage Card */}
          <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 group">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                  <FolderOpen className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">Storage</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Store, organize, and serve large files, from model weights to training datasets.
              </p>
              {/* File Grid */}
              <div className="grid grid-cols-4 gap-2">
                {['JSON', 'CSV', 'PNG', 'PDF', 'ZIP', 'H5', 'PY', 'MD'].map((type) => (
                  <div key={type} className="bg-gray-800 rounded p-2 text-center">
                    <div className="text-xs text-gray-400">{type}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Realtime Card */}
          <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Network className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold">Realtime</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Build multiplayer experiences with real-time GPU availability and pricing updates.
              </p>
            </CardContent>
          </Card>

          {/* Vector/AI Card */}
          <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold">AI/ML Vector</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Integrate your favorite ML models to store, index and search GPU performance vectors.
              </p>
            </CardContent>
          </Card>

          {/* Data APIs Card */}
          <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <GitBranch className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold">Data APIs</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Instant ready-to-use RESTful APIs for GPU data, pricing, and marketplace operations.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
