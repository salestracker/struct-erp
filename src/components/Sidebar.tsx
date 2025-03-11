import { Home, BarChart2, Users, Box, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { 
    icon: Home, 
    label: "Dashboard", 
    content: "dashboard"
  },
  { 
    icon: BarChart2, 
    label: "Analytics", 
    content: "analytics"
  },
  { 
    icon: Users, 
    label: "Customers", 
    content: "customers"
  },
  { 
    icon: Box, 
    label: "Inventory", 
    content: "inventory"
  },
  { 
    icon: Settings, 
    label: "Settings", 
    content: "settings"
  },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activeSection, onSectionChange, onLogout }: SidebarProps) {
  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600">AI ERP</h2>
      </div>
      
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(item.label);
            }}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg mb-1 hover:bg-gray-100 transition-colors",
              activeSection === item.label && "bg-blue-50 text-blue-600"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
