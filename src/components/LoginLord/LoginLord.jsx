import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerLandlord } from "../../redux/sliceLandlord";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginLord = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profileImagePath: "", // ✅ حفظ مسار الصورة فقط
    extraImagePath: "",   // ✅ حفظ مسار الصورة فقط
    location: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(registerLandlord(formData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        type="text"
        name="profileImagePath"
        value={formData.profileImagePath}
        onChange={handleChange}
        placeholder="Profile Image Path (e.g., /img/profile.png)"
        className="w-full px-4 py-2 border rounded-lg"
      />
      <input
        type="text"
        name="extraImagePath"
        value={formData.extraImagePath}
        onChange={handleChange}
        placeholder="Extra Image Path (e.g., /img/extra.png)"
        className="w-full px-4 py-2 border rounded-lg"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location (e.g., Amman, Irbid, Zarqa)"
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-lg">
        Sign Up
      </button>
    </form>
  );
};

export default LoginLord;
