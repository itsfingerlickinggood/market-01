
import SupabaseGpuCard from "../SupabaseGpuCard";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SecurityCardProps {
  enhancedData: any;
}

const SecurityCard = ({ enhancedData }: SecurityCardProps) => {
  const content = (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground mb-2">Certifications & Standards:</div>
      <div className="flex flex-wrap gap-1 mb-3">
        {(enhancedData?.compliance || ['SOC 2', 'GDPR', 'HIPAA']).map((cert: string, index: number) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {cert}
          </Badge>
        ))}
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">
        <div>• End-to-end encryption (AES-256)</div>
        <div>• Isolated network environments</div>
        <div>• Regular security audits</div>
      </div>
    </div>
  );

  return (
    <SupabaseGpuCard
      title="Security & Compliance"
      description="Enterprise-grade security with industry certifications"
      icon={Shield}
      content={content}
      action="Security Details"
    />
  );
};

export default SecurityCard;
