
import { useQuery } from '@tanstack/react-query';
import { generateGPUData } from '@/utils/gpuDataGenerator';

// Simulate API call with generated data
const fetchVastAiOffers = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return our generated GPU data
  return generateGPUData();
};

export const useVastAiOffers = () => {
  return useQuery({
    queryKey: ['vast-ai-offers'],
    queryFn: fetchVastAiOffers,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    staleTime: 5000, // Consider data stale after 5 seconds
  });
};
