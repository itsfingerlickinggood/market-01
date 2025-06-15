
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code, 
  Download, 
  Copy, 
  FileText, 
  GitBranch,
  Terminal,
  Zap,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TerraformIntegrationProps {
  gpuName: string;
  providerId: string;
  region: string;
}

const TerraformIntegration = ({ gpuName, providerId, region }: TerraformIntegrationProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState("basic");
  const { toast } = useToast();

  const templates = {
    basic: {
      name: "Basic Instance",
      description: "Single GPU instance with standard configuration",
      code: `resource "gpumarket_instance" "example" {
  name     = "my-gpu-instance"
  gpu_type = "${gpuName}"
  region   = "${region}"
  
  image = "ubuntu-22.04-cuda-12.2"
  
  tags = {
    Environment = "development"
    Project     = "ai-training"
  }
}`
    },
    cluster: {
      name: "Multi-GPU Cluster",
      description: "Scalable cluster for distributed training",
      code: `resource "gpumarket_cluster" "example" {
  name     = "training-cluster"
  gpu_type = "${gpuName}"
  region   = "${region}"
  
  min_instances = 2
  max_instances = 8
  
  auto_scaling {
    enabled = true
    target_gpu_utilization = 80
  }
  
  networking {
    interconnect = "nvlink"
    bandwidth    = "400gbps"
  }
}`
    },
    jupyter: {
      name: "Jupyter Notebook",
      description: "Pre-configured Jupyter environment",
      code: `resource "gpumarket_instance" "jupyter" {
  name     = "jupyter-workspace"
  gpu_type = "${gpuName}"
  region   = "${region}"
  
  template = "jupyter-pytorch-tensorflow"
  
  storage {
    size = 100
    type = "ssd"
  }
  
  networking {
    expose_ports = [8888, 6006]  # Jupyter, TensorBoard
  }
  
  environment = {
    JUPYTER_PASSWORD = var.jupyter_password
  }
}`
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(templates[selectedTemplate as keyof typeof templates].code);
    toast({
      title: "Code copied!",
      description: "Terraform configuration copied to clipboard",
    });
  };

  const handleDownloadProvider = () => {
    toast({
      title: "Download started",
      description: "GPU Market Terraform provider is being downloaded",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Terraform Integration
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Infrastructure as Code for automated GPU deployments
            </p>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            Provider v1.2.3
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Start */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Quick Start
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Install the GPU Market Terraform provider</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Configure your API credentials</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Deploy and manage GPU resources</span>
            </div>
          </div>
        </div>

        {/* Installation */}
        <div>
          <h3 className="font-semibold mb-3">Installation</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400"># Add to your terraform configuration</span>
              <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <pre>{`terraform {
  required_providers {
    gpumarket = {
      source  = "gpumarket/gpumarket"
      version = "~> 1.2"
    }
  }
}

provider "gpumarket" {
  api_key = var.gpumarket_api_key
}`}</pre>
          </div>
        </div>

        {/* Template Selection */}
        <div>
          <h3 className="font-semibold mb-3">Configuration Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {Object.entries(templates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`p-3 border rounded-lg text-left transition-all ${
                  selectedTemplate === key
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-sm">{template.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {template.description}
                </div>
              </button>
            ))}
          </div>

          {/* Code Display */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-300">
                {templates[selectedTemplate as keyof typeof templates].name} Configuration
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
            <pre className="text-sm overflow-x-auto">
              {templates[selectedTemplate as keyof typeof templates].code}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleDownloadProvider}>
            <Download className="h-4 w-4 mr-2" />
            Download Provider
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Documentation
          </Button>
          <Button variant="outline">
            <GitBranch className="h-4 w-4 mr-2" />
            GitHub Repository
          </Button>
        </div>

        {/* Features */}
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            🚀 Enterprise Features
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• State management with automatic drift detection</li>
            <li>• Multi-region deployments with failover</li>
            <li>• Integration with monitoring and alerting systems</li>
            <li>• Cost optimization with spot instance management</li>
            <li>• Compliance controls and audit logging</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TerraformIntegration;
