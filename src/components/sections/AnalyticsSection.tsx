import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { NaturalLanguageQuery } from "@/components/NaturalLanguageQuery";
import { DemandForecast } from "@/components/DemandForecast";
import { SalesPerformance } from "@/components/analytics/SalesPerformance";
import { InventoryHealth } from "@/components/analytics/InventoryHealth";
import { AnomalyDetection } from "@/components/analytics/AnomalyDetection";

export function AnalyticsSection() {
  const [timeframe, setTimeframe] = useState("week");
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Report Exported",
      description: `Sales report for ${timeframe} has been downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">E-commerce Analytics</h2>
        <div className="flex gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>Export Report</Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Natural Language Analytics</h3>
        <NaturalLanguageQuery />
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <DemandForecast />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesPerformance />
        <InventoryHealth />
      </div>

      <AnomalyDetection />
    </div>
  );
}
