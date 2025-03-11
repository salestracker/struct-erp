import { ShoppingCart, Truck, Box, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { AiInsights } from "@/components/AiInsights";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DashboardSection() {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getDetailContent = () => {
    switch (selectedStat) {
      case "Daily Orders":
        return {
          title: "Daily Orders Breakdown",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium">New Orders</h4>
                  <p className="text-2xl font-bold">124</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium">Completed</h4>
                  <p className="text-2xl font-bold">32</p>
                </div>
              </div>
              <Button onClick={() => setShowDetails(false)} className="w-full">
                View All Orders
              </Button>
            </div>
          ),
        };
      case "Pending Shipments":
        return {
          title: "Shipment Details",
          content: (
            <div className="space-y-4">
              <div className="divide-y">
                <div className="py-3">
                  <h4 className="font-medium">Order #1234</h4>
                  <p className="text-sm text-gray-500">Awaiting pickup - NYC Warehouse</p>
                </div>
                <div className="py-3">
                  <h4 className="font-medium">Order #1235</h4>
                  <p className="text-sm text-gray-500">Processing - LA Warehouse</p>
                </div>
              </div>
              <Button onClick={() => setShowDetails(false)} className="w-full">
                Manage Shipments
              </Button>
            </div>
          ),
        };
      default:
        return { title: "", content: null };
    }
  };

  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
        E-commerce Operations Dashboard
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div onClick={() => {
          setSelectedStat("Daily Orders");
          setShowDetails(true);
        }}>
          <StatCard
            title="Daily Orders"
            value="156"
            icon={ShoppingCart}
            trend={{ value: "12%", positive: true }}
            className="cursor-pointer hover:shadow-md transition-shadow"
          />
        </div>
        <div onClick={() => {
          setSelectedStat("Pending Shipments");
          setShowDetails(true);
        }}>
          <StatCard
            title="Pending Shipments"
            value="45"
            icon={Truck}
            trend={{ value: "8%", positive: false }}
            className="cursor-pointer hover:shadow-md transition-shadow"
          />
        </div>
        <StatCard
          title="Low Stock Items"
          value="12"
          icon={Box}
          trend={{ value: "3", positive: false, description: "items" }}
        />
        <StatCard
          title="Returns Rate"
          value="2.4%"
          icon={AlertTriangle}
          trend={{ value: "0.5%", positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <ActivityFeed />
        <AiInsights />
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getDetailContent().title}</DialogTitle>
          </DialogHeader>
          {getDetailContent().content}
        </DialogContent>
      </Dialog>
    </>
  );
}
