
import { useQuery } from "@tanstack/react-query";
import { generateGPUData } from "@/utils/gpuDataGenerator";

export const useVastAiOffers = () => {
  return useQuery({
    queryKey: ["vastai-offers"],
    queryFn: async () => {
      // Use the enhanced GPU data generator with Gemini API integration
      return await generateGPUData();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime with gcTime)
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes for real-time market data
  });
};
