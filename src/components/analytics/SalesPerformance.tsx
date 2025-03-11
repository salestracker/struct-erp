import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

export function SalesPerformance() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Sales Performance</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between">
          <span>Conversion Rate</span>
          <span className="font-medium">3.2%</span>
        </div>
        <div className="flex justify-between">
          <span>Average Order Value</span>
          <span className="font-medium">$85.50</span>
        </div>
        <div className="flex justify-between">
          <span>Cart Abandonment Rate</span>
          <span className="font-medium">68%</span>
        </div>
      </div>
    </div>
  );
}
