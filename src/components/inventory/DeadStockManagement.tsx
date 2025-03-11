import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Archive, Trash2 } from "lucide-react";

// Sample data - in a real app, this would come from your backend
const deadStockData = [
  {
    id: 1,
    name: "Product XYZ",
    sku: "SKU123",
    daysInStock: 180,
    quantity: 50,
    lastSold: "2023-10-15",
    value: 2500,
  },
  {
    id: 2,
    name: "Product ABC",
    sku: "SKU456",
    daysInStock: 240,
    quantity: 30,
    lastSold: "2023-08-20",
    value: 1500,
  },
];

export function DeadStockManagement() {
  const [items, setItems] = useState(deadStockData);
  const { toast } = useToast();

  const handleClearance = (id: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, status: 'clearance' }
        : item
    ));
    
    toast({
      title: "Item Marked for Clearance",
      description: "The item has been marked for clearance sale.",
    });
  };

  const handleDisposal = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    
    toast({
      title: "Item Marked for Disposal",
      description: "The item has been marked for disposal.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Dead Stock Management</h3>
          <p className="text-sm text-gray-500">
            Items with no sales activity for over 180 days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            Total Value: ${items.reduce((acc, item) => acc + item.value, 0).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Days in Stock</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Last Sold</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>
                  <span className="text-red-600 font-medium">{item.daysInStock} days</span>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.lastSold}</TableCell>
                <TableCell>${item.value}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleClearance(item.id)}
                    >
                      <Archive className="w-4 h-4 mr-1" />
                      Clearance
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDisposal(item.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Disposal
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
