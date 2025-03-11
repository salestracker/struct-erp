import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, RefreshCw } from "lucide-react";

// Sample forecast data
const forecastData = {
  "next_week": [
    { day: "Mon", actual: 4000, forecast: 4200 },
    { day: "Tue", actual: 3000, forecast: 3500 },
    { day: "Wed", actual: 2000, forecast: 2800 },
    { day: "Thu", actual: 2780, forecast: 3000 },
    { day: "Fri", actual: 1890, forecast: 2500 },
    { day: "Sat", actual: 2390, forecast: 2600 },
    { day: "Sun", actual: 3490, forecast: 3800 }
  ],
  "next_month": [
    { day: "Week 1", actual: 15000, forecast: 16000 },
    { day: "Week 2", actual: 14000, forecast: 15500 },
    { day: "Week 3", actual: 16500, forecast: 17000 },
    { day: "Week 4", actual: 17800, forecast: 18500 }
  ],
  "next_quarter": [
    { day: "Month 1", actual: 58000, forecast: 62000 },
    { day: "Month 2", actual: 65000, forecast: 68000 },
    { day: "Month 3", actual: 70000, forecast: 75000 }
  ]
};

export function DemandForecast() {
  const [timeframe, setTimeframe] = useState("next_week");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    try {
      const csvContent = "data:text/csv;charset=utf-8,Day,Actual,Forecast\n" + 
        forecastData[timeframe as keyof typeof forecastData]
          .map(row => `${row.day},${row.actual},${row.forecast}`)
          .join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `demand_forecast_${timeframe}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Forecast Exported",
        description: `Demand forecast for ${timeframe.replace("_", " ")} has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the forecast data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call to refresh forecast data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Forecast Updated",
        description: "The demand forecast has been refreshed with latest data.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to refresh forecast data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Demand Forecast</h3>
        <div className="flex gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next_week">Next Week</SelectItem>
              <SelectItem value="next_month">Next Month</SelectItem>
              <SelectItem value="next_quarter">Next Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="h-[400px] bg-white p-6 rounded-lg shadow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData[timeframe as keyof typeof forecastData]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#3b82f6" 
              name="Actual Sales"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#10b981" 
              name="Forecasted Sales"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-700 mb-2">Accuracy Score</h4>
          <p className="text-2xl font-bold text-blue-900">95%</p>
          <p className="text-sm text-blue-600">Based on historical predictions</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-700 mb-2">Growth Trend</h4>
          <p className="text-2xl font-bold text-green-900">+12.5%</p>
          <p className="text-sm text-green-600">Expected increase in demand</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium text-purple-700 mb-2">Confidence Level</h4>
          <p className="text-2xl font-bold text-purple-900">High</p>
          <p className="text-sm text-purple-600">Based on data quality</p>
        </div>
      </div>
    </div>
  );
}
