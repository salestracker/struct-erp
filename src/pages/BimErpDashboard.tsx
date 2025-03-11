import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, ShoppingCart, Activity, AlertTriangle, BarChart3 } from "lucide-react";

export default function BimErpDashboard() {
  const { user } = useAuth();

  // Role-specific dashboard stats
  const getRoleSpecificStats = () => {
    switch (user?.roles[0]) {
      case UserRole.ADMIN:
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard 
              title="Total Users" 
              value="124" 
              description="Active platform users" 
              icon={<Users className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Projects" 
              value="48" 
              description="Active construction projects" 
              icon={<Building className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Marketplace" 
              value="$2.4M" 
              description="Monthly transaction volume" 
              icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="System Health" 
              value="98.2%" 
              description="Platform uptime" 
              icon={<Activity className="h-4 w-4 text-muted-foreground" />} 
            />
          </div>
        );
      
      case UserRole.CONTRACTOR:
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard 
              title="Active Projects" 
              value="8" 
              description="Projects in progress" 
              icon={<Building className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Pending Bids" 
              value="12" 
              description="Awaiting response" 
              icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Work Orders" 
              value="24" 
              description="Scheduled tasks" 
              icon={<Activity className="h-4 w-4 text-muted-foreground" />} 
            />
          </div>
        );
      
      case UserRole.SUPPLIER:
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard 
              title="Open RFQs" 
              value="16" 
              description="Available to bid" 
              icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Active Orders" 
              value="7" 
              description="In fulfillment" 
              icon={<Building className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Revenue" 
              value="$342K" 
              description="Last 30 days" 
              icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />} 
            />
          </div>
        );
      
      case UserRole.FIELD_ENGINEER:
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard 
              title="Assigned Tasks" 
              value="9" 
              description="Pending completion" 
              icon={<Activity className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Monitored Structures" 
              value="14" 
              description="Under supervision" 
              icon={<Building className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Alerts" 
              value="3" 
              description="Require attention" 
              icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />} 
            />
          </div>
        );
      
      case UserRole.COMPLIANCE_OFFICER:
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard 
              title="Compliance Checks" 
              value="32" 
              description="Completed this month" 
              icon={<Activity className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Warranty Tracking" 
              value="47" 
              description="Active warranties" 
              icon={<Building className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Compliance Issues" 
              value="5" 
              description="Need resolution" 
              icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />} 
            />
          </div>
        );
      
      case UserRole.CUSTOMER:
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard 
              title="My Projects" 
              value="3" 
              description="In progress" 
              icon={<Building className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Open Bids" 
              value="2" 
              description="Awaiting responses" 
              icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Structure Health" 
              value="Good" 
              description="Overall status" 
              icon={<Activity className="h-4 w-4 text-muted-foreground" />} 
            />
          </div>
        );
      
      default:
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <DashboardCard 
              title="Projects" 
              value="--" 
              description="No data available" 
              icon={<Building className="h-4 w-4 text-muted-foreground" />} 
            />
            <DashboardCard 
              title="Activity" 
              value="--" 
              description="No data available" 
              icon={<Activity className="h-4 w-4 text-muted-foreground" />} 
            />
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">
          Here's what's happening in your BIM ERP dashboard today
        </p>
      </div>

      {getRoleSpecificStats()}

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="structural">Structural</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>
                Integrated view of all BIM ERP modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Interactive dashboard charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Activity</CardTitle>
              <CardDescription>
                Recent bids, projects, and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Marketplace analytics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="crm" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CRM Insights</CardTitle>
              <CardDescription>
                Sales pipeline and customer relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">CRM analytics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="structural" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Structural Health</CardTitle>
              <CardDescription>
                Building monitoring and compliance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Structural analytics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Dashboard card component
interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function DashboardCard({ title, value, description, icon }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
