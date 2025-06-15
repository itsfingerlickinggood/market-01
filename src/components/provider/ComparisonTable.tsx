
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Provider } from "@/types/gpu-comparison";

interface ComparisonTableProps {
  providers: Provider[];
}

const ComparisonTable = ({ providers }: ComparisonTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Provider</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Setup Time</th>
                <th className="text-left p-3 font-medium">Rating</th>
                <th className="text-left p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider) => (
                <tr key={provider.name} className="border-b hover:bg-accent/50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: provider.color }}></span>
                      <span className="font-medium">{provider.name}</span>
                    </div>
                  </td>
                  <td className="p-3 font-semibold">${provider.pricing.hourly}/hr</td>
                  <td className="p-3">{provider.setupTime}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span>{provider.rating}</span>
                      <Progress value={provider.rating * 20} className="h-1 w-16" />
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant={
                      provider.availability === 'available' ? 'default' :
                      provider.availability === 'limited' ? 'secondary' : 'destructive'
                    } className="text-xs">
                      {provider.availability}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonTable;
