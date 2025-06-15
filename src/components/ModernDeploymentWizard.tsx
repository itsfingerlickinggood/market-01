
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Play, Code, Terminal, Rocket, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ModernDeploymentWizardProps {
  gpu: any;
}

const ModernDeploymentWizard = ({ gpu }: ModernDeploymentWizardProps) => {
  const { toast } = useToast();
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isDeploying, setIsDeploying] = useState(false);

  const deploymentTemplates = [
    {
      id: 'pytorch',
      name: 'PyTorch ML Training',
      description: 'Complete environment for deep learning with PyTorch',
      icon: '🔥',
      estimatedTime: '3-5 min',
      popularity: 'Most Popular',
      resources: {
        vram: `${Math.min(gpu.gpu_ram || 24, 24)}GB`,
        ram: `${Math.min(gpu.cpu_ram || 64, 32)}GB`,
        storage: '50GB'
      },
      preInstalled: ['PyTorch 2.0', 'CUDA 12.1', 'cuDNN', 'Jupyter Lab', 'NumPy', 'Pandas']
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow GPU',
      description: 'Optimized TensorFlow environment for GPU computing',
      icon: '🧠',
      estimatedTime: '2-4 min',
      popularity: 'Popular',
      resources: {
        vram: `${Math.min(gpu.gpu_ram || 24, 20)}GB`,
        ram: `${Math.min(gpu.cpu_ram || 64, 32)}GB`,
        storage: '40GB'
      },
      preInstalled: ['TensorFlow 2.13', 'CUDA 12.1', 'Keras', 'Jupyter Lab', 'scikit-learn']
    },
    {
      id: 'blender',
      name: 'Blender Rendering',
      description: '3D rendering and animation with GPU acceleration',
      icon: '🎨',
      estimatedTime: '4-6 min',
      popularity: 'Trending',
      resources: {
        vram: `${gpu.gpu_ram || 24}GB`,
        ram: `${Math.min(gpu.cpu_ram || 64, 64)}GB`,
        storage: '80GB'
      },
      preInstalled: ['Blender 4.0', 'OptiX', 'CUDA', 'FFmpeg', 'ImageMagick']
    },
    {
      id: 'gaming',
      name: 'Gaming Server',
      description: 'High-performance gaming with remote desktop',
      icon: '🎮',
      estimatedTime: '5-8 min',
      popularity: 'New',
      resources: {
        vram: `${gpu.gpu_ram || 24}GB`,
        ram: `${gpu.cpu_ram || 64}GB`,
        storage: '200GB'
      },
      preInstalled: ['Ubuntu Desktop', 'NVIDIA Drivers', 'Steam', 'NoMachine', 'Parsec']
    },
    {
      id: 'custom',
      name: 'Custom Environment',
      description: 'Start with base Ubuntu and install what you need',
      icon: '⚙️',
      estimatedTime: '1-2 min',
      popularity: 'Advanced',
      resources: {
        vram: `${gpu.gpu_ram || 24}GB`,
        ram: `${gpu.cpu_ram || 64}GB`,
        storage: '20GB'
      },
      preInstalled: ['Ubuntu 22.04', 'NVIDIA Drivers', 'Docker', 'SSH Server']
    }
  ];

  const deploymentSteps = [
    { title: "Choose Template", description: "Select your deployment template" },
    { title: "Configure", description: "Set up your environment" },
    { title: "Deploy", description: "Launch your instance" },
    { title: "Access", description: "Connect to your server" }
  ];

  const handleDeploy = async () => {
    if (!selectedTemplate) return;
    
    setIsDeploying(true);
    setDeploymentStep(2);
    
    // Simulate deployment progress
    const steps = [
      "Allocating resources...",
      "Setting up networking...",
      "Installing base system...",
      "Configuring GPU drivers...",
      "Installing software stack...",
      "Finalizing setup..."
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: steps[i],
        description: `Step ${i + 1} of ${steps.length}`,
      });
    }
    
    setDeploymentStep(3);
    setIsDeploying(false);
    
    toast({
      title: "Deployment Complete!",
      description: "Your GPU instance is ready to use.",
    });
  };

  const selectedTemplateData = deploymentTemplates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Deployment Progress</span>
              <span>{deploymentStep + 1} of {deploymentSteps.length}</span>
            </div>
            <Progress value={(deploymentStep / (deploymentSteps.length - 1)) * 100} className="h-2" />
            <div className="flex justify-between">
              {deploymentSteps.map((step, index) => (
                <div key={index} className={`text-center ${index <= deploymentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    index <= deploymentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {index < deploymentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <div className="text-xs font-medium">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {deploymentStep === 0 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Rocket className="h-5 w-5 text-primary" />
                Choose Your Deployment Template
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-4">
                {deploymentTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedTemplate === template.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{template.icon}</div>
                            <div>
                              <h3 className="font-semibold">{template.name}</h3>
                              <p className="text-sm text-muted-foreground">{template.description}</p>
                            </div>
                          </div>
                          <Badge variant={template.popularity === 'Most Popular' ? 'default' : 'secondary'}>
                            {template.popularity}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{template.estimatedTime}</span>
                          </div>
                          <div className="text-muted-foreground">
                            {template.resources.vram} VRAM • {template.resources.ram} RAM
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Pre-installed:</div>
                          <div className="flex flex-wrap gap-1">
                            {template.preInstalled.slice(0, 3).map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                            {template.preInstalled.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.preInstalled.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setDeploymentStep(1)}
                  disabled={!selectedTemplate}
                  className="px-8"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {deploymentStep === 1 && selectedTemplateData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Code className="h-5 w-5 text-blue-500" />
                Configure Your Environment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="instance-name">Instance Name</Label>
                    <Input 
                      id="instance-name" 
                      placeholder="my-gpu-instance" 
                      defaultValue={`${selectedTemplateData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ssh-key">SSH Public Key (Optional)</Label>
                    <Textarea 
                      id="ssh-key" 
                      placeholder="ssh-rsa AAAAB3NzaC1yc2E..." 
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startup-script">Startup Script (Optional)</Label>
                    <Textarea 
                      id="startup-script" 
                      placeholder="#!/bin/bash&#10;# Your startup commands here" 
                      rows={4}
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-lg">Instance Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Template:</span>
                        <span className="font-medium">{selectedTemplateData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GPU Memory:</span>
                        <span className="font-medium">{selectedTemplateData.resources.vram}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">System RAM:</span>
                        <span className="font-medium">{selectedTemplateData.resources.ram}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Storage:</span>
                        <span className="font-medium">{selectedTemplateData.resources.storage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Time:</span>
                        <span className="font-medium">{selectedTemplateData.estimatedTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Pre-installed Software</h4>
                      <div className="space-y-1">
                        {selectedTemplateData.preInstalled.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                            <CheckCircle className="h-3 w-3" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setDeploymentStep(0)}>
                  Back
                </Button>
                <Button onClick={handleDeploy} className="px-8">
                  Deploy Instance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {deploymentStep === 2 && (
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Terminal className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-2xl font-semibold">Deploying Your Instance</h3>
              <p className="text-muted-foreground">
                Setting up your {selectedTemplateData?.name} environment...
              </p>
            </div>
            <Progress value={75} className="h-3 max-w-md mx-auto" />
            <p className="text-sm text-muted-foreground">
              This usually takes {selectedTemplateData?.estimatedTime}
            </p>
          </CardContent>
        </Card>
      )}

      {deploymentStep === 3 && (
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold">Deployment Complete!</h3>
              <p className="text-muted-foreground">
                Your {selectedTemplateData?.name} instance is ready to use.
              </p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-6 max-w-md mx-auto">
              <h4 className="font-medium mb-4">Connection Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Address:</span>
                  <span className="font-mono">192.168.1.100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SSH Port:</span>
                  <span className="font-mono">22</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Username:</span>
                  <span className="font-mono">ubuntu</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button>
                <Terminal className="h-4 w-4 mr-2" />
                Open Terminal
              </Button>
              <Button variant="outline">
                <Play className="h-4 w-4 mr-2" />
                View Instance
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModernDeploymentWizard;
