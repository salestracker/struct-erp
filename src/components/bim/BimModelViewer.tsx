import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle, Download, FileText, Layers, ZoomIn, ZoomOut, RotateCw, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SensorData {
  id: string;
  location: string;
  type: string;
  reading: number;
  unit: string;
  status: 'Normal' | 'Warning' | 'Critical';
  x: number;
  y: number;
}

interface BimModelViewerProps {
  structureId: string;
  structureName: string;
  modelUrl?: string;
  previewUrl?: string;
}

export function BimModelViewer({ structureId, structureName, modelUrl, previewUrl }: BimModelViewerProps) {
  const [activeTab, setActiveTab] = useState<string>('model');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showSensors, setShowSensors] = useState<boolean>(true);
  const [showAlerts, setShowAlerts] = useState<boolean>(true);
  const [selectedSensor, setSelectedSensor] = useState<SensorData | null>(null);
  const [sensorFilter, setSensorFilter] = useState<string>('all');
  
  // Mock sensor data - in a real app, this would come from an API
  const [sensors] = useState<SensorData[]>([
    {
      id: 's1',
      location: 'North Wing - Foundation',
      type: 'Vibration',
      reading: 0.05,
      unit: 'g',
      status: 'Normal',
      x: 25,
      y: 70
    },
    {
      id: 's2',
      location: 'South Wing - 5th Floor',
      type: 'Temperature',
      reading: 23.5,
      unit: '°C',
      status: 'Normal',
      x: 75,
      y: 40
    },
    {
      id: 's3',
      location: 'East Wing - Roof',
      type: 'Strain',
      reading: 85,
      unit: 'μɛ',
      status: 'Warning',
      x: 60,
      y: 20
    },
    {
      id: 's4',
      location: 'West Wing - 3rd Floor',
      type: 'Humidity',
      reading: 65,
      unit: '%',
      status: 'Normal',
      x: 30,
      y: 50
    },
    {
      id: 's5',
      location: 'Central Core - Basement',
      type: 'Moisture',
      reading: 12,
      unit: '%',
      status: 'Critical',
      x: 50,
      y: 80
    }
  ]);
  
  // Filter sensors based on the selected filter
  const filteredSensors = sensors.filter(sensor => {
    if (sensorFilter === 'all') return true;
    if (sensorFilter === 'alerts') return sensor.status !== 'Normal';
    return sensor.type.toLowerCase() === sensorFilter;
  });
  
  const getSensorColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-500';
      case 'Warning':
        return 'bg-amber-500';
      case 'Critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const handleSensorClick = (sensor: SensorData) => {
    setSelectedSensor(sensor);
  };
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch the latest sensor data from an API
      // For this demo, we'll just simulate some random fluctuations
      
      // This is just for demonstration - in a real app, we would update the sensor data
      // based on real-time data from the backend
      console.log("Simulating real-time sensor updates...");
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{structureName} - BIM Model</CardTitle>
            <CardDescription>Structure ID: {structureId} • Real-time monitoring</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={sensorFilter} onValueChange={setSensorFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter sensors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sensors</SelectItem>
                <SelectItem value="alerts">Alerts Only</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="vibration">Vibration</SelectItem>
                <SelectItem value="strain">Strain</SelectItem>
                <SelectItem value="humidity">Humidity</SelectItem>
                <SelectItem value="moisture">Moisture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="model" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="model">3D Model</TabsTrigger>
            <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="model" className="space-y-4">
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                {/* In a real app, this would be a 3D BIM viewer component */}
                <img 
                  src={previewUrl || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"}
                  alt="BIM Model"
                  className="rounded-md object-cover w-full h-full"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                />
                
                {/* Overlay sensors on the model */}
                {showSensors && filteredSensors.map((sensor) => (
                  <div 
                    key={sensor.id}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer ${getSensorColor(sensor.status)} flex items-center justify-center text-white text-xs font-bold border-2 border-white`}
                    style={{ 
                      left: `${sensor.x}%`, 
                      top: `${sensor.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: selectedSensor?.id === sensor.id ? 20 : 10
                    }}
                    onClick={() => handleSensorClick(sensor)}
                  >
                    {sensor.id.replace('s', '')}
                  </div>
                ))}
                
                {/* Selected sensor info popup */}
                {selectedSensor && (
                  <div 
                    className="absolute bg-white rounded-md shadow-lg p-3 z-30 w-64"
                    style={{ 
                      left: `${selectedSensor.x}%`, 
                      top: `${selectedSensor.y + 5}%`,
                      transform: 'translate(-50%, 0)'
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Sensor {selectedSensor.id}</h3>
                      <Badge variant={
                        selectedSensor.status === 'Normal' ? 'default' :
                        selectedSensor.status === 'Warning' ? 'secondary' :
                        'destructive'
                      }>
                        {selectedSensor.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Location:</span> {selectedSensor.location}</p>
                      <p><span className="font-medium">Type:</span> {selectedSensor.type}</p>
                      <p><span className="font-medium">Reading:</span> {selectedSensor.reading} {selectedSensor.unit}</p>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSensor(null);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Controls */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="show-sensors" 
                      checked={showSensors} 
                      onCheckedChange={setShowSensors}
                    />
                    <Label htmlFor="show-sensors">Show Sensors</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="show-alerts" 
                      checked={showAlerts} 
                      onCheckedChange={setShowAlerts}
                    />
                    <Label htmlFor="show-alerts">Show Alerts</Label>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Slider 
                    value={[zoomLevel]} 
                    min={50} 
                    max={150} 
                    step={5}
                    onValueChange={(value) => setZoomLevel(value[0])}
                    className="w-32"
                  />
                  <Button variant="outline" size="icon" onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setZoomLevel(100)}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Alerts section */}
            {showAlerts && sensors.some(s => s.status !== 'Normal') && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Structural Alerts Detected</AlertTitle>
                <AlertDescription>
                  {sensors.filter(s => s.status === 'Critical').length > 0 ? (
                    <span>Critical issues detected in {sensors.filter(s => s.status === 'Critical').length} locations. Immediate inspection recommended.</span>
                  ) : (
                    <span>Warning conditions detected in {sensors.filter(s => s.status === 'Warning').length} locations. Monitor closely.</span>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="floorplan" className="space-y-4">
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                {/* In a real app, this would be a 2D floor plan viewer */}
                <img 
                  src="https://images.unsplash.com/photo-1574691250077-03a929faece5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                  alt="Floor Plan"
                  className="rounded-md object-cover w-full h-full"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                />
                
                {/* Overlay sensors on the floor plan */}
                {showSensors && filteredSensors.map((sensor) => (
                  <div 
                    key={sensor.id}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer ${getSensorColor(sensor.status)} flex items-center justify-center text-white text-xs font-bold border-2 border-white`}
                    style={{ 
                      left: `${sensor.x}%`, 
                      top: `${sensor.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: selectedSensor?.id === sensor.id ? 20 : 10
                    }}
                    onClick={() => handleSensorClick(sensor)}
                  >
                    {sensor.id.replace('s', '')}
                  </div>
                ))}
                
                {/* Selected sensor info popup (same as in 3D view) */}
                {selectedSensor && (
                  <div 
                    className="absolute bg-white rounded-md shadow-lg p-3 z-30 w-64"
                    style={{ 
                      left: `${selectedSensor.x}%`, 
                      top: `${selectedSensor.y + 5}%`,
                      transform: 'translate(-50%, 0)'
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Sensor {selectedSensor.id}</h3>
                      <Badge variant={
                        selectedSensor.status === 'Normal' ? 'default' :
                        selectedSensor.status === 'Warning' ? 'secondary' :
                        'destructive'
                      }>
                        {selectedSensor.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Location:</span> {selectedSensor.location}</p>
                      <p><span className="font-medium">Type:</span> {selectedSensor.type}</p>
                      <p><span className="font-medium">Reading:</span> {selectedSensor.reading} {selectedSensor.unit}</p>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSensor(null);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Controls (same as in 3D view) */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="show-sensors-floorplan" 
                      checked={showSensors} 
                      onCheckedChange={setShowSensors}
                    />
                    <Label htmlFor="show-sensors-floorplan">Show Sensors</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="show-alerts-floorplan" 
                      checked={showAlerts} 
                      onCheckedChange={setShowAlerts}
                    />
                    <Label htmlFor="show-alerts-floorplan">Show Alerts</Label>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Slider 
                    value={[zoomLevel]} 
                    min={50} 
                    max={150} 
                    step={5}
                    onValueChange={(value) => setZoomLevel(value[0])}
                    className="w-32"
                  />
                  <Button variant="outline" size="icon" onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setZoomLevel(100)}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Layers className="h-4 w-4" />
            Toggle Layers
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <FileText className="h-4 w-4" />
            View Report
          </Button>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </CardFooter>
    </Card>
  );
}
