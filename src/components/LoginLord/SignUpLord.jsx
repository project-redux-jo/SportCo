// import React, { useState } from "react";
// import { auth, createUserWithEmailAndPassword } from "../../firebase";
// import api from "../../api"; // Axios instance
// import { useNavigate } from "react-router-dom";

// const SignUpLandlord = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [location, setLocation] = useState("");
//   const [ImagePath,setprofileImagePath]=useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       // Create user in Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Store user data in Firebase Realtime Database using Axios
//       await api.patch(`/Landlords/${user.uid}.json`, {
//         name,
//         email,
//         ImagePath,
//         phoneNumber,
//         location,
//         role: "landlord",
//         status: "pending", // Landlords require admin approval
//       });

//       console.log("Landlord application submitted successfully!");
//       alert("Your application has been submitted for review.");
//       navigate("/LogIn"); // Redirect to login
//     } catch (error) {
//       console.error("Signup Error:", error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h2 className="text-2xl font-bold mb-4">Register as Landlord</h2>
//       <form onSubmit={handleSignup} className="flex flex-col space-y-3">
//         <input type="text" placeholder="Full Name" className="p-2 border" value={name} onChange={(e) => setName(e.target.value)} required />
//         <input type="email" placeholder="Email" className="p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="tel" placeholder="Phone Number" className="p-2 border" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
//         <select  placeholder="Location" className="p-2 border" value={location} onChange={(e) => setLocation(e.target.value)} required >
//           <option value="" hidden>Location</option>
//           <option value="Zarqa">Zarqa</option>
//           <option value="Irbid">Irbid</option>
//           <option value="Amman">Amman</option>
//           </select>
//           <input
//         type="text"
//         name="profileImagePath"
//         value={ImagePath}
//         onChange={(e) => setprofileImagePath(e.target.value)}
//          placeholder="Enter Image URL (e.g., https://example.com/image.jpg)"
//         className="w-full px-4 py-2 border rounded-lg"
//       />
//         <input type="password" placeholder="Password" className="p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} required />

//         <button type="submit" className="bg-blue-500 text-white p-2">Register</button>
//       </form>
//     </div>
//   );
// };

// export default SignUpLandlord ;



/////////////////////////////////////////////////////////////////////



// import React, { useState } from "react";
// import { auth, createUserWithEmailAndPassword } from "../../firebase";
// import api from "../../api"; // Axios instance
// import { Link,useNavigate } from "react-router-dom";
// // import { FaWhatsapp,FaTimes } from "react-icons/fa";
// import WhatsAppChat from "./WhatsAppChat";
// import Swal from "sweetalert2";
// import { useDispatch } from "react-redux";
// import {
//   Building2,
//   Mail,
//   Phone,
//   Lock,
//   MapPin,
//   AlertCircle,
// } from "lucide-react";

// const SignUpLandlord = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [location, setLocation] = useState("");
//   const [imageBase64, setImageBase64] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [error, setError] = useState("");
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageBase64(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       await api.patch(`/Landlords/${user.uid}.json`, {
//         name,
//         email,
//         phoneNumber,
//         location,
//         profileImage: imageBase64,
//         role: "landlord",
//         status: "pending",
//       });



//       // dispatch(
//       //   login({
//       //     userId: user.uid,
//       //     name,
//       //     email,
//       //     role: "landlord",
//       //     status: "pending",
//       //     profileImage: imageBase64,
//       //   })
//       // );


      
//       Swal.fire("Success!", "Your application has been submitted for review.", "success");
//       navigate("/LoginLord");
//     } catch (error) {
//       Swal.fire("Error!", error.message, "error");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <WhatsAppChat/>
//       <h2 className="text-2xl font-bold mb-4">Register as Landlord</h2>
//       <form onSubmit={handleSignup} className="flex flex-col space-y-3">
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="p-2 border"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="p-2 border"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="tel"
//           placeholder="Phone Number"
//           className="p-2 border"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           required
//         />
//         <select
//           className="p-2 border"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           required
//         >
//           <option value="" hidden>
//             Location
//           </option>
//           <option value="Zarqa">Zarqa</option>
//           <option value="Irbid">Irbid</option>
//           <option value="Amman">Amman</option>
//         </select>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="p-2 border"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="p-2 border"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2">
//           Register
//         </button>
//       </form>
//       {imageBase64 && (
//         <img
//           src={imageBase64}
//           alt="Preview"
//           className="mt-4 w-32 h-32 object-cover"
//         />
//       )}
//     </div>
//   );
// };

// export default SignUpLandlord;




import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../../firebase";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import WhatsAppChat from "./WhatsAppChat";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Building2, Mail, Phone, Lock, MapPin, AlertCircle, Image } from "lucide-react";

const SignUpLandlord = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    location: "",
    imageBase64: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await api.patch(`/Landlords/${user.uid}.json`, {
        ...formData,
        role: "landlord",
        status: "pending",
      });

      Swal.fire("Success!", "Your application has been submitted for review.", "success");
      navigate("/LoginLord");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border-2 border-[#A9C46C] px-3 py-2 text-sm placeholder-[#809D3C] focus:outline-none focus:ring-2 focus:ring-[#5D8736] focus:border-transparent pl-10 bg-[#F4FFC3]/20";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfdf1] p-4">
      <WhatsAppChat />
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border-t-4 border-[#5D8736]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#5D8736]">Become a Landlord</h2>
          <p className="text-[#809D3C] mt-2">Join our platform and list your properties</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-900 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-4 w-4 text-[#809D3C]" />
              <input type="text" name="name" placeholder="Full Name" className={inputClasses} value={formData.name} onChange={handleChange} required />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#809D3C]" />
              <input type="email" name="email" placeholder="Email" className={inputClasses} value={formData.email} onChange={handleChange} required />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-[#809D3C]" />
              <input type="tel" name="phoneNumber" placeholder="Phone Number" className={inputClasses} value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#809D3C]" />
              <select name="location" className={inputClasses} value={formData.location} onChange={handleChange} required>
                <option value="">Select Location</option>
                <option value="Zarqa">Zarqa</option>
                <option value="Irbid">Irbid</option>
                <option value="Amman">Amman</option>
              </select>
            </div>
            <div className="relative md:col-span-2">
              <Image className="absolute left-3 top-3 h-4 w-4 text-[#809D3C]" />
              <input type="file" accept="image/*" onChange={handleImageChange} className={inputClasses} required />
            </div>
            <div className="relative md:col-span-2">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[#809D3C]" />
              <input type="password" name="password" placeholder="Password" className={inputClasses} value={formData.password} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-[#5D8736] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#809D3C] focus:outline-none focus:ring-2 focus:ring-[#A9C46C] focus:ring-offset-2 transition-all duration-300 disabled:opacity-50">
            {isSubmitting ? "Registering..." : "Register as Landlord"}
          </button>

          <p className="text-center text-[#809D3C] mt-4">
            Already have an account? <Link to="/LoginLord" className="text-[#5D8736] font-semibold hover:text-[#A9C46C] transition-colors underline">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpLandlord;
