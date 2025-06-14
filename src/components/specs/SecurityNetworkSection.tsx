
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Wifi } from "lucide-react";

interface SecurityNetworkSectionProps {
  gpu: any;
}

const SecurityNetworkSection = ({ gpu }: SecurityNetworkSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Security Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Secure Boot</span>
            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Memory Encryption</span>
            <Badge className="bg-green-100 text-green-800">AES-256</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Network Isolation</span>
            <Badge className="bg-green-100 text-green-800">VPC</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Data at Rest</span>
            <Badge className="bg-green-100 text-green-800">Encrypted</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-blue-500" />
            Network & Connectivity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bandwidth:</span>
            <span className="font-medium">{gpu.inet_down || '10Gbps'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Latency:</span>
            <span className="font-medium">~15ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Uptime SLA:</span>
            <span className="font-medium">99.9%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">DDoS Protection:</span>
            <span className="font-medium">Included</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityNetworkSection;
