import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const lowStockItems = [
  { name: "Product A", stock: 2, reorderPoint: 5 },
  { name: "Product B", stock: 1, reorderPoint: 10 },
  { name: "Product C", stock: 3, reorderPoint: 8 },
];

const deadStockItems = [
  { id: 1, name: "Product X", lastSold: "90+ days ago", value: 1200, quantity: 50, storageLocation: "Warehouse A" },
  { id: 2, name: "Product Y", lastSold: "120+ days ago", value: 2040, quantity: 30, storageLocation: "Warehouse B" },
  { id: 3, name: "Product Z", lastSold: "180+ days ago", value: 2000, quantity: 40, storageLocation: "Warehouse A" },
];

export function InventoryHealth() {
  const [showLowStockDialog, setShowLowStockDialog] = useState(false);
  const [showStockManagementDialog, setShowStockManagementDialog] = useState(false);
  const { toast } = useToast();

  const handleMarkForClearance = (itemId: number) => {
    toast({
      title: "Item Marked for Clearance",
      description: `Item ${itemId} has been marked for clearance sale.`,
    });
  };

  const handleMarkForDisposal = (itemId: number) => {
    toast({
      title: "Item Marked for Disposal",
      description: `Item ${itemId} has been marked for disposal.`,
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Inventory Health</h3>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Stock Turnover Rate</span>
            <span className="font-medium">4.5x</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Low Stock Items</span>
            <span className="font-medium text-yellow-600">12 items</span>
          </div>
          <Button variant="outline" className="w-full mt-2" onClick={() => setShowLowStockDialog(true)}>
            View Items
          </Button>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Dead Stock Value</span>
            <span className="font-medium text-red-600">$5,240</span>
          </div>
          <Button variant="outline" className="w-full mt-2" onClick={() => setShowStockManagementDialog(true)}>
            Manage Stock
          </Button>
        </div>
      </div>

      <Dialog open={showLowStockDialog} onOpenChange={setShowLowStockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Low Stock Items</DialogTitle>
            <DialogDescription>
              The following items are below their reorder points and need attention.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Current Stock: {item.stock}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Reorder Point: {item.reorderPoint}</p>
                    <p className="text-yellow-600 font-medium">Action Required</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showStockManagementDialog} onOpenChange={setShowStockManagementDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Dead Stock Management</DialogTitle>
            <DialogDescription>
              Review and manage items with no movement in the last 90 days
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="p-4 bg-white border rounded-lg">
              <h4 className="font-medium mb-2">Dead Stock Summary</h4>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-xl font-semibold">{deadStockItems.length}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-xl font-semibold text-red-600">
                    ${deadStockItems.reduce((acc, item) => acc + item.value, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Units</p>
                  <p className="text-xl font-semibold">
                    {deadStockItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {deadStockItems.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium">{item.name}</h5>
                        <p className="text-sm text-gray-500">Last sold: {item.lastSold}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${item.value.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{item.quantity} units</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Location: {item.storageLocation}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                        onClick={() => handleMarkForClearance(item.id)}
                      >
                        Mark for Clearance
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleMarkForDisposal(item.id)}
                      >
                        Mark for Disposal
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
