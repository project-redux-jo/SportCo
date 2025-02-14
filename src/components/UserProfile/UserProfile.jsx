import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Mail, Phone, Calendar, Edit, Save, XCircle } from "lucide-react";
import { ref, update, database } from "../../firebase"; // ✅ Fixed Firebase import
import Swal from "sweetalert2";
import { loginSuccess } from "../../redux/sliceAuth"; // ✅ Ensure this is exported

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState(user?.fullName || "");
  const [updatedPhone, setUpdatedPhone] = useState(user?.phone || "");

  const handleSave = async () => {
    if (!user?.uid) return;

    try {
      // ✅ Ensure Firebase uses the correct reference
      const userRef = ref(database, `users/${user.uid}`);
      await update(userRef, { fullName: updatedName, phone: updatedPhone });

      // ✅ Update Redux store
      dispatch(
        loginSuccess({ ...user, fullName: updatedName, phone: updatedPhone })
      );

      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile has been successfully updated.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setEditMode(false);
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full flex flex-col items-center">
        <div className="text-center mt-4">
          {editMode ? (
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="text-center text-3xl font-semibold text-gray-800 border-b-2 border-gray-300 focus:outline-none"
            />
          ) : (
            <h2 className="text-3xl font-semibold text-gray-800">
              {user?.fullName || "User"}
            </h2>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center space-y-4 text-gray-700">
          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-md max-w-md w-auto">
            <Mail size={20} className="text-green-500" />
            <span>{user?.email || "No Email"}</span>
          </div>

          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-md max-w-md w-auto">
            <Phone size={20} className="text-green-500" />
            {editMode ? (
              <input
                type="text"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
                className="text-gray-700 border-b-2 border-gray-300 focus:outline-none"
              />
            ) : (
              <span>{user?.phone || "No Phone Number"}</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-green-500 text-white font-medium rounded-lg flex items-center space-x-2 hover:bg-green-600 transition"
              >
                <Save size={16} />
                <span>Save</span>
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-5 py-2 bg-red-500 text-white font-medium rounded-lg flex items-center space-x-2 hover:bg-red-600 transition"
              >
                <XCircle size={16} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

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
