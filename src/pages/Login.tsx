import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleDemoLogin = (accountType) => {
    // Simulate a demo login by storing the selected account type (e.g. in local storage) and navigating to the dashboard.
    alert(`Logged in as ${accountType} (Demo Mode)`);
    console.log(`Logged in as ${accountType}`);
    // For demonstration, navigate to the BIM ERP Operations Dashboard
    navigate("/bimerp-dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Demo Login</h2>
        <p className="mb-4 text-center">
          Select a demo account type to see the BIM ERP in action:
        </p>
        <div className="space-y-3">
          <button
            onClick={() => handleDemoLogin("admin")}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Admin Account (Full Access)
          </button>
          <button
            onClick={() => handleDemoLogin("contractor")}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Contractor Account (Project Management)
          </button>
          <button
            onClick={() => handleDemoLogin("supplier")}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Supplier Account (Bids & Supplies)
          </button>
          <button
            onClick={() => handleDemoLogin("customer")}
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
          >
            Customer Account (Inquiries & Orders)
          </button>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => handleDemoLogin("contractor")}
            className="text-blue-500 underline hover:text-blue-600"
          >
            Book a Demo / Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
