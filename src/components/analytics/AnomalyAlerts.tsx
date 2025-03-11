import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AnomalyAlert {
  id: number;
  type: string;
  metric: string;
  timestamp: string;
  value: number;
  threshold: number;
  status: "Active" | "Investigating" | "Dismissed";
}

interface AnomalyAlertsProps {
  alerts: AnomalyAlert[];
  onInvestigate: (alertId: number) => void;
  onDismiss: (alertId: number) => void;
}

export function AnomalyAlerts({ alerts, onInvestigate, onDismiss }: AnomalyAlertsProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Active Anomaly Alerts</h4>
      {alerts
        .filter(alert => alert.status !== "Dismissed")
        .map((alert) => (
          <div
            key={alert.id}
            className={`p-4 ${
              alert.status === "Investigating" 
                ? "bg-yellow-50 border-yellow-200" 
                : "bg-red-50 border-red-200"
            } border rounded-lg`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 ${
                alert.status === "Investigating" 
                  ? "text-yellow-600" 
                  : "text-red-600"
              } mt-1`} />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {alert.type} Detected in {alert.metric}
                    </h5>
                    <p className="text-sm text-gray-600">
                      Value: {alert.value} (Threshold: {alert.threshold})
                    </p>
                  </div>
                  <span className="text-sm text-red-600 font-medium">
                    {alert.timestamp}
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onInvestigate(alert.id)}
                    disabled={alert.status === "Investigating"}
                  >
                    {alert.status === "Investigating" ? "Investigating..." : "Investigate"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDismiss(alert.id)}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
