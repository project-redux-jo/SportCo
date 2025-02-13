import React from "react";
import {Router, Route, Routes } from "react-router-dom";
import SidebarLord from "./SidebarLord";
import PropertyManagement from "./PropertyManagement";
import LandlordCalendar from "./LandlordCalendar";
import BookingManagement from "./BookingManagement";
import Analytics from "./Analytics";
import Profile from "./Profile";

const  LandDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarLord/>
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-5 bg-gray-100">
          <Routes>
          <Route path="/" element={<PropertyManagement/>}/>
          <Route path="/LandlordCalendar" element={<LandlordCalendar/>}/>
          <Route path="/BookingManagement" element={<BookingManagement/>}/>
          <Route path="/Analytics" element={<Analytics/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default LandDashboard;