import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CustomersSection() {
  const customers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      status: "Active",
      lastOrder: "2024-02-15",
      totalOrders: 12,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      status: "Active",
      lastOrder: "2024-02-10",
      totalOrders: 8,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol@example.com",
      status: "Inactive",
      lastOrder: "2024-01-25",
      totalOrders: 5,
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customers</h2>
      </div>

      <div className="grid gap-6">
        {customers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback>{customer.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{customer.name}</CardTitle>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className={`font-medium ${customer.status === 'Active' ? 'text-green-600' : 'text-gray-600'}`}>
                    {customer.status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Last Order</p>
                  <p className="font-medium">{customer.lastOrder}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Orders</p>
                  <p className="font-medium">{customer.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
