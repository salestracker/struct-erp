import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface InventoryItemFormProps {
  editItem?: {
    id: string;
    name: string;
    sku: string;
    description: string;
    quantity: number;
    reorderPoint: number;
    location: string;
  };
  onSubmit?: () => void;
}

export function InventoryItemForm({ editItem, onSubmit }: InventoryItemFormProps) {
  const [formData, setFormData] = useState({
    name: editItem?.name || "",
    sku: editItem?.sku || "",
    description: editItem?.description || "",
    quantity: editItem?.quantity || 0,
    reorderPoint: editItem?.reorderPoint || 5,
    location: editItem?.location || "",
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API call
    console.log("Submitting inventory item:", formData);
    
    toast({
      title: editItem ? "Item Updated" : "Item Added",
      description: `Successfully ${editItem ? "updated" : "added"} ${formData.name} to inventory.`,
    });

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{editItem ? "Edit Inventory Item" : "Add New Inventory Item"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reorderPoint">Reorder Point</Label>
              <Input
                id="reorderPoint"
                type="number"
                min="0"
                value={formData.reorderPoint}
                onChange={(e) => setFormData({ ...formData, reorderPoint: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Storage Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="submit" className="w-full md:w-auto">
              {editItem ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
