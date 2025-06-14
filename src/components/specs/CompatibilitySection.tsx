
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const CompatibilitySection = () => {
  const useCases = [
    { name: "Deep Learning", compatibility: 95, frameworks: ["TensorFlow", "PyTorch", "JAX"] },
    { name: "Game Development", compatibility: 88, frameworks: ["Unity", "Unreal", "Godot"] },
    { name: "Video Production", compatibility: 92, frameworks: ["Premiere", "DaVinci", "Blender"] },
    { name: "Scientific Computing", compatibility: 85, frameworks: ["CUDA", "OpenCL", "Jupyter"] }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Use Case Compatibility</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {useCases.map((useCase) => (
            <div key={useCase.name} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">{useCase.name}</span>
                <span className="text-sm font-bold">{useCase.compatibility}% Compatible</span>
              </div>
              <Progress value={useCase.compatibility} className="h-2" />
              <div className="flex flex-wrap gap-2">
                {useCase.frameworks.map((framework) => (
                  <Badge key={framework} variant="secondary" className="text-xs">
                    {framework}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompatibilitySection;
