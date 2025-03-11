import React from "react";
import { Link } from "react-router-dom";

// Dummy hook to simulate retrieving the current user's role
function useUserRole() {
  const [role, setRole] = React.useState("guest");
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate API call: set role to "admin" for demo purposes
      setRole("admin");
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return role;
}

const Sidebar = () => {
  const role = useUserRole();

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-blue-600">BIM ERP Dashboard</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/login" className="block py-2">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/marketplace" className="block py-2">
              Marketplace
            </Link>
          </li>
          <li>
            <Link to="/crm" className="block py-2">
              CRM
            </Link>
          </li>
          <li>
            <Link to="/structural-awareness" className="block py-2">
              Structural Awareness
            </Link>
          </li>
          {role === "admin" && (
            <li>
              <Link to="/admin" className="block py-2">
                Admin Panel
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="mt-4">
        <Link to="/login" className="text-blue-500 underline">
          Demo Login
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
export { Sidebar };
