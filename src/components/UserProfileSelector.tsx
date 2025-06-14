
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserProfile, WorkloadType } from '@/types/gpu-recommendation';
import { 
  Zap, 
  Building, 
  User, 
  GraduationCap, 
  Brain, 
  Cpu, 
  Palette, 
  Gamepad2,
  Monitor,
  Target 
} from 'lucide-react';

interface UserProfileSelectorProps {
  onProfileUpdate: (profile: UserProfile) => void;
  currentProfile: UserProfile;
}

const UserProfileSelector = ({ onProfileUpdate, currentProfile }: UserProfileSelectorProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const organizationTypes = [
    { value: 'startup', label: 'Startup', icon: Zap, desc: 'Fast iteration, cost-conscious' },
    { value: 'enterprise', label: 'Enterprise', icon: Building, desc: 'Compliance, reliability focus' },
    { value: 'individual', label: 'Individual', icon: User, desc: 'Personal projects, learning' },
    { value: 'research', label: 'Research', icon: GraduationCap, desc: 'Academic, non-profit' }
  ];

  const workloadTypes = [
    { value: 'ai-training', label: 'AI Training', icon: Brain, desc: 'Large models, multi-GPU' },
    { value: 'ai-inference', label: 'AI Inference', icon: Target, desc: 'Real-time prediction' },
    { value: 'hpc', label: 'HPC', icon: Cpu, desc: 'Scientific computing' },
    { value: 'creative', label: 'Creative', icon: Palette, desc: 'Rendering, video editing' },
    { value: 'gaming', label: 'Gaming', icon: Gamepad2, desc: 'Cloud gaming, streaming' },
    { value: 'general', label: 'General', icon: Monitor, desc: 'Mixed workloads' }
  ];

  const budgetRanges = [
    { value: 'low', label: 'Cost-Focused', desc: 'Under $1/hour, spot instances' },
    { value: 'medium', label: 'Balanced', desc: '$1-3/hour, mix of options' },
    { value: 'high', label: 'Performance-First', desc: '$3+/hour, latest hardware' }
  ];

  const updateProfile = (key: keyof UserProfile, value: any) => {
    onProfileUpdate({
      ...currentProfile,
      [key]: value
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Tell us about your needs
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Get personalized GPU recommendations based on your specific requirements
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Organization Type */}
        <div>
          <label className="text-sm font-medium mb-3 block">Organization Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {organizationTypes.map((org) => {
              const Icon = org.icon;
              return (
                <Button
                  key={org.value}
                  variant={currentProfile.organization === org.value ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center text-center"
                  onClick={() => updateProfile('organization', org.value)}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{org.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Workload Type */}
        <div>
          <label className="text-sm font-medium mb-3 block">Primary Workload</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {workloadTypes.map((workload) => {
              const Icon = workload.icon;
              return (
                <Button
                  key={workload.value}
                  variant={currentProfile.workloadType === workload.value ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center text-center"
                  onClick={() => updateProfile('workloadType', workload.value)}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{workload.label}</span>
                  <span className="text-xs text-muted-foreground">{workload.desc}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="text-sm font-medium mb-3 block">Budget Preference</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {budgetRanges.map((budget) => (
              <Button
                key={budget.value}
                variant={currentProfile.budgetRange === budget.value ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-start text-left"
                onClick={() => updateProfile('budgetRange', budget.value)}
              >
                <span className="font-medium">{budget.label}</span>
                <span className="text-xs text-muted-foreground">{budget.desc}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="pt-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="mb-3"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </Button>
          
          {showAdvanced && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Data Compliance</label>
                <select
                  value={currentProfile.dataCompliance}
                  onChange={(e) => updateProfile('dataCompliance', e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                >
                  <option value="none">No specific requirements</option>
                  <option value="gdpr">GDPR Compliance</option>
                  <option value="hipaa">HIPAA Compliance</option>
                  <option value="sox">SOX Compliance</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Scalability Needs</label>
                <select
                  value={currentProfile.scalabilityNeeds}
                  onChange={(e) => updateProfile('scalabilityNeeds', e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                >
                  <option value="static">Static - Predictable usage</option>
                  <option value="dynamic">Dynamic - Variable workloads</option>
                  <option value="burst">Burst - Occasional spikes</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileSelector;
