import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeadStockManagement } from "@/components/inventory/DeadStockManagement";
import { InventoryItemForm } from "@/components/inventory/InventoryItemForm";
import { StockLevelManager } from "@/components/inventory/StockLevelManager";

export function InventorySection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add New Item"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-6">
          <InventoryItemForm onSubmit={() => setShowForm(false)} />
        </div>
      )}

      <StockLevelManager />
      <DeadStockManagement />
    </div>
  );
}
