import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StockItem {
  id: number;
  name: string;
  currentStock: number;
  sku: string;
}

const demoItems: StockItem[] = [
  { id: 1, name: "Product A", currentStock: 150, sku: "SKU001" },
  { id: 2, name: "Product B", currentStock: 75, sku: "SKU002" },
  { id: 3, name: "Product C", currentStock: 200, sku: "SKU003" },
];

export function StockLevelManager() {
  const [items, setItems] = useState<StockItem[]>(demoItems);
  const [updateQuantities, setUpdateQuantities] = useState<{ [key: number]: string }>({});
  const { toast } = useToast();

  const handleQuantityChange = (itemId: number, value: string) => {
    setUpdateQuantities((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const updateStockLevel = (itemId: number) => {
    const newQuantity = parseInt(updateQuantities[itemId]);
    if (isNaN(newQuantity)) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, currentStock: newQuantity }
          : item
      )
    );

    setUpdateQuantities((prev) => {
      const newState = { ...prev };
      delete newState[itemId];
      return newState;
    });

    toast({
      title: "Stock Updated",
      description: "Stock level has been successfully updated",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Stock Level Management</h3>
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="text-base">{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <Label>SKU</Label>
                <p className="text-sm text-gray-600">{item.sku}</p>
              </div>
              <div>
                <Label>Current Stock</Label>
                <p className="text-sm text-gray-600">{item.currentStock} units</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`quantity-${item.id}`}>New Quantity</Label>
                <div className="flex gap-2">
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    value={updateQuantities[item.id] || ""}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    placeholder="Enter new quantity"
                    className="w-32"
                  />
                  <Button
                    onClick={() => updateStockLevel(item.id)}
                    disabled={!updateQuantities[item.id]}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
