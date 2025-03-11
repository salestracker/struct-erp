import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserRole, PERMISSIONS } from "../types/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, Filter, MoreHorizontal, Calendar, Clock, User, Building, DollarSign, CheckCircle2 } from "lucide-react";

// Mock data
const dummyLeads = [
  {
    id: 1,
    name: "ABC Builders",
    contact: "John Smith",
    email: "john@abcbuilders.com",
    phone: "(555) 123-4567",
    status: "New",
    source: "Website",
    potentialValue: "$1,200,000",
    notes: "Interested in office building construction in downtown area",
    assignedTo: "Sarah Johnson",
    createdAt: "2025-02-15"
  },
  {
    id: 2,
    name: "XYZ Contractors",
    contact: "Michael Brown",
    email: "michael@xyzcontractors.com",
    phone: "(555) 987-6543",
    status: "Contacted",
    source: "Referral",
    potentialValue: "$800,000",
    notes: "Follow up about residential project in suburban area",
    assignedTo: "David Wilson",
    createdAt: "2025-02-20"
  },
  {
    id: 3,
    name: "Sunrise Developments",
    contact: "Emily Davis",
    email: "emily@sunrisedev.com",
    phone: "(555) 456-7890",
    status: "Qualified",
    source: "Trade Show",
    potentialValue: "$2,500,000",
    notes: "Looking for contractor for mixed-use development",
    assignedTo: "Sarah Johnson",
    createdAt: "2025-03-01"
  },
  {
    id: 4,
    name: "Metro Construction",
    contact: "Robert Lee",
    email: "robert@metroconstruction.com",
    phone: "(555) 789-0123",
    status: "Proposal",
    source: "LinkedIn",
    potentialValue: "$1,800,000",
    notes: "Sent proposal for industrial warehouse project",
    assignedTo: "David Wilson",
    createdAt: "2025-03-05"
  }
];

const dummyWorkOrders = [
  {
    id: 1,
    title: "Site Inspection - Downtown Office",
    client: "ABC Builders",
    status: "Scheduled",
    priority: "High",
    assignedTo: "Field Team A",
    scheduledDate: "2025-04-10",
    location: "123 Main St, New York, NY",
    description: "Conduct initial site inspection for new office building project"
  },
  {
    id: 2,
    title: "Foundation Repair - Suburban Housing",
    client: "Homestead Developers",
    status: "In Progress",
    priority: "Medium",
    assignedTo: "Field Team B",
    scheduledDate: "2025-03-25",
    location: "456 Oak Ave, Austin, TX",
    description: "Repair foundation issues in Building C of housing development"
  },
  {
    id: 3,
    title: "Warranty Service - Metro Warehouse",
    client: "LogiTech Industries",
    status: "Completed",
    priority: "Low",
    assignedTo: "Field Team A",
    scheduledDate: "2025-03-15",
    location: "789 Industrial Pkwy, Chicago, IL",
    description: "Address warranty claim for roof leakage in northwest corner"
  },
  {
    id: 4,
    title: "Sensor Installation - Community Center",
    client: "Portland City Council",
    status: "Pending",
    priority: "Medium",
    assignedTo: "Field Team C",
    scheduledDate: "2025-04-20",
    location: "101 Community Blvd, Portland, OR",
    description: "Install structural monitoring sensors throughout renovated building"
  }
];

