import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface AnomalyDataPoint {
  timestamp: string;
  value: number;
  isAnomaly: boolean;
}

interface AnomalyChartProps {
  data: AnomalyDataPoint[];
}

export function AnomalyChart({ data }: AnomalyChartProps) {
  return (
    <div className="h-[300px] mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={(props) => {
              const isAnomaly = data[props.index]?.isAnomaly;
              if (isAnomaly) {
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={6}
                    fill="#ef4444"
                    stroke="none"
                  />
                );
              }
              return null;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
