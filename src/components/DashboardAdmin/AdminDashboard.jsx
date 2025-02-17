import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import LandlordApplications from "./LandlordApplications";
import DashboardOverview from "./DashboardOverview";
import ListingApproval from "./ListingApprovals";
import { Menu, X } from "lucide-react"; // Import icons for menu

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar - Hidden on small screens, collapsible */}
      <div className={`fixed md:relative z-50 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:w-64`}>
        <Sidebar />
      </div>

      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 transition-all duration-300 ease-in-out">
        <main className="flex-1 p-5 bg-gray-100">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="landlord-applications" element={<LandlordApplications />} />
            <Route path="listing-approvals" element={<ListingApproval />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;