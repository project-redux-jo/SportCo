// SideBar.jsx
import { FaChartBar, FaUser, FaFileAlt, FaCalendar, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const SidebarLord = () => {
  return (
    <div className="bg-gray-800 text-white h-screen p-5 w-64 flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-6">Landloard Dashboard</h1>
        <nav className="space-y-4">
          <SidebarItem 
            icon={<FaChartBar />} 
            text="Property Management" 
            to="/LandDashboard" // Index route
          />
          <SidebarItem 
            icon={<FaUser />} 
            text="Availability Calendar" 
            to="/LandDashboard/LandlordCalendar" 
          />
          <SidebarItem 
            icon={<FaFileAlt />} 
            text="Booking Management" 
            to="/LandDashboard/BookingManagement" 
          />
          <SidebarItem 
            icon={<FaCalendar />} 
            text="Analytics" 
            to="/LandDashboard/Analytics" 
          />
          <SidebarItem 
            icon={<CgProfile />} 
            text="Profile" 
            to="/LandDashboard/Profile" 
          />
        </nav>
      </div>
      <div className="mt-auto">
        <SidebarItem 
          icon={<FaSignOutAlt />} 
          text="Sign Out" 
          to="/sign-out" 
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, to }) => (
  <NavLink
    to={to}
    className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 cursor-pointer"
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm">{text}</span>
  </NavLink>
);

export default SidebarLord;