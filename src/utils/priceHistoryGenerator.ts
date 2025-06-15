
import { Provider } from "@/types/gpu-comparison";

// Generate mock price history data
export const generatePriceHistory = (provider: Provider, days: number = 30) => {
  const data = [];
  const basePrice = provider.pricing.hourly;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some realistic price variation
    const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
    const price = basePrice * (1 + variation);
    
    data.push({
      date: date.toISOString().split('T')[0],
      [provider.name]: Number(price.toFixed(3))
    });
  }
  
  return data;
};

export const combinePriceHistoryData = (providers: Provider[]) => {
  return providers.reduce((acc, provider) => {
    const providerData = generatePriceHistory(provider);
    
    providerData.forEach((item, index) => {
      if (!acc[index]) {
        acc[index] = { date: item.date };
      }
      acc[index][provider.name] = item[provider.name];
    });
    
    return acc;
  }, [] as any[]);
};
