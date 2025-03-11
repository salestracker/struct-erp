import React from "react";
import Sidebar from "../components/Sidebar";

const dummyLeads = [
  {
    id: 1,
    name: "ABC Builders",
    status: "New",
    potentialValue: "$1,200,000"
  },
  {
    id: 2,
    name: "XYZ Contractors",
    status: "Contacted",
    potentialValue: "$800,000"
  },
  {
    id: 3,
    name: "Sunrise Developments",
    status: "Qualified",
    potentialValue: "$2,500,000"
  }
];

const CRM = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">BIM ERP CRM Dashboard</h2>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Sales Leads</h3>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Potential Value</th>
              </tr>
            </thead>
            <tbody>
              {dummyLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="py-2 px-4 border text-center">{lead.id}</td>
                  <td className="py-2 px-4 border">{lead.name}</td>
                  <td className="py-2 px-4 border">{lead.status}</td>
                  <td className="py-2 px-4 border">{lead.potentialValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CRM;