const CRM = () => {
  const { user, hasPermission } = useAuth();
  const [leads, setLeads] = useState(dummyLeads);
  const [workOrders, setWorkOrders] = useState(dummyWorkOrders);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<any>(null);
  const [newLead, setNewLead] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    potentialValue: "",
    notes: ""
  });
  const [newWorkOrder, setNewWorkOrder] = useState({
    title: "",
    client: "",
    priority: "Medium",
    scheduledDate: "",
    location: "",
    description: ""
  });

  const canCreateLead = hasPermission(PERMISSIONS.CREATE_LEAD);
  const canViewLeads = hasPermission(PERMISSIONS.VIEW_LEADS);
  const canCreateWorkOrder = hasPermission(PERMISSIONS.CREATE_WORK_ORDER);
  const canViewWorkOrders = hasPermission(PERMISSIONS.VIEW_WORK_ORDERS);

  const handleCreateLead = () => {
    const lead = {
      id: leads.length + 1,
      name: newLead.name,
      contact: newLead.contact,
      email: newLead.email,
      phone: newLead.phone,
      status: "New",
      source: "Manual Entry",
      potentialValue: `$${newLead.potentialValue}`,
      notes: newLead.notes,
      assignedTo: user?.name || "Unassigned",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLeads([lead, ...leads]);
    setNewLead({
      name: "",
      contact: "",
      email: "",
      phone: "",
      potentialValue: "",
      notes: ""
    });
  };

  const handleCreateWorkOrder = () => {
    const workOrder = {
      id: workOrders.length + 1,
      title: newWorkOrder.title,
      client: newWorkOrder.client,
      status: "Scheduled",
      priority: newWorkOrder.priority,
      assignedTo: user?.name || "Unassigned",
      scheduledDate: newWorkOrder.scheduledDate,
      location: newWorkOrder.location,
      description: newWorkOrder.description
    };

    setWorkOrders([workOrder, ...workOrders]);
    setNewWorkOrder({
      title: "",
      client: "",
      priority: "Medium",
      scheduledDate: "",
      location: "",
      description: ""
    });
  };

  const updateLeadStatus = (leadId: number, newStatus: string) => {
    const updatedLeads = leads.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, status: newStatus };
      }
      return lead;
    });
    setLeads(updatedLeads);
    setSelectedLead(null);
  };

  const updateWorkOrderStatus = (workOrderId: number, newStatus: string) => {
    const updatedWorkOrders = workOrders.map(wo => {
      if (wo.id === workOrderId) {
        return { ...wo, status: newStatus };
      }
      return wo;
    });
    setWorkOrders(updatedWorkOrders);
    setSelectedWorkOrder(null);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Construction CRM</h1>
          <p className="text-muted-foreground">
            Manage leads, sales, and field service operations
          </p>
        </div>
      </div>

      <Tabs defaultValue="leads" className="mb-6">
        <TabsList>
          <TabsTrigger value="leads">Sales Pipeline</TabsTrigger>
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search leads..."
                  className="pl-8 w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            {canCreateLead && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Lead
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Lead</DialogTitle>
                    <DialogDescription>
                      Enter the details of the potential customer or project.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input 
                        id="company" 
                        value={newLead.name}
                        onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="contact">Contact Person</Label>
                        <Input 
                          id="contact" 
                          value={newLead.contact}
                          onChange={(e) => setNewLead({...newLead, contact: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="potential">Potential Value ($)</Label>
                        <Input 
                          id="potential" 
                          type="number"
                          value={newLead.potentialValue}
                          onChange={(e) => setNewLead({...newLead, potentialValue: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={newLead.email}
                          onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={newLead.phone}
                          onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea 
                        id="notes" 
                        rows={3}
                        value={newLead.notes}
                        onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreateLead}>Add Lead</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          {canViewLeads ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Potential Value</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.contact}</TableCell>
                        <TableCell>
                          <Badge variant={
                            lead.status === "Qualified" ? "default" :
                            lead.status === "Proposal" ? "default" :
                            lead.status === "Closed Won" ? "default" :
                            "secondary"
                          }>
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{lead.potentialValue}</TableCell>
                        <TableCell>{lead.assignedTo}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedLead(lead)}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You don't have permission to view leads.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="work-orders" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search work orders..."
                  className="pl-8 w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            {canCreateWorkOrder && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Work Order
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create Work Order</DialogTitle>
                    <DialogDescription>
                      Schedule a new field service task or maintenance job.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Work Order Title</Label>
                      <Input 
                        id="title" 
                        value={newWorkOrder.title}
                        onChange={(e) => setNewWorkOrder({...newWorkOrder, title: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="client">Client</Label>
                      <Input 
                        id="client" 
                        value={newWorkOrder.client}
                        onChange={(e) => setNewWorkOrder({...newWorkOrder, client: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select 
                          value={newWorkOrder.priority}
                          onValueChange={(value) => setNewWorkOrder({...newWorkOrder, priority: value})}
                        >
                          <SelectTrigger id="priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date">Scheduled Date</Label>
                        <Input 
                          id="date" 
                          type="date"
                          value={newWorkOrder.scheduledDate}
                          onChange={(e) => setNewWorkOrder({...newWorkOrder, scheduledDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={newWorkOrder.location}
                        onChange={(e) => setNewWorkOrder({...newWorkOrder, location: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        rows={3}
                        value={newWorkOrder.description}
                        onChange={(e) => setNewWorkOrder({...newWorkOrder, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreateWorkOrder}>Create Work Order</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          {canViewWorkOrders ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workOrders.map((workOrder) => (
                      <TableRow key={workOrder.id}>
                        <TableCell className="font-medium">{workOrder.title}</TableCell>
                        <TableCell>{workOrder.client}</TableCell>
                        <TableCell>
                          <Badge variant={
                            workOrder.status === "Completed" ? "default" :
                            workOrder.status === "In Progress" ? "secondary" :
                            "outline"
                          }>
                            {workOrder.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            workOrder.priority === "High" ? "destructive" :
                            workOrder.priority === "Medium" ? "secondary" :
                            "outline"
                          }>
                            {workOrder.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{workOrder.scheduledDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedWorkOrder(workOrder)}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You don't have permission to view work orders.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sales Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Pipeline chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Lead source chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Work Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Work order chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Lead Details Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedLead.name}</DialogTitle>
                <DialogDescription>
                  Lead created on {selectedLead.createdAt}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Contact Person</h3>
                    <p className="text-sm">{selectedLead.contact}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Status</h3>
                    <Badge variant="outline">{selectedLead.status}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Email</h3>
                    <p className="text-sm">{selectedLead.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Phone</h3>
                    <p className="text-sm">{selectedLead.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Potential Value</h3>
                    <p className="text-sm">{selectedLead.potentialValue}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Source</h3>
                    <p className="text-sm">{selectedLead.source}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Assigned To</h3>
                  <p className="text-sm">{selectedLead.assignedTo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Notes</h3>
                  <p className="text-sm">{selectedLead.notes}</p>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Update Status</h3>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateLeadStatus(selectedLead.id, "New")}
                    >
                      New
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateLeadStatus(selectedLead.id, "Contacted")}
                    >
                      Contacted
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateLeadStatus(selectedLead.id, "Qualified")}
                    >
                      Qualified
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateLeadStatus(selectedLead.id, "Proposal")}
                    >
                      Proposal
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => updateLeadStatus(selectedLead.id, "Closed Won")}
                    >
                      Closed Won
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Work Order Details Dialog */}
      <Dialog open={!!selectedWorkOrder} onOpenChange={(open) => !open && setSelectedWorkOrder(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedWorkOrder && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedWorkOrder.title}</DialogTitle>
                <DialogDescription>
                  Work Order #{selectedWorkOrder.id}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h3 className="text-sm font-medium">Client</h3>
                      <p className="text-sm">{selectedWorkOrder.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h3 className="text-sm font-medium">Scheduled Date</h3>
                      <p className="text-sm">{selectedWorkOrder.scheduledDate}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h3 className="text-sm font-medium">Assigned To</h3>
                      <p className="text-sm">{selectedWorkOrder.assignedTo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h3 className="text-sm font-medium">Status</h3>
                      <Badge variant="outline">{selectedWorkOrder.status}</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Location</h3>
                  <p className="text-sm">{selectedWorkOrder.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Description</h3>
                  <p className="text-sm">{selectedWorkOrder.description}</p>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Update Status</h3>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateWorkOrderStatus(selectedWorkOrder.id, "Scheduled")}
                    >
                      Scheduled
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateWorkOrderStatus(selectedWorkOrder.id, "In Progress")}
                    >
                      In Progress
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateWorkOrderStatus(selectedWorkOrder.id, "On Hold")}
                    >
                      On Hold
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => updateWorkOrderStatus(selectedWorkOrder.id, "Completed")}
                    >
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Completed
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CRM;
