
import MarketplaceDeal from "@/components/MarketplaceDeal";

interface Deal {
  id: string;
  company: string;
  model: string;
  basePrice: number;
  sites: string[];
}

interface LiveMarketSectionProps {
  deals: Deal[];
}

const LiveMarketSection = ({ deals }: LiveMarketSectionProps) => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-semibold mb-4">Live Market Data</h3>
        <p className="text-lg text-muted-foreground">
          Real-time pricing from leading cloud providers, updated every 3 seconds
        </p>
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
