// SideBar.jsx
import { FaChartBar, FaUser, FaFileAlt, FaCalendar, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen p-5 w-64 flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="space-y-4">
          <SidebarItem 
            icon={<FaChartBar />} 
            text="Dashboard" 
            to="/admin-dashboard" // Index route
          />
          <SidebarItem 
            icon={<FaUser />} 
            text="Landlord Applications" 
            to="/admin-dashboard/landlord-applications" 
          />
          <SidebarItem 
            icon={<FaFileAlt />} 
            text="Listing Approvals" 
            to="/admin-dashboard/listing-approvals" 
          />
          <SidebarItem 
            icon={<FaCalendar />} 
            text="Rental Requests" 
            to="/admin-dashboard/rental-requests" 
          />
          <SidebarItem 
            icon={<CgProfile />} 
            text="Profile" 
            to="/admin-dashboard/profile" 
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

export default Sidebar;