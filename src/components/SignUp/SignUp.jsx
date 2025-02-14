import React, { useState } from "react";
import { Mail, User, Phone, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, signUpWithGoogle } from "../../redux/sliceAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Regex validation
    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{8,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!nameRegex.test(formData.fullName)) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Full Name should contain only letters.",
      });
      return;
    }
    
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Invalid email address.",
      });
      return;
    }
    
    if (!phoneRegex.test(formData.phone)) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Phone number should be between 8-15 digits.",
      });
      return;
    }
    
    if (!passwordRegex.test(formData.password)) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number.",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Passwords do not match!",
      });
      return;
    }

    dispatch(signUpUser(formData)).then((result) => {
      if (result && result.uid) {
        navigate("/LogIn");
      }
    });
  };

  // ✅ Google Sign-up
  const handleGoogleSignUp = () => {
    dispatch(signUpWithGoogle()).then((result) => {
      if (result && result.uid) {
        navigate("/");
      }
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
    <div className="group flex w-[50%] h-[80%] rounded-xl overflow-hidden shadow-lg border border-gray-200
         hover:border-green-500 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
         style={{ boxShadow: '10px 0px 10px #97e297' }}>
        {/* Image Section */}
        <div
          className="w-[45%] bg-cover bg-center"
          style={{ backgroundImage: 'url("/img/imagelogin.png")' }}
        />

        {/* Form Section */}
        <div className="w-[55%] bg-white flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg"
              />
 <div className="text-start">
             
                <a href="/LogIn" className="text-sm text-gray-500 hover:text-green-500">
                   <span>Already Have an Account?</span>
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded-lg"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full py-2 border rounded-lg"
              >
                <FcGoogle className="inline text-2xl mr-2" /> Sign up with
                Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;