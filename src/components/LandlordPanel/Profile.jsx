import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Make sure to import auth from Firebase
import api from "../../api"; // Axios instance
import Swal from "sweetalert2"; // For displaying messages
import {useSelector} from "react-redux"
const Profile = () => {
  const storedUser = useSelector((state) => state.Land.user); 
  const [userData, setUserData] = useState(storedUser || null); // User data
  const [loading, setLoading] = useState(!storedUser); // Loading state
  const navigate = useNavigate();

  // Fetch user data from the database
  useEffect(() => {
   
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Get the current user
        if (user) {
          const response = await api.get(`/Landlords/${user.uid}.json`);
          setUserData(response.data); // Save data to state
        } 
        // else {
        //   Swal.fire("Error!", "No user found. Please log in.", "error");
        //   navigate("/LogIn"); // Redirect to login page
        // }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire("Error!", "Failed to fetch user data.", "error");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>; // Show loading message
  }

  if (!userData) {
    return <p>No user data found.</p>; // Show message if no data is found
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Full Name:</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{userData.name}</p>
          </div>
          <div>
            <label className="font-semibold">Email:</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{userData.email}</p>
          </div>
          <div>
            <label className="font-semibold">Phone Number:</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{userData.phoneNumber}</p>
          </div>
          <div>
            <label className="font-semibold">Location:</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{userData.location}</p>
          </div>
          <div>
            <label className="font-semibold">Profile Image:</label>
            {userData.profileImage && (
              <img
                src={userData.profileImage}
                alt="Profile"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label className="font-semibold">Account Status:</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{userData.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;