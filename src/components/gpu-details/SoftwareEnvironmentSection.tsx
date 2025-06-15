
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, Package, Terminal, Container, Palette, Gamepad2 } from "lucide-react";

interface SoftwareEnvironmentSectionProps {
  gpu: any;
}

const SoftwareEnvironmentSection = ({ gpu }: SoftwareEnvironmentSectionProps) => {
  const operatingSystems = [
    { name: 'Ubuntu 22.04 LTS', status: 'available', recommended: true },
    { name: 'Ubuntu 20.04 LTS', status: 'available', recommended: false },
    { name: 'CentOS 8', status: 'available', recommended: false },
    { name: 'Windows Server 2022', status: 'limited', recommended: false },
    { name: 'Container-Optimized OS', status: 'available', recommended: false }
  ];

  const cudaVersions = [
    { version: '12.2', status: 'latest', recommended: true },
    { version: '11.8', status: 'stable', recommended: true },
    { version: '11.6', status: 'stable', recommended: false },
    { version: '11.2', status: 'legacy', recommended: false },
    { version: '10.2', status: 'legacy', recommended: false }
  ];

  const templateCategories = [
    {
      category: 'AI/ML Frameworks',
      icon: <Package className="h-4 w-4" />,
      templates: [
        { name: 'PyTorch 2.1', description: 'Latest PyTorch with CUDA support', popular: true },
        { name: 'TensorFlow 2.14', description: 'Production-ready TensorFlow', popular: true },
        { name: 'JAX', description: 'NumPy-compatible research framework', popular: false },
        { name: 'Hugging Face Transformers', description: 'Pre-trained transformer models', popular: true },
        { name: 'FastAI', description: 'High-level deep learning library', popular: false }
      ]
    },
    {
      category: 'Development Tools',
      icon: <Terminal className="h-4 w-4" />,
      templates: [
        { name: 'Jupyter Lab', description: 'Interactive development environment', popular: true },
        { name: 'VS Code Server', description: 'Cloud-based VS Code', popular: true },
        { name: 'Docker CE', description: 'Container runtime', popular: true },
        { name: 'Kubernetes', description: 'Container orchestration', popular: false },
        { name: 'Git & SSH', description: 'Version control and remote access', popular: true }
      ]
    },
    {
      category: 'Rendering & Graphics',
      icon: <Palette className="h-4 w-4" />,
      templates: [
        { name: 'Blender 4.0', description: '3D modeling and animation', popular: true },
        { name: 'Maya 2024', description: 'Professional 3D software', popular: false },
        { name: 'Cinema 4D', description: '3D motion graphics', popular: false },
        { name: 'Unreal Engine 5', description: 'Game engine and rendering', popular: true },
        { name: 'Unity 2023', description: 'Game development platform', popular: true }
      ]
    },
    {
      category: 'Gaming',
      icon: <Gamepad2 className="h-4 w-4" />,
      templates: [
        { name: 'Steam', description: 'Gaming platform', popular: true },
        { name: 'Parsec', description: 'Cloud gaming streaming', popular: true },
        { name: 'Moonlight', description: 'NVIDIA GameStream client', popular: false },
        { name: 'OBS Studio', description: 'Broadcasting software', popular: true }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-blue-500" />
            Operating Systems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {operatingSystems.map((os) => (
              <div
                key={os.name}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{os.name}</span>
                    {os.recommended && (
                      <Badge variant="default" className="text-xs">Recommended</Badge>
                    )}
                  </div>
                </div>
                <Badge 
                  variant={os.status === 'available' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {os.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Container className="h-5 w-5 text-green-500" />
            CUDA Versions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {cudaVersions.map((cuda) => (
              <div
                key={cuda.version}
                className="text-center p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="font-bold text-lg">{cuda.version}</div>
                <Badge 
                  variant={cuda.recommended ? 'default' : 'secondary'}
                  className="text-xs mt-1"
                >
                  {cuda.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {templateCategories.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.templates.map((template) => (
                  <div
                    key={template.name}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{template.name}</h4>
                      {template.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Install Template
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SoftwareEnvironmentSection;
