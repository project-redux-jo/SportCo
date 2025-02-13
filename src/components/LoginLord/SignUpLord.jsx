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

import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../../firebase";
import api from "../../api"; // Axios instance
import { useNavigate } from "react-router-dom";

const SignUpLandlord = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await api.patch(`/Landlords/${user.uid}.json`, {
        name,
        email,
        phoneNumber,
        location,
        profileImage: imageBase64,
        role: "landlord",
        status: "pending",
      });

      console.log("Landlord application submitted successfully!");
      alert("Your application has been submitted for review.");
      navigate("/LoginLord");
    } catch (error) {
      console.error("Signup Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Register as Landlord</h2>
      <form onSubmit={handleSignup} className="flex flex-col space-y-3">
        <input type="text" placeholder="Full Name" className="p-2 border" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="tel" placeholder="Phone Number" className="p-2 border" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <select className="p-2 border" value={location} onChange={(e) => setLocation(e.target.value)} required>
          <option value="" hidden>Location</option>
          <option value="Zarqa">Zarqa</option>
          <option value="Irbid">Irbid</option>
          <option value="Amman">Amman</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 border" required />
        <input type="password" placeholder="Password" className="p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white p-2">Register</button>
      </form>
      {imageBase64 && <img src={imageBase64} alt="Preview" className="mt-4 w-32 h-32 object-cover" />}
    </div>
  );
};

export default SignUpLandlord;
