// SideBar.jsx
import { FaChartBar, FaUser, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/sliceAuth"; // Adjust the import path

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-[#5B7F3B] text-white h-screen p-5 w-64 flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="space-y-4">
          <SidebarItem 
            icon={<FaChartBar />} 
            text="Dashboard" 
            to="/admin-dashboard" 
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
        </nav>
      </div>
      <div className="mt-auto">
        <div 
          onClick={handleSignOut}
    className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 cursor-pointer"
        >
          <span className="text-xl"><FaSignOutAlt /></span>
          <span className="text-sm">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, to }) => (
  <NavLink
    to={to}
    className="flex items-center space-x-3 p-2 rounded hover:bg-[#4E6E34] cursor-pointer transition duration-300"
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm">{text}</span>
  </NavLink>
);

export default Sidebar;