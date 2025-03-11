import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnomalyChart } from "./AnomalyChart";
import { AnomalyAlerts, type AnomalyAlert } from "./AnomalyAlerts";

const anomalyData = [
  { timestamp: "00:00", value: 100, isAnomaly: false },
  { timestamp: "01:00", value: 120, isAnomaly: false },
  { timestamp: "02:00", value: 95, isAnomaly: false },
  { timestamp: "03:00", value: 250, isAnomaly: true },
  { timestamp: "04:00", value: 110, isAnomaly: false },
  { timestamp: "05:00", value: 105, isAnomaly: false },
  { timestamp: "06:00", value: 40, isAnomaly: true },
];

const initialAnomalyAlerts: AnomalyAlert[] = [
  {
    id: 1,
    type: "Spike",
    metric: "Order Volume",
    timestamp: "03:00",
    value: 250,
    threshold: 150,
    status: "Active",
  },
  {
    id: 2,
    type: "Drop",
    metric: "Order Volume",
    timestamp: "06:00",
    value: 40,
    threshold: 80,
    status: "Active",
  },
];

export function AnomalyDetection() {
  const [selectedTimeframe] = useState("last_24h");
  const [alerts, setAlerts] = useState<AnomalyAlert[]>(initialAnomalyAlerts);
  const { toast } = useToast();

  const handleInvestigate = (alertId: number) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: "Investigating" }
          : alert
      )
    );

    toast({
      title: "Investigation Started",
      description: "The anomaly is now being investigated by the system.",
    });
  };

  const handleDismiss = (alertId: number) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: "Dismissed" }
          : alert
      )
    );

    toast({
      title: "Alert Dismissed",
      description: "The anomaly alert has been dismissed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Anomaly Detection</h3>
          <Button variant="outline">Configure Alerts</Button>
        </div>

        <AnomalyChart data={anomalyData} />
        <AnomalyAlerts 
          alerts={alerts}
          onInvestigate={handleInvestigate}
          onDismiss={handleDismiss}
        />
      </div>
    </div>
  );
}
