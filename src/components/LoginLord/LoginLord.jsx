import React, { useState } from "react";

import { auth ,signInWithEmailAndPassword } from "../../firebase";
import api from "../../api";
import { useDispatch } from "react-redux";
// import { login } from "../../redux/userSlice";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginSuccess, loginFailure } from "../../redux/sliceLandlord";
import { Building2, Lock, Mail } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-[#fbfdf1] px-4">
      <div
        className="w-full max-w-md bg-[#fbfdf1] rounded-2xl shadow-2xl p-10 
                      transition-all duration-300 hover:shadow-3xl hover:scale-102"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Building2 className="h-16 w-16 text-[#5D8736]" />
          </div>
          <h2 className="text-3xl font-bold text-[#5D8736] mb-2">
            Welcome back
          </h2>
          <p className="text-[#809D3C]">
            Sign in to access your landlord dashboard
          </p>
        </div>
  
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-[#A9C46C]" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border-2 border-[#A9C46C] rounded-lg 
                         focus:outline-none focus:border-[#5D8736] bg-[#F4FFC3]/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-[#A9C46C]" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border-2 border-[#A9C46C] rounded-lg 
                         focus:outline-none focus:border-[#5D8736] bg-[#F4FFC3]/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-[#5D8736] text-white py-3 rounded-lg font-semibold 
                     hover:bg-[#809D3C] transition-all duration-300 
                     shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            Sign In
          </button>
        </form>
  
        <div className="mt-8 text-center">
          <p className="text-[#809D3C]">
            Don't have an account?{" "}
            <Link
              to="/SignUpLord"
              className="text-[#5D8736] font-semibold hover:text-[#A9C46C] 
                         transition-colors duration-300 underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLord;




