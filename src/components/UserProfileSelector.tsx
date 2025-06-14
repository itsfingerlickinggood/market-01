
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
          <div className="flex flex-wrap gap-2">
            {organizationTypes.map((org) => {
              const Icon = org.icon;
              const isSelected = currentProfile.organization === org.value;
              return (
                <button
                  key={org.value}
                  onClick={() => updateProfile('organization', org.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {org.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workload Type */}
        <div>
          <label className="text-sm font-medium mb-3 block">Primary Workload</label>
          <div className="flex flex-wrap gap-2">
            {workloadTypes.map((workload) => {
              const Icon = workload.icon;
              const isSelected = currentProfile.workloadType === workload.value;
              return (
                <button
                  key={workload.value}
                  onClick={() => updateProfile('workloadType', workload.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {workload.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="text-sm font-medium mb-3 block">Budget Preference</label>
          <div className="flex flex-wrap gap-2">
            {budgetRanges.map((budget) => {
              const isSelected = currentProfile.budgetRange === budget.value;
              return (
                <button
                  key={budget.value}
                  onClick={() => updateProfile('budgetRange', budget.value)}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border'
                  }`}
                >
                  {budget.label}
                </button>
              );
            })}
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
                  className="w-full p-2 border rounded-md text-sm bg-card border-border"
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
                  className="w-full p-2 border rounded-md text-sm bg-card border-border"
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
