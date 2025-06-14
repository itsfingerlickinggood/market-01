
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  Search, 
  GitCompare, 
  DollarSign, 
  Clock,
  Download,
  TrendingUp,
  Activity,
  Eye
} from "lucide-react";
import Header from "@/components/Header";

const Analytics = () => {
  // Simple sample data
  const monthlyActivity = [
    { month: "Jan", searches: 45, comparisons: 12 },
    { month: "Feb", searches: 52, comparisons: 18 },
    { month: "Mar", searches: 48, comparisons: 15 },
    { month: "Apr", searches: 61, comparisons: 22 },
    { month: "May", searches: 55, comparisons: 19 },
    { month: "Jun", searches: 67, comparisons: 25 }
  ];

  const brandPreferences = [
    { name: "NVIDIA", value: 65, color: "#22c55e" },
    { name: "AMD", value: 25, color: "#f59e0b" },
    { name: "Intel", value: 10, color: "#6b7280" }
  ];

  const priceRanges = [
    { range: "$0-500", count: 15 },
    { range: "$500-1000", count: 28 },
    { range: "$1000-2000", count: 35 },
    { range: "$2000+", count: 22 }
  ];

  const recentSearches = [
    "RTX 4090 vs RTX 4080",
    "Best GPU for AI training",
    "AMD RX 7900 XTX review",
    "Budget GPUs under $500",
    "RTX 4070 Ti performance"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Analytics</h1>
                <p className="text-muted-foreground text-lg">Your GPU research insights</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">328</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-400">+23%</span> this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comparisons</CardTitle>
                <GitCompare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">111</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-400">+18%</span> this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24h</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-400">2.1h</span> avg per session
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,180</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-400">$420</span> this month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Monthly Activity
                </CardTitle>
                <CardDescription>Your search and comparison trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyActivity}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="searches" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="comparisons" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Brand Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Preferences</CardTitle>
                <CardDescription>Your most researched brands</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={brandPreferences}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {brandPreferences.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Price Range Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Price Range Focus
                </CardTitle>
                <CardDescription>Distribution of your price interests</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={priceRanges}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Recent Searches
                </CardTitle>
                <CardDescription>Your latest GPU research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border/40 rounded-lg bg-muted/20">
                      <span className="text-sm">{search}</span>
                      <Badge variant="secondary" className="text-xs">
                        {Math.floor(Math.random() * 5) + 1}d ago
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Key Insights
              </CardTitle>
              <CardDescription>What your data tells us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-border/40 rounded-lg bg-muted/20">
                  <h4 className="font-semibold mb-2">Most Active Period</h4>
                  <p className="text-sm text-muted-foreground">
                    You research GPUs most actively in the evening hours, typically spending 2+ hours comparing options.
                  </p>
                </div>

                <div className="p-4 border border-border/40 rounded-lg bg-muted/20">
                  <h4 className="font-semibold mb-2">Preference Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    You consistently favor high-performance GPUs in the $1000-2000 range, primarily from NVIDIA.
                  </p>
                </div>

                <div className="p-4 border border-border/40 rounded-lg bg-muted/20">
                  <h4 className="font-semibold mb-2">Cost Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Your research helped save an average of $140 per GPU rental through better provider comparison.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
