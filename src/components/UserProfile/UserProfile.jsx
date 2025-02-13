import React from "react";
import { useSelector } from "react-redux";
import { Mail, Phone, Calendar } from "lucide-react";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user); // Get user from Redux

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full flex flex-col items-center">
        {/* Profile Header - Centered */}
        <div className="text-center mt-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            {user?.fullName || "User"}
          </h2>
        </div>

        {/* User Details - Centered */}
        <div className="mt-6 flex flex-col items-center space-y-4 text-gray-700">
          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-md max-w-md w-auto">
            <Mail size={20} className="text-green-500" />
            <span>{user?.email || "No Email"}</span>
          </div>
          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-md max-w-md w-auto">
            <Phone size={20} className="text-green-500" />
            <span>{user?.phone || "No Phone Number"}</span>
          </div>
        </div>

        {/* Bookings */}
        <div className="mt-8 w-full">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <Calendar className="mr-2 text-green-500" /> Bookings
          </h3>
          <p className="text-gray-500 mt-2 text-center">
            (Booking details not yet implemented)
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
