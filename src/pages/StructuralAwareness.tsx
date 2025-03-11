import React from "react";
import Sidebar from "../components/Sidebar";

const dummySensors = [
  {
    id: 1,
    location: "North Wing",
    reading: "Normal",
    temperature: "75°F",
    alert: "None"
  },
  {
    id: 2,
    location: "South Wing",
    reading: "Warning",
    temperature: "85°F",
    alert: "Increased vibrations detected"
  },
  {
    id: 3,
    location: "East Wing",
    reading: "Normal",
    temperature: "72°F",
    alert: "None"
  }
];

const StructuralAwareness = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">BIM ERP Structural Awareness</h2>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Sensor Monitoring</h3>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Location</th>
                <th className="py-2 px-4 border">Reading</th>
                <th className="py-2 px-4 border">Temperature</th>
                <th className="py-2 px-4 border">Alert</th>
              </tr>
            </thead>
            <tbody>
              {dummySensors.map((sensor) => (
                <tr key={sensor.id}>
                  <td className="py-2 px-4 border text-center">{sensor.id}</td>
                  <td className="py-2 px-4 border">{sensor.location}</td>
                  <td className="py-2 px-4 border">{sensor.reading}</td>
                  <td className="py-2 px-4 border">{sensor.temperature}</td>
                  <td className="py-2 px-4 border">{sensor.alert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StructuralAwareness;
