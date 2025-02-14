import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { fetchStadiums ,fetchselectedCourt,addStaduim} from '../../redux/StaduimsSlice';

const PropertyManagement = () => {
 
    const FinalStadiums=useSelector((state)=>state.courtInfo.courts);
  // Get the current user from Redux store
  const currentUser = useSelector((state) => state.Land.user);

  // State to manage properties
  const [properties, setProperties] = useState(FinalStadiums);
  const [editingId, setEditingId] = useState(null);
  const dispatch=useDispatch();
  // State for the form inputs
  useEffect(() => {
    setProperties(FinalStadiums);
  }, [FinalStadiums]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    image: "",
    status: "pending",
    landlordId: currentUser ? currentUser.uid : "", // Set landlordId from Redux store
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (add or update property)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newStadium = {
//         ...formData,
//         available: "No",
//         isPaid: false,
//         status:"Pending",
//     };
//   dispatch(addStaduim(newStadium));


// console.log(FinalStadiums)
   
// try {
//     // **إرسال البيانات إلى Firebase**
//     const response = await axios.post(
//         "https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums.json",
//         newStadium
//     );

//     if (response.status === 200) {
//         console.log("✅ الملعب تم حفظه في Firebase:", response.data);

//         // **إضافة الملعب إلى Redux بعد الحفظ**
//         dispatch(addStaduim(newStadium));
//     }

//     // **إعادة تعيين النموذج بعد الإضافة**
//     setFormData({
//         name: "",
//         description: "",
//         location: "",
//         price: "",
//         image: "",
//         status: "pending",
//         landlordId: currentUser ? currentUser.uid : "",
//     });
// } catch (error) {
//     console.error("❌ فشل حفظ الملعب في Firebase:", error);
// }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // التأكد من وجود المستخدم
  if (!currentUser || !currentUser.uid) {
      console.error("❌ لا يوجد مستخدم مسجل.");
      return;
  }

  const newStadium = {
      ...formData,
      available: "No",
      isPaid: false,
      status: "Pending", // يبدأ كـ "قيد الانتظار"
      landlordId: currentUser.uid, // حفظ معرف المالك
  };

  try {
      // إرسال البيانات إلى Firebase
      const response = await axios.post(
          "https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums.json",
          newStadium
      );

      if (response.status === 200) {
          console.log("✅ الملعب تم حفظه في Firebase:", response.data);
      }

      // إعادة تعيين النموذج بعد الإضافة
      setFormData({
          name: "",
          description: "",
          location: "",
          price: "",
          image: "",
          status: "pending",
          landlordId: currentUser.uid, // إعادة تعيين المالك أيضًا
      });
  } catch (error) {
      console.error("❌ فشل حفظ الملعب في Firebase:", error);
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Property Management</h1>

      {/* Add/Edit Property Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Property Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none h-40"
            required
          />
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
            required
          >
            <option value="">Select Location</option>
            <option value="Zarqa">Zarqa</option>
            <option value="Amman">Amman</option>
            <option value="Irbid">Irbid</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300 hover:cursor-pointer"
        >
          {editingId !== null ? "Update Property" : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default PropertyManagement;