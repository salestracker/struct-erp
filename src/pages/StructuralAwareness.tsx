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
import { PlusCircle, Search, Filter, MoreHorizontal, AlertTriangle, Activity, Building, Download, FileText } from "lucide-react";

// Mock data
const dummyStructures = [
  {
    id: 1,
    name: "Downtown Office Tower",
    location: "New York, NY",
    type: "Commercial",
    status: "Operational",
    sensors: 24,
    alerts: 1
  },
  {
    id: 2,
    name: "Suburban Housing Complex",
    location: "Austin, TX",
    type: "Residential",
    status: "Operational",
    sensors: 36,
    alerts: 0
  },
  {
    id: 3,
    name: "Industrial Warehouse",
    location: "Chicago, IL",
    type: "Industrial",
    status: "Maintenance Required",
    sensors: 18,
    alerts: 2
  }
];

const dummySensors = [
  {
    id: 1,
    structureId: 1,
    location: "North Wing - Foundation",
    type: "Vibration",
    reading: "0.05g",
    status: "Normal"
  },
  {
    id: 2,
    structureId: 1,
    location: "South Wing - 5th Floor",
    type: "Temperature",
    reading: "23.5°C",
    status: "Normal"
  },
  {
    id: 3,
    structureId: 1,
    location: "East Wing - Roof",
    type: "Strain",
    reading: "85 μɛ",
    status: "Warning"
  }
];

const dummyAlerts = [
  {
    id: 1,
    structureId: 1,
    sensorId: 3,
    type: "Warning",
    message: "Increased strain detected on East Wing roof",
    status: "Active"
  },
  {
    id: 2,
    structureId: 3,
    sensorId: 5,
    type: "Critical",
    message: "Moisture level exceeds threshold in Northwest Corner roof",
    status: "Active"
  }
];

const StructuralAwareness = () => {
  const { user, hasPermission } = useAuth();
  const [structures] = useState(dummyStructures);
  const [sensors] = useState(dummySensors);
  const [alerts] = useState(dummyAlerts);

  const canViewStructures = hasPermission(PERMISSIONS.VIEW_STRUCTURES);
  const canViewSensorData = hasPermission(PERMISSIONS.VIEW_SENSOR_DATA);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "text-green-500";
      case "Warning":
        return "text-amber-500";
      case "Alert":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Structural Awareness System</h1>
          <p className="text-muted-foreground">
            Monitor building health, compliance, and warranty status
          </p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="mb-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="structures">Structures</TabsTrigger>
          <TabsTrigger value="sensors">Sensors</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Structures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{structures.length}</div>
                  <Building className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Sensors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{sensors.length}</div>
                  <Activity className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{alerts.filter(a => a.status === "Active").length}</div>
                  <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>
                Latest structural health notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Structure</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => {
                    const structure = structures.find(s => s.id === alert.structureId);
                    return (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{structure?.name}</TableCell>
                        <TableCell>
                          <Badge variant={alert.type === "Critical" ? "destructive" : "secondary"}>
                            {alert.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{alert.message}</TableCell>
                        <TableCell>
                          <Badge variant={alert.status === "Active" ? "outline" : "default"}>
                            {alert.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="structures" className="space-y-4">
          {canViewStructures ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {structures.map((structure) => (
                <Card key={structure.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>{structure.name}</CardTitle>
                      <Badge variant={
                        structure.status === "Operational" ? "default" :
                        structure.status === "Under Monitoring" ? "secondary" :
                        "destructive"
                      }>
                        {structure.status}
                      </Badge>
                    </div>
                    <CardDescription>{structure.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div>
                        <span className="font-medium">Type:</span> {structure.type}
                      </div>
                      <div>
                        <span className="font-medium">Sensors:</span> {structure.sensors}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex items-center">
                      {structure.alerts > 0 ? (
                        <div className="flex items-center text-amber-500">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          <span className="text-sm">{structure.alerts} active alerts</span>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">No active alerts</div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You don't have permission to view structures.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="sensors" className="space-y-4">
          {canViewSensorData ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Structure</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Reading</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sensors.map((sensor) => {
                      const structure = structures.find(s => s.id === sensor.structureId);
                      return (
                        <TableRow key={sensor.id}>
                          <TableCell className="font-medium">{structure?.name}</TableCell>
                          <TableCell>{sensor.location}</TableCell>
                          <TableCell>{sensor.type}</TableCell>
                          <TableCell>{sensor.reading}</TableCell>
                          <TableCell>
                            <span className={getStatusColor(sensor.status)}>
                              {sensor.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You don't have permission to view sensor data.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4">
          {canViewSensorData ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Structure</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alerts.map((alert) => {
                      const structure = structures.find(s => s.id === alert.structureId);
                      return (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">{structure?.name}</TableCell>
                          <TableCell>
                            <Badge variant={alert.type === "Critical" ? "destructive" : "secondary"}>
                              {alert.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{alert.message}</TableCell>
                          <TableCell>
                            <Badge variant={alert.status === "Active" ? "outline" : "default"}>
                              {alert.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You don't have permission to view alerts.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StructuralAwareness;
