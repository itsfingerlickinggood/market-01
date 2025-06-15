
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Cpu, HardDrive, Zap, Thermometer, Gauge } from "lucide-react";

interface EnhancedHardwareSectionProps {
  gpu: any;
  detailed?: boolean;
}

const EnhancedHardwareSection = ({ gpu, detailed = false }: EnhancedHardwareSectionProps) => {
  // Enhanced GPU specifications based on model
  const getEnhancedGpuSpecs = (gpuName: string) => {
    const name = gpuName?.toLowerCase() || '';
    
    if (name.includes('h100')) {
      return {
        cudaCores: 16896,
        tensorCores: 528,
        rtCores: 0,
        baseClock: '1410 MHz',
        boostClock: '1980 MHz',
        memoryBandwidth: '3.35 TB/s',
        fabricBandwidth: '900 GB/s',
        powerDraw: '700W',
        architecture: 'Hopper',
        manufacturingProcess: '4nm TSMC'
      };
    } else if (name.includes('a100')) {
      return {
        cudaCores: 6912,
        tensorCores: 432,
        rtCores: 0,
        baseClock: '1065 MHz',
        boostClock: '1410 MHz',
        memoryBandwidth: '1.94 TB/s',
        fabricBandwidth: '600 GB/s',
        powerDraw: '400W',
        architecture: 'Ampere',
        manufacturingProcess: '7nm TSMC'
      };
    } else if (name.includes('rtx 4090')) {
      return {
        cudaCores: 16384,
        tensorCores: 512,
        rtCores: 128,
        baseClock: '1395 MHz',
        boostClock: '2520 MHz',
        memoryBandwidth: '1008 GB/s',
        fabricBandwidth: 'N/A',
        powerDraw: '450W',
        architecture: 'Ada Lovelace',
        manufacturingProcess: '4nm TSMC'
      };
    }
    
    // Default fallback
    return {
      cudaCores: 2048,
      tensorCores: 64,
      rtCores: 0,
      baseClock: '1000 MHz',
      boostClock: '1500 MHz',
      memoryBandwidth: '500 GB/s',
      fabricBandwidth: 'N/A',
      powerDraw: '200W',
      architecture: 'Unknown',
      manufacturingProcess: 'Unknown'
    };
  };

  const gpuSpecs = getEnhancedGpuSpecs(gpu.gpu_name);
  const performanceScore = Math.round((gpu.reliability2 || gpu.reliability || 0.8) * 100);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            GPU Specifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Model</h4>
              <p className="text-lg font-bold">{gpu.gpu_name}</p>
              <Badge variant="secondary">{gpuSpecs.architecture}</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">VRAM</h4>
              <p className="text-lg font-bold">{gpu.gpu_ram || 24}GB</p>
              <p className="text-xs text-muted-foreground">Bandwidth: {gpuSpecs.memoryBandwidth}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">CUDA Cores</h4>
              <p className="text-lg font-bold">{gpuSpecs.cudaCores.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Tensor Cores: {gpuSpecs.tensorCores}</p>
            </div>
          </div>

          {detailed && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Clock Speeds</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Base Clock:</span>
                    <span className="font-medium">{gpuSpecs.baseClock}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Boost Clock:</span>
                    <span className="font-medium">{gpuSpecs.boostClock}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Power & Thermal</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>TDP:</span>
                    <span className="font-medium">{gpuSpecs.powerDraw}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Process:</span>
                    <span className="font-medium">{gpuSpecs.manufacturingProcess}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-green-500" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">CPU</h4>
              <p className="font-bold">{gpu.cpu_cores || 16} Cores</p>
              <p className="text-xs text-muted-foreground">Intel Xeon / AMD EPYC</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">System RAM</h4>
              <p className="font-bold">{gpu.cpu_ram || 64}GB</p>
              <p className="text-xs text-muted-foreground">DDR4/DDR5 ECC</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Storage</h4>
              <p className="font-bold">{gpu.disk_space || 500}GB</p>
              <p className="text-xs text-muted-foreground">NVMe SSD</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Network</h4>
              <p className="font-bold">{gpu.inet_down || '10Gbps'}</p>
              <p className="text-xs text-muted-foreground">Up to {gpu.inet_up || '10Gbps'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-purple-500" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Performance</span>
              <span className="text-sm font-bold">{performanceScore}%</span>
            </div>
            <Progress value={performanceScore} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">A+</div>
              <div className="text-xs text-muted-foreground">AI/ML Training</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600">A</div>
              <div className="text-xs text-muted-foreground">Gaming</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">A</div>
              <div className="text-xs text-muted-foreground">Rendering</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedHardwareSection;
