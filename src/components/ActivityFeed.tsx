import { Activity, ShoppingCart, Truck, RotateCcw, AlertCircle, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    title: "New order received",
    description: "Order #1234 from John Doe - 3 items, $245",
    time: "5 minutes ago",
    type: "order",
  },
  {
    id: 2,
    title: "Shipment dispatched",
    description: "Order #1230 shipped via FedEx - Tracking: FX123456789",
    time: "1 hour ago",
    type: "shipping",
  },
  {
    id: 3,
    title: "Return request",
    description: "Return #567 initiated for Order #1228 - Reason: Wrong size",
    time: "2 hours ago",
    type: "return",
  },
  {
    id: 4,
    title: "Low stock alert",
    description: "Product SKU-789 has reached reorder point (5 units remaining)",
    time: "3 hours ago",
    type: "inventory",
  },
  {
    id: 5,
    title: "Payment received",
    description: "Payment of $180 received for Order #1232",
    time: "4 hours ago",
    type: "payment",
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "order":
      return ShoppingCart;
    case "shipping":
      return Truck;
    case "return":
      return RotateCcw;
    case "payment":
      return DollarSign;
    case "inventory":
      return AlertCircle;
    default:
      return Activity;
  }
};

export function ActivityFeed() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex gap-4">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                {activity.id !== activities.length && (
                  <div className="absolute top-8 left-4 w-px h-4 bg-gray-200" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
