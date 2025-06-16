import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workload } from '@/components/WorkloadSelector';

interface WorkloadContextType {
  selectedWorkload: Workload | null;
  setSelectedWorkload: (workload: Workload | null) => void;
  isOnboarded: boolean;
  setIsOnboarded: (onboarded: boolean) => void;
}

const WorkloadContext = createContext<WorkloadContextType | undefined>(undefined);

export const useWorkload = () => {
  const context = useContext(WorkloadContext);
  if (!context) {
    throw new Error('useWorkload must be used within a WorkloadProvider');
  }
  return context;
};

interface WorkloadProviderProps {
  children: React.ReactNode;
}

export const WorkloadProvider = ({ children }: WorkloadProviderProps) => {
  const [selectedWorkload, setSelectedWorkload] = useState<Workload | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(true); // Set to true by default to skip onboarding

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('userWorkload');
    
    if (saved) {
      try {
        setSelectedWorkload(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved workload:', e);
      }
    }
    
    // Always set isOnboarded to true to skip the onboarding flow
    setIsOnboarded(true);
    localStorage.setItem('isOnboarded', 'true');
  }, []);

  // Save to localStorage when workload changes
  useEffect(() => {
    if (selectedWorkload) {
      localStorage.setItem('userWorkload', JSON.stringify(selectedWorkload));
      localStorage.setItem('isOnboarded', 'true');
      setIsOnboarded(true);
    }
  }, [selectedWorkload]);

  return (
    <WorkloadContext.Provider value={{
      selectedWorkload,
      setSelectedWorkload,
      isOnboarded,
      setIsOnboarded
    }}>
      {children}
    </WorkloadContext.Provider>
  );
};