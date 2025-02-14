// SideBar.jsx
import { FaChartBar, FaBuilding, FaUser, FaFileAlt, FaCalendar, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const SidebarLord = () => {
  const user = useSelector((state) => state.Land.user); // Get user from Redux
  return (
    <div className="bg-gray-800 text-white h-screen p-5 w-64 flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-6">Landloard Dashboard</h1>
        <nav className="space-y-4">
          <SidebarItem 
            icon={<FaBuilding />} 
            text="Property Management" 
            to="/LandDashboard" // Index route
          />
          <SidebarItem 
            icon={<FaCalendar />} 
            text="Availability Calendar" 
            to="/LandDashboard/LandlordCalendar" 
          />
          <SidebarItem 
            icon={<FaFileAlt />} 
            text="Booking Management" 
            to="/LandDashboard/BookingManagement" 
          />
          <SidebarItem 
            icon={<FaChartBar />} 
            text="Analytics" 
            to="/LandDashboard/Analytics" 
          />
          <SidebarItem 
            icon={<FaUser />} 
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