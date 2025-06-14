
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Zap } from "lucide-react";
import VastAiGrid from "@/components/VastAiGrid";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(to bottom, #000000 80%, #ffffff 20%)' 
    }}>
      {/* Header */}
      <header className="border-b bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-white" />
                <h1 className="text-2xl font-bold text-white">GPUTrade</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Dashboard</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Marketplace</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Analytics</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">Sign In</Button>
              <Button className="bg-white text-black hover:bg-gray-200">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search GPU models, hosts, or datacenters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-600 rounded-md text-sm bg-gray-800 text-white"
            >
              <option value="price">Sort by Price</option>
              <option value="performance">Sort by Reliability</option>
              <option value="availability">Sort by Availability</option>
            </select>
          </div>
        </div>

        {/* GPU Grid */}
        <VastAiGrid searchTerm={searchTerm} sortBy={sortBy} />
      </main>
    </div>
  );
};

export default Index;
