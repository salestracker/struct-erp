import React from "react";
import Sidebar from "../components/Sidebar";

const dummyProjects = [
  {
    id: 1,
    title: "Downtown Office Tower",
    budget: "$5,000,000",
    status: "Open",
    description: "Request for bids to construct a 10-story office building in the downtown core."
  },
  {
    id: 2,
    title: "Suburban Housing Project",
    budget: "$2,000,000",
    status: "Closed",
    description: "Residential project featuring 50 units with modern amenities."
  },
  {
    id: 3,
    title: "Industrial Warehouse Expansion",
    budget: "$3,500,000",
    status: "Open",
    description: "Expansion project for a logistics company requiring sustainable design solutions."
  }
];

const Marketplace = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">BIM ERP Construction Marketplace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyProjects.map((project) => (
            <div key={project.id} className="border p-4 rounded shadow-sm">
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="mb-1">Budget: {project.budget}</p>
              <p className="mb-1">Status: {project.status}</p>
              <p className="mb-3 text-gray-600">{project.description}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
