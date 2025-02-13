import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import LandlordApplications from "./LandlordApplications";
import DashboardOverview from "./DashboardOverview";
import ListingApproval from "./ListingApprovals";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-5 bg-gray-100">
          <Routes>
          <Route path="/" element={<DashboardOverview />}/>
          <Route path="landlord-applications" element={<LandlordApplications />}/>
          <Route path="listing-approvals" element={<ListingApproval/>}/>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;