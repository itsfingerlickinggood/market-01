
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, Zap, Target, Maximize2 } from "lucide-react";

const AdvancedChartGrid = () => {
  // Activity Heatmap Data
  const heatmapData = [
    { day: 'Mon', hour0: 2, hour6: 8, hour12: 25, hour18: 35, hour24: 12 },
    { day: 'Tue', hour0: 3, hour6: 12, hour12: 30, hour18: 40, hour24: 15 },
    { day: 'Wed', hour0: 1, hour6: 15, hour12: 35, hour18: 45, hour24: 18 },
    { day: 'Thu', hour0: 4, hour6: 10, hour12: 32, hour18: 42, hour24: 16 },
    { day: 'Fri', hour0: 2, hour6: 18, hour12: 38, hour18: 48, hour24: 20 },
    { day: 'Sat', hour0: 6, hour6: 22, hour12: 28, hour18: 35, hour24: 25 },
    { day: 'Sun', hour0: 8, hour6: 20, hour12: 25, hour18: 30, hour24: 22 }
  ];

  // Radar Chart Data
  const radarData = [
    { metric: 'Performance', value: 85, fullMark: 100 },
    { metric: 'Price Sensitivity', value: 70, fullMark: 100 },
    { metric: 'Brand Loyalty', value: 60, fullMark: 100 },
    { metric: 'Feature Focus', value: 90, fullMark: 100 },
    { metric: 'Research Depth', value: 95, fullMark: 100 },
    { metric: 'Decision Speed', value: 40, fullMark: 100 }
  ];

  // User Journey Data
  const journeyData = [
    { stage: 'Search', users: 1000, color: '#3b82f6' },
    { stage: 'Compare', users: 650, color: '#10b981' },
    { stage: 'Detail View', users: 400, color: '#f59e0b' },
    { stage: 'Provider Check', users: 250, color: '#ef4444' },
    { stage: 'Decision', users: 180, color: '#8b5cf6' }
  ];

  // Prediction Data
  const predictionData = [
    { month: 'Jan', actual: 45, predicted: null },
    { month: 'Feb', actual: 52, predicted: null },
    { month: 'Mar', actual: 48, predicted: null },
    { month: 'Apr', actual: 61, predicted: null },
    { month: 'May', actual: 55, predicted: null },
    { month: 'Jun', actual: 67, predicted: null },
    { month: 'Jul', actual: null, predicted: 72 },
    { month: 'Aug', actual: null, predicted: 78 },
    { month: 'Sep', actual: null, predicted: 75 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Activity Heatmap */}
      <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Weekly Activity Heatmap
              </CardTitle>
              <CardDescription>Search intensity patterns throughout the week</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={heatmapData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="hour0" stackId="1" stroke="#1e40af" fill="#1e40af" fillOpacity={0.3} />
              <Area type="monotone" dataKey="hour6" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.4} />
              <Area type="monotone" dataKey="hour12" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              <Area type="monotone" dataKey="hour18" stackId="1" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.6} />
              <Area type="monotone" dataKey="hour24" stackId="1" stroke="#93c5fd" fill="#93c5fd" fillOpacity={0.7} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Radar */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            User Profile Analysis
          </CardTitle>
          <CardDescription>Multi-dimensional behavior analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" className="text-xs" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* User Journey Funnel */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            User Journey Funnel
          </CardTitle>
          <CardDescription>Conversion flow through research stages</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={journeyData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" />
              <Tooltip />
              <Bar dataKey="users" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                AI-Powered Trend Predictions
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                  Machine Learning
                </Badge>
              </CardTitle>
              <CardDescription>Forecasted search patterns based on historical data</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">87% Accuracy</Badge>
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#22c55e" 
                fill="#22c55e" 
                fillOpacity={0.4}
                name="Actual Data"
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.3}
                strokeDasharray="5 5"
                name="Predicted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedChartGrid;
