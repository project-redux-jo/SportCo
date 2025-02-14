import React, { useState } from "react";

import { auth ,signInWithEmailAndPassword } from "../../firebase";
import api from "../../api";
import { useDispatch } from "react-redux";
// import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginSuccess, loginFailure } from "../../redux/sliceLandlord";
const LoginLord = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user role and status from Firebase using Axios
      const response = await api.get(`/Landlords/${user.uid}.json`);
      const userData = response.data;

      if (!userData) {
        Swal.fire("Error!", "User data not found.", "error");
        return;
      }
      if (userData.status === "pending") {
        Swal.fire("Pending", "Your application is still under review.", "info");
        return;
      }
      if (userData.status === "Rejected") {
        Swal.fire("Rejected", "Your application has been rejected.", "error");
        return;
      }
      // Dispatch login state to Redux
    //   dispatch(login({ userId: user.uid, role: userData.role }));

      if (userData.status === "Approved") {
        const userPayload = {
          uid: user.uid,
          fullName: userData.name,
          email: userData.email,
          phone: userData.phoneNumber,
          location: userData.location,
          profileImagePath: userData.profileImage,
          role: userData.role,
          status: userData.status,
        };
  
        dispatch(loginSuccess(userPayload));
        Swal.fire("Success!", "Login successful!", "success");
        localStorage.setItem("user", JSON.stringify(userPayload));
        navigate("/LandDashboard");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-3">
        <input type="email" placeholder="Email" className="p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  );
};

export default LoginLord;