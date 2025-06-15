
import MarketplaceDeal from "@/components/MarketplaceDeal";

interface Deal {
  id: string;
  company: string;
  model: string;
  basePrice: number;
  sites: string[];
  demandChange: string;
}

interface LiveMarketSectionProps {
  deals: Deal[];
}

const LiveMarketSection = ({ deals }: LiveMarketSectionProps) => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Live Market Data
        </h3>
        <p className="text-lg text-muted-foreground">
          Real-time pricing from leading cloud providers, updated every 3 seconds
        </p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <MarketplaceDeal key={deal.id} gpu={deal} />
        ))}
      </div>
    </div>
  );
};

export default LiveMarketSection;
