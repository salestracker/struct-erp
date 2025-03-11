import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

// Sample data to demonstrate functionality
const sampleData = {
  "top 5 selling products": [
    { name: "Product A", sales: 1200 },
    { name: "Product B", sales: 980 },
    { name: "Product C", sales: 850 },
    { name: "Product D", sales: 720 },
    { name: "Product E", sales: 650 }
  ],
  "revenue by month": [
    { month: "January", revenue: 45000 },
    { month: "February", revenue: 52000 },
    { month: "March", revenue: 48000 }
  ],
  "low stock items": [
    { name: "Product X", stock: 5 },
    { name: "Product Y", stock: 3 },
    { name: "Product Z", stock: 2 }
  ]
};

export function NaturalLanguageQuery() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleQuery = () => {
    // Simple keyword matching for demo purposes
    let result = null;
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("top") && lowerQuery.includes("selling")) {
      result = sampleData["top 5 selling products"];
    } else if (lowerQuery.includes("revenue")) {
      result = sampleData["revenue by month"];
    } else if (lowerQuery.includes("stock")) {
      result = sampleData["low stock items"];
    }

    if (result) {
      setResults(result);
      toast({
        title: "Query Processed",
        description: "Found relevant data for your query.",
      });
    } else {
      toast({
        title: "No Results",
        description: "Try asking about top selling products, revenue, or stock levels.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Ask a question about your data..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleQuery()}
          className="flex-1"
        />
        <Button onClick={handleQuery}>
          <Search className="w-4 h-4 mr-2" />
          Query
        </Button>
      </div>

      {results && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Results</h3>
          <div className="space-y-2">
            {results.map((item: any, index: number) => (
              <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                <span>{item.name || item.month}</span>
                <span className="font-medium">
                  {item.sales ? `${item.sales} sales` : 
                   item.revenue ? `$${item.revenue}` :
                   item.stock ? `${item.stock} in stock` : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
