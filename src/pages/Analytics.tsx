
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  TrendingUp, 
  Users, 
  Search, 
  GitCompare, 
  DollarSign, 
  Target,
  Brain,
  Download,
  Eye,
  Clock,
  Shield,
  Zap
} from "lucide-react";
import Header from "@/components/Header";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  // Sample data for analytics
  const searchPatterns = [
    { month: "Jan", searches: 45, comparisons: 12 },
    { month: "Feb", searches: 52, comparisons: 18 },
    { month: "Mar", searches: 48, comparisons: 15 },
    { month: "Apr", searches: 61, comparisons: 22 },
    { month: "May", searches: 55, comparisons: 19 },
    { month: "Jun", searches: 67, comparisons: 25 }
  ];

  const gpuPreferences = [
    { name: "NVIDIA RTX 4090", value: 35, color: "#22c55e" },
    { name: "NVIDIA RTX 4080", value: 25, color: "#3b82f6" },
    { name: "AMD RX 7900 XTX", value: 20, color: "#f59e0b" },
    { name: "NVIDIA RTX 4070", value: 15, color: "#8b5cf6" },
    { name: "Others", value: 5, color: "#6b7280" }
  ];

  const spendingData = [
    { month: "Jan", cost: 450, saved: 120 },
    { month: "Feb", cost: 520, saved: 150 },
    { month: "Mar", cost: 380, saved: 90 },
    { month: "Apr", cost: 610, saved: 180 },
    { month: "May", cost: 490, saved: 140 },
    { month: "Jun", cost: 580, saved: 200 }
  ];

  const behaviorMetrics = [
    { category: "Search Efficiency", score: 85, trend: "+12%" },
    { category: "Decision Speed", score: 78, trend: "+8%" },
    { category: "Cost Optimization", score: 92, trend: "+15%" },
    { category: "Feature Utilization", score: 67, trend: "+5%" }
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
                <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
                <p className="text-muted-foreground text-lg">Deep insights into your GPU research behavior and preferences</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
                <Button variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">328</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-400">+23%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comparisons Made</CardTitle>
                <GitCompare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">111</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-400">+18%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,180</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-400">+32%</span> optimization
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-400">+12%</span> improvement
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Analytics Tabs */}
          <Tabs defaultValue="behavior" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-muted/50">
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="patterns">Search Patterns</TabsTrigger>
              <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
              <TabsTrigger value="spending">Spending</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            {/* User Behavior Analytics */}
            <TabsContent value="behavior" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Search & Comparison Activity
                    </CardTitle>
                    <CardDescription>Your research activity over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={searchPatterns}>
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

                <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Behavior Metrics
                    </CardTitle>
                    <CardDescription>Key performance indicators for your research habits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {behaviorMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{metric.category}</span>
                          <Badge variant="secondary" className="text-green-400">
                            {metric.trend}
                          </Badge>
                        </div>
                        <Progress value={metric.score} className="h-2" />
                        <span className="text-xs text-muted-foreground">{metric.score}% efficiency</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Time Spent Analysis
                  </CardTitle>
                  <CardDescription>How you allocate time across different activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">2.3h</div>
                      <p className="text-sm text-muted-foreground">Avg. per session</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">18m</div>
                      <p className="text-sm text-muted-foreground">Decision time</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">4.2</div>
                      <p className="text-sm text-muted-foreground">GPUs compared</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preference Intelligence */}
            <TabsContent value="preferences" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                  <CardHeader>
                    <CardTitle>GPU Preference Distribution</CardTitle>
                    <CardDescription>Your most researched GPU models</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={gpuPreferences}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {gpuPreferences.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                  <CardHeader>
                    <CardTitle>Feature Priorities</CardTitle>
                    <CardDescription>What matters most in your GPU selection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { feature: "Performance/FLOPS", priority: 95 },
                      { feature: "Memory Capacity", priority: 88 },
                      { feature: "Cost Efficiency", priority: 82 },
                      { feature: "Power Consumption", priority: 76 },
                      { feature: "Brand Reputation", priority: 68 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.feature}</span>
                          <span className="text-sm text-muted-foreground">{item.priority}%</span>
                        </div>
                        <Progress value={item.priority} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* AI Insights */}
            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Predictive Insights
                  </CardTitle>
                  <CardDescription>AI-powered predictions for your GPU needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-border/40 rounded-lg bg-muted/20">
                      <h4 className="font-semibold mb-2">Next GPU Recommendation</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on your research patterns, we predict you'll need a high-memory GPU for AI workloads.
                      </p>
                      <Badge className="bg-green-500/20 text-green-400">
                        <Zap className="h-3 w-3 mr-1" />
                        RTX 4090 - 95% match
                      </Badge>
                    </div>

                    <div className="p-4 border border-border/40 rounded-lg bg-muted/20">
                      <h4 className="font-semibold mb-2">Optimal Timing</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        GPU prices typically drop 15% in Q4. Consider waiting 2-3 months for better deals.
                      </p>
                      <Badge className="bg-blue-500/20 text-blue-400">
                        <Clock className="h-3 w-3 mr-1" />
                        Save ~$280
                      </Badge>
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-6">
                    <h4 className="font-semibold mb-4">Peer Comparison</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border border-border/40 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">Top 15%</div>
                        <p className="text-sm text-muted-foreground">Research Efficiency</p>
                      </div>
                      <div className="text-center p-4 border border-border/40 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">Top 25%</div>
                        <p className="text-sm text-muted-foreground">Cost Optimization</p>
                      </div>
                      <div className="text-center p-4 border border-border/40 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">Top 10%</div>
                        <p className="text-sm text-muted-foreground">Feature Knowledge</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Spending Analysis */}
            <TabsContent value="spending" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Cost Analysis & Optimization
                  </CardTitle>
                  <CardDescription>Track your spending and identify savings opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={spendingData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cost" fill="#ef4444" name="Total Cost" />
                      <Bar dataKey="saved" fill="#22c55e" name="Savings" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
